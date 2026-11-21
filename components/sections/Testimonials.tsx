import Image from "next/image";
import { getDict } from "@/content";
import { anchors, type Locale } from "@/content/routes";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Prikazuje se samo stvarno. Dok nema izjava, sekcija poziva prve objekte —
 * bez izmišljenih imena, citata ili logotipa.
 */
export function Testimonials({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const t = d.home.testimonials;
  const { testimonials, partnerLogos } = d;
  if (testimonials.length === 0) {
    return (
      <section data-section="iskustva-korisnika" aria-labelledby="iskustva-korisnika" className="surface-light bg-white py-24 text-ink sm:py-28">
        <div className="container-page">
          <Reveal className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-mist p-8 sm:p-12 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 id="iskustva-korisnika" className="text-h3 font-semibold">{t.emptyTitle}</h2>
              <p className="mt-3 leading-relaxed text-slate">{t.emptyText}</p>
            </div>
            <ButtonLink href={`#${anchors[locale].contact}`} variant="primary-dark" size="lg" className="shrink-0" data-track="iskustva-cta-demo">{t.emptyCta}</ButtonLink>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section data-section="iskustva-korisnika" aria-labelledby="iskustva-korisnika" className="surface-light bg-white py-24 text-ink sm:py-32">
      <div className="container-page">
        <SectionHeading id="iskustva-korisnika" tone="light" title={t.title} />
        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((q) => (
            <Reveal as="li" key={q.name + q.venue}>
              <figure className="h-full rounded-[2rem] bg-mist p-8">
                <blockquote className="text-xl leading-snug tracking-[-0.01em]">{t.quote(q.quote)}</blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-medium">{q.name}</span>
                  <span className="text-slate">, {q.role}, {q.venue}</span>
                  <span className="sr-only"> ({t.kind[q.kind]})</span>
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
