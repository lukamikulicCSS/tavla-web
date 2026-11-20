import Image from "next/image";
import { partners } from "@/content/partners";
import { Reveal } from "@/components/ui/Reveal";

/** Sekcija "Partneri": samo logotipi partnera, centrirano (naziv je skriven, za čitače ekrana i SEO). */
export function Partners() {
  if (partners.length === 0) return null;

  return (
    <section id="partneri" aria-labelledby="partneri-naslov" className="relative isolate overflow-hidden bg-ink py-24 sm:py-28">
      {/* blagi zlatni sjaj iza logotipa */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[34rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgb(219_176_52/0.12),transparent)]"
      />
      <div className="container-page">
        <Reveal>
          <h2 id="partneri-naslov" className="text-center text-h2 font-semibold">
            Partneri
          </h2>
        </Reveal>

        <ul className="mt-14 flex flex-wrap items-start justify-center gap-x-20 gap-y-14">
          {partners.map((p) => {
            const content = (
              <>
                <Image
                  src={p.logo}
                  alt={`${p.name}, logotip`}
                  width={480}
                  height={Math.round(480 / p.ratio)}
                  unoptimized
                  className="h-auto w-40 sm:w-48"
                />
                <h3 className="sr-only">{p.name}</h3>
              </>
            );
            return (
              <Reveal as="li" key={p.id} className="flex flex-col items-center">
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center transition-opacity hover:opacity-80"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
