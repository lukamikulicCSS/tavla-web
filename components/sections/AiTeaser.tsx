import { aiFeatures } from "@/content/features";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/StatusBadge";
import { AiMenuMockup, AiTipsMockup } from "@/components/product/AiMockups";

/** Kratki uvod u Tavla AI na početnoj — detalji su na /tavla-ai. */
export function AiTeaser() {
  return (
    <section aria-labelledby="ai-naslov" className="relative isolate overflow-hidden bg-ink py-20 sm:py-28">
      <div aria-hidden className="electric-glow absolute inset-x-0 bottom-0 top-1/4 -z-10" />
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <p className="flex items-center text-[0.9375rem] font-medium text-soft">
            Tavla AI <Pill>Uskoro</Pill>
          </p>
          <h2 id="ai-naslov" className="mt-3 text-h2 font-semibold">Pametniji meni. Bolje napojnice.</h2>
          <p className="mt-5 max-w-md text-lead text-soft">Dvije AI značajke na kojima radimo, za goste i za osoblje.</p>
          <ul className="mt-8 space-y-4">
            {aiFeatures.map((f) => (
              <li key={f.id} className="border-t border-line-dark pt-4">
                <p className="font-semibold">{f.name}</p>
                <p className="mt-1 text-[0.9375rem] text-soft">{f.points[0]}</p>
              </li>
            ))}
          </ul>
          <ButtonLink href="/tavla-ai" variant="secondary" size="lg" className="mt-9">Upoznajte Tavla AI</ButtonLink>
        </Reveal>
        <Reveal delay={0.1} className="flex items-end justify-center gap-4 sm:gap-6" >
          <AiMenuMockup className="shrink-0" />
          <AiTipsMockup className="hidden shrink-0 translate-y-10 sm:block" />
        </Reveal>
      </div>
    </section>
  );
}
