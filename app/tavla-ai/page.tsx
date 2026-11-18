import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { aiOverview, allAiFeatures, pillars } from "@/content/ai";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { AiSoftwareJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { FeatureStatusList, NewsletterBlock } from "@/components/ai/AiSections";
import { MiniVisual } from "@/components/ai/MiniVisuals";

export const metadata: Metadata = {
  title: { absolute: aiOverview.metaTitle },
  description: aiOverview.metaDescription,
  alternates: { canonical: "/tavla-ai" },
  openGraph: { type: "website", url: "/tavla-ai", title: aiOverview.metaTitle, description: aiOverview.metaDescription, siteName: "Tavla", locale: "hr_HR" },
  twitter: { card: "summary_large_image", title: aiOverview.metaTitle, description: aiOverview.metaDescription },
};

export default function TavlaAiPage() {
  const { transparency } = aiOverview;
  // Stavke s nepopunjenim podatkom ([PROVJERI ...]) ne prikazujemo javno dok se ne potvrde.
  const trust = transparency.items.filter((i) => !i.text.startsWith("["));

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Početna", path: "/" }, { name: "Tavla AI", path: "/tavla-ai" }]} />
      <AiSoftwareJsonLd features={allAiFeatures} description={aiOverview.metaDescription} />
      <Nav />
      <main id="sadrzaj" className="bg-ink">
        <section data-section="ai-hero" aria-labelledby="ai-naslov" className="relative isolate overflow-hidden pb-16 pt-36 sm:pt-44">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(45%_55%_at_50%_30%,rgb(47_107_255/0.18),transparent_70%)]" />
          <div className="container-page text-center">
            <p className="inline-flex items-center gap-2 text-[0.9375rem] text-soft">
              <span aria-hidden className="size-1.5 rounded-full bg-[#2f6bff] shadow-[0_0_10px_rgb(47_107_255/0.9)]" />
              Tavla AI
            </p>
            <h1 id="ai-naslov" className="hero-rise mx-auto mt-5 max-w-4xl text-[clamp(2.5rem,1.6rem+3.6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              {aiOverview.headline}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lead text-soft">{aiOverview.lead}</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="#kontakt" size="lg" data-track="ai-hero-cta-demo">Zatraži demonstraciju</ButtonLink>
              <ButtonLink href="/#demo" variant="secondary" size="lg" data-track="ai-hero-try-demo">Isprobaj demo</ButtonLink>
            </div>
          </div>
        </section>

        <section data-section="ai-stupovi" aria-label="Područja Tavla AI" className="container-page pb-20">
          <ul className="grid gap-3 md:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 2) * 0.08} className="flex flex-col rounded-[2rem] bg-graphite p-6 ring-1 ring-inset ring-white/[0.04] sm:p-8">
                <Link href={`/tavla-ai/${p.slug}`} data-track={`ai-pillar-${p.slug}`} className="group">
                  <MiniVisual slug={p.slug} />
                  <p className="mt-8 flex items-center justify-between gap-4 text-[0.9375rem] text-soft">
                    {p.name}
                    <ArrowUpRight className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </p>
                  <h2 className="mt-2 text-h3 font-semibold">{p.headline}</h2>
                </Link>
                <div className="mt-6 border-t border-line-dark pt-3">
                  <FeatureStatusList pillar={p} />
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        <section data-section="ai-transparentnost" aria-labelledby="transparentnost-naslov" className="surface-light bg-white py-24 text-ink sm:py-28">
          <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <Reveal>
              <h2 id="transparentnost-naslov" className="text-h2 font-semibold">{transparency.title}</h2>
              <p className="mt-5 text-lead text-slate">AI u Tavli predlaže. Odluke ostaju vaše.</p>
            </Reveal>
            <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {trust.map((t) => (
                <div key={t.title} className="border-t border-line-light pt-5">
                  <dt className="text-lg font-semibold tracking-[-0.01em]">{t.title}</dt>
                  <dd className="mt-2 leading-relaxed text-slate">{t.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div className="container-page py-12">
          <NewsletterBlock source="stup:pregled" featureName="Tavla AI" />
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
