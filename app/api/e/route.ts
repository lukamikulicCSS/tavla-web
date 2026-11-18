/**
 * Prijem analitičkih događaja (first-party). Klijent šalje samo uz pristanak "Analitički".
 * Ne sprema se IP, user-agent ni kolačići. Vidi lib/analytics/track.ts.
 */
import type { NextRequest } from "next/server";
import { z } from "zod";
import { EVENT_TYPES } from "@/lib/analytics/events";
import { rateLimit } from "@/lib/rate-limit";
import { getDb, ipKey, isoDay } from "@/lib/server/request";

export const dynamic = "force-dynamic";

const MAX_BODY = 32_000;
const str = (n: number) => z.string().max(n).optional();
const unit = z.number().min(0).max(1).optional();

const schema = z.object({
  sid: z.string().regex(/^[a-f0-9]{24}$/),
  device: z.enum(["mobile", "tablet", "desktop"]),
  sw: z.enum(["<400", "400-767", "768-1023", "1024-1439", "1440+"]),
  ref: z.string().max(120).regex(/^[a-z0-9.-]*$/i).optional(),
  utm: z.object({ source: str(60), medium: str(60), campaign: str(80) }).optional(),
  events: z
    .array(
      z.object({
        type: z.enum(EVENT_TYPES),
        t: z.number().int().positive(),
        path: z.string().max(200).regex(/^\//),
        section: z.string().max(40).regex(/^[a-z0-9-]+$/).optional(),
        target: str(80),
        value: z.number().min(0).max(100_000).optional(),
        x: unit,
        y: unit,
        label: str(80),
      }),
    )
    .min(1)
    .max(50),
});

const empty = () => new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });

export async function POST(req: NextRequest) {
  // sendBeacon ne šalje Origin u svim preglednicima; prihvaćamo samo isti host ili bez Origina uz Sec-Fetch-Site
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const site = req.headers.get("sec-fetch-site");
  if (origin) {
    try {
      if (new URL(origin).host !== host) return empty();
    } catch {
      return empty();
    }
  } else if (site && site !== "same-origin") return empty();

  const raw = await req.text();
  if (raw.length > MAX_BODY) return empty();

  // ~1 zahtjev / 10 s po klijentu je normalno; dopuštamo malu rezervu
  const limit = await rateLimit(ipKey(req), { namespace: "e", windowS: 60, max: 20 });
  if (!limit.ok) return empty();

  let parsed;
  try {
    parsed = schema.safeParse(JSON.parse(raw));
  } catch {
    return empty();
  }
  if (!parsed.success) return empty();

  const db = await getDb();
  if (!db) return empty();

  const { sid, device, sw, ref, utm, events } = parsed.data;
  const now = Date.now();
  const stmt = db.prepare(
    `INSERT INTO events (ts, day, sid, type, path, section, target, value, x, y, label, ref, utm_source, utm_medium, utm_campaign, device, sw)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17)`,
  );
  const rows = events.map((e) => {
    // vrijeme s klijenta prihvaćamo samo ako je unutar zadnjih 24 h
    const ts = Math.abs(now - e.t) < 86_400_000 ? e.t : now;
    const pv = e.type === "page_view";
    return stmt.bind(
      ts,
      isoDay(ts),
      sid,
      e.type,
      e.path.split("?")[0].split("#")[0],
      e.section ?? null,
      e.target ?? null,
      e.value ?? null,
      e.x ?? null,
      e.y ?? null,
      e.label ?? null,
      pv ? ref || null : null,
      pv ? utm?.source || null : null,
      pv ? utm?.medium || null : null,
      pv ? utm?.campaign || null : null,
      device,
      sw,
    );
  });

  try {
    await db.batch(rows);
  } catch (err) {
    console.error("[e] D1 greška", err instanceof Error ? err.message : "");
  }
  return empty();
}

export function GET() {
  return new Response(null, { status: 405, headers: { Allow: "POST" } });
}
