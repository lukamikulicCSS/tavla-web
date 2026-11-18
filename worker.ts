/**
 * Ulazna točka Workera: OpenNext obrađuje HTTP zahtjeve, a ovdje dodajemo
 * Cron Trigger (vidi "triggers" u wrangler.jsonc) za dnevnu obradu analitike.
 * https://opennext.js.org/cloudflare/howtos/custom-worker
 */
// @ts-ignore — .open-next/worker.js nastaje tek pri `opennextjs-cloudflare build`
import { default as handler } from "./.open-next/worker.js";
import { runDailyMaintenance } from "./lib/server/retention";

export default {
  fetch: handler.fetch,

  async scheduled(_controller, env, ctx) {
    if (!env.DB) return;
    ctx.waitUntil(
      runDailyMaintenance(env.DB, Number(env.ANALYTICS_RETENTION_DAYS)).then((r) =>
        console.log(`[cron] analitika: obrisano ${r.deleted} događaja starijih od ${r.cutoff}`),
      ),
    );
  },
} satisfies ExportedHandler<CloudflareEnv>;
