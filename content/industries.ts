/**
 * Gdje se Tavla koristi.
 * image: dodaj fotografiju u /public/images/industries/ i upiši putanju —
 * kartica se automatski prebaci s ilustracije na fotografiju.
 */
export type Industry = {
  id: string;
  name: string;
  text: string;
  icon: "coffee" | "utensils" | "wine" | "umbrella" | "music" | "hotel" | "store";
  image?: string;
  imageAlt?: string;
};

export const industries: Industry[] = [
  { id: "kafici", name: "Kafići", icon: "coffee", text: "Jutarnje gužve i terase pune stolova. Gost naruči kad je spreman, konobar nosi umjesto da hoda po narudžbu." },
  { id: "restorani", name: "Restorani", icon: "utensils", text: "Pića i dodatne ture bez čekanja, dok osoblje ostaje uz goste kojima treba savjet." },
  { id: "barovi", name: "Barovi", icon: "wine", text: "Glasno je i šank je pun. Narudžba sa stola stiže točno, bez dovikivanja." },
  { id: "beach", name: "Beach barovi", icon: "umbrella", text: "Ležaljke daleko od šanka. Gost naruči s mjesta, a vi znate točno gdje je." },
  { id: "klubovi", name: "Noćni klubovi", icon: "music", text: "Separei i stolovi s rezervacijom naručuju bez traženja konobara u gužvi." },
  { id: "hoteli", name: "Hoteli", icon: "hotel", text: "Bar u predvorju, terasa i bazen s jednim sustavom za narudžbe." },
  { id: "ostalo", name: "Ostali objekti", icon: "store", text: "Svugdje gdje gost sjedi, a narudžba treba stići brzo i točno." },
];
