/**
 * Gdje se Tavla koristi — kartice u pomičnoj traci.
 * Fotografija: /public/images/industries/*.jpg (3:4, 900×1200).
 * Za novu karticu dodaj objekt i sliku; traka se sama produži.
 */
export type Industry = {
  id: string;
  name: string;
  text: string;
  image: string;
  imageAlt: string;
};

export const industries: Industry[] = [
  {
    id: "kafici",
    name: "Kafići",
    text: "Jutarnje gužve i pune terase. Gost naruči kad je spreman, konobar samo nosi.",
    image: "/images/industries/kafici.jpg",
    imageAlt: "Gošća na terasi kafića naručuje mobitelom preko Tavla stalka s QR kodom",
  },
  {
    id: "restorani",
    name: "Restorani",
    text: "Nova tura pića jednim dodirom na NFC oznaku, dok osoblje ostaje uz goste.",
    image: "/images/industries/restorani.jpg",
    imageAlt: "Gost u restoranu prislanja mobitel na NFC oznaku pored Tavla stalka",
  },
  {
    id: "barovi-klubovi",
    name: "Barovi i klubovi",
    text: "Separei i stolovi naručuju bez traženja konobara u gužvi i buci.",
    image: "/images/industries/barovi-klubovi.jpg",
    imageAlt: "Društvo u separeu kluba naručuje preko Tavla stalka s QR kodom i NFC oznakom",
  },
  {
    id: "beach",
    name: "Beach barovi",
    text: "Ležaljke su daleko od šanka. Gost naruči s mjesta, a vi znate točno gdje je.",
    image: "/images/industries/beach-barovi.jpg",
    imageAlt: "Prijateljice na ležaljkama uz more naručuju piće preko Tavla stalka",
  },
  {
    // PROVJERI s Antom: podržava li aplikacija narudžbe iz sobe (soba kao "stol")
    id: "hoteli",
    name: "Hoteli",
    text: "Room service, lobby bar i bazen u jednom sustavu za narudžbe.",
    image: "/images/industries/hoteli.jpg",
    imageAlt: "Hotelska soba s Tavla pločicom za room service na noćnom ormariću",
  },
];
