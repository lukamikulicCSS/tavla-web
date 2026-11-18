import type { ReactNode } from "react";

/** Lagani grafovi za KPI ploču — čisti SVG/HTML, bez biblioteka, renderirano na serveru. */

export const fmt = (n: number, d = 0) => n.toLocaleString("hr-HR", { maximumFractionDigits: d, minimumFractionDigits: d });
export const pct = (a: number, b: number) => (b > 0 ? (a / b) * 100 : 0);

export function Card({ title, hint, children, className = "" }: { title: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-[1.5rem] bg-graphite p-5 ring-1 ring-inset ring-white/[0.04] sm:p-6 ${className}`}>
      <h2 className="text-[0.9375rem] font-medium">{title}</h2>
      {hint && <p className="mt-1 text-[0.8125rem] leading-snug text-soft">{hint}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function Empty({ children = "Još nema podataka za ovo razdoblje." }: { children?: ReactNode }) {
  return <p className="py-6 text-center text-[0.8125rem] text-soft">{children}</p>;
}

/** Brojka s usporedbom s prethodnim razdobljem */
export function Stat({ label, value, prev, unit = "", decimals = 0, primary = false }: { label: string; value: number; prev: number; unit?: string; decimals?: number; primary?: boolean }) {
  const diff = prev > 0 ? ((value - prev) / prev) * 100 : value > 0 ? 100 : 0;
  const up = diff > 0.05;
  const down = diff < -0.05;
  return (
    <div className={`rounded-[1.5rem] p-5 ring-1 ring-inset ${primary ? "bg-[#2f6bff]/[0.09] ring-[#2f6bff]/25" : "bg-graphite ring-white/[0.04]"}`}>
      <p className="text-[0.8125rem] text-soft">{label}</p>
      <p className="tabular mt-3 text-[2rem] font-semibold leading-none tracking-[-0.03em]">
        {fmt(value, decimals)}
        {unit && <span className="ml-0.5 text-lg text-soft">{unit}</span>}
      </p>
      <p className={`tabular mt-2 text-[0.75rem] ${up ? "text-[#34c759]" : down ? "text-[#ff8a80]" : "text-soft"}`}>
        {up ? "▲" : down ? "▼" : "•"} {fmt(Math.abs(diff), 0)} % · prije {fmt(prev, decimals)}
        {unit}
      </p>
    </div>
  );
}

export function BarList({ items, unit = "", max }: { items: { label: string; value: number; n?: number }[]; unit?: string; max?: number }) {
  if (!items.length) return <Empty />;
  const top = max ?? Math.max(...items.map((i) => i.value), 1);
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i.label} className="relative overflow-hidden rounded-lg">
          <span aria-hidden className="absolute inset-y-0 left-0 rounded-lg bg-white/[0.07]" style={{ width: `${Math.max(2, (i.value / top) * 100)}%` }} />
          <span className="relative flex items-center justify-between gap-3 px-3 py-2 text-[0.8125rem]">
            <span className="truncate">{i.label}</span>
            <span className="tabular shrink-0 text-white/80">
              {fmt(i.value, unit === " s" ? 1 : 0)}
              {unit}
              {i.n !== undefined && <span className="ml-2 text-soft">n={i.n}</span>}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Funnel({ steps }: { steps: { label: string; value: number }[] }) {
  const first = steps[0]?.value ?? 0;
  if (!first) return <Empty />;
  return (
    <ol className="space-y-3">
      {steps.map((s, i) => {
        const prev = i ? steps[i - 1].value : s.value;
        return (
          <li key={s.label}>
            <p className="flex justify-between text-[0.8125rem]">
              <span>{s.label}</span>
              <span className="tabular">
                {fmt(s.value)} <span className="text-soft">· {fmt(pct(s.value, first), 1)} %</span>
              </span>
            </p>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full bg-[#2f6bff]" style={{ width: `${pct(s.value, first)}%` }} />
            </div>
            {i > 0 && prev > 0 && <p className="mt-1 text-[0.75rem] text-soft">Odustalo {fmt(100 - pct(s.value, prev), 1)} % od prethodnog koraka</p>}
          </li>
        );
      })}
    </ol>
  );
}

export function Trend({ points }: { points: { day: string; value: number }[] }) {
  if (!points.length) return <Empty />;
  const w = 600;
  const h = 140;
  const max = Math.max(...points.map((p) => p.value), 1);
  const step = points.length > 1 ? w / (points.length - 1) : w;
  const xy = points.map((p, i) => [i * step, h - (p.value / max) * (h - 12) - 4] as const);
  const line = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-36 w-full" preserveAspectRatio="none" role="img" aria-label="Sesije po danu">
        <path d={`${line} L${w},${h} L0,${h} Z`} className="fill-[#2f6bff]/15" />
        <path d={line} className="fill-none stroke-[#7aa2ff]" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <p className="tabular mt-2 flex justify-between text-[0.75rem] text-soft">
        <span>{points[0].day}</span>
        <span>najviše {fmt(max)} / dan</span>
        <span>{points[points.length - 1].day}</span>
      </p>
    </div>
  );
}

/** Toplinska karta klikova: skica sekcije (pravokutnik) s točkama na normaliziranim koordinatama. */
export function Heatmap({ points }: { points: { x: number; y: number; cta: boolean }[] }) {
  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-ink ring-1 ring-inset ring-white/10">
        {/* skica sekcije */}
        <div aria-hidden className="absolute inset-[8%] rounded-lg border border-dashed border-white/10" />
        <div aria-hidden className="absolute left-[8%] top-[12%] h-[6%] w-[40%] rounded bg-white/[0.04]" />
        <div aria-hidden className="absolute left-[8%] top-[22%] h-[3%] w-[30%] rounded bg-white/[0.03]" />
        {points.map((p, i) => (
          <span
            key={i}
            className={`absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[2px] ${p.cta ? "bg-[#2f6bff]/60" : "bg-[#ff9f0a]/45"}`}
            style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
          />
        ))}
        {!points.length && <p className="absolute inset-0 grid place-items-center text-[0.8125rem] text-soft">Nema klikova u ovoj sekciji.</p>}
      </div>
      <p className="mt-2 flex gap-4 text-[0.75rem] text-soft">
        <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-[#2f6bff]" /> CTA</span>
        <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-[#ff9f0a]" /> ostali klikovi</span>
        <span className="tabular ml-auto">{fmt(points.length)} klikova</span>
      </p>
    </div>
  );
}
