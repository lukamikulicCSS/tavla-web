import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Personas } from "@/components/sections/Personas";
import { AiTeaser } from "@/components/sections/AiTeaser";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Rješenja",
  description: "Tavla za goste, osoblje i vlasnike: digitalni meni, QR naručivanje i pregled poslovanja u jednom sustavu.",
  alternates: { canonical: "/rjesenja" },
};

export default function SolutionsPage() {
  return (
    <PageShell breadcrumb={[{ name: "Rješenja", path: "/rjesenja" }]}>
      <PageHero title="Rješenja" lead="Odaberite za koga želite vidjeti kako Tavla radi." />
      <Personas />
      <AiTeaser />
    </PageShell>
  );
}
