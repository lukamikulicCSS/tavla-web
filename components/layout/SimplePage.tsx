import type { ReactNode } from "react";
import type { Locale } from "@/content/routes";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/** Tamna stranica s jednim središnjim blokom (potvrde, odjava). */
export function SimplePage({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <>
      <Nav solid />
      <main id="sadrzaj" className="relative isolate flex min-h-[80dvh] items-center bg-ink pb-24 pt-36">
        <div aria-hidden className="stage-light absolute inset-0 -z-10" />
        <div className="container-page">{children}</div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
