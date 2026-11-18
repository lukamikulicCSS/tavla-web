/**
 * Dnevna obrada analitike (pokreće je Cron Trigger iz worker.ts):
 *  1. zbirni podaci za protekle dane → daily_section_stats, daily_kpi (čuvaju se trajno)
 *  2. brisanje sirovih događaja starijih od roka čuvanja
 *  3. brisanje nepotvrđenih prijava na newsletter starijih od 30 dana
 *
 * Bez ovisnosti o Next.js-u, da se može uvesti i u worker.ts.
 */

const DAY_MS = 86_400_000;

export const isoDay = (ts: number) => new Date(ts).toISOString().slice(0, 10);

/** Ponovno izračunaj zbirne podatke za zadani dan (idempotentno). */
export async function rollupDay(db: D1Database, day: string) {
  await db.batch([
    db.prepare(`DELETE FROM daily_section_stats WHERE day = ?1`).bind(day),
    db
      .prepare(
        `INSERT INTO daily_section_stats (day, path, section, views, total_seconds, clicks, cta_clicks)
         SELECT ?1, path, section,
                SUM(CASE WHEN type = 'section_view' THEN 1 ELSE 0 END),
                SUM(CASE WHEN type = 'section_view' THEN value ELSE 0 END),
                SUM(CASE WHEN type = 'click' THEN 1 ELSE 0 END),
                SUM(CASE WHEN type = 'cta_click' THEN 1 ELSE 0 END)
         FROM events
         WHERE day = ?1 AND section IS NOT NULL AND type IN ('section_view', 'click', 'cta_click')
         GROUP BY path, section`,
      )
      .bind(day),
    db.prepare(`DELETE FROM daily_kpi WHERE day = ?1`).bind(day),
    db
      .prepare(
        `INSERT INTO daily_kpi (day, metric, dim, value)
         SELECT ?1, 'sessions', '', COUNT(DISTINCT sid) FROM events WHERE day = ?1
         UNION ALL
         SELECT ?1, 'page_views', '', COUNT(*) FROM events WHERE day = ?1 AND type = 'page_view'
         UNION ALL
         SELECT ?1, 'sessions_by_device', device, COUNT(DISTINCT sid) FROM events WHERE day = ?1 AND device IS NOT NULL GROUP BY device
         UNION ALL
         SELECT ?1, 'events', type, COUNT(*) FROM events WHERE day = ?1 GROUP BY type
         UNION ALL
         SELECT ?1, 'contact_submit_sessions', '', COUNT(DISTINCT sid) FROM events WHERE day = ?1 AND type = 'form_submit' AND label = 'kontakt'`,
      )
      .bind(day),
    db
      .prepare(
        `INSERT INTO daily_kpi (day, metric, dim, value)
         SELECT ?1, 'engaged_sessions', '', COUNT(*) FROM (
           SELECT sid FROM events WHERE day = ?1 GROUP BY sid
           HAVING SUM(CASE WHEN type = 'section_view' THEN value ELSE 0 END) >= 10
               OR COUNT(DISTINCT CASE WHEN type = 'section_view' THEN section END) >= 2
               OR SUM(CASE WHEN type = 'click' THEN 1 ELSE 0 END) >= 1
         )`,
      )
      .bind(day),
    db
      .prepare(
        `INSERT INTO daily_kpi (day, metric, dim, value)
         SELECT ?1, 'leads', source, COUNT(*) FROM leads WHERE day = ?1 GROUP BY source`,
      )
      .bind(day),
  ]);
}

export async function runDailyMaintenance(db: D1Database, retentionDays: number, now = Date.now()) {
  // zadnja 3 dana (događaji iz sendBeacona mogu kasniti)
  for (let i = 1; i <= 3; i++) await rollupDay(db, isoDay(now - i * DAY_MS));

  const days = Number.isFinite(retentionDays) && retentionDays > 30 ? retentionDays : 395;
  const cutoff = isoDay(now - days * DAY_MS);
  const res = await db.prepare(`DELETE FROM events WHERE day < ?1`).bind(cutoff).run();
  await db
    .prepare(`DELETE FROM newsletter_consents WHERE status = 'pending' AND created_at < ?1`)
    .bind(now - 30 * DAY_MS)
    .run();
  return { cutoff, deleted: res.meta.changes ?? 0 };
}
