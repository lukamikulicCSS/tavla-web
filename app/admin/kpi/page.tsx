import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { verifyAccess } from "@/lib/server/access";
import { getDb } from "@/lib/server/request";
import { loadFilters, loadKpi, makeRange } from "@/lib/server/kpi";
import { KpiDashboard } from "@/components/admin/KpiDashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "KPI",
  robots: { index: false, follow: false, nocache: true },
};

type SP = Promise<Record<string, string | string[] | undefined>>;
const pick = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);

/**
 * KPI ploča — samo za vlasnike Tavle.
 * Zaštita: Cloudflare Access ispred /admin/* + provjera potpisanog JWT-a ovdje. Bez njega: 404.
 */
export default async function KpiPage({ searchParams }: { searchParams: SP }) {
  const h = await headers();
  const email = await verifyAccess(h.get("cf-access-jwt-assertion"));
  if (!email) notFound();

  const sp = await searchParams;
  const days = [7, 30, 90].includes(Number(pick(sp.d))) ? Number(pick(sp.d)) : 30;
  const page = /^\/[a-z0-9/-]{0,80}$/.test(pick(sp.p) ?? "") ? pick(sp.p)! : "/";
  const section = /^[a-z0-9-]{1,40}$/.test(pick(sp.s) ?? "") ? pick(sp.s)! : page === "/" ? "hero" : "ai-hero";

  const db = await getDb();
  if (!db) {
    return (
      <main className="container-page py-24">
        <h1 className="text-h3 font-semibold">D1 baza nije povezana.</h1>
        <p className="mt-3 text-soft">Provjerite binding „DB” u wrangler.jsonc i da su migracije pokrenute.</p>
      </main>
    );
  }

  const range = makeRange(days);
  const [k, filters] = await Promise.all([loadKpi(db, range, page, section), loadFilters(db, range, page)]);

  return (
    <main id="sadrzaj" className="min-h-dvh bg-ink">
      <KpiDashboard k={k} email={email} f={{ days, page, section, pages: filters.pages, sections: filters.sections }} />
    </main>
  );
}
