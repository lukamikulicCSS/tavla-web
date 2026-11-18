import { z } from "zod";

/** Verzija teksta privole. Povećati kad se promijeni tekst ispod forme ili svrha obrade. */
export const NEWSLETTER_CONSENT_VERSION = "2026-11-v1";

export const NEWSLETTER_CONSENT_TEXT =
  "Prijavom pristajete da vam Tavla šalje novosti i ponude e-mailom, najviše jednom mjesečno. Odjava je moguća u svakom mailu.";

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Upišite ispravnu e-mail adresu.").max(160)),
  /** footer | kontakt | stup:<slug> */
  source: z.string().regex(/^(footer|kontakt|stup:[a-z]+)$/),
  interest: z.string().regex(/^[a-z0-9-]{1,40}$/).optional(),
  website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.number().int().positive(),
});

export type NewsletterInput = z.input<typeof newsletterSchema>;
