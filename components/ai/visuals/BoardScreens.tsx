"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Bell, Receipt, Sparkles } from "lucide-react";
import { useLiveLoop } from "../useLiveLoop";
import { useDict } from "@/components/i18n/LocaleProvider";

/** Prikazi za osoblje (tablet) i vlasnika (preglednik). Svi podaci su primjeri (tekst: content/{hr,en}/ui.ts → aiVisuals). */

export function StaffScreen() {
  const { ref, tick } = useLiveLoop<HTMLDivElement>(6000);
  const d = useDict();
  const s = d.ui.aiVisuals.staffScreen;
  const p = d.ui.product;
  const ORDERS = s.orders;
  // nova narudžba stigne svakih 6 s
  const incoming = [0, 1, 2].map((i) => ({ ...ORDERS[(tick + i) % ORDERS.length], key: tick + i })).reverse();
  return (
    <div ref={ref} className="grid h-full grid-cols-2 gap-3 p-4 text-[0.8125rem] @lg:grid-cols-[1fr_1fr_0.9fr]">
      <Column title={s.newCol} count={incoming.length}>
        <AnimatePresence initial={false}>
          {incoming.map((o, i) => (
            <m.div
              key={o.key}
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-xl p-3 ${i === 0 ? "bg-white/[0.12] ring-1 ring-white/30" : "bg-white/[0.06]"}`}
            >
              <p className="flex justify-between font-semibold">
                <span>{p.table} {o.t}</span>
                <span className="text-soft">{i === 0 ? p.staff.justNow : p.staff.minAgo(i * 2)}</span>
              </p>
              <p className="mt-1 text-white/70">{o.items}</p>
            </m.div>
          ))}
        </AnimatePresence>
      </Column>
      <Column title={s.preparingCol} count={2}>
        {s.preparing.map((t) => (
          <div key={t} className="rounded-xl bg-white/[0.06] p-3 text-white/70">{t}</div>
        ))}
      </Column>
      <div className="hidden space-y-2 @lg:block">
        <p className="px-1 font-medium text-soft">{s.requests}</p>
        <p className="flex items-center gap-2 rounded-xl bg-[#ff9f0a]/15 p-3 text-[#ffc46b]">
          <Bell className="size-3.5" aria-hidden /> {s.callsWaiter}
        </p>
        <p className="flex items-center gap-2 rounded-xl bg-white/[0.06] p-3 text-white/70">
          <Receipt className="size-3.5" aria-hidden /> {s.asksBill}
        </p>
      </div>
    </div>
  );
}

function Column({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="flex items-center justify-between px-1 font-medium text-soft">
        {title} <span className="tabular">{count}</span>
      </p>
      {children}
    </div>
  );
}

export function PosScreen() {
  const { ref, tick } = useLiveLoop<HTMLDivElement>(2000);
  const d = useDict();
  const pos = d.ui.aiVisuals.pos;
  const lines = pos.lines;
  const shown = (tick % (lines.length + 2)) + 1;
  return (
    <div ref={ref} className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-3 p-5 text-[0.8125rem]">
      <div className="rounded-2xl bg-white/[0.08] p-4">
        <p className="font-semibold">Tavla · {d.ui.product.table} 7</p>
        <ul className="mt-2 space-y-1 text-white/70">
          {lines.map((l) => <li key={l}>{l}</li>)}
        </ul>
      </div>
      <ArrowRight className="size-5 text-[#7aa2ff]" aria-hidden />
      <div className="rounded-2xl bg-white p-4 font-mono text-[0.75rem] text-ink">
        <p className="font-sans font-semibold">{pos.register}</p>
        <ul className="mt-2 min-h-[4.5rem] space-y-1">
          {lines.slice(0, Math.min(shown, lines.length)).map((l) => (
            <m.li key={l} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}>{l}</m.li>
          ))}
        </ul>
        <p className="mt-2 border-t border-ink/10 pt-2 font-sans text-[0.6875rem] text-slate">{pos.auto}</p>
      </div>
    </div>
  );
}

export function InsightsScreen() {
  const { ref, tick } = useLiveLoop<HTMLDivElement>(4000);
  const s = useDict().ui.aiVisuals.insights;
  const insights = s.items;
  const active = tick % insights.length;
  return (
    <div ref={ref} className="p-5 text-ink sm:p-6">
      <p className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-[#1f4fd8]">
        <Sparkles className="size-3.5" aria-hidden /> {s.weekly}
      </p>
      <p className="mt-1 text-lg font-semibold tracking-[-0.02em]">{s.week}</p>
      <ul className="mt-4 space-y-2">
        {insights.map((it, i) => (
          <li key={it.t} className={`rounded-2xl p-3.5 text-[0.875rem] transition-colors duration-500 ${i === active ? "bg-[#2f6bff]/[0.07] ring-1 ring-[#2f6bff]/25" : "bg-mist"}`}>
            <p>{it.t}</p>
            <p className="mt-2 flex items-center justify-between text-[0.8125rem]">
              <span className="font-medium">{it.a}</span>
              <span className="flex gap-1.5">
                <span className="rounded-full bg-ink px-2.5 py-1 text-[0.6875rem] font-medium text-white">{s.approve}</span>
                <span className="rounded-full bg-ink/[0.06] px-2.5 py-1 text-[0.6875rem] text-slate">{s.skip}</span>
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AnalyticsScreen() {
  const { ref, tick } = useLiveLoop<HTMLDivElement>(3500);
  const s = useDict().ui.aiVisuals.analytics;
  const base = [18, 24, 30, 44, 62, 55, 48, 70, 86, 78, 64, 40];
  const bars = base.map((v, i) => Math.max(10, Math.min(100, v + (((tick + i) * 7) % 11) - 5)));
  return (
    <div ref={ref} className="grid gap-4 p-5 text-ink sm:p-6 @md:grid-cols-[1.4fr_1fr]">
      <div>
        <p className="text-[0.75rem] text-slate">{s.title}</p>
        <svg viewBox="0 0 240 110" className="mt-3 w-full" role="img" aria-label={s.chartAria}>
          {bars.map((h, i) => (
            <rect key={i} x={i * 20 + 3} width="14" rx="3" y={105 - h} height={h} className="fill-ink/80 transition-all duration-700" />
          ))}
          <line x1="0" x2="240" y1="105.5" y2="105.5" className="stroke-ink/10" />
        </svg>
        <p className="mt-1 flex justify-between text-[0.6875rem] text-slate tabular">
          {s.hours.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </p>
      </div>
      <div>
        <p className="text-[0.75rem] text-slate">{s.top}</p>
        <ol className="mt-3 space-y-2 text-[0.875rem]">
          {s.topItems.map((n, i) => (
            <li key={n} className="flex items-center gap-2">
              <span className="tabular w-4 text-slate">{i + 1}</span>
              <span className="flex-1 truncate">{n}</span>
              <span className="h-1.5 rounded-full bg-ink/70" style={{ width: `${(4 - i) * 12}px` }} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
