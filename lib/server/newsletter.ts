/**
 * Newsletter s dvostrukom potvrdom (double opt-in).
 *
 *  upis → zapis "pending" u D1 + potvrdni mail s jednokratnim tokenom (48 h)
 *  potvrda → "confirmed" + kontakt u Resend Audience
 *  odjava → "unsubscribed" u D1 + unsubscribed u Resend Audience
 *
 * Token se u bazi čuva samo kao HMAC (NEWSLETTER_TOKEN_SECRET). IP se ne sprema.
 */
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { site } from "@/content/site";
import { NEWSLETTER_CONSENT_VERSION } from "@/lib/newsletter-schema";
import { getSecret } from "./request";
import { confirmEmail } from "./newsletter-email";
import { getDict } from "@/content";
import { href, type Locale } from "@/content/routes";

const TOKEN_TTL_MS = 48 * 3600_000;
const RESEND_COOLDOWN_MS = 10 * 60_000;

type Row = { id: number; email: string; status: "pending" | "confirmed" | "unsubscribed"; created_at: number; token_expires_at: number | null };

async function secret() {
  const s = await getSecret("NEWSLETTER_TOKEN_SECRET");
  if (!s || s.length < 32) throw new Error("NEWSLETTER_TOKEN_SECRET nije postavljen (min. 32 znaka)");
  return s;
}

const hmac = (key: string, data: string) => createHmac("sha256", key).update(data).digest("base64url");

const b64 = (s: string) => Buffer.from(s, "utf8").toString("base64url");
const unb64 = (s: string) => Buffer.from(s, "base64url").toString("utf8");

/** Trajna poveznica za odjavu (deterministička, ne treba je spremati). */
export async function unsubscribeUrl(email: string, locale: Locale = "hr") {
  const key = await secret();
  return `${site.url}${href("newsletterUnsubscribe", locale)}?e=${b64(email)}&t=${hmac(key, `unsub:${email}`)}`;
}

export async function verifyUnsubscribe(e: string, t: string): Promise<string | null> {
  try {
    const email = unb64(e);
    if (!email.includes("@") || email.length > 160) return null;
    const expected = Buffer.from(hmac(await secret(), `unsub:${email}`));
    const got = Buffer.from(t);
    return expected.length === got.length && timingSafeEqual(expected, got) ? email : null;
  } catch {
    return null;
  }
}

