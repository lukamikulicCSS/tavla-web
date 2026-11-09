/**
 * FOTOGRAFIJE — jedno mjesto za sve slike na stranici.
 *
 * Kako dodati: spremi sliku u /public/images/ (JPG ili WebP, min. 2000 px širine
 * za velike, 1200 px za kartice) i upiši putanju u `src`. Next.js sam radi
 * AVIF/WebP verzije i lazy loading. Prazan `src` = stranica prikazuje sučelje
 * proizvoda umjesto fotografije, pa ništa ne izgleda prazno.
 *
 * `alt` mora opisati što je na slici (pristupačnost i SEO).
 */
export type Photo = { src: string; alt: string };

export const photos = {
  /** Početna, pozadina heroja: gosti za stolom u kafiću, mobitel u ruci, topla dnevna svjetlost */
  hero: { src: "", alt: "Gosti u kafiću naručuju piće preko Tavle na mobitelu" },

  /** Kartice i vrh stranica rješenja */
  gosti: { src: "", alt: "Gošća skenira kod na stolu i pregledava digitalni meni" },
  osoblje: { src: "", alt: "Konobar za šankom prati nove narudžbe na tabletu" },
  vlasnici: { src: "", alt: "Vlasnica kafića pregledava prodaju na prijenosnom računalu" },

  /** Široka traka između sekcija na početnoj: puna terasa ili interijer u gužvi */
  atmosfera: { src: "", alt: "Puna terasa kafića u predvečerje" },
} satisfies Record<string, Photo>;
