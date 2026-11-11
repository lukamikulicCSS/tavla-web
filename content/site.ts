/**
 * Osnovni podaci o stranici i tvrtki.
 * Sve označeno s [UPISATI] mora se popuniti prije produkcije.
 */
export const site = {
  name: "Tavla",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://tavlahr.com").replace(/\/$/, ""),
  locale: "hr_HR",
  defaultLocale: "hr" as const,
  /** Jezici za koje postoji sadržaj. Dodaj "en" kad bude content/en.ts */
  locales: ["hr"] as const,

  title: "Tavla — digitalni meni i QR naručivanje za ugostiteljstvo",
  description:
    "Tavla je digitalni meni i sustav za naručivanje za kafiće, restorane, barove i hotele. Gosti naručuju sa svog mobitela, osoblje dobiva narudžbe odmah, a vlasnik ima pregled poslovanja.",

  contact: {
    email: "" as string, // [UPISATI] npr. info@tavla.hr — prazno = prikazuje se samo kontakt forma
    phone: "" as string, // [UPISATI] neobavezno
    linkedin: "" as string, // [UPISATI] URL LinkedIn stranice tvrtke
  },

  legal: {
    /** [UPISATI] puni naziv pravne osobe, npr. "Tavla d.o.o." */
    companyName: "[UPISATI: naziv pravne osobe]",
    oib: "[UPISATI: OIB]",
    address: "[UPISATI: adresa sjedišta]",
    registry: "[UPISATI: sud / registar i MBS]",
    privacyEmail: "[UPISATI: e-mail za zahtjeve o privatnosti]",
    lastUpdated: "[UPISATI: datum]",
  },
} as const;

export type Locale = (typeof site.locales)[number];
