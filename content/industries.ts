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
  { id: "kafici", name: "Kafići", icon: "coffee", text: "Jutarnje gužve i pune terase, bez čekanja na konobara." },
  { id: "restorani", name: "Restorani", icon: "utensils", text: "Pića i nove ture bez čekanja, osoblje ostaje uz goste." },
  { id: "barovi", name: "Barovi", icon: "wine", text: "Šank je pun, a narudžba sa stola stiže točno." },
  { id: "beach", name: "Beach barovi", icon: "umbrella", text: "Gost naruči s ležaljke, a vi znate točno gdje je." },
  { id: "klubovi", name: "Noćni klubovi", icon: "music", text: "Separei naručuju bez traženja konobara u gužvi." },
  { id: "hoteli", name: "Hoteli", icon: "hotel", text: "Lobby bar, terasa i bazen u jednom sustavu." },
  { id: "ostalo", name: "Ostali objekti", icon: "store", text: "Svugdje gdje gost sjedi i naručuje." },
];
