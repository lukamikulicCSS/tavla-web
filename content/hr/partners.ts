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
    glow: "219 176 52",
    url: "https://emotheo.hr/",
    text: "Prvi heritage hotel u Imotskom uvodi Tavlu za narudžbe svojih gostiju.",
  },
  {
    id: "budget-line",
    name: "Budget Line",
    place: "Hrvatska",
    kind: "Računovodstvo",
    status: "koristi",
    logo: "/partners/budget-line-logo.svg",
    logoMono: "/partners/budget-line-logo-bijeli.svg",
    ratio: 375 / 400,
    glow: "44 184 230",
    url: "https://budget-line.com/",
    text: "Računovodstveni servis.",
  },
];