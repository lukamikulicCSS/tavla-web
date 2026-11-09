import type { Stat } from "@/content/stats";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Traka s brojkama. Brojke s izvorom dobivaju fusnotu, a izvori se ispisuju ispod —
 * posjetitelj uvijek vidi odakle je podatak.
 */
export function StatsBand({ stats, tone = "light", title }: { stats: Stat[]; tone?: "light" | "dark"; title?: string }) {
  const dark = tone === "dark";
  const sources = [...new Map(stats.filter((s) => s.source).map((s) => [s.source!.url, s.source!])).values()];
  const ref = (s: Stat) => (s.source ? sources.findIndex((x) => x.url === s.source!.url) + 1 : 0);

  return (
    <section aria-label={title ?? "Tavla u brojkama"} className={`${dark ? "bg-ink text-white" : "surface-light bg-white text-ink"} py-16 sm:py-20`}>
      <div className="container-page">
        {title && <h2 className="mb-10 max-w-xl text-h3 font-semibold">{title}</h2>}
        <dl className={`grid grid-cols-2 gap-x-6 gap-y-10 ${stats.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className={`border-t pt-5 ${dark ? "border-line-dark" : "border-line-light"}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="tabular block text-[clamp(2.5rem,1.6rem+3.2vw,4.25rem)] font-semibold leading-none tracking-[-0.045em]">
                  {s.value}
                  {ref(s) > 0 && (
                    <sup className={`ml-1 align-super text-[0.875rem] font-medium tracking-normal ${dark ? "text-electric-light" : "text-electric-dark"}`}>{ref(s)}</sup>
                  )}
                </span>
                <span className={`mt-3 block max-w-[16rem] text-[0.9375rem] leading-snug ${dark ? "text-soft" : "text-slate"}`}>{s.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
        {sources.length > 0 && (
          <ol className={`mt-10 space-y-1 text-xs ${dark ? "text-soft" : "text-slate"}`}>
            {sources.map((src, i) => (
              <li key={src.url}>
                <span className={dark ? "text-electric-light" : "text-electric-dark"}>{i + 1}</span>{" "}
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">{src.name}</a>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
