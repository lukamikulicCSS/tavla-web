import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Experiences } from "@/components/sections/Experiences";
import { ProductDemo } from "@/components/sections/ProductDemo";
import { Benefits } from "@/components/sections/Benefits";
import { Industries } from "@/components/sections/Industries";
import { WhyTavla } from "@/components/sections/WhyTavla";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
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
        <Problem />
        <HowItWorks />
        <Experiences />
        <ProductDemo />
        <Benefits />
        <Industries />
        <WhyTavla />
        <Team />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
