/**
 * DEMO PODACI — izmišljeni artikli i brojke samo za prikaz sučelja.
 * Nisu povezani s produkcijskom bazom ni sa stvarnim objektima.
 */
export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  cat: string;
  popular?: boolean;
  pairsWith?: string[];
};

export const demoVenue = { name: "Demo bar", table: 7 };

export const demoCategories = [
  { id: "kava", name: "Kava" },
  { id: "bezalkoholno", name: "Bezalkoholno" },
  { id: "pivo", name: "Pivo" },
  { id: "kokteli", name: "Kokteli" },
];

export const demoMenu: MenuItem[] = [
  { id: "espresso", name: "Espresso", desc: "Kratka, intenzivna, 100% arabica", price: 1.6, cat: "kava", pairsWith: ["voda"] },
  { id: "kava-mlijeko", name: "Kava s mlijekom", desc: "Espresso i malo pjenastog mlijeka", price: 2.0, cat: "kava", popular: true, pairsWith: ["voda", "naranca"] },
  { id: "cappuccino", name: "Cappuccino", desc: "Espresso, mlijeko i gusta pjena", price: 2.4, cat: "kava", pairsWith: ["voda"] },
  { id: "voda", name: "Voda 0,25 l", desc: "Negazirana ili gazirana", price: 1.5, cat: "bezalkoholno" },
  { id: "naranca", name: "Cijeđena naranča", desc: "Svježe cijeđena, 0,3 l", price: 3.5, cat: "bezalkoholno", popular: true },
  { id: "limunada", name: "Domaća limunada", desc: "Limun, menta, malo šećera", price: 3.2, cat: "bezalkoholno" },
  { id: "toceno", name: "Točeno pivo 0,5 l", desc: "Svijetli lager", price: 3.4, cat: "pivo", popular: true, pairsWith: ["kikiriki"] },
  { id: "craft", name: "Craft IPA 0,33 l", desc: "Lokalna pivovara, gorko i aromatično", price: 4.2, cat: "pivo" },
  { id: "kikiriki", name: "Kikiriki", desc: "Prženi, slani", price: 1.5, cat: "pivo" },
  { id: "spritz", name: "Spritz", desc: "Prošek, gorki liker, soda", price: 6.5, cat: "kokteli", popular: true },
  { id: "gin-tonic", name: "Gin tonic", desc: "Gin, tonik, krastavac", price: 7.0, cat: "kokteli" },
  { id: "hugo", name: "Hugo", desc: "Pjenušac, bazga, menta", price: 6.0, cat: "kokteli" },
];

/** Narudžbe koje već "postoje" u demo prikazu osoblja. */
export const demoSeedOrders = [
  { id: "A-1041", table: 3, items: [{ id: "cappuccino", qty: 2 }, { id: "voda", qty: 2 }], status: "preparing" as const, minutesAgo: 4 },
  { id: "A-1040", table: 12, items: [{ id: "toceno", qty: 3 }], status: "new" as const, minutesAgo: 1 },
  { id: "A-1038", table: 5, items: [{ id: "spritz", qty: 2 }], status: "served" as const, minutesAgo: 11 },
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

export const demoTopItems = [
  { id: "kava-mlijeko", qty: 64 },
  { id: "toceno", qty: 41 },
  { id: "spritz", qty: 27 },
  { id: "naranca", qty: 22 },
];

export const formatEur = (n: number) =>
  new Intl.NumberFormat("hr-HR", { style: "currency", currency: "EUR" }).format(n);
