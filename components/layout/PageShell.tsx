import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { CtaBand } from "@/components/sections/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

/** Zajednički okvir svake stranice: navigacija, sadržaj, završni poziv na akciju, podnožje. */
export function PageShell({
  children,
  cta = true,
  breadcrumb,
}: {
  children: ReactNode;
  cta?: boolean;
  breadcrumb?: { name: string; path: string }[];
}) {
  return (
    <>
      {breadcrumb && <BreadcrumbJsonLd items={[{ name: "Početna", path: "/" }, ...breadcrumb]} />}
      <Nav />
      <main id="sadrzaj">
        {children}
        {cta && <CtaBand />}
      </main>
      <Footer />
    </>
  );
}
