import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Feature } from "@/content/features";
import type { Photo } from "@/content/images";
import type { Stat } from "@/content/stats";
import { solutions } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SoonBadge } from "@/components/ui/StatusBadge";
import { PersonaVisual, type Persona } from "@/components/product/PersonaVisual";
import { StatsBand } from "./StatsBand";

/** Predložak stranice jedne uloge (gosti / osoblje / vlasnici). */
export function PersonaPage({
  persona,
  who,
  title,
  lead,
  features,
  stats,
  photo,
  href,
}: {
  persona: Persona;
  who: string;
  title: string;
  lead: string;
  features: Feature[];
  stats?: Stat[];
  photo: Photo;
  href: string;
}) {
  const others = solutions.filter((s) => s.href !== href);
  const wide = persona !== "gosti";

  return (
    <>
      <section aria-labelledby="persona-naslov" className="relative isolate overflow-hidden bg-ink pb-16 pt-32 sm:pt-40">
        <div aria-hidden className="stage-light absolute inset-x-0 top-1/3 -z-10 h-[60%]" />
        <div className={`container-page grid items-center gap-14 ${wide ? "" : "lg:grid-cols-[1fr_1fr]"}`}>
          <div className={wide ? "max-w-3xl" : ""}>
            <p className="hero-rise text-[0.9375rem] font-medium text-soft">{who}</p>
            <h1 id="persona-naslov" className="hero-rise mt-3 text-display font-semibold">{title}</h1>
            <p className="hero-rise mt-6 max-w-xl text-lead text-soft [animation-delay:100ms]">{lead}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/kontakt" size="lg">Zatraži demonstraciju</ButtonLink>
              <ButtonLink href="/kako-funkcionira#demo" size="lg" variant="secondary">Isprobaj demo</ButtonLink>
            </div>
          </div>
          <Reveal delay={0.1} className="relative">
            <PersonaVisual persona={persona} photo={photo} priority />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="znacajke-naslov" className="surface-light bg-white py-20 text-ink sm:py-28">
        <div className="container-page">
          <h2 id="znacajke-naslov" className="max-w-2xl text-h2 font-semibold">Što dobivate</h2>
          <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal as="li" key={f.id} delay={(i % 3) * 0.05} className="border-t border-line-light pt-5">
                <h3 className="text-lg font-semibold tracking-[-0.015em]">
                  {f.title}
                  <SoonBadge status={f.status} tone="light" />
                </h3>
                <p className="mt-1.5 leading-relaxed text-slate">{f.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {stats && stats.length > 0 && <StatsBand stats={stats} tone="light" />}

      <nav aria-label="Ostala rješenja" className="bg-ink pt-20 sm:pt-24">
        <div className="container-page">
          <h2 className="text-h3 font-semibold">Pogledajte i</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {others.map((o) => (
              <li key={o.href}>
                <Link href={o.href} className="group flex h-full items-center justify-between gap-4 rounded-[1.5rem] bg-graphite p-5 transition-colors hover:bg-graphite-2">
                  <span>
                    <span className="block font-semibold">{o.label}</span>
                    <span className="mt-0.5 block text-sm text-soft">{o.text}</span>
                  </span>
                  <ChevronRight className="size-5 shrink-0 text-electric-light transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
