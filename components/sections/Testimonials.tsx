import Image from "next/image";
import { partnerLogos, testimonials } from "@/content/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const kindLabel = { owner: "Vlasnik", manager: "Voditelj", partner: "Partner" } as const;

/**
 * Prikazuje se samo stvarno. Dok nema izjava, sekcija poziva prve objekte —
 * bez izmišljenih imena, citata ili logotipa.
 */
export function Testimonials() {
  if (testimonials.length === 0) {
    return (
      <section aria-labelledby="iskustva-korisnika" className="surface-light bg-white py-24 text-ink sm:py-28">
        <div className="container-page">
          <Reveal className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-mist p-8 sm:p-12 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 id="iskustva-korisnika" className="text-h3 font-semibold">Prvi objekti s Tavlom bit će predstavljeni ovdje.</h2>
              <p className="mt-3 leading-relaxed text-slate">Tražimo kafiće, restorane i barove koji žele uvesti Tavlu među prvima i pomoći nam da je oblikujemo prema stvarnim smjenama.</p>
            </div>
            <ButtonLink href="#kontakt" variant="primary-dark" size="lg" className="shrink-0">Javite nam se</ButtonLink>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="iskustva-korisnika" className="surface-light bg-white py-24 text-ink sm:py-32">
      <div className="container-page">
        <SectionHeading id="iskustva-korisnika" tone="light" title="Što kažu ugostitelji." />
        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <Reveal as="li" key={t.name + t.venue}>
              <figure className="h-full rounded-[2rem] bg-mist p-8">
                <blockquote className="text-xl leading-snug tracking-[-0.01em]">„{t.quote}”</blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-medium">{t.name}</span>
                  <span className="text-slate">, {t.role}, {t.venue}</span>
                  <span className="sr-only"> ({kindLabel[t.kind]})</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
        {partnerLogos.length > 0 && (
          <ul className="mt-14 flex flex-wrap items-center gap-10 opacity-70">
            {partnerLogos.map((l) => (
              <li key={l.name}>
                <Image src={l.src} alt={l.name} width={120} height={40} className="h-8 w-auto grayscale" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
