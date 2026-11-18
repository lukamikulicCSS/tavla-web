"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { industries, type Industry } from "@/content/industries";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Pomična traka s fotografijama (zdesna nalijevo).
 * - Miš iznad trake ili prst na njoj → traka stane.
 * - Gumb "Zaustavi" (pristupačnost, WCAG 2.2.2) zaustavlja traku trajno.
 * - "Smanji pokrete" u sustavu → nema animacije, kartice se listaju prstom/mišem.
 */
export function Industries() {
  const reduce = useReducedMotion();
  const [touchPaused, setTouchPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const resume = useRef<number | undefined>(undefined);

  const holdTouch = () => {
    window.clearTimeout(resume.current);
    setTouchPaused(true);
  };
  const releaseTouch = () => {
    window.clearTimeout(resume.current);
    resume.current = window.setTimeout(() => setTouchPaused(false), 1800);
  };

  return (
    <section data-section="objekti" aria-labelledby="industrije-naslov" className="overflow-hidden bg-ink py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="industrije-naslov"
          title="Gdje god gost sjedi i naručuje."
          lead="Od jutarnje kave na terasi do separea u klubu, Tavla radi isto: narudžba sa stola stiže osoblju odmah."
        />
      </div>

      {reduce ? (
        <ul className="no-scrollbar mt-14 flex gap-4 overflow-x-auto px-5 pb-4 [scroll-padding-inline:1.25rem] snap-x snap-mandatory md:px-8">
          {industries.map((ind) => (
            <li key={ind.id} className="snap-start">
              <Card ind={ind} />
            </li>
          ))}
        </ul>
      ) : (
        <div
          className="tavla-marquee mt-14 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
          data-paused={touchPaused || userPaused || undefined}
          onTouchStart={holdTouch}
          onTouchEnd={releaseTouch}
          onTouchCancel={releaseTouch}
        >
          <style>{`
            @keyframes tavla-marquee { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
            .tavla-marquee .tavla-track { animation: tavla-marquee 55s linear infinite; }
            .tavla-marquee:hover .tavla-track,
            .tavla-marquee[data-paused] .tavla-track { animation-play-state: paused; }
          `}</style>
          <div className="tavla-track flex w-max will-change-transform">
            {/* Dva ista niza jedan iza drugog → beskonačna petlja bez trzaja */}
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0" aria-hidden={copy === 1 || undefined} aria-label={copy === 0 ? "Vrste objekata" : undefined}>
                {industries.map((ind) => (
                  <li key={ind.id} className="mr-4 shrink-0 sm:mr-5">
                    <Card ind={ind} hidden={copy === 1} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      )}

      {!reduce && (
        <div className="container-page mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => setUserPaused((v) => !v)}
            aria-pressed={userPaused}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-white/[0.06] px-4 text-sm text-soft transition-colors hover:bg-white/10 hover:text-white"
          >
            {userPaused ? <Play className="size-3.5" aria-hidden /> : <Pause className="size-3.5" aria-hidden />}
            {userPaused ? "Pokreni" : "Zaustavi"}
          </button>
        </div>
      )}
    </section>
  );
}

function Card({ ind, hidden = false }: { ind: Industry; hidden?: boolean }) {
  return (
    <article className="group w-[15.5rem] sm:w-[19rem]">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-graphite ring-1 ring-inset ring-white/[0.06]">
        <Image
          src={ind.image}
          alt={hidden ? "" : ind.imageAlt}
          width={900}
          height={1200}
          unoptimized
          loading="lazy"
          sizes="(min-width: 640px) 19rem, 15.5rem"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        {/* tanki odsjaj stakla na rubu, isti motiv kao ostatak stranice */}
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]" />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
        {ind.name}
      </h3>
      <p className="mt-1.5 max-w-[17rem] text-[0.9375rem] leading-relaxed text-soft">{ind.text}</p>
    </article>
  );
}
