/**
 * JEDINO MJESTO za parove ruta hr ↔ en.
 * Iz ove datoteke čitaju: prebacivač jezika, hreflang/canonical (metadata), sitemap i linkovi u komponentama.
 *
 * Hrvatski je na korijenu (postojeći, indeksirani URL-ovi — NE MIJENJATI).
 * Engleski je pod /en.
 */
export const locales = ["hr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "hr";

export const isLocale = (v: unknown): v is Locale => v === "hr" || v === "en";

/** BCP 47 oznake (JSON-LD, hreflang) i Open Graph locale */
export const langTag: Record<Locale, string> = { hr: "hr-HR", en: "en" };
export const ogLocale: Record<Locale, string> = { hr: "hr_HR", en: "en_US" };

type RouteDef = {
  hr: string;
  en: string;
  /** false = noindex, ne ide u sitemap */
  index: boolean;
  priority?: number;
  changeFrequency?: "monthly" | "yearly";
};

export const routes = {
  home: { hr: "/", en: "/en", index: true, priority: 1, changeFrequency: "monthly" },
  ai: { hr: "/tavla-ai", en: "/en/tavla-ai", index: true, priority: 0.9, changeFrequency: "monthly" },
  "ai:poslovanje": { hr: "/tavla-ai/poslovanje", en: "/en/tavla-ai/operations", index: true, priority: 0.8, changeFrequency: "monthly" },
  "ai:tim": { hr: "/tavla-ai/tim", en: "/en/tavla-ai/team", index: true, priority: 0.8, changeFrequency: "monthly" },
  "ai:gosti": { hr: "/tavla-ai/gosti", en: "/en/tavla-ai/guests", index: true, priority: 0.8, changeFrequency: "monthly" },
  "ai:rast": { hr: "/tavla-ai/rast", en: "/en/tavla-ai/growth", index: true, priority: 0.8, changeFrequency: "monthly" },
  privacy: { hr: "/privatnost", en: "/en/privacy", index: true, priority: 0.3, changeFrequency: "yearly" },
  cookies: { hr: "/kolacici", en: "/en/cookies", index: true, priority: 0.3, changeFrequency: "yearly" },
  terms: { hr: "/uvjeti", en: "/en/terms", index: true, priority: 0.3, changeFrequency: "yearly" },
  newsletterConfirm: { hr: "/newsletter/potvrda", en: "/en/newsletter/confirm", index: false },
  newsletterUnsubscribe: { hr: "/newsletter/odjava", en: "/en/newsletter/unsubscribe", index: false },
} as const satisfies Record<string, RouteDef>;

export type RouteKey = keyof typeof routes;

/** Sidra sekcija na početnoj (id-jevi elemenata), po jeziku. */
export const anchors = {
  hr: { top: "top", contact: "kontakt", how: "kako-funkcionira", solutions: "rjesenja", about: "o-nama", demo: "demo", partners: "partneri", newsletter: "novosti" },
  en: { top: "top", contact: "contact", how: "how-it-works", solutions: "solutions", about: "about", demo: "demo", partners: "partners", newsletter: "newsletter" },
} as const satisfies Record<Locale, Record<string, string>>;

export type AnchorKey = keyof (typeof anchors)["hr"];

/** Putanja rute na zadanom jeziku, npr. href("privacy", "en") → "/en/privacy" */
export function href(key: RouteKey, locale: Locale, anchor?: AnchorKey | string) {
  const path = routes[key][locale];
  if (!anchor) return path;
  const id = anchor in anchors[locale] ? anchors[locale][anchor as AnchorKey] : anchor;
  return `${path}#${id}`;
}

/** Ključ rute stupa Tavla AI iz internog sluga (poslovanje | tim | gosti | rast) */
export const pillarRoute = (slug: string) => `ai:${slug}` as RouteKey;

/** Zadnji segment URL-a stupa na zadanom jeziku, npr. ("poslovanje", "en") → "operations" */
export const pillarSegment = (slug: string, locale: Locale) => routes[pillarRoute(slug)][locale].split("/").pop()!;

/** Obrnuto: interni slug stupa iz segmenta URL-a */
export function pillarSlugFromSegment(segment: string, locale: Locale): string | undefined {
  for (const [key, r] of Object.entries(routes)) {
    if (key.startsWith("ai:") && r[locale].split("/").pop() === segment) return key.slice(3);
  }
  return undefined;
}

/** Jezik iz putanje */
export const localeFromPath = (pathname: string): Locale => (pathname === "/en" || pathname.startsWith("/en/") ? "en" : "hr");

/** Ključ rute iz putanje (za prebacivač jezika). Nepoznata putanja → undefined. */
export function routeKeyFromPath(pathname: string): RouteKey | undefined {
  const p = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const locale = localeFromPath(p);
  return (Object.keys(routes) as RouteKey[]).find((k) => routes[k][locale] === p);
}

/** Ista stranica na drugom jeziku (nepoznata → početna). Sidro se prevodi ako postoji par. */
export function switchLocalePath(pathname: string, to: Locale, hash = "") {
  const from = localeFromPath(pathname);
  const key = routeKeyFromPath(pathname) ?? "home";
  const id = hash.replace(/^#/, "");
  if (!id) return routes[key][to];
  const anchorKey = (Object.keys(anchors[from]) as AnchorKey[]).find((k) => anchors[from][k] === id);
  return `${routes[key][to]}#${anchorKey ? anchors[to][anchorKey] : id}`;
}

/**
 * alternates za Metadata: canonical na vlastiti URL + hreflang parovi.
 * x-default → hrvatska verzija.
 */
export function alternatesFor(key: RouteKey, locale: Locale) {
  const r = routes[key];
  return {
    canonical: r[locale],
    languages: { hr: r.hr, en: r.en, "x-default": r.hr },
  };
}
