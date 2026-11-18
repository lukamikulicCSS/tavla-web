import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { pillars, type AiPillar, type PillarSlug } from "@/content/ai";
import { Reveal } from "@/components/ui/Reveal";
import { StatusPill } from "@/components/ui/StatusBadge";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";

/** Podaci → prijedlog → vi odlučujete */
export function AiSteps({ steps }: { steps: [string, string, string] }) {
  const titles = ["Podaci", "Prijedlog", "Vi odlučujete"];
  return (
    <section data-section="ai-kako" aria-labelledby="kako-ai-naslov" className="py-20 sm:py-24">
      <Reveal>
        <h2 id="kako-ai-naslov" className="text-h3 font-semibold">Kako AI pomaže.</h2>
      </Reveal>
      <Reveal delay={0.1} as="div">
        <ol className="mt-10 grid gap-3 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={titles[i]} className={`rounded-[1.5rem] p-6 ${i === 2 ? "bg-white text-ink" : "bg-graphite"}`}>
              <span className={`tabular text-[0.8125rem] ${i === 2 ? "text-slate" : "text-soft"}`}>0{i + 1}</span>
              <p className="mt-6 flex items-center gap-2 text-lg font-semibold tracking-[-0.01em]">
                {i === 1 && <Sparkles className="size-4 text-[#7aa2ff]" aria-hidden />}
                {titles[i]}
              </p>
              <p className={`mt-2 text-[0.9375rem] leading-relaxed ${i === 2 ? "text-slate" : "text-soft"}`}>{s}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

export function RelatedPillars({ current }: { current: PillarSlug }) {
  const others = pillars.filter((p) => p.slug !== current);
  return (
    <section data-section="ai-povezano" aria-labelledby="povezano-naslov" className="py-20 sm:py-24">
      <Reveal>
        <h2 id="povezano-naslov" className="text-h3 font-semibold">Ostala područja Tavla AI.</h2>
      </Reveal>
      <ul className="mt-10 grid gap-3 md:grid-cols-3">
        {others.map((p) => (
          <li key={p.slug}>
            <PillarLinkCard pillar={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function PillarLinkCard({ pillar: p }: { pillar: AiPillar }) {
  return (
    <Link
      href={`/tavla-ai/${p.slug}`}
      data-track={`ai-related-${p.slug}`}
      className="group flex h-full flex-col rounded-[1.5rem] bg-graphite p-6 ring-1 ring-inset ring-white/[0.04] transition-colors hover:bg-graphite-2"
    >
      <span className="flex items-start justify-between gap-4 text-[0.8125rem] text-soft">
        {p.name}
        <ArrowUpRight className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </span>
      <span className="mt-4 text-lg font-semibold leading-snug tracking-[-0.01em]">{p.headline}</span>
      <span className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {p.features.slice(0, 3).map((f) => (
          <span key={f.id} className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-2.5 py-1 text-[0.75rem] text-white/75">
            {f.name}
            {f.status !== "live" && <span className={`size-1.5 rounded-full ${f.status === "soon" ? "bg-[#2f6bff]" : "bg-white/30"}`} aria-label={f.status === "soon" ? "Uskoro" : "U planu"} />}
          </span>
        ))}
      </span>
    </Link>
  );
}

/** "Budite prvi koji isprobaju …" */
export function NewsletterBlock({ source, interest, featureName }: { source: string; interest?: string; featureName: string }) {
  return (
    <section data-section="ai-novosti" aria-labelledby="novosti-blok-naslov" className="py-12">
      <Reveal className="relative isolate grid items-center gap-8 overflow-hidden rounded-[2rem] bg-white/[0.04] p-7 ring-1 ring-inset ring-white/[0.06] sm:p-10 lg:grid-cols-[1fr_1.1fr]">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-[radial-gradient(closest-side,rgb(47_107_255/0.22),transparent)]" />
        <div>
          <h2 id="novosti-blok-naslov" className="text-h3 font-semibold">Budite prvi koji isprobaju {featureName}.</h2>
          <p className="mt-3 max-w-md text-soft">Javit ćemo vam kad značajka stigne u objekte. Najviše jedan mail mjesečno.</p>
        </div>
        <NewsletterForm source={source} interest={interest} />
      </Reveal>
    </section>
  );
}

export function PillarFaq({ faq }: { faq: { q: string; a: string }[] }) {
  return (
    <section data-section="ai-faq" aria-labelledby="ai-faq-naslov" className="py-20 sm:py-24">
      <Reveal>
        <h2 id="ai-faq-naslov" className="text-h3 font-semibold">Česta pitanja.</h2>
      </Reveal>
      {/* Odgovori su uvijek u HTML-u (ne skrivaju se iza klika) — važno za tražilice i AI asistente */}
      <dl className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
        {faq.map((f) => (
          <div key={f.q} className="border-t border-line-dark pt-6">
            <dt className="text-lg font-semibold tracking-[-0.01em]">{f.q}</dt>
            <dd className="mt-2 text-[0.9375rem] leading-relaxed text-soft">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function FeatureStatusList({ pillar }: { pillar: AiPillar }) {
  return (
    <ul className="space-y-1">
      {pillar.features.map((f) => (
        <li key={f.id}>
          <Link
            href={`/tavla-ai/${pillar.slug}#${f.id}`}
            className="flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 text-[0.9375rem] text-white/85 transition-colors hover:bg-white/[0.05]"
          >
            <span className="flex items-center gap-2">
              {f.name}
              {f.ai && <Sparkles className="size-3.5 text-[#7aa2ff]" aria-label="AI" />}
            </span>
            {f.status === "live" ? <span className="text-[0.75rem] text-soft">Dostupno</span> : <StatusPill status={f.status} />}
          </Link>
        </li>
      ))}
    </ul>
  );
}