async function resend(path: string, init: { method: string; body?: unknown; headers?: Record<string, string> }) {
  const apiKey = await getSecret("RESEND_API_KEY");
  if (!apiKey) return null;
  return fetch(`https://api.resend.com${path}`, {
    method: init.method,
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", ...init.headers },
    body: init.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
}

export type SubscribeResult = "ok" | "unavailable";

/**
 * Upis. Uvijek vraća istu poruku korisniku ("ok"), bez obzira je li adresa već prijavljena,
 * da se ne otkriva tko je na popisu.
 */
export async function subscribe(db: D1Database, email: string, source: string, interest?: string, locale: Locale = "hr"): Promise<SubscribeResult> {
  const key = await secret();
  const now = Date.now();
  const existing = await db
    .prepare(`SELECT id, email, status, created_at, token_expires_at FROM newsletter_consents WHERE email = ?1`)
    .bind(email)
    .first<Row>();

  if (existing?.status === "confirmed") return "ok";
  // zaštita od zasipanja tuđeg inboxa: novi mail najranije nakon 10 min
  if (existing?.status === "pending" && existing.token_expires_at && existing.token_expires_at - TOKEN_TTL_MS > now - RESEND_COOLDOWN_MS) {
    return "ok";
  }

  const token = randomBytes(32).toString("base64url");
  const tokenHash = hmac(key, `confirm:${token}`);
  const upsert = (withLocale: boolean) =>
    db
      .prepare(
        `INSERT INTO newsletter_consents (email, status, source, interest, consent_version, created_at, token_hash, token_expires_at${withLocale ? ", locale" : ""})
         VALUES (?1, 'pending', ?2, ?3, ?4, ?5, ?6, ?7${withLocale ? ", ?8" : ""})
         ON CONFLICT(email) DO UPDATE SET
           status = 'pending', source = excluded.source, interest = COALESCE(excluded.interest, interest),
           consent_version = excluded.consent_version, created_at = excluded.created_at,
           token_hash = excluded.token_hash, token_expires_at = excluded.token_expires_at,
           confirmed_at = NULL, unsubscribed_at = NULL${withLocale ? ", locale = excluded.locale" : ""}`,
      )
      .bind(...[email, source, interest ?? null, NEWSLETTER_CONSENT_VERSION, now, tokenHash, now + TOKEN_TTL_MS, ...(withLocale ? [locale] : [])])
      .run();
  try {
    await upsert(true);
  } catch (err) {
    // migracija 0003 (stupac locale) još nije primijenjena — upis bez jezika, kao prije
    if (!(err instanceof Error && /locale/i.test(err.message))) throw err;
    console.warn("[newsletter] stupac locale ne postoji — primijenite migrations/0003_newsletter_locale.sql");
    await upsert(false);
  }

  const from = (await getSecret("NEWSLETTER_FROM_EMAIL")) ?? "Tavla <novosti@tavlahr.com>";
  const unsub = await unsubscribeUrl(email, locale);
  const confirmUrl = `${site.url}${href("newsletterConfirm", locale)}?token=${token}`;
  const mail = confirmEmail(confirmUrl, unsub, locale);
  const res = await resend("/emails", {
    method: "POST",
    body: {
      from,
      to: [email],
      subject: getDict(locale).messages.newsletter.email.subject,
      html: mail.html,
      text: mail.text,
      headers: { "List-Unsubscribe": `<${unsub}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
    },
  });
  if (!res || !res.ok) {
    if (!res) console.info("[newsletter] Resend nije podešen — potvrdni link (samo za razvoj):", process.env.NODE_ENV !== "production" ? confirmUrl : "skriven");
    else console.error("[newsletter] Resend greška", res.status);
    // mail nije otišao: poništi token, da sljedeći pokušaj ne zapne na zaštiti od ponovnog slanja
    await db.prepare(`UPDATE newsletter_consents SET token_hash = NULL, token_expires_at = NULL WHERE email = ?1 AND status = 'pending'`).bind(email).run();
    return !res && process.env.NODE_ENV !== "production" ? "ok" : "unavailable";
  }
  return "ok";
}

/** Potvrda prijave. Vraća true ako je token valjan (ili je adresa već potvrđena istim tokenom). */
export async function confirm(db: D1Database, token: string): Promise<boolean> {
  if (!/^[A-Za-z0-9_-]{43}$/.test(token)) return false;
  const tokenHash = hmac(await secret(), `confirm:${token}`);
  const now = Date.now();
  const row = await db
    .prepare(`SELECT id, email, status, created_at, token_expires_at FROM newsletter_consents WHERE token_hash = ?1`)
    .bind(tokenHash)
    .first<Row>();
  if (!row) return false;
  if (row.status === "confirmed") return true;
  if (row.status !== "pending" || !row.token_expires_at || row.token_expires_at < now) return false;

  let contactId: string | null = null;
  const audience = await getSecret("RESEND_AUDIENCE_ID");
  if (audience) {
    const res = await resend(`/audiences/${audience}/contacts`, { method: "POST", body: { email: row.email, unsubscribed: false } });
    if (res?.ok) contactId = ((await res.json().catch(() => ({}))) as { id?: string }).id ?? null;
    else console.error("[newsletter] Resend Audience greška", res?.status);
  }

  // token ostaje zapisan da ponovni klik na isti link prikaže "potvrđeno", ali više ne vrijedi za ništa drugo
  await db
    .prepare(`UPDATE newsletter_consents SET status = 'confirmed', confirmed_at = ?1, token_expires_at = NULL, resend_contact_id = ?2 WHERE id = ?3`)
    .bind(now, contactId, row.id)
    .run();
  return true;
}

export async function unsubscribe(db: D1Database | null, email: string) {
  if (db) {
    await db
      .prepare(`UPDATE newsletter_consents SET status = 'unsubscribed', unsubscribed_at = ?1, token_hash = NULL, token_expires_at = NULL WHERE email = ?2`)
      .bind(Date.now(), email)
      .run();
  }
  const audience = await getSecret("RESEND_AUDIENCE_ID");
  if (audience) {
    const res = await resend(`/audiences/${audience}/contacts/${encodeURIComponent(email)}`, { method: "PATCH", body: { unsubscribed: true } });
    if (res && !res.ok && res.status !== 404) console.error("[newsletter] Resend odjava greška", res.status);
  }
}
