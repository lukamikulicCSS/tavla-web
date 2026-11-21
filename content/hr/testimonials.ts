/**
 * Iskustva korisnika. Dodaj SAMO stvarne, odobrene izjave.
 * Dok je niz prazan, sekcija poziva objekte da budu među prvima.
 */
import type { Testimonial } from "../types";

export const testimonials: Testimonial[] = [];

/** Logotipi partnera/korisnika — samo uz dopuštenje. */
export const partnerLogos: { name: string; src: string }[] = [];
