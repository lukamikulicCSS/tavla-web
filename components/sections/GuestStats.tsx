"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { guestStatsCopy, statCards, type Locale, type Stat } from "@/content/guest-stats";

/** Brojke na fotografijama. Izvori su zapisani u content/guest-stats.ts. */
export function GuestStats({ locale = "hr" }: { locale?: Locale }) {
  const copy = guestStatsCopy[locale];

  return (
    <section aria-labelledby="brojke-naslov" className="bg-ink py-24 sm:py-28">
      <div className="container-page">
        <h2 id="brojke-naslov" className="text-h2 font-semibold">
          {copy.title}
        </h2>
        <p className="mt-4 max-w-xl text-lead text-soft">{copy.lead}</p>

        {/* Mobitel: kartice se listaju vodoravno. Desktop: tri u redu. */}
        <ul className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 md:-mx-8 md:scroll-px-8 md:px-8 [scrollbar-width:none] sm:mt-12 lg:mx-0 lg:grid lg:scroll-px-0 lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {statCards.map((card, ci) => (
            <li
              key={card.id}
              className="group relative isolate aspect-[4/5] w-[82%] shrink-0 snap-start overflow-hidden rounded-[2rem] bg-graphite ring-1 ring-inset ring-white/[0.06] sm:w-[46%] lg:w-auto"
            >
              <Image
                src={card.image}
                alt={card.alt[locale]}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 46vw, 82vw"
                priority={false}
                className="-z-10 object-cover transition-transform duration-[1.2s] ease-[var(--ease-apple)] group-hover:scale-[1.03]"
                style={{ objectPosition: card.focus ?? "50% 50%" }}
              />
              {/* tamni prijelaz za čitljiv tekst */}
              <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[68%] bg-gradient-to-t from-black/90 via-black/65 via-45% to-transparent" />

              <div className={`absolute inset-x-0 bottom-0 grid gap-5 p-6 sm:p-7 ${card.stats.length > 1 ? "grid-cols-2" : ""}`}>
                {card.stats.map((s, i) => (
                  <StatBlock key={i} s={s} small={card.stats.length > 1} locale={locale} delay={ci * 120} />
                ))}
              </div>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}

function StatBlock({ s, small, locale, delay }: { s: Stat; small: boolean; locale: Locale; delay: number }) {
  const unit = s.suffix.startsWith(" ");
  return (
    <div>
      <p
        className={`tabular whitespace-nowrap font-semibold leading-none tracking-[-0.04em] text-white ${
          small ? "text-[2.75rem] sm:text-[3.25rem]" : "text-[3.5rem] sm:text-[4.5rem]"
        }`}
      >
        {s.prefix && <span className="text-[#7aa2ff]">{s.prefix}</span>}
        <CountUp to={s.value} delay={delay} />
        <span className={`text-[#7aa2ff] ${unit ? "ml-1.5 text-[0.42em] tracking-normal" : ""}`}>{s.suffix.trim()}</span>
      </p>
      <p className="mt-3 text-[0.9375rem] leading-snug text-white/80">
        {s.label[locale]}
      </p>
    </div>
  );
}

/** Broj se odbroji od 0 kad uđe u ekran. U HTML-u je uvijek konačna vrijednost (SEO, bez JS-a). */
function CountUp({ to, delay = 0 }: { to: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(to);
  const started = useRef(false);

  // Ako je broj ispod ekrana, nakon učitavanja ga postavi na 0, da se odbroji kad se pojavi.
  useEffect(() => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    if (r.top > window.innerHeight) setVal(0);
  }, [reduce]);

  useEffect(() => {
    if (!inView || reduce || started.current) return;
    started.current = true;
    const dur = 1300;
    let raf = 0;
    const t0 = performance.now() + delay;
    const tick = (t: number) => {
      const p = Math.max(0, Math.min(1, (t - t0) / dur));
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, delay]);

  return <span ref={ref}>{val}</span>;
}
