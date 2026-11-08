import Link from "next/link";
import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { site } from "@/content/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

/** Postaviti na false kad pravnik pregleda i odobri tekstove. */
export const LEGAL_DRAFT = true;

export function LegalPage({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Početna", path: "/" }, { name: title, path }]} />
      <Nav solid />
      <main id="sadrzaj" className="surface-light bg-white pb-24 pt-32 text-ink sm:pt-40">
        <div className="container-page">
          <nav aria-label="Putanja" className="text-sm text-slate">
            <ol className="flex gap-2">
              <li><Link href="/" className="hover:text-ink">Početna</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">{title}</li>
            </ol>
          </nav>
          <h1 className="mt-6 max-w-3xl text-h2 font-semibold">{title}</h1>
          <p className="mt-4 text-sm text-slate">Zadnja izmjena: {site.legal.lastUpdated}</p>
          {LEGAL_DRAFT && (
            <p className="mt-8 max-w-3xl rounded-2xl bg-mist p-5 text-sm leading-relaxed text-slate" role="note">
              Ovaj dokument je nacrt i čeka pravnu provjeru. Podaci u uglatim zagradama bit će dopunjeni prije službene objave.
            </p>
          )}
          <article className="legal mt-12 max-w-3xl">{children}</article>
        </div>
      </main>
      <Footer />
    </>
  );
}
