import type { NextRequest } from "next/server";
import { newsletterSchema } from "@/lib/newsletter-schema";
import { getDict } from "@/content";
import { isLocale, type Locale } from "@/content/routes";
import { rateLimit } from "@/lib/rate-limit";
import { getDb, ipKey, json, sameOrigin } from "@/lib/server/request";
import { subscribe } from "@/lib/server/newsletter";

export const dynamic = "force-dynamic";

const MIN_FILL_MS = 1500;

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
  // Sigurnosne provjere su iste za oba jezika.
  let m = getDict(requestLocale(req)).messages.api;
  if (!sameOrigin(req)) return json(403, { error: m.forbidden });
  if (!req.headers.get("content-type")?.includes("application/json")) return json(415, { error: m.badFormat });

  const raw = await req.text();
  if (raw.length > 2000) return json(413, { error: m.tooLarge });

  const limit = await rateLimit(ipKey(req), { namespace: "nl", windowS: 600, max: 5 });
  if (!limit.ok) {
    return json(429, { error: m.nlRateLimited }, { "Retry-After": String(limit.retryAfter) });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { error: m.badFormat });
  }
  const locale = requestLocale(req, body);
  m = getDict(locale).messages.api;
  const OK_MESSAGE = m.nlCheckInbox;
  const parsed = newsletterSchema(locale).safeParse(body);
  if (!parsed.success) {
    const onlyHoneypot = parsed.error.issues.every((i) => i.path[0] === "website");
    if (onlyHoneypot) return json(200, { ok: true, message: OK_MESSAGE });
    const email = parsed.error.issues.find((i) => i.path[0] === "email");
    return json(422, { error: email?.message ?? m.nlCheckAddress });
  }
  const { email, source, interest, startedAt } = parsed.data;
  if (Date.now() - startedAt < MIN_FILL_MS) return json(200, { ok: true, message: OK_MESSAGE });

  const db = await getDb();
  if (!db) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[newsletter] D1 nije dostupan (dev) — prijava nije spremljena.", { source, interest, locale });
      return json(200, { ok: true, message: OK_MESSAGE, dev: true });
    }
    return json(503, { error: m.nlUnavailable });
  }

  try {
    const r = await subscribe(db, email, source, interest, locale);
    if (r === "unavailable") return json(503, { error: m.nlUnavailable });
  } catch (err) {
    console.error("[newsletter]", err instanceof Error ? err.message : err);
    return json(503, { error: m.nlUnavailable });
  }
  // Ista poruka i kad je adresa već prijavljena — ne otkrivamo tko je na popisu.
  return json(200, { ok: true, message: OK_MESSAGE });
}

export function GET(req: NextRequest) {
  return json(405, { error: getDict(requestLocale(req)).messages.api.methodNotAllowed }, { Allow: "POST" });
}
