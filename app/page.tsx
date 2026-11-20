import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { AiSoon } from "@/components/sections/AiSoon";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Experiences } from "@/components/sections/Experiences";
import { ProductDemo } from "@/components/sections/ProductDemo";
import { Benefits } from "@/components/sections/Benefits";
import { Industries } from "@/components/sections/Industries";
import { WhyTavla } from "@/components/sections/WhyTavla";
import { Team } from "@/components/sections/Team";
import { PartnerStrip } from "@/components/sections/PartnerStrip";
import { Partners } from "@/components/sections/Partners";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { HomeJsonLd } from "@/components/seo/JsonLd";

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <Nav />
      <main id="sadrzaj">
        <Hero />
        <PartnerStrip />
        <AiSoon />
        <Problem />
        <HowItWorks />
        <Experiences />
        <ProductDemo />
        <Benefits />
        <Industries />
        <WhyTavla />
        <Team />
        <Partners />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
