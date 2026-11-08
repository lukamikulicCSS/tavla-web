"use client";

import { m } from "framer-motion";
import { demoHourly, demoTopItems, formatEur } from "@/content/demo-data";
import { itemById, lineCount, lineTotal, useDemo } from "./demo-store";

// Demo osnovica za "danas" — izmišljene brojke, uvijek označene kao demo.
const BASE_REVENUE = demoHourly.reduce((s, h) => s + h.v, 0);
const BASE_ORDERS = 186;
const TABLES = 12;

export function OwnerDashboard() {
  const demo = useDemo();
  const mine = demo.orders.filter((o) => o.mine);
  const revenue = BASE_REVENUE + mine.reduce((s, o) => s + lineTotal(o.items), 0);
  const orders = BASE_ORDERS + mine.length;
  const avg = revenue / orders;
  const activeTables = new Set(demo.orders.filter((o) => o.status !== "served").map((o) => o.table));
  const max = Math.max(...demoHourly.map((h) => h.v));

  const top = demoTopItems
    .map((t) => ({ ...t, qty: t.qty + mine.reduce((s, o) => s + (o.items.find((l) => l.id === t.id)?.qty ?? 0), 0) }))
    .sort((a, b) => b.qty - a.qty);
  const topMax = top[0]?.qty ?? 1;

  const kpis = [
    { label: "Promet danas", value: formatEur(revenue) },
    { label: "Narudžbe", value: String(orders) },
    { label: "Prosječna narudžba", value: formatEur(avg) },
    { label: "Aktivni stolovi", value: `${activeTables.size} / ${TABLES}` },
  ];

  return (
    <div className="p-4 text-sm @2xl:p-7">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs text-slate">Pregled</p>
          <p className="text-xl font-semibold tracking-[-0.025em]">Danas</p>
        </div>
        <span className="rounded-full bg-mist px-3 py-1 text-xs text-slate">Demo podaci</span>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-2.5 @xl:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl bg-mist p-3.5">
            <dt className="text-xs text-slate">{k.label}</dt>
            <dd className="tabular mt-1 text-lg font-semibold tracking-[-0.02em] @3xl:text-2xl">{k.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 grid gap-3 @xl:grid-cols-[1.6fr_1fr]">
        {/* Promet po satu */}
        <figure className="rounded-2xl border border-line-light p-4">
          <figcaption className="flex items-baseline justify-between">
            <span className="font-medium">Promet po satu</span>
            <span className="text-xs text-slate">EUR</span>
          </figcaption>
          <div className="mt-4 flex h-36 items-end gap-1.5" role="img" aria-label="Stupčasti graf prometa po satu, najviše oko 18 sati">
            {demoHourly.map((h, i) => (
              <div key={h.h} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <m.span
                  className={`block w-full rounded-[5px] ${h.v === max ? "bg-ink" : "bg-ink/15"}`}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(h.v / max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="tabular text-[0.625rem] text-slate">{h.h}</span>
              </div>
            ))}
          </div>
        </figure>

        {/* Najprodavanije */}
        <div className="rounded-2xl border border-line-light p-4">
          <p className="font-medium">Najprodavanije</p>
          <ol className="mt-3 space-y-3">
            {top.map((t) => (
              <li key={t.id}>
                <div className="flex justify-between text-[0.8125rem]">
                  <span className="truncate">{itemById(t.id).name}</span>
                  <span className="tabular text-slate">{t.qty}</span>
                </div>
                <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
                  <m.span
                    className="block h-full rounded-full bg-ink"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(t.qty / topMax) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Stolovi */}
      <div className="mt-3 rounded-2xl border border-line-light p-4">
        <div className="flex items-baseline justify-between">
          <p className="font-medium">Stolovi</p>
          <p className="flex gap-3 text-xs text-slate">
            <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-ink" />aktivan</span>
            <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-ink/15" />slobodan</span>
          </p>
        </div>
        <ul className="mt-3 grid grid-cols-6 gap-1.5 @md:grid-cols-12">
          {Array.from({ length: TABLES }, (_, i) => i + 1).map((t) => {
            const active = activeTables.has(t);
            return (
              <li
                key={t}
                className={`tabular grid aspect-square place-items-center rounded-lg text-xs font-medium transition-colors duration-500 ${
                  active ? "bg-ink text-white" : "bg-mist text-slate"
                }`}
                aria-label={`Stol ${t}, ${active ? "aktivan" : "slobodan"}`}
              >
                {t}
              </li>
            );
          })}
        </ul>
      </div>
      <p className="mt-3 text-xs text-slate">Narudžbe koje pošaljete kao gost u demou dodaju se ovim brojkama. {lineCount(demo.cart) > 0 && "U košarici imate neposlane artikle."}</p>
    </div>
  );
}
