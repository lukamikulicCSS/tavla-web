import type { Metadata } from "next";
import { ownerFeatures } from "@/content/features";
import { photos } from "@/content/images";
import { ownerStats } from "@/content/stats";
import { PageShell } from "@/components/layout/PageShell";
import { PersonaPage } from "@/components/sections/PersonaPage";

export const metadata: Metadata = {
  title: "Softver za restorane i kafiće: pregled poslovanja",
  description: "Uređujte digitalni meni i pratite promet, najprodavanije artikle i aktivnost stolova u jednom pregledu.",
  alternates: { canonical: "/rjesenja/vlasnici" },
};

export default function OwnersPage() {
  return (
    <PageShell breadcrumb={[{ name: "Rješenja", path: "/rjesenja" }, { name: "Za vlasnike", path: "/rjesenja/vlasnici" }]}>
      <PersonaPage
        persona="vlasnici"
        href="/rjesenja/vlasnici"
        who="Za vlasnike"
        title="Cijeli objekt u jednom pregledu."
        lead="Meni uređujete sami, a promet, najprodavaniji artikli i stolovi vidljivi su uživo."
        features={ownerFeatures}
        stats={ownerStats}
        photo={photos.vlasnici}
      />
    </PageShell>
  );
}
