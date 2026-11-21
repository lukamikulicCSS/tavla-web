import { z } from "zod";
import { getDict } from "@/content";
import type { Locale } from "@/content/routes";

/** Verzija teksta privole. Povećati kad se promijeni tekst ispod forme ili svrha obrade. */
export const NEWSLETTER_CONSENT_VERSION = "2026-11-v1";

/** Tekst privole po jeziku (content/{hr,en}/messages.ts → newsletter.consentText) */
export const newsletterConsentText = (locale: Locale) => getDict(locale).messages.newsletter.consentText;

export function newsletterSchema(locale: Locale) {
  return z.object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.email(getDict(locale).messages.contact.email).max(160)),
    /** footer | kontakt | stup:<slug> */
    source: z.string().regex(/^(footer|kontakt|stup:[a-z]+)$/),
    interest: z.string().regex(/^[a-z0-9-]{1,40}$/).optional(),
    /** Jezik stranice s koje je prijava poslana (sprema se uz prijavu, određuje jezik potvrdnog maila) */
    locale: z.enum(["hr", "en"]).optional(),
    website: z.string().max(0).optional().or(z.literal("")),
    startedAt: z.number().int().positive(),
  });
}

export type NewsletterInput = z.input<ReturnType<typeof newsletterSchema>>;
