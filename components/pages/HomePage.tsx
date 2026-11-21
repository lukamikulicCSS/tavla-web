import type { Locale } from "@/content/routes";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { AiSoon } from "@/components/sections/AiSoon";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Experiences } from "@/components/sections/Experiences";
import { ProductDemo } from "@/components/sections/ProductDemo";
import { Benefits } from "@/components/sections/Benefits";
import { Industries } from "@/components/sections/Industries";
import { WhyTavla } from "@/components/sections/WhyTavla";
import { Team } from "@/components/sections/Team";
import { PartnerStrip } from "@/components/sections/PartnerStrip";
import { Partners } from "@/components/sections/Partners";
import { GuestStats } from "@/components/sections/GuestStats";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { HomeJsonLd } from "@/components/seo/JsonLd";

/** Početna — ista duga stranica na oba jezika (app/(hr)/page.tsx i app/en/page.tsx). */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <HomeJsonLd locale={locale} />
      <Nav />
      <main id="sadrzaj">
        <Hero />
        <PartnerStrip locale={locale} />
        <AiSoon locale={locale} />
        <GuestStats locale={locale} />
        <HowItWorks />
        <Experiences locale={locale} />
        <ProductDemo />
        <Benefits locale={locale} />
        <Industries />
        <WhyTavla locale={locale} />
        <Team locale={locale} />
        <Partners locale={locale} />
        <Faq />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
