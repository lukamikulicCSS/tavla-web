import Link from "next/link";
import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { site } from "@/content/site";
import { getDict } from "@/content";
import { href, type Locale, type RouteKey } from "@/content/routes";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";

/** Postaviti na false kad pravnik pregleda i odobri tekstove. */
export const LEGAL_DRAFT = true;

export function LegalPage({ title, description, route, locale, children }: { title: string; description: string; route: RouteKey; locale: Locale; children: ReactNode }) {
  const t = getDict(locale).ui.legal;
  return (
    <>
      <WebPageJsonLd route={route} locale={locale} name={title} description={description} />
      <BreadcrumbJsonLd items={[{ name: t.home, path: href("home", locale) }, { name: title, path: href(route, locale) }]} />
      <Nav solid />
      <main id="sadrzaj" className="surface-light bg-white pb-24 pt-32 text-ink sm:pt-40">
        <div className="container-page">
          <nav aria-label={t.breadcrumbAria} className="text-sm text-slate">
            <ol className="flex gap-2">
              <li><Link href={href("home", locale)} className="hover:text-ink">{t.home}</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">{title}</li>
            </ol>
          </nav>
          <h1 className="mt-6 max-w-3xl text-h2 font-semibold">{title}</h1>
          <p className="mt-4 text-sm text-slate">{t.lastUpdated} {site.legal.lastUpdated}</p>
          {t.translationNote && (
            <p className="mt-8 max-w-3xl rounded-2xl bg-ink p-5 text-sm font-medium leading-relaxed text-white" role="note">
              {t.translationNote}
            </p>
          )}
          {LEGAL_DRAFT && (
            <p className={`${t.translationNote ? "mt-3" : "mt-8"} max-w-3xl rounded-2xl bg-mist p-5 text-sm leading-relaxed text-slate`} role="note">
              {t.draft}
            </p>
          )}
          <article className="legal mt-12 max-w-3xl">{children}</article>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
