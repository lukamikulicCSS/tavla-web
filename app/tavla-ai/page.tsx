import type { Metadata } from "next";
import { Check } from "lucide-react";
import { aiFeatures } from "@/content/features";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { Pill } from "@/components/ui/StatusBadge";
import { Reveal } from "@/components/ui/Reveal";
import { AiMenuMockup, AiTipsMockup } from "@/components/product/AiMockups";

export const metadata: Metadata = {
  title: "Tavla AI: AI meni i AI napojnice",
  description: "AI meni s osobnim preporukama pića i AI napojnice s pametnim prijedlogom pri plaćanju. Uskoro u Tavli.",
  alternates: { canonical: "/tavla-ai" },
};

export default function AiPage() {
  return (
    <PageShell breadcrumb={[{ name: "Tavla AI", path: "/tavla-ai" }]}>
      <PageHero
        eyebrow={<>Tavla AI <Pill>Uskoro</Pill></>}
        title="Umjetna inteligencija koja radi za vaš šank."
        lead="Na ovim značajkama radimo. Prikazi ispod su primjeri kako će izgledati."
      />

      {aiFeatures.map((f, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={f.id} aria-labelledby={`${f.id}-naslov`} className="relative isolate overflow-hidden bg-ink py-16 sm:py-24">
            <div aria-hidden className={`electric-glow absolute top-0 -z-10 h-full w-[80%] opacity-60 ${flip ? "-left-1/4" : "-right-1/4"}`} />
            <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal className={flip ? "lg:order-2" : ""}>
                <p className="flex items-center text-[0.9375rem] font-medium text-soft">
                  {f.name} <Pill>Uskoro</Pill>
                </p>
                <h2 id={`${f.id}-naslov`} className="mt-3 text-h2 font-semibold">{f.title}</h2>
                <p className="mt-5 max-w-md text-lead text-soft">{f.text}</p>
                <ul className="mt-8 space-y-3">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-5 shrink-0 text-electric-light" aria-hidden />
                      <span className="text-white/85">{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.1} className={`flex justify-center ${flip ? "lg:order-1" : ""}`}>
                {f.id === "ai-menu" ? <AiMenuMockup /> : <AiTipsMockup />}
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="bg-ink pb-4">
        <p className="container-page text-sm text-soft">
          Želite među prvima isprobati Tavla AI u svom objektu? Javite nam se putem obrasca za demonstraciju.
        </p>
      </section>
    </PageShell>
  );
}
