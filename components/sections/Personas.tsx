import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { photos } from "@/content/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PersonaVisual, type Persona } from "@/components/product/PersonaVisual";

const cards: { persona: Persona; href: string; who: string; title: string }[] = [
  { persona: "gosti", href: "/rjesenja/gosti", who: "Za goste", title: "Naruči kad si spreman." },
  { persona: "osoblje", href: "/rjesenja/osoblje", who: "Za osoblje", title: "Narudžba stiže sama." },
  { persona: "vlasnici", href: "/rjesenja/vlasnici", who: "Za vlasnike", title: "Cijeli objekt na jednom ekranu." },
];

/** Tri uloge kao kartice koje vode na vlastite stranice (umjesto dugog teksta na početnoj). */
export function Personas() {
  return (
    <section id="rjesenja" aria-labelledby="uloge-naslov" className="bg-ink py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="uloge-naslov" title="Jedan stol. Tri iskustva." lead="Gost, osoblje i vlasnik vide istu narudžbu, svatko iz svoje perspektive." />
        <ul className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0">
          {cards.map((c, i) => (
            <Reveal as="li" key={c.href} delay={i * 0.06} className="w-[82%] shrink-0 snap-start md:w-auto">
              <Link href={c.href} className="group relative flex h-[26rem] flex-col md:h-[30rem] overflow-hidden rounded-[2rem] bg-graphite p-6 transition-colors duration-500 hover:bg-graphite-2 sm:p-7">
                <p className="text-[0.9375rem] text-soft">{c.who}</p>
                <h3 className="mt-2 max-w-[15rem] text-h3 font-semibold">{c.title}</h3>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-electric-light">
                  Saznajte više <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                </span>
                {/* Isječak sučelja izlazi preko donjeg ruba kartice */}
                <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-0 top-[13.5rem] transition-transform duration-700 ease-[var(--ease-apple)] group-hover:-translate-y-2 ${c.persona === "gosti" ? "" : "left-7"}`} inert>
                  {photos[c.persona].src ? <PersonaVisual persona={c.persona} photo={photos[c.persona]} variant="card" /> : <PersonaVisual persona={c.persona} variant="card" />}
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
