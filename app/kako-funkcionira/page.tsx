import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Problem } from "@/components/sections/Problem";
import { ProductDemo } from "@/components/sections/ProductDemo";

export const metadata: Metadata = {
  title: "Kako funkcionira QR naručivanje",
  description: "Skeniraj, naruči, uživaj. Pogledajte kako radi Tavla i isprobajte interaktivni demo za goste, osoblje i vlasnike.",
  alternates: { canonical: "/kako-funkcionira" },
};

export default function HowPage() {
  return (
    <PageShell breadcrumb={[{ name: "Kako funkcionira", path: "/kako-funkcionira" }]}>
      <PageHero title="Od stola do narudžbe u tri koraka." lead="Bez aplikacije za preuzimanje, bez registracije, bez čekanja konobara." />
      <HowItWorks compact />
      <Problem />
      <ProductDemo />
    </PageShell>
  );
}
