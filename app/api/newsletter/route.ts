import type { NextRequest } from "next/server";
import { newsletterSchema } from "@/lib/newsletter-schema";
import { rateLimit } from "@/lib/rate-limit";
import { getDb, ipKey, json, sameOrigin } from "@/lib/server/request";
import { subscribe } from "@/lib/server/newsletter";

export const dynamic = "force-dynamic";

const MIN_FILL_MS = 1500;
const OK_MESSAGE = "Provjerite inbox i potvrdite prijavu.";

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return json(403, { error: "Zahtjev nije dopušten." });
  if (!req.headers.get("content-type")?.includes("application/json")) return json(415, { error: "Neispravan format zahtjeva." });

  const raw = await req.text();
  if (raw.length > 2000) return json(413, { error: "Zahtjev je prevelik." });

  const limit = await rateLimit(ipKey(req), { namespace: "nl", windowS: 600, max: 5 });
  if (!limit.ok) {
    return json(429, { error: "Previše pokušaja. Pokušajte ponovno za nekoliko minuta." }, { "Retry-After": String(limit.retryAfter) });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { error: "Neispravan format zahtjeva." });
  }
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    const onlyHoneypot = parsed.error.issues.every((i) => i.path[0] === "website");
    if (onlyHoneypot) return json(200, { ok: true, message: OK_MESSAGE });
    const email = parsed.error.issues.find((i) => i.path[0] === "email");
    return json(422, { error: email?.message ?? "Provjerite upisanu adresu." });
  }
  const { email, source, interest, startedAt } = parsed.data;
  if (Date.now() - startedAt < MIN_FILL_MS) return json(200, { ok: true, message: OK_MESSAGE });

  const db = await getDb();
  if (!db) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[newsletter] D1 nije dostupan (dev) — prijava nije spremljena.", { source, interest });
      return json(200, { ok: true, message: OK_MESSAGE, dev: true });
    }
    return json(503, { error: "Prijava trenutno nije moguća. Pokušajte kasnije." });
  }

  try {
    const r = await subscribe(db, email, source, interest);
    if (r === "unavailable") return json(503, { error: "Prijava trenutno nije moguća. Pokušajte kasnije." });
  } catch (err) {
    console.error("[newsletter]", err instanceof Error ? err.message : err);
    return json(503, { error: "Prijava trenutno nije moguća. Pokušajte kasnije." });
  }
  // Ista poruka i kad je adresa već prijavljena — ne otkrivamo tko je na popisu.
  return json(200, { ok: true, message: OK_MESSAGE });
}

export function GET() {
  return json(405, { error: "Metoda nije dopuštena." }, { Allow: "POST" });
}
