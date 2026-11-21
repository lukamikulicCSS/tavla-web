import type { NextRequest } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { getDict } from "@/content";
import { isLocale, type Locale } from "@/content/routes";
import { rateLimit } from "@/lib/rate-limit";
import { classifySource, clientIp, escapeHtml, getDb, getSecret, ipKey, isoDay, json, sameOrigin } from "@/lib/server/request";
import { subscribe } from "@/lib/server/newsletter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_FILL_MS = 3000; // brže od ovoga ispunjavaju samo botovi
const MAX_BODY = 16_000;

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile nije uključen
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as { success?: boolean };
  return Boolean(data.success);
}

/** Jezik odgovora: iz tijela zahtjeva ("locale"), inače iz putanje stranice (Referer), inače hrvatski. */
function requestLocale(req: NextRequest, body?: unknown): Locale {
  const fromBody = (body as { locale?: unknown } | undefined)?.locale;
  if (isLocale(fromBody)) return fromBody;
  try {
    const ref = new URL(req.headers.get("referer") ?? "");
    if (ref.pathname === "/en" || ref.pathname.startsWith("/en/")) return "en";
  } catch {
    /* bez Referera */
  }
  return "hr";
}

export async function POST(req: NextRequest) {
  // Sigurnosne provjere su iste za oba jezika (Origin, veličina, rate limit, honeypot, vrijeme, Turnstile).
  let m = getDict(requestLocale(req)).messages.api;
  if (!sameOrigin(req)) return json(403, { error: m.forbidden });
  if (!req.headers.get("content-type")?.includes("application/json")) return json(415, { error: m.badFormat });

  const raw = await req.text();
  if (raw.length > MAX_BODY) return json(413, { error: m.tooLong });

  const ip = clientIp(req);
  // IP se ne sprema — koristi se samo jednosmjerni hash kao ključ za limit.
  const limit = await rateLimit(ipKey(req));
  if (!limit.ok) {
    return json(429, { error: m.rateLimited }, { "Retry-After": String(limit.retryAfter) });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { error: m.badFormat });
  }

  const locale = requestLocale(req, body);
  m = getDict(locale).messages.api;
  const parsed = contactSchema(locale).safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    // Ako je "pao" samo honeypot, botu glumimo uspjeh
    if (Object.keys(fieldErrors).length === 1 && fieldErrors.website) return json(200, { ok: true });
    return json(422, { error: m.checkFields, fieldErrors });
  }

  const data = parsed.data;
  if (Date.now() - data.startedAt < MIN_FILL_MS) return json(200, { ok: true }); // tihi odbačaj bota

  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return json(400, { error: m.turnstile });
  }

  const apiKey = await getSecret("RESEND_API_KEY");
  const to = await getSecret("CONTACT_TO_EMAIL");
  const from = await getSecret("CONTACT_FROM_EMAIL");

  // Mail stiže nama, pa je uvijek na hrvatskom; "Jezik" kaže na kojoj je verziji stranice upit poslan.
  const venue = getDict("hr").messages.venueTypes[data.venueType] ?? data.venueType;
  const rows: [string, string][] = [
    ["Ime", data.name],
    ["Objekt", data.business],
    ["Vrsta", venue],
    ["E-mail", data.email],
    ["Telefon", data.phone || "—"],
    ["Jezik", locale.toUpperCase()],
  ];
  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;color:#0b0b0d">
      <h2 style="margin:0 0 16px">Novi upit za demonstraciju</h2>
      <table cellpadding="6" style="border-collapse:collapse">${rows
        .map(([k, v]) => `<tr><td style="color:#52525b">${k}</td><td><b>${escapeHtml(v)}</b></td></tr>`)
        .join("")}</table>
      <p style="white-space:pre-wrap;margin-top:16px">${escapeHtml(data.message)}</p>
    </div>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${data.message}`;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[kontakt] Resend nije podešen — upit nije poslan (dev način). Jezik: ${locale.toUpperCase()}`, { business: data.business, venueType: data.venueType });
      console.info(`[kontakt] dev — sadržaj maila koji bi bio poslan:\n${text}`);
      await afterSend(data, locale);
      return json(200, { ok: true, dev: true });
    }
    console.error("[kontakt] Nedostaju RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL");
    return json(503, { error: m.unavailable });
  }


  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Upit za demo${locale === "en" ? " [EN]" : ""}: ${data.business.slice(0, 80)}`,
        html,
        text,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[kontakt] Resend greška", res.status);
      return json(502, { error: m.sendFailed });
    }
  } catch {
    return json(502, { error: m.sendFailed });
  }

  await afterSend(data, locale);
  return json(200, { ok: true });
}

type Parsed = ReturnType<ReturnType<typeof contactSchema>["parse"]>;

/**
 * Nakon uspješnog slanja: upit u tablicu `leads` (za KPI ploču) i, ako je označeno, prijava na newsletter.
 * Greške ovdje ne smiju srušiti odgovor korisniku — mail je već poslan.
 */
async function afterSend(data: Parsed, locale: Locale) {
  const db = await getDb();
  if (!db) return;
  const now = Date.now();
  const src = data.src ?? {};
  try {
    await db
      .prepare(
        `INSERT INTO leads (created_at, day, name, business, venue_type, source, ref, utm_source, utm_medium, utm_campaign, landing, newsletter)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)`,
      )
      .bind(
        now,
        isoDay(now),
        data.name,
        data.business,
        data.venueType,
        // landing postoji samo kad je posjetitelj pristao na analitiku; inače izvor ne znamo
        src.landing ? classifySource(src.ref, src.utmSource) : "nepoznato",
        src.ref ?? null,
        src.utmSource ?? null,
        src.utmMedium ?? null,
        src.utmCampaign ?? null,
        src.landing ?? null,
        data.newsletter ? 1 : 0,
      )
      .run();
  } catch (err) {
    console.error("[kontakt] D1 leads", err instanceof Error ? err.message : err);
  }
  if (data.newsletter) {
    try {
      await subscribe(db, data.email.toLowerCase(), "kontakt", undefined, locale);
    } catch (err) {
      console.error("[kontakt] newsletter", err instanceof Error ? err.message : err);
    }
  }
}

export function GET(req: NextRequest) {
  return json(405, { error: getDict(requestLocale(req)).messages.api.methodNotAllowed }, { Allow: "POST" });
}
