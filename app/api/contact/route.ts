import { NextResponse, type NextRequest } from "next/server";
import { createHash } from "node:crypto";
import { contactSchema, venueTypes } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_FILL_MS = 3000; // brže od ovoga ispunjavaju samo botovi
const MAX_BODY = 16_000;

const json = (status: number, body: Record<string, unknown>, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function clientIp(req: NextRequest) {
  const fwd = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return fwd || req.headers.get("x-real-ip") || "unknown";
}

/** CSRF zaštita: zahtjev mora doći s iste domene (Origin == Host). */
function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

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

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return json(403, { error: "Zahtjev nije dopušten." });
  if (!req.headers.get("content-type")?.includes("application/json")) return json(415, { error: "Neispravan format zahtjeva." });

  const raw = await req.text();
  if (raw.length > MAX_BODY) return json(413, { error: "Poruka je preduga." });

  const ip = clientIp(req);
  // IP se ne sprema — koristi se samo jednosmjerni hash kao ključ za limit.
  const ipKey = createHash("sha256").update(ip).digest("hex").slice(0, 32);
  const limit = await rateLimit(ipKey);
  if (!limit.ok) {
    return json(429, { error: "Poslali ste previše upita u kratkom vremenu. Pokušajte ponovno za nekoliko minuta." }, { "Retry-After": String(limit.retryAfter) });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { error: "Neispravan format zahtjeva." });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    // Ako je "pao" samo honeypot, botu glumimo uspjeh
    if (Object.keys(fieldErrors).length === 1 && fieldErrors.website) return json(200, { ok: true });
    return json(422, { error: "Provjerite označena polja.", fieldErrors });
  }

  const data = parsed.data;
  if (Date.now() - data.startedAt < MIN_FILL_MS) return json(200, { ok: true }); // tihi odbačaj bota

  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return json(400, { error: "Provjera da niste robot nije uspjela. Osvježite stranicu i pokušajte ponovno." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[kontakt] Resend nije podešen — upit nije poslan (dev način).", { business: data.business, venueType: data.venueType });
      return json(200, { ok: true, dev: true });
    }
    console.error("[kontakt] Nedostaju RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL");
    return json(503, { error: "Slanje trenutno nije moguće. Pokušajte kasnije ili nam pišite izravno e-mailom." });
  }

  const venue = venueTypes.find((v) => v.value === data.venueType)?.label ?? data.venueType;
  const rows: [string, string][] = [
    ["Ime", data.name],
    ["Objekt", data.business],
    ["Vrsta", venue],
    ["E-mail", data.email],
    ["Telefon", data.phone || "—"],
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

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Upit za demo: ${data.business.slice(0, 80)}`,
        html,
        text,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[kontakt] Resend greška", res.status);
      return json(502, { error: "Slanje nije uspjelo. Pokušajte ponovno za minutu." });
    }
  } catch {
    return json(502, { error: "Slanje nije uspjelo. Pokušajte ponovno za minutu." });
  }

  return json(200, { ok: true });
}

export function GET() {
  return json(405, { error: "Metoda nije dopuštena." }, { Allow: "POST" });
}
