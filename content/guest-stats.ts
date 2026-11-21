/**
 * Brojke iz industrije (NE naši podaci): javno objavljeni rezultati sustava za
 * naručivanje i plaćanje za stolom. Svaka brojka mora imati izvor.
 * Kad Tavla bude imala vlastite podatke, zamijeni ih ovdje.
 */
export type Locale = "hr" | "en";

export type Stat = {
  value: number;
  /** Prije broja, npr. "+" */
  prefix?: string;
  /** Iza broja, npr. "%", " min", "×" (razmak na početku = manja jedinica) */
  suffix: string;
  label: Record<Locale, string>;
  source: string; // ključ iz `sources`
};

export type StatCard = {
  id: string;
  image: string;
  alt: Record<Locale, string>;
  /** Fokus fotografije kod rezanja (CSS object-position) */
  focus?: string;
  stats: Stat[];
};

export const guestStatsCopy: Record<Locale, { title: string; lead: string; sourcesLabel: string }> = {
  hr: {
    title: "Manje čekanja. Više zarade.",
    lead: "Rezultati koje objekti bilježe s naručivanjem i plaćanjem za stolom.",
    sourcesLabel: "Izvori (podaci pružatelja sustava za plaćanje za stolom)",
  },
  en: {
    title: "Less waiting. More revenue.",
    lead: "What venues see with ordering and paying at the table.",
    sourcesLabel: "Sources (data from pay-at-table providers)",
  },
};

export const statCards: StatCard[] = [
  {
    id: "vrijeme",
    image: "/images/stats/usteda-vremena.jpg",
    alt: {
      hr: "Konobarica poslužuje jelo nasmijanim gostima za stolom u restoranu",
      en: "A server bringing food to smiling guests at a restaurant table",
    },
    focus: "50% 30%",
    stats: [
      {
        value: 15,
        suffix: " min",
        label: { hr: "uštede po stolu, bez čekanja na račun", en: "saved per table, no waiting for the bill" },
        source: "ncr",
      },
    ],
  },
  {
    id: "zarada",
    image: "/images/stats/napojnice.jpg",
    alt: {
      hr: "Nasmijana konobarica nosi tanjur s jelom kroz svijetli restoran",
      en: "A smiling server carrying a plate through a bright restaurant",
    },
    focus: "50% 25%",
    stats: [
      {
        value: 10,
        prefix: "+",
        suffix: "%",
        label: { hr: "veće napojnice", en: "higher tips" },
        source: "ncr",
      },
      {
        value: 9,
        prefix: "+",
        suffix: "%",
        label: { hr: "veći prosječni račun", en: "higher average check" },
        source: "chownow",
      },
    ],
  },
  {
    id: "recenzije",
    image: "/images/stats/recenzije.jpg",
    alt: {
      hr: "Tavla na mobitelu: dostavljena narudžba u restoranu Tri sunca i ocjena s pet zvjezdica",
      en: "Tavla on a phone: a delivered order at Tri sunca restaurant rated five stars",
    },
    focus: "50% 20%",
    stats: [
      {
        value: 5,
        suffix: "×",
        label: { hr: "više Google recenzija", en: "more Google reviews" },
        source: "sunday",
      },
    ],
  },
];

export const sources: Record<string, { name: Record<Locale, string>; url: string }> = {
  ncr: {
    name: {
      hr: "NCR Voyix i sunday, priopćenje, 2024.",
      en: "NCR Voyix and sunday, press release, 2024",
    },
    url: "https://www.businesswire.com/news/home/20240520546037/en/NCR-Voyix-Unveils-Aloha-Pay-At-Table-Powered-by-sunday-to-Simplify-the-Restaurant-Payments-Process",
  },
  chownow: {
    name: {
      hr: "ChowNow, podaci o QR naručivanju",
      en: "ChowNow, QR ordering data",
    },
    url: "https://get.chownow.com/blog/qr-code-ordering-restaurants/",
  },
  sunday: {
    name: {
      hr: "sunday, podaci za 4.000+ restorana",
      en: "sunday, data from 4,000+ restaurants",
    },
    url: "https://sundayapp.com/get-started/",
  },
};
