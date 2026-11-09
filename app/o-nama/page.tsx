import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { WhyTavla } from "@/components/sections/WhyTavla";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "O nama",
  description: "Tavlu razvijamo u Hrvatskoj, za ugostitelje koji žele da posluživanje teče bez zastoja. Upoznajte tim.",
  alternates: { canonical: "/o-nama" },
};

export default function AboutPage() {
  return (
    <PageShell breadcrumb={[{ name: "O nama", path: "/o-nama" }]}>
      <PageHero title="Tehnologija koja radi iza dobrog ugostiteljstva." lead="Najbolja usluga je ona koju gost ne primijeti. Tavla radi u pozadini da bi osoblje moglo raditi ispred." />
      <Team />
      <WhyTavla />
      <Testimonials />
    </PageShell>
  );
}
