import Image from "next/image";
import { Coffee, Hotel, Music, Store, Umbrella, UtensilsCrossed, Wine } from "lucide-react";
import { industries, type Industry } from "@/content/industries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollRow } from "@/components/ui/ScrollRow";

const icons: Record<Industry["icon"], typeof Coffee> = {
  coffee: Coffee,
  utensils: UtensilsCrossed,
  wine: Wine,
  umbrella: Umbrella,
  music: Music,
  hotel: Hotel,
  store: Store,
};

export function Industries() {
  return (
    <section aria-labelledby="industrije-naslov" className="overflow-hidden bg-ink py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="industrije-naslov"
          title="Gdje god gost sjedi i naručuje."
          lead="Od jutarnje kave na terasi do separea u klubu, Tavla radi isto: narudžba sa stola stiže osoblju odmah."
        />
      </div>

      {/* Vodoravni niz s hvatanjem — na mobitelu se lista prstom */}
      <ScrollRow label="Vrste objekata" className="mt-14">
        {industries.map((ind) => {
          const Icon = icons[ind.icon];
          return (
            <li key={ind.id} className="snap-start">
              <article className="group relative flex h-[22rem] w-[17rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-graphite p-6 sm:h-[26rem] sm:w-[19rem]">
                {ind.image ? (
                  <>
                    <Image
                      src={ind.image}
                      alt={ind.imageAlt ?? ""}
                      fill
                      sizes="(min-width: 640px) 19rem, 17rem"
                      className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-apple)] group-hover:scale-[1.04]"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  </>
                ) : (
                  <Icon
                    aria-hidden
                    strokeWidth={0.8}
                    className="absolute -right-6 -top-4 size-56 text-white/[0.06] transition-[transform,color] duration-[1.2s] ease-[var(--ease-apple)] group-hover:-translate-x-2 group-hover:translate-y-2 group-hover:text-white/[0.1]"
                  />
                )}
                <div className="relative">
                  <Icon aria-hidden className="size-6 text-white" strokeWidth={1.6} />
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.025em]">{ind.name}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/70 transition-colors duration-500 group-hover:text-white/90">{ind.text}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ScrollRow>
    </section>
  );
}
