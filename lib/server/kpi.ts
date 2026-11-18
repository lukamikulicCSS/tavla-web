/**
 * Upiti za KPI ploču. Sve iz sirovih događaja (D1) za odabrano razdoblje + prethodno razdoblje.
 * Napomena: događaji postoje samo za posjetitelje koji su pristali na analitiku,
 * pa su stope (konverzija, angažman) izračunate na toj populaciji. Upiti (leads) su potpuni.
 */
import { classifySource, isoDay } from "./request";

const DAY = 86_400_000;

export const HOME_SECTIONS = [
  "hero", "uskoro", "problem", "kako-funkcionira", "iskustva", "demo", "koristi",
  "objekti", "zasto-tavla", "tim", "iskustva-korisnika", "faq", "kontakt", "footer",
];

export type Range = { from: string; to: string; prevFrom: string; prevTo: string; days: number };

export function makeRange(days: number, now = Date.now()): Range {
  // [from, to) — "to" je sutra, da danas bude uključen
  const to = isoDay(now + DAY);
  const from = isoDay(now - (days - 1) * DAY);
  const prevFrom = isoDay(now - (2 * days - 1) * DAY);
  return { from, to, prevFrom, prevTo: from, days };
}

type Row = Record<string, string | number | null>;
const num = (v: unknown) => (typeof v === "number" ? v : Number(v ?? 0)) || 0;

async function all<T extends Row>(db: D1Database, sql: string, ...binds: (string | number)[]) {
  return ((await db.prepare(sql).bind(...binds).all<T>()).results ?? []) as T[];
}
async function one(db: D1Database, sql: string, ...binds: (string | number)[]) {
  const r = await db.prepare(sql).bind(...binds).first<Row>();
  return num(r ? Object.values(r)[0] : 0);
}

const ENGAGED = `SELECT COUNT(*) FROM (
  SELECT sid FROM events WHERE day >= ?1 AND day < ?2 GROUP BY sid
  HAVING SUM(CASE WHEN type = 'section_view' THEN value ELSE 0 END) >= 10
      OR COUNT(DISTINCT CASE WHEN type = 'section_view' THEN section END) >= 2
      OR SUM(CASE WHEN type = 'click' THEN 1 ELSE 0 END) >= 1)`;

async function headline(db: D1Database, from: string, to: string) {
  const [sessions, engaged, converted, leads, nlNew, nlConfirmed] = await Promise.all([
    one(db, `SELECT COUNT(DISTINCT sid) FROM events WHERE day >= ?1 AND day < ?2`, from, to),
    one(db, ENGAGED, from, to),
    one(db, `SELECT COUNT(DISTINCT sid) FROM events WHERE day >= ?1 AND day < ?2 AND type = 'form_submit' AND label = 'kontakt'`, from, to),
    one(db, `SELECT COUNT(*) FROM leads WHERE day >= ?1 AND day < ?2`, from, to),
    one(db, `SELECT COUNT(*) FROM newsletter_consents WHERE created_at >= ?1 AND created_at < ?2`, Date.parse(from), Date.parse(to)),
    one(db, `SELECT COUNT(*) FROM newsletter_consents WHERE confirmed_at >= ?1 AND confirmed_at < ?2`, Date.parse(from), Date.parse(to)),
  ]);
  return { sessions, engaged, converted, leads, nlNew, nlConfirmed };
}

export type Kpi = Awaited<ReturnType<typeof loadKpi>>;

