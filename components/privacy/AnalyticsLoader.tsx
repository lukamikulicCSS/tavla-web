"use client";

import Script from "next/script";
import { useConsent } from "./consent";

/**
 * Učitava analitiku (Plausible ili Umami) TEK nakon pristanka na analitičke kolačiće.
 * Bez NEXT_PUBLIC_ANALYTICS_SRC ne radi ništa.
 */
export function AnalyticsLoader() {
  const { consent } = useConsent();
  const src = process.env.NEXT_PUBLIC_ANALYTICS_SRC;
  const domain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;
  const websiteId = process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID;

  if (!src || !consent?.analytics) return null;

  return (
    <Script
      src={src}
      strategy="afterInteractive"
      data-domain={domain || undefined}
      data-website-id={websiteId || undefined}
    />
  );
}
