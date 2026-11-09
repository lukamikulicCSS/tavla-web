import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Zatražite demonstraciju",
  description: "Pošaljite upit i pokazat ćemo vam kako Tavla radi u vašem kafiću, restoranu ili baru.",
  alternates: { canonical: "/kontakt" },
};

export default function ContactPage() {
  return (
    <PageShell cta={false} breadcrumb={[{ name: "Kontakt", path: "/kontakt" }]}>
      <Contact page />
    </PageShell>
  );
}
