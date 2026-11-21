import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { site } from "@/content/site";
import { getDict } from "@/content";
import { ogLocale, type Locale } from "@/content/routes";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { ConsentProvider } from "@/components/privacy/consent";
import { CookieBanner } from "@/components/privacy/CookieBanner";
import { AnalyticsLoader } from "@/components/privacy/AnalyticsLoader";
import { Tracker } from "@/components/analytics/Tracker";
import "@/app/globals.css";

/**
 * Zajednički dio oba root layouta (hr i en): font, globalni CSS, jezik,
 * pristanak na kolačiće i analitika. <html lang> dolazi iz `locale`.
 */
export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={GeistSans.variable}>
      <body className="min-h-dvh overflow-x-clip">
        <LocaleProvider locale={locale}>
          <ConsentProvider>
            <MotionProvider>
              {children}
              <CookieBanner />
            </MotionProvider>
            <AnalyticsLoader />
            <Tracker />
          </ConsentProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}

export const rootViewport: Viewport = {
  themeColor: "#0B0B0D",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Zadani metapodaci layouta. Svaka stranica dodaje svoj canonical i hreflang (lib/i18n/metadata.ts). */
export function rootMetadata(locale: Locale): Metadata {
  const t = getDict(locale).ui.meta;
  return {
    metadataBase: new URL(site.url),
    title: { default: t.title, template: t.titleTemplate },
    description: t.description,
    applicationName: "Tavla",
    keywords: t.keywords,
    authors: [{ name: "Tavla" }],
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: [ogLocale[locale === "hr" ? "en" : "hr"]],
      siteName: "Tavla",
      title: t.title,
      description: t.description,
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
    robots: { index: true, follow: true, "max-image-preview": "large" },
    formatDetection: { telephone: false, email: false, address: false },
  };
}
