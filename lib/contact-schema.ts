import { z } from "zod";
import { getDict } from "@/content";
import type { Locale } from "@/content/routes";

/** Vrste objekata (vrijednosti su iste na oba jezika; nazivi su u content/{hr,en}/messages.ts → venueTypes). */
export const venueTypes = ["kafic", "restoran", "bar", "beach-bar", "nocni-klub", "hotel", "ostalo"] as const;
export type VenueType = (typeof venueTypes)[number];

// Uklanja kontrolne znakove (osim novog reda) — ništa od korisnika ne ide u HTML neescapirano.
const clean = (s: string) => s.replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "").trim();

/**
 * Zajednička shema — ista pravila u pregledniku i na serveru.
 * Pravila su ista za oba jezika; razlikuju se samo poruke.
 */
export function contactSchema(locale: Locale) {
  const m = getDict(locale).messages.contact;
  return z.object({
    name: z.string().transform(clean).pipe(z.string().min(2, m.nameMin).max(100, m.nameMax)),
    business: z.string().transform(clean).pipe(z.string().min(2, m.businessMin).max(120, m.businessMax)),
    email: z.string().transform(clean).pipe(z.email(m.email).max(160)),
    phone: z
      .string()
      .transform(clean)
      .pipe(z.string().max(30, m.phoneMax).regex(/^[+\d\s()/-]*$/, m.phoneChars))
      .optional()
      .or(z.literal("")),
    venueType: z.enum(venueTypes, { message: m.venueType }),
    message: z.string().transform(clean).pipe(z.string().min(10, m.messageMin).max(2000, m.messageMax)),
    privacy: z.literal(true, { message: m.privacy }),
    /** Zasebna, neobavezna privola za newsletter (nikad unaprijed označena). */
    newsletter: z.boolean().optional(),
    /** Jezik stranice s koje je upit poslan */
    locale: z.enum(["hr", "en"]).optional(),
    /** Izvor posjeta iz sesije — postoji samo ako je posjetitelj pristao na analitiku. */
    src: z
      .object({
        ref: z.string().max(120).optional(),
        utmSource: z.string().max(60).optional(),
        utmMedium: z.string().max(60).optional(),
        utmCampaign: z.string().max(80).optional(),
        landing: z.string().max(120).optional(),
      })
      .optional(),
    // Zamke za spam — ne prikazuju se ljudima
    website: z.string().max(0).optional().or(z.literal("")),
    startedAt: z.number().int().positive(),
    turnstileToken: z.string().max(4096).optional(),
  });
}

export type ContactInput = z.input<ReturnType<typeof contactSchema>>;
