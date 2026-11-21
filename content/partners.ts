/**
 * Partneri Tavle. Dodaj samo objekte s pisanim dopuštenjem za korištenje loga.
 * status: "uvodi" (tek kreću) | "koristi" (Tavla je u radu)
 */
export type Partner = {
  id: string;
  name: string;
  place: string;
  kind: string;
  status: "uvodi" | "koristi";
  /** Logo u boji (za tamnu podlogu) */
  logo: string;
  /** Jednobojni bijeli logo (za traku partnera) */
  logoMono: string;
  /** Omjer širina/visina loga, radi točnog prostora (bez pomicanja stranice) */
  ratio: number;
  url?: string;
  text: string;
};

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