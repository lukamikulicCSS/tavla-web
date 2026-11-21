import type { Metadata } from "next";
import { alternatesFor, ogLocale, routes, type Locale, type RouteKey } from "@/content/routes";

/**
 * Metapodaci stranice na zadanom jeziku: title, description, canonical, hreflang (hr, en, x-default),
 * Open Graph i Twitter. OG slika dolazi iz opengraph-image datoteka (app/ i app/en/).
 */
export function pageMetadata({
  route,
  locale,
  title,
  description,
  absoluteTitle = false,
  noindex = false,
}: {
  route: RouteKey;
  locale: Locale;
  title: string;
  description?: string;
  absoluteTitle?: boolean;
  noindex?: boolean;
}): Metadata {
  const url = routes[route][locale];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    ...(description ? { description } : {}),
    alternates: alternatesFor(route, locale),
    openGraph: {
      type: "website",
      url,
      title,
      ...(description ? { description } : {}),
      siteName: "Tavla",
      locale: ogLocale[locale],
      alternateLocale: [ogLocale[locale === "hr" ? "en" : "hr"]],
    },
    twitter: { card: "summary_large_image", title, ...(description ? { description } : {}) },
    ...(noindex ? { robots: { index: false, follow: false }, referrer: "no-referrer" as const } : {}),
  };
}
