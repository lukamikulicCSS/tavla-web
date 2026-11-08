/**
 * Iskustva korisnika. Dodaj SAMO stvarne, odobrene izjave.
 * Dok je niz prazan, sekcija poziva objekte da budu među prvima.
 *
 * kind: "owner" | "manager" | "partner"
 * logo: putanja u /public (neobavezno, samo uz pisano dopuštenje)
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  venue: string;
  kind: "owner" | "manager" | "partner";
  logo?: string;
};

export const testimonials: Testimonial[] = [];

/** Logotipi partnera/korisnika — samo uz dopuštenje. */
export const partnerLogos: { name: string; src: string }[] = [];
