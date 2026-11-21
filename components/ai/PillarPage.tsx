import Link from "next/link";
import type { AiPillar } from "@/content/types";
import { getDict } from "@/content";
import { anchors, href, pillarRoute, type Locale } from "@/content/routes";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { ButtonLink } from "@/components/ui/Button";
import { BreadcrumbJsonLd, FaqJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { FeatureBlock } from "./FeatureBlock";
import { FeatureVisual } from "./FeatureVisual";
import { AiSteps, NewsletterBlock, PillarFaq, RelatedPillars } from "./AiSections";

/** Zajednički predložak za /tavla-ai/[stup]. Sav tekst dolazi iz content/ai.ts. */
export function PillarPage({ pillar: p, locale }: { pillar: AiPillar; locale: Locale }) {
  const d = getDict(locale);
  const t = d.ui.aiPages;
  const lead = p.features.find((f) => f.ai) ?? p.features[0];
  // newsletter: prva značajka koja još nije dostupna
  const upcoming = p.features.find((f) => f.status === "soon") ?? p.features.find((f) => f.status !== "live");
  const route = pillarRoute(p.slug);

  return (
    <>
      <WebPageJsonLd route={route} locale={locale} name={p.metaTitle} description={p.metaDescription} />
      <BreadcrumbJsonLd items={[{ name: d.ui.legal.home, path: href("home", locale) }, { name: "Tavla AI", path: href("ai", locale) }, { name: p.name, path: href(route, locale) }]} />
      <FaqJsonLd faq={p.faq} />
      <Nav />
      <main id="sadrzaj" className="bg-ink">
        <section data-section="ai-hero" aria-labelledby="stup-naslov" className="relative isolate overflow-hidden pb-16 pt-32 sm:pt-40 lg:pb-24">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[90%] bg-[radial-gradient(40%_50%_at_75%_40%,rgb(47_107_255/0.16),transparent_70%)]" />
          <div className="container-page grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <nav aria-label={t.breadcrumbAria} className="text-[0.9375rem] text-soft">
                <ol className="flex flex-wrap items-center gap-2">
                  <li><Link href={href("ai", locale)} className="hover:text-white">Tavla AI</Link></li>
                  <li aria-hidden>/</li>
                  <li aria-current="page">{p.name}</li>
                </ol>
              </nav>
              <h1 id="stup-naslov" className="hero-rise mt-5 text-[clamp(2.5rem,1.6rem+3.6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                {p.headline}
              </h1>
              <p className="mt-6 max-w-[36rem] text-lead text-soft">{p.lead}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={`#${anchors[locale].contact}`} size="lg" data-track={`ai-${p.slug}-hero-cta-demo`}>{t.cta}</ButtonLink>
                <ButtonLink href={href("home", locale, "demo")} variant="secondary" size="lg" data-track={`ai-${p.slug}-hero-try-demo`}>{t.tryDemo}</ButtonLink>
              </div>
            </div>
            <div className="relative">
              <div aria-hidden className="stage-light absolute inset-[-20%] -z-10" />
              <FeatureVisual visual={lead.visual} status={lead.status} />
            </div>
          </div>
        </section>

        <div className="container-page">
          {p.features.map((f, i) => (
            <FeatureBlock key={f.id} feature={f} reverse={i % 2 === 1} />
          ))}
          {p.aiSteps && <AiSteps steps={p.aiSteps} locale={locale} />}
          <PillarFaq faq={p.faq} locale={locale} />
          <RelatedPillars current={p.slug} locale={locale} />
          {upcoming && <NewsletterBlock source={`stup:${p.slug}`} interest={upcoming.id} featureName={upcoming.name} locale={locale} />}
        </div>
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
