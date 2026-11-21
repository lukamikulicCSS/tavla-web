/**
 * DEMO PODACI — izmišljeni artikli i brojke samo za prikaz sučelja.
 * Nisu povezani s produkcijskom bazom ni sa stvarnim objektima.
 *
 * Ovdje su ID-jevi, cijene i struktura (isti na oba jezika).
 * Nazivi i opisi artikala su u content/hr/demo.ts i content/en/demo.ts.
 */
import type { Locale } from "./routes";

export const demoCategoryIds = ["kava", "bezalkoholno", "pivo", "kokteli"] as const;
export type DemoCategoryId = (typeof demoCategoryIds)[number];

export const demoItemIds = [
  "espresso", "kava-mlijeko", "cappuccino", "voda", "naranca", "limunada",
  "toceno", "craft", "kikiriki", "spritz", "gin-tonic", "hugo",
] as const;
export type DemoItemId = (typeof demoItemIds)[number];

export type MenuItem = {
  id: DemoItemId;
  price: number;
  cat: DemoCategoryId;
  popular?: boolean;
  pairsWith?: DemoItemId[];
};

/** Tekst artikala po jeziku (Record po ID-ju → TypeScript javlja ako nešto nedostaje). */
export type DemoText = {
  venue: string;
  categories: Record<DemoCategoryId, string>;
  items: Record<DemoItemId, { name: string; desc: string }>;
};

export const demoVenue = { table: 7 };

export const demoMenu: MenuItem[] = [
  { id: "espresso", price: 1.6, cat: "kava", pairsWith: ["voda"] },
  { id: "kava-mlijeko", price: 2.0, cat: "kava", popular: true, pairsWith: ["voda", "naranca"] },
  { id: "cappuccino", price: 2.4, cat: "kava", pairsWith: ["voda"] },
  { id: "voda", price: 1.5, cat: "bezalkoholno" },
  { id: "naranca", price: 3.5, cat: "bezalkoholno", popular: true },
  { id: "limunada", price: 3.2, cat: "bezalkoholno" },
  { id: "toceno", price: 3.4, cat: "pivo", popular: true, pairsWith: ["kikiriki"] },
  { id: "craft", price: 4.2, cat: "pivo" },
  { id: "kikiriki", price: 1.5, cat: "pivo" },
  { id: "spritz", price: 6.5, cat: "kokteli", popular: true },
  { id: "gin-tonic", price: 7.0, cat: "kokteli" },
  { id: "hugo", price: 6.0, cat: "kokteli" },
];

/** Narudžbe koje već "postoje" u demo prikazu osoblja. */
export const demoSeedOrders: { id: string; table: number; items: { id: DemoItemId; qty: number }[]; status: "new" | "preparing" | "served"; minutesAgo: number }[] = [
  { id: "A-1041", table: 3, items: [{ id: "cappuccino", qty: 2 }, { id: "voda", qty: 2 }], status: "preparing", minutesAgo: 4 },
  { id: "A-1040", table: 12, items: [{ id: "toceno", qty: 3 }], status: "new", minutesAgo: 1 },
  { id: "A-1038", table: 5, items: [{ id: "spritz", qty: 2 }], status: "served", minutesAgo: 11 },
];

export const demoRequests = [
  { table: 9, kind: "bill" as const, minutesAgo: 2 },
];

/** Demo promet po satu (EUR) za graf vlasnika. */
export const demoHourly = [
  { h: "08", v: 48 }, { h: "09", v: 96 }, { h: "10", v: 132 }, { h: "11", v: 88 },
  { h: "12", v: 74 }, { h: "13", v: 92 }, { h: "14", v: 61 }, { h: "15", v: 70 },
  { h: "16", v: 104 }, { h: "17", v: 141 }, { h: "18", v: 176 }, { h: "19", v: 158 },
];

export const demoTopItems: { id: DemoItemId; qty: number }[] = [
  { id: "kava-mlijeko", qty: 64 },
  { id: "toceno", qty: 41 },
  { id: "spritz", qty: 27 },
  { id: "naranca", qty: 22 },
];

const numberLocale: Record<Locale, string> = { hr: "hr-HR", en: "en-IE" };

/** "6,50 €" na hrvatskom, "€6.50" na engleskom */
export const formatEur = (n: number, locale: Locale = "hr") =>
  new Intl.NumberFormat(numberLocale[locale], { style: "currency", currency: "EUR" }).format(n);
