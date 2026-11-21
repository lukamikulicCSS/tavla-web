import Image from "next/image";
import { partners } from "@/content/partners";
import { Reveal } from "@/components/ui/Reveal";

/** Sekcija "Partneri": logotipi partnera u kvadratnim karticama, centrirano (naziv je skriven, za čitače ekrana i SEO). */
export function Partners() {
  if (partners.length === 0) return null;

  return (
    <section id="partneri" aria-labelledby="partneri-naslov" className="bg-ink py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <h2 id="partneri-naslov" className="text-center text-h2 font-semibold">
            Partneri
          </h2>
        </Reveal>

        <ul className="mt-10 flex flex-wrap justify-center gap-4 sm:mt-12 sm:gap-5">
          {partners.map((p) => {
            const card = (
              <div className="relative isolate grid aspect-square w-48 place-items-center overflow-hidden rounded-[1.75rem] bg-graphite ring-1 ring-inset ring-white/[0.07] transition-[box-shadow,transform] duration-500 ease-[var(--ease-apple)] group-hover:-translate-y-0.5 group-hover:ring-white/[0.14] sm:w-60">
                {/* blagi zlatni sjaj u kartici */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_40%,rgb(219_176_52/0.12),transparent)]"
                />
                <Image
                  src={p.logo}
                  alt={`${p.name}, logotip`}
                  width={240}
                  height={Math.round(240 / p.ratio)}
                  unoptimized
                  className="h-auto w-24 sm:w-28"
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
                    aria-label={`${p.name} (otvara se u novoj kartici)`}
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