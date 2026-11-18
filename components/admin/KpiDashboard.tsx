import Link from "next/link";
import type { Kpi } from "@/lib/server/kpi";
import { BarList, Card, Empty, Funnel, Heatmap, Stat, Trend, fmt, pct } from "./Charts";
import { Phase2 } from "./Phase2";

type Filters = { days: number; page: string; section: string; pages: string[]; sections: string[] };

const venue: Record<string, string> = { kafic: "Kafić", restoran: "Restoran", bar: "Bar", "beach-bar": "Beach bar", "nocni-klub": "Noćni klub", hotel: "Hotel", ostalo: "Ostalo" };

export function KpiDashboard({ k, f, email }: { k: Kpi; f: Filters; email: string }) {
  const q = (o: Partial<{ d: number; p: string; s: string }>) => {
    const sp = new URLSearchParams({ d: String(o.d ?? f.days), p: o.p ?? f.page, s: o.s ?? f.section });
    return `/admin/kpi?${sp}`;
  };
  const conv = pct(k.cur.converted, k.cur.sessions);
  const convPrev = pct(k.prev.converted, k.prev.sessions);
  const engaged = pct(k.cur.engaged, k.cur.sessions);
  const engagedPrev = pct(k.prev.engaged, k.prev.sessions);
  const totalDevices = k.devices.reduce((s, d) => s + d.value, 0);

  return (
    <div className="container-page pb-24 pt-10">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.8125rem] text-soft">Tavla · interno · {email}</p>
          <h1 className="mt-2 text-h2 font-semibold">KPI stranice</h1>
        </div>
        <nav aria-label="Razdoblje" className="glass inline-flex self-start rounded-full p-1">
          {[7, 30, 90].map((d) => (
            <Link key={d} href={q({ d })} aria-current={f.days === d ? "page" : undefined} className={`rounded-full px-4 py-2 text-[0.875rem] ${f.days === d ? "bg-white text-ink" : "text-white/70 hover:text-white"}`}>
              {d} dana
            </Link>
          ))}
        </nav>
      </header>

      <p className="mt-6 max-w-3xl rounded-2xl bg-white/[0.04] p-4 text-[0.8125rem] leading-relaxed text-soft">
        Događaji postoje samo za posjetitelje koji su pristali na analitiku, pa su stope izračunate na toj skupini. Upiti (desno dolje) su potpuni.
        Ukupan promet bez pristanka i Core Web Vitals:{" "}
        <a href="https://dash.cloudflare.com/?to=/:account/web-analytics" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4">Cloudflare Web Analytics</a>.
      </p>

      <h2 className="mt-12 text-lg font-semibold">Konverzija</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Stat primary label="Posjet → zatražen demo" value={conv} prev={convPrev} unit=" %" decimals={2} />
        <Stat label="Upiti za demo" value={k.cur.leads} prev={k.prev.leads} />
        <Stat label="Sesije" value={k.cur.sessions} prev={k.prev.sessions} />
        <Stat label="Angažirane sesije" value={engaged} prev={engagedPrev} unit=" %" decimals={1} />
        <Stat label="Newsletter potvrđeno" value={k.cur.nlConfirmed} prev={k.prev.nlConfirmed} />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <Card title="Lijevak kontakt forme" hint="Pogled na formu → početak ispunjavanja → poslano">
          <Funnel steps={k.form} />
          <p className="mt-5 text-[0.8125rem] font-medium">Polja s najviše grešaka</p>
          <div className="mt-2"><BarList items={k.errorFields} /></div>
        </Card>
        <Card title="Klikovi na CTA po sekciji" hint="Koja sekcija najviše vodi prema upitu">
          <BarList items={k.cta} />
        </Card>
        <Card title="Upiti po izvoru" hint="Iz tablice upita; „nepoznato” = bez pristanka na analitiku">
          <BarList items={k.leadsBySource} />
          <p className="mt-5 text-[0.8125rem] text-soft">
            Newsletter: {fmt(k.cur.nlNew)} prijava, {fmt(k.cur.nlConfirmed)} potvrđeno ({fmt(pct(k.cur.nlConfirmed, k.cur.nlNew), 0)} % potvrde)
          </p>
        </Card>
      </div>

      <h2 className="mt-12 text-lg font-semibold">Promet i izvori</h2>
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <Card title="Sesije po danu" className="lg:col-span-2"><Trend points={k.daily} /></Card>
        <Card title="Uređaji">
          <BarList items={k.devices.map((d) => ({ label: `${d.label} · ${fmt(pct(d.value, totalDevices), 0)} %`, value: d.value }))} />
        </Card>
        <Card title="Izvori prometa"><BarList items={k.sources} /></Card>
        <Card title="UTM kampanje"><BarList items={k.campaigns} /></Card>
        <Card title="Najposjećenije stranice"><BarList items={k.pages} /></Card>
      </div>

      <h2 className="mt-12 text-lg font-semibold">Angažman</h2>
      <nav aria-label="Stranica" className="mt-4 flex flex-wrap gap-1.5">
        {(f.pages.length ? f.pages : [f.page]).map((p) => (
          <Link key={p} href={q({ p, s: p === "/" ? "hero" : "ai-hero" })} className={`rounded-full px-3 py-1.5 text-[0.8125rem] ${f.page === p ? "bg-white text-ink" : "bg-white/[0.06] text-white/75 hover:text-white"}`}>
            {p}
          </Link>
        ))}
      </nav>
      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <Card title="Prosječno zadržavanje po sekciji" hint="Sekunde dok je sekcija ≥ 50 % vidljiva, redom kao na stranici" className="lg:col-span-2">
          <BarList items={k.dwell} unit=" s" />
        </Card>
        <Card title="Dubina skrolanja" hint="Udio sesija na ovoj stranici koje dođu do praga">
          {k.scroll[0].of ? <BarList items={k.scroll.map((s) => ({ label: s.label, value: Math.round(pct(s.value, s.of)) }))} unit=" %" max={100} /> : <Empty />}
        </Card>
        <Card title="Toplinska karta klikova" className="lg:col-span-2">
          <nav aria-label="Sekcija" className="mb-4 flex flex-wrap gap-1.5">
            {f.sections.map((s) => (
              <Link key={s} href={q({ s })} className={`rounded-full px-2.5 py-1 text-[0.75rem] ${f.section === s ? "bg-[#2f6bff] text-white" : "bg-white/[0.06] text-white/70 hover:text-white"}`}>
                {s}
              </Link>
            ))}
          </nav>
          <Heatmap points={k.clicks} />
        </Card>
        <Card title="Najkliknutiji elementi" hint="Top 10 po data-track">
          <BarList items={k.topTargets} />
        </Card>
        <Card title="Interaktivni demo" hint="Pokrenuto → dodano u košaricu → poslana narudžba">
          <Funnel steps={k.demo} />
        </Card>
      </div>

      <h2 className="mt-12 text-lg font-semibold">Zadnji upiti</h2>
      <div className="mt-4 overflow-x-auto rounded-[1.5rem] bg-graphite ring-1 ring-inset ring-white/[0.04]">
        {k.recentLeads.length ? (
          <table className="w-full min-w-[40rem] text-left text-[0.8125rem]">
            <thead className="text-soft">
              <tr>{["Datum", "Ime", "Objekt", "Vrsta", "Izvor", "Newsletter"].map((h) => <th key={h} className="px-5 py-3 font-medium">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {k.recentLeads.map((l) => (
                <tr key={l.created_at}>
                  <td className="tabular px-5 py-3 text-soft">{new Date(l.created_at).toLocaleDateString("hr-HR")}</td>
                  <td className="px-5 py-3">{l.name}</td>
                  <td className="px-5 py-3">{l.business}</td>
                  <td className="px-5 py-3">{venue[l.venue_type] ?? l.venue_type}</td>
                  <td className="px-5 py-3">{l.source}</td>
                  <td className="px-5 py-3">{l.newsletter ? "da" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Empty>Još nema upita.</Empty>
        )}
      </div>

      <h2 className="mt-12 text-lg font-semibold">Poslovanje Tavle</h2>
      <p className="mt-1 text-[0.8125rem] text-soft">Struktura za fazu 2. Vrijednosti se popunjavaju ručno ili iz baze aplikacije.</p>
      <div className="mt-4"><Phase2 /></div>
    </div>
  );
}
