import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { site } from "@/content/site";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { ConsentProvider } from "@/components/privacy/consent";
import { CookieBanner } from "@/components/privacy/CookieBanner";
import { AnalyticsLoader } from "@/components/privacy/AnalyticsLoader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s — Tavla" },
  description: site.description,
  applicationName: "Tavla",
  keywords: ["QR naručivanje", "digitalni meni", "QR meni za restorane", "digitalno naručivanje", "softver za restorane", "sustav za naručivanje u kafićima", "digitalizacija ugostiteljstva"],
  authors: [{ name: "Tavla" }],
  alternates: {
    canonical: "/",
    // Kad dodate engleski: languages: { "hr-HR": "/", "en": "/en" }
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: "Tavla",
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr" className={GeistSans.variable}>
      <body className="min-h-dvh overflow-x-clip">
        <ConsentProvider>
          <MotionProvider>
            {children}
            <CookieBanner />
          </MotionProvider>
          <AnalyticsLoader />
        </ConsentProvider>
      </body>
    </html>
  );
}