export async function loadKpi(db: D1Database, r: Range, page: string, section: string) {
  const { from, to } = r;
  const [cur, prev, daily, firstViews, devices, pages, dwell, scroll, pageSessions, clicks, topTargets, demo, form, formErrors, cta, leadsBySource, recentLeads] =
    await Promise.all([
      headline(db, from, to),
      headline(db, r.prevFrom, r.prevTo),
      all<{ day: string; s: number }>(db, `SELECT day, COUNT(DISTINCT sid) AS s FROM events WHERE day >= ?1 AND day < ?2 GROUP BY day ORDER BY day`, from, to),
      // prvi page_view sesije = izvor posjeta (SQLite: "goli" stupci uz MIN() dolaze iz istog retka)
      all<{ ref: string | null; utm_source: string | null; utm_campaign: string | null; t: number }>(
        db,
        `SELECT ref, utm_source, utm_campaign, MIN(ts) AS t FROM events WHERE day >= ?1 AND day < ?2 AND type = 'page_view' GROUP BY sid`,
        from, to,
      ),
      all<{ device: string; s: number }>(db, `SELECT device, COUNT(DISTINCT sid) AS s FROM events WHERE day >= ?1 AND day < ?2 GROUP BY device`, from, to),
      all<{ path: string; v: number }>(db, `SELECT path, COUNT(*) AS v FROM events WHERE day >= ?1 AND day < ?2 AND type = 'page_view' GROUP BY path ORDER BY v DESC LIMIT 10`, from, to),
      all<{ section: string; avg: number; n: number }>(
        db,
        `SELECT section, AVG(value) AS avg, COUNT(*) AS n FROM events WHERE day >= ?1 AND day < ?2 AND type = 'section_view' AND path = ?3 GROUP BY section`,
        from, to, page,
      ),
      all<{ m: number; s: number }>(
        db,
        `SELECT CAST(value AS INTEGER) AS m, COUNT(DISTINCT sid) AS s FROM events WHERE day >= ?1 AND day < ?2 AND type = 'scroll_depth' AND path = ?3 GROUP BY m`,
        from, to, page,
      ),
      one(db, `SELECT COUNT(DISTINCT sid) FROM events WHERE day >= ?1 AND day < ?2 AND type = 'page_view' AND path = ?3`, from, to, page),
      all<{ x: number; y: number; cta: number }>(
        db,
        `SELECT x, y, CASE WHEN target LIKE '%cta%' THEN 1 ELSE 0 END AS cta FROM events
         WHERE day >= ?1 AND day < ?2 AND type = 'click' AND path = ?3 AND section = ?4 AND x IS NOT NULL LIMIT 3000`,
        from, to, page, section,
      ),
      all<{ target: string; n: number }>(
        db,
        `SELECT target, COUNT(*) AS n FROM events WHERE day >= ?1 AND day < ?2 AND type = 'click' AND target IS NOT NULL AND target != '' GROUP BY target ORDER BY n DESC LIMIT 10`,
        from, to,
      ),
      all<{ step: string; s: number }>(
        db,
        `SELECT 'view' AS step, COUNT(DISTINCT sid) AS s FROM events WHERE day >= ?1 AND day < ?2 AND type = 'section_view' AND section = 'demo'
         UNION ALL SELECT label, COUNT(DISTINCT sid) FROM events WHERE day >= ?1 AND day < ?2 AND type = 'demo_interaction' GROUP BY label`,
        from, to,
      ),
      all<{ step: string; s: number }>(
        db,
        `SELECT 'view' AS step, COUNT(DISTINCT sid) AS s FROM events WHERE day >= ?1 AND day < ?2 AND type = 'section_view' AND section = 'kontakt'
         UNION ALL SELECT type, COUNT(DISTINCT sid) FROM events WHERE day >= ?1 AND day < ?2 AND type IN ('form_start', 'form_submit') AND label = 'kontakt' GROUP BY type`,
        from, to,
      ),
      all<{ target: string }>(db, `SELECT target FROM events WHERE day >= ?1 AND day < ?2 AND type = 'form_error' AND label = 'kontakt' AND target IS NOT NULL`, from, to),
      all<{ section: string; n: number }>(
        db,
        `SELECT COALESCE(section, '—') AS section, COUNT(*) AS n FROM events WHERE day >= ?1 AND day < ?2 AND type = 'cta_click' GROUP BY section ORDER BY n DESC`,
        from, to,
      ),
      all<{ source: string; n: number }>(db, `SELECT source, COUNT(*) AS n FROM leads WHERE day >= ?1 AND day < ?2 GROUP BY source ORDER BY n DESC`, from, to),
      all<{ created_at: number; name: string; business: string; venue_type: string; source: string; newsletter: number }>(
        db,
        `SELECT created_at, name, business, venue_type, source, newsletter FROM leads ORDER BY created_at DESC LIMIT 20`,
      ),
    ]);

  // izvori prometa i kampanje
  const sources = new Map<string, number>();
  const campaigns = new Map<string, number>();
  for (const v of firstViews) {
    const s = classifySource(v.ref ?? undefined, v.utm_source ?? undefined);
    sources.set(s, (sources.get(s) ?? 0) + 1);
    if (v.utm_campaign) campaigns.set(v.utm_campaign, (campaigns.get(v.utm_campaign) ?? 0) + 1);
  }
  const errorFields = new Map<string, number>();
  for (const e of formErrors) for (const f of e.target.split(",")) if (f) errorFields.set(f, (errorFields.get(f) ?? 0) + 1);

  const step = (rows: { step: string; s: number }[], k: string) => num(rows.find((x) => x.step === k)?.s);
  const order = page === "/" ? HOME_SECTIONS : dwell.map((d) => d.section);

  return {
    cur,
    prev,
    daily: daily.map((d) => ({ day: d.day, value: num(d.s) })),
    sources: [...sources].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value),
    campaigns: [...campaigns].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value).slice(0, 8),
    devices: devices.map((d) => ({ label: d.device ?? "—", value: num(d.s) })),
    pages: pages.map((p) => ({ label: p.path, value: num(p.v) })),
    dwell: order
      .map((s) => dwell.find((d) => d.section === s))
      .filter((d): d is { section: string; avg: number; n: number } => Boolean(d))
      .map((d) => ({ label: d.section, value: Math.round(num(d.avg) * 10) / 10, n: num(d.n) })),
    scroll: [25, 50, 75, 100].map((m) => ({ label: `${m} %`, value: num(scroll.find((s) => s.m === m)?.s), of: pageSessions })),
    clicks: clicks.map((c) => ({ x: num(c.x), y: num(c.y), cta: c.cta === 1 })),
    topTargets: topTargets.map((t) => ({ label: t.target, value: num(t.n) })),
    demo: [
      { label: "Vidjeli demo", value: step(demo, "view") },
      { label: "Dodali u košaricu", value: step(demo, "guest_add") },
      { label: "Poslali narudžbu", value: step(demo, "guest_order") },
    ],
    form: [
      { label: "Vidjeli formu", value: step(form, "view") },
      { label: "Počeli ispunjavati", value: step(form, "form_start") },
      { label: "Poslali upit", value: step(form, "form_submit") },
    ],
    errorFields: [...errorFields].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value),
    cta: cta.map((c) => ({ label: c.section, value: num(c.n) })),
    leadsBySource: leadsBySource.map((l) => ({ label: l.source, value: num(l.n) })),
    recentLeads,
  };
}

/** Stranice i sekcije za filtere toplinske karte */
export async function loadFilters(db: D1Database, r: Range, page: string) {
  const [pagesRows, sectionRows] = await Promise.all([
    all<{ path: string }>(db, `SELECT path FROM events WHERE day >= ?1 AND day < ?2 AND type = 'page_view' GROUP BY path ORDER BY COUNT(*) DESC LIMIT 15`, r.from, r.to),
    all<{ section: string }>(db, `SELECT DISTINCT section FROM events WHERE day >= ?1 AND day < ?2 AND path = ?3 AND section IS NOT NULL`, r.from, r.to, page),
  ]);
  return { pages: pagesRows.map((p) => p.path), sections: sectionRows.map((s) => s.section) };
}
