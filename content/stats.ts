/**
 * BROJKE NA STRANICI.
 *
 * Pravilo: svaka brojka mora biti ili činjenica o Tavli koju možete dokazati,
 * ili podatak iz javnog istraživanja s navedenim izvorom.
 * Ne upisivati rezultate koje Tavla još nije izmjerila (npr. „+10 % napojnica”) —
 * to je zavaravajuće oglašavanje. Kad imate mjerenja iz svojih objekata,
 * dodajte ih ovdje sa source: "Tavla, [objekt/razdoblje]".
 */
export type Stat = { value: string; label: string; source?: { name: string; url: string } };

const NRA_2024 = {
  name: "National Restaurant Association, Restaurant Technology Landscape Report 2024",
  url: "https://restaurant.org/research-and-media/media/press-releases/serving-up-technology-new-data-shows-how-tech-integration-is-transforming-the-restaurant-experience/",
};

export const homeStats: Stat[] = [
  // PROVJERI: broj objekata koji kreću s Tavlom — ažurirati kad se promijeni
  { value: "6", label: "objekata kreće s Tavlom već u prvom mjesecu" },
  { value: "0", label: "aplikacija za preuzimanje. Meni se otvara u pregledniku." },
  { value: "65 %", label: "odraslih gostiju rado bi račun platilo digitalno za stolom", source: NRA_2024 },
  { value: "3 od 4", label: "ugostitelja kaže da im tehnologija daje prednost pred konkurencijom", source: NRA_2024 },
];

export const guestStats: Stat[] = [
  { value: "2", label: "jezika na meniju, hrvatski i engleski" },
  { value: "1", label: "dodir do ponovne ture" },
  { value: "82 %", label: "mladih (generacija Z) ugodno je naručivati putem mobitela", source: NRA_2024 },
];

export const ownerStats: Stat[] = [
  { value: "60 %", label: "ugostitelja traži tehnologiju koja poboljšava iskustvo gosta", source: NRA_2024 },
  { value: "3 od 4", label: "ugostitelja kaže da im tehnologija daje prednost pred konkurencijom", source: NRA_2024 },
];
