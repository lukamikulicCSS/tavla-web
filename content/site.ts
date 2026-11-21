/**
 * Osnovni podaci o stranici i tvrtki (isti za oba jezika).
 * Tekstovi po jeziku (naslov, opis, ključne riječi) su u content/hr/ui.ts i content/en/ui.ts.
 * Sve označeno s [UPISATI] mora se popuniti prije produkcije.
 */
export const site = {
  name: "Tavla",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://tavlahr.com").replace(/\/$/, ""),

  contact: {
    email: "info@tavlahr.com" as string, // prikazuje se u podnožju; stiže na Gmail preko Cloudflare Email Routinga (catch-all)
    phone: "" as string, // [UPISATI] neobavezno
    linkedin: "" as string, // [UPISATI] URL LinkedIn stranice tvrtke
  },

  /**
   * Partneri koji se smiju javno navesti. Postaviti na true TEK kad postoji potpisan ugovor
   * i dopuštenje za spominjanje. [PROVJERI: Corvus Pay]
   */
  partners: {
    corvusPay: false as boolean,
  },

  legal: {
    /** [UPISATI] puni naziv pravne osobe, npr. "Tavla d.o.o." */
    companyName: "[UPISATI: naziv pravne osobe]",
    oib: "[UPISATI: OIB]",
    address: "[UPISATI: adresa sjedišta]",
    registry: "[UPISATI: sud / registar i MBS]",
    privacyEmail: "info@tavlahr.com",
    lastUpdated: "[UPISATI: datum]",
  },
} as const;

export type { Locale } from "./routes";
