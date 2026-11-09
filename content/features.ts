/**
 * IZVOR ISTINE za sve značajke prikazane na stranici.
 *
 * status:
 *   "live" — radi u trenutnoj verziji aplikacije
 *   "soon" — u razvoju, prikazuje se s oznakom "Uskoro"
 *
 * Kad nešto pustite u produkciju, samo promijenite status.
 * Stavke označene s PROVJERI potvrditi prije objave.
 */
export type FeatureStatus = "live" | "soon";

export type Feature = {
  id: string;
  title: string;
  text: string;
  status: FeatureStatus;
};

export const guestFeatures: Feature[] = [
  { id: "table", title: "Stol se prepoznaje sam", text: "Kod na stolu otvara meni vezan uz taj stol.", status: "live" },
  { id: "menu", title: "Digitalni meni", text: "Uvijek ažuran, na hrvatskom i engleskom.", status: "live" },
  { id: "order", title: "Narudžba u par dodira", text: "Odabir, košarica, slanje. Osoblje je vidi odmah.", status: "live" },
  { id: "upsell", title: "Prijedlozi uz narudžbu", text: "Što se uz odabrano piće najčešće naručuje.", status: "live" },
  { id: "repeat", title: "Ponovi turu", text: "Ista narudžba još jednom, jednim dodirom.", status: "live" },
  { id: "status", title: "Status narudžbe", text: "Primljeno, u pripremi, posluženo.", status: "live" },
  // PROVJERI: potvrditi da su poziv konobara i račun implementirani u aplikaciji
  { id: "waiter", title: "Poziv konobara", text: "Jedan dodir i konobar zna za koji stol.", status: "live" },
  { id: "bill", title: "Zahtjev za račun", text: "Bez mahanja i čekanja da vas netko primijeti.", status: "live" },
  { id: "pay", title: "Plaćanje s mobitela", text: "Račun plaćen izravno iz Tavle.", status: "soon" },
  { id: "ai-menu", title: "AI meni", text: "Preporuke pića prilagođene svakom gostu.", status: "soon" },
];

export const staffFeatures: Feature[] = [
  { id: "incoming", title: "Narudžbe stižu odmah", text: "Stol, artikli i napomena na jednom mjestu.", status: "live" },
  { id: "realtime", title: "Status uživo", text: "Gost vidi isto što i vi.", status: "live" },
  // PROVJERI: isto kao poziv konobara / račun gore
  { id: "requests", title: "Pozivi i računi", text: "Zahtjevi gostiju stižu s brojem stola.", status: "live" },
  { id: "manage", title: "Pregled po stolu", text: "Sve ture jednog stola, od prve do zadnje.", status: "live" },
  { id: "profiles", title: "Profili konobara", text: "Učinak i ocjene za svakog konobara.", status: "soon" },
  { id: "ai-tips", title: "AI napojnice", text: "Pametan prijedlog napojnice pri plaćanju.", status: "soon" },
];

export const ownerFeatures: Feature[] = [
  { id: "menu-admin", title: "Uređivanje menija", text: "Artikli, cijene i prijevodi, bez tiskanja.", status: "live" },
  // PROVJERI: koliko je od analitike vidljivo vlasniku u sučelju danas
  { id: "sales", title: "Pregled prodaje", text: "Promet i narudžbe po danu i satu.", status: "live" },
  { id: "top", title: "Najprodavaniji artikli", text: "Što se prodaje, a što stoji u meniju.", status: "live" },
  { id: "tables", title: "Aktivnost stolova", text: "Koji stolovi su aktivni i kako se kreće sala.", status: "live" },
  { id: "loyalty", title: "Program vjernosti", text: "Vlastiti program vjernosti za vaše goste.", status: "soon" },
];

/** Tavla AI — sve je u razvoju */
export const aiFeatures = [
  {
    id: "ai-menu",
    name: "AI meni",
    who: "Za goste",
    title: "Meni koji zna što vaš gost voli.",
    text: "Na temelju doba dana, onoga što je gost već naručio i onoga što se uz to najčešće pije, AI meni ističe pića koja će mu se vjerojatno svidjeti.",
    points: ["Osobne preporuke za svakog gosta", "Prijedlozi prilagođeni dobu dana", "Uvijek iz vašeg menija i po vašim cijenama"],
  },
  {
    id: "ai-tips",
    name: "AI napojnice",
    who: "Za osoblje",
    title: "Napojnica koju gost rado ostavi.",
    text: "Kod plaćanja s mobitela AI predlaže iznos napojnice prema veličini računa i navikama u vašem objektu. Gost bira jednim dodirom ili upisuje svoj iznos.",
    points: ["Prijedlog prilagođen iznosu računa", "Gost uvijek može izabrati drugi iznos ili ništa", "Napojnice vidljive po konobaru"],
  },
] as const;
