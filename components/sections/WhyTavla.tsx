import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDict } from "@/content";
import type { Locale } from "@/content/routes";

export function WhyTavla({ locale }: { locale: Locale }) {
  const t = getDict(locale).home.why;
  return (
    <section data-section="zasto-tavla" aria-labelledby="zasto-naslov" className="surface-light bg-white py-24 text-ink sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading id="zasto-naslov" tone="light" title={t.title} lead={t.lead} />
        </div>
        <dl>
          {t.principles.map((p) => (
            <Reveal key={p.word} className="grid gap-2 border-t border-line-light py-7 sm:grid-cols-[13rem_1fr] sm:gap-8">
              <dt className="text-h3 font-semibold">{p.word}</dt>
              <dd className="leading-relaxed text-slate sm:pt-1.5">{p.text}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
