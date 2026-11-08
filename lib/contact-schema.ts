import { z } from "zod";

/** Zajednička shema — ista pravila u pregledniku i na serveru. */
export const venueTypes = [
  { value: "kafic", label: "Kafić" },
  { value: "restoran", label: "Restoran" },
  { value: "bar", label: "Bar" },
  { value: "beach-bar", label: "Beach bar" },
  { value: "nocni-klub", label: "Noćni klub" },
  { value: "hotel", label: "Hotel" },
  { value: "ostalo", label: "Ostalo" },
] as const;

const venueValues = venueTypes.map((v) => v.value) as [string, ...string[]];

// Uklanja kontrolne znakove (osim novog reda) — ništa od korisnika ne ide u HTML neescapirano.
const clean = (s: string) => s.replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "").trim();

export const contactSchema = z.object({
  name: z.string().transform(clean).pipe(z.string().min(2, "Upišite ime i prezime.").max(100, "Ime je predugo.")),
  business: z.string().transform(clean).pipe(z.string().min(2, "Upišite naziv objekta.").max(120, "Naziv je predug.")),
  email: z.string().transform(clean).pipe(z.email("Upišite ispravnu e-mail adresu.").max(160)),
  phone: z
    .string()
    .transform(clean)
    .pipe(z.string().max(30, "Broj je predug.").regex(/^[+\d\s()/-]*$/, "Broj smije sadržavati samo znamenke, razmake i +."))
    .optional()
    .or(z.literal("")),
  venueType: z.enum(venueValues, { message: "Odaberite vrstu objekta." }),
  message: z.string().transform(clean).pipe(z.string().min(10, "Napišite barem nekoliko riječi.").max(2000, "Poruka može imati najviše 2000 znakova.")),
  privacy: z.literal(true, { message: "Potrebno je potvrditi da ste pročitali obavijest o privatnosti." }),
  // Zamke za spam — ne prikazuju se ljudima
  website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.number().int().positive(),
  turnstileToken: z.string().max(4096).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
