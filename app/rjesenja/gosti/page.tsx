import type { Metadata } from "next";
import { guestFeatures } from "@/content/features";
import { photos } from "@/content/images";
import { guestStats } from "@/content/stats";
import { PageShell } from "@/components/layout/PageShell";
import { PersonaPage } from "@/components/sections/PersonaPage";

export const metadata: Metadata = {
  title: "Digitalni meni i QR naručivanje za goste",
  description: "Gost skenira kod na stolu, pregledava digitalni meni i naručuje sa svog mobitela. Bez aplikacije, bez čekanja.",
  alternates: { canonical: "/rjesenja/gosti" },
};

export default function GuestsPage() {
  return (
    <PageShell breadcrumb={[{ name: "Rješenja", path: "/rjesenja" }, { name: "Za goste", path: "/rjesenja/gosti" }]}>
      <PersonaPage
        persona="gosti"
        href="/rjesenja/gosti"
        who="Za goste"
        title="Sve što treba, na dlanu."
        lead="Kod na stolu otvara meni u pregledniku. Gost bira, naručuje i prati narudžbu, bez aplikacije i bez čekanja."
        features={guestFeatures}
        stats={guestStats}
        photo={photos.gosti}
      />
    </PageShell>
  );
}
