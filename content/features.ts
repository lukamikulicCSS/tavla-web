/**
 * IZVOR ISTINE za sve značajke prikazane na stranici.
 *
 * status:
 *   "live" — radi u trenutnoj verziji aplikacije, prikazuje se kao dostupno
 *   "soon" — u razvoju, prikazuje se s oznakom "Uskoro"
 *
 * Kad nešto pustite u produkciju, samo promijenite status.
 * Stavke označene s PROVJERI treba potvrditi prije objave.
 */
export type FeatureStatus = "live" | "soon";

export type Feature = {
  id: string;
  title: string;
  text: string;
  status: FeatureStatus;
};

export const guestFeatures: Feature[] = [
  { id: "table", title: "Stol se prepoznaje sam", text: "Kod na stolu otvara meni već vezan uz taj stol. Gost ne upisuje ništa.", status: "live" },
  { id: "menu", title: "Digitalni meni", text: "Kategorije, cijene i opisi, uvijek ažurni. Na hrvatskom i engleskom.", status: "live" },
  { id: "order", title: "Narudžba u par dodira", text: "Odabir, košarica, slanje. Narudžba odmah stiže osoblju.", status: "live" },
  { id: "upsell", title: "Prijedlozi uz narudžbu", text: "Uz odabrano piće gost vidi što se uz njega najčešće naručuje.", status: "live" },
  { id: "popular", title: "Najpopularnije", text: "Artikli koji se najviše naručuju automatski se ističu.", status: "live" },
  { id: "repeat", title: "Ponovi turu", text: "Ista narudžba još jednom, jednim dodirom.", status: "live" },
  { id: "status", title: "Status narudžbe", text: "Gost vidi je li narudžba primljena, u pripremi ili na putu.", status: "live" },
  // PROVJERI: potvrditi da je poziv konobara implementiran u aplikaciji
  { id: "waiter", title: "Poziv konobara", text: "Treba nešto dodatno? Jedan dodir i konobar zna za koji stol.", status: "live" },
  // PROVJERI: potvrditi da je zahtjev za račun implementiran u aplikaciji
  { id: "bill", title: "Zahtjev za račun", text: "Gost traži račun bez mahanja i čekanja da ga netko primijeti.", status: "live" },
  { id: "pay", title: "Plaćanje s mobitela", text: "Plaćanje računa izravno iz Tavle.", status: "soon" },
];

export const staffFeatures: Feature[] = [
  { id: "incoming", title: "Narudžbe stižu odmah", text: "Svaka narudžba s brojem stola, artiklima i napomenom.", status: "live" },
  { id: "realtime", title: "Status u stvarnom vremenu", text: "Primljeno, u pripremi, posluženo. Gost vidi isto što i vi.", status: "live" },
  // PROVJERI: isto kao poziv konobara / račun gore
  { id: "requests", title: "Pozivi i računi na jednom mjestu", text: "Zahtjevi gostiju dolaze uz broj stola, bez trčanja po sali.", status: "live" },
  { id: "manage", title: "Upravljanje narudžbama", text: "Pregled otvorenih narudžbi po stolu, od prve do zadnje ture.", status: "live" },
  { id: "profiles", title: "Profili konobara", text: "Pregled učinka i ocjena za svakog konobara.", status: "soon" },
];

export const ownerFeatures: Feature[] = [
  { id: "menu-admin", title: "Uređivanje menija", text: "Artikli, cijene, kategorije i prijevodi, bez tiskanja novog jelovnika.", status: "live" },
  // PROVJERI: koliko je od analitike vidljivo vlasniku u sučelju danas
  { id: "sales", title: "Pregled prodaje", text: "Promet i broj narudžbi po danu i satu.", status: "live" },
  { id: "top", title: "Najprodavaniji artikli", text: "Što se prodaje, a što stoji u meniju.", status: "live" },
  { id: "tables", title: "Aktivnost stolova", text: "Koji stolovi su aktivni i kako se kreće sala.", status: "live" },
  { id: "loyalty", title: "Program vjernosti", text: "Vlastiti program vjernosti za vaše goste.", status: "soon" },
];
