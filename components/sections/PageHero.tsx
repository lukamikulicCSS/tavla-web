import type { ReactNode } from "react";

/** Kratko zaglavlje podstranice: naslov i jedna rečenica. */
export function PageHero({ eyebrow, title, lead, children }: { eyebrow?: ReactNode; title: string; lead?: string; children?: ReactNode }) {
  return (
    <section aria-labelledby="stranica-naslov" className="relative isolate overflow-hidden bg-ink pb-12 pt-32 sm:pb-16 sm:pt-40">
      <div aria-hidden className="stage-light absolute inset-x-0 -top-1/3 -z-10 h-full" />
      <div className="container-page">
        {eyebrow && <p className="hero-rise flex items-center text-[0.9375rem] font-medium text-soft">{eyebrow}</p>}
        <h1 id="stranica-naslov" className="hero-rise mt-3 max-w-4xl text-display font-semibold">{title}</h1>
        {lead && <p className="hero-rise mt-6 max-w-xl text-lead text-soft [animation-delay:100ms]">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
