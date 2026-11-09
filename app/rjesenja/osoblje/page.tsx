import type { Metadata } from "next";
import { staffFeatures } from "@/content/features";
import { photos } from "@/content/images";
import { PageShell } from "@/components/layout/PageShell";
import { PersonaPage } from "@/components/sections/PersonaPage";

export const metadata: Metadata = {
  title: "Sustav za narudžbe za konobare i šank",
  description: "Narudžbe, pozivi konobara i zahtjevi za račun stižu na tablet za šankom, s brojem stola i statusom uživo.",
  alternates: { canonical: "/rjesenja/osoblje" },
};

export default function StaffPage() {
  return (
    <PageShell breadcrumb={[{ name: "Rješenja", path: "/rjesenja" }, { name: "Za osoblje", path: "/rjesenja/osoblje" }]}>
      <PersonaPage
        persona="osoblje"
        href="/rjesenja/osoblje"
        who="Za osoblje"
        title="Posluživanje bez trčanja."
        lead="Narudžbe i zahtjevi gostiju stižu na tablet za šankom, s brojem stola. Vi samo pripremite i odnesete."
        features={staffFeatures}
        photo={photos.osoblje}
      />
    </PageShell>
  );
}
