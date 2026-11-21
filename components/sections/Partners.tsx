import Image from "next/image";
import { getDict } from "@/content";
import { anchors, type Locale } from "@/content/routes";
import { Reveal } from "@/components/ui/Reveal";

/** Sekcija "Partneri": logotipi partnera u kvadratnim karticama, centrirano (naziv je skriven, za čitače ekrana i SEO). */
export function Partners({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const t = d.home.partners;
  const partners = d.partners;
  if (partners.length === 0) return null;

  return (
    <section id={anchors[locale].partners} aria-labelledby="partneri-naslov" className="bg-ink py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <h2 id="partneri-naslov" className="text-center text-h2 font-semibold">
            {t.title}
          </h2>
        </Reveal>

        <ul className="mt-10 flex flex-wrap justify-center gap-3 sm:mt-12 sm:gap-5">
          {partners.map((p) => {
            const card = (
              <div className="relative isolate grid aspect-square w-[10.25rem] place-items-center overflow-hidden rounded-[1.75rem] bg-graphite ring-1 ring-inset ring-white/[0.07] transition-[box-shadow,transform] duration-500 ease-[var(--ease-apple)] group-hover:-translate-y-0.5 group-hover:ring-white/[0.14] sm:w-60">
                {/* blagi sjaj u boji partnera */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10"
                  style={{ background: `radial-gradient(60% 60% at 50% 40%, rgb(${p.glow} / 0.12), transparent)` }}
                />
                <Image
                  src={p.logo}
                  alt={t.logoAlt(p.name)}
                  width={240}
                  height={Math.round(240 / p.ratio)}
                  unoptimized
                  className="h-auto w-[4.5rem] sm:w-28"
                />
                <h3 className="sr-only">{p.name}</h3>
              </div>
            );
            return (
              <Reveal as="li" key={p.id}>
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.newTab(p.name)}
                    className="group block rounded-[1.75rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {card}
                  </a>
                ) : (
                  <div className="group">{card}</div>
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}