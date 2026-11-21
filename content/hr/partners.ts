/**
 * Partneri Tavle. Dodaj samo objekte s pisanim dopuštenjem za korištenje loga.
 */
import type { Partner } from "../types";

export const partners: Partner[] = [
  {
    id: "emotheo",
    name: "Emotheo Heritage Hotel",
    place: "Imotski",
    kind: "Heritage hotel",
    status: "uvodi",
    logo: "/partners/emotheo-logo.svg",
    logoMono: "/partners/emotheo-logo-bijeli.svg",
    ratio: 124 / 152,
    url: "https://emotheo.hr/",
    text: "Prvi heritage hotel u Imotskom uvodi Tavlu za narudžbe svojih gostiju.",
  },
];