/**
 * Rječnici po jeziku. Engleski je tipiziran hrvatskim (Dict) → TypeScript javlja ključ koji nedostaje.
 * Uz to, pri buildu (na poslužitelju) provjeravamo da se statusi značajki, ID-jevi i
 * cijene podudaraju između jezika — inače build pada.
 */
import { dict as hr } from "./hr";
import { dict as en } from "./en";
import type { Locale } from "./routes";

export type Dict = typeof hr;

const dicts: Record<Locale, Dict> = { hr, en };

export const getDict = (locale: Locale): Dict => dicts[locale];

export { type Locale } from "./routes";

/** Pomoćno: stupovi Tavla AI */
export const pillarBySlug = (locale: Locale, slug: string) => dicts[locale].ai.pillars.find((p) => p.slug === slug);
export const allAiFeatures = (locale: Locale) => dicts[locale].ai.pillars.flatMap((p) => p.features.map((f) => ({ ...f, pillar: p.slug })));

// ─────────────── Provjera dosljednosti hr ↔ en (samo na poslužitelju / pri buildu) ───────────────
function assertSame(label: string, a: unknown, b: unknown) {
  const ja = JSON.stringify(a);
  const jb = JSON.stringify(b);
  if (ja !== jb) throw new Error(`[content] hr ↔ en se ne podudaraju: ${label}\n  hr: ${ja}\n  en: ${jb}`);
}

if (typeof window === "undefined") {
  const featureKeys = (d: Dict) => [d.features.guest, d.features.staff, d.features.owner].map((list) => list.map((f) => [f.id, f.status]));
  assertSame("značajke (id, status)", featureKeys(hr), featureKeys(en));

  const pillarKeys = (d: Dict) => d.ai.pillars.map((p) => [p.slug, Boolean(p.aiSteps), p.faq.length, p.features.map((f) => [f.id, f.status, f.ai, f.visual, f.points.length])]);
  assertSame("Tavla AI (slug, id, status, ai, visual)", pillarKeys(hr), pillarKeys(en));
  assertSame("Tavla AI transparentnost", hr.ai.overview.transparency.items.length, en.ai.overview.transparency.items.length);
  // [PROVJERI] stavke ostaju označene na oba jezika
  assertSame(
    "Tavla AI PROVJERI oznake",
    hr.ai.overview.transparency.items.map((i) => i.text.startsWith("[")),
    en.ai.overview.transparency.items.map((i) => i.text.startsWith("[")),
  );

  assertSame("česta pitanja (broj)", hr.faq.length, en.faq.length);
  assertSame("objekti (id, slika)", hr.industries.map((i) => [i.id, i.image]), en.industries.map((i) => [i.id, i.image]));
  assertSame("partneri (id, status, logo, url)", hr.partners.map((p) => [p.id, p.status, p.logo, p.url]), en.partners.map((p) => [p.id, p.status, p.logo, p.url]));
  assertSame("tim (imena)", hr.team.map((t) => t.name), en.team.map((t) => t.name));
  assertSame("izjave (broj)", hr.testimonials.length, en.testimonials.length);
  assertSame("koristi (broj)", hr.home.benefits.items.length, en.home.benefits.items.length);
  assertSame("AI najava (stavke)", hr.home.aiSoon.items.map((i) => i.visual), en.home.aiSoon.items.map((i) => i.visual));

  const prices = (d: Dict) => [
    d.ui.nav.aiPromo.items.map((i) => i.price),
    d.home.aiSoon.menuChip.price,
    d.ui.aiVisuals.menu.picks.map((i) => i.p),
    d.ui.aiVisuals.menu.list.map((i) => i.p),
    d.ui.aiVisuals.tips.lines.map((i) => i.p),
    d.ui.aiVisuals.tips.totalValue,
    d.ui.aiVisuals.language.rows.map((i) => i.p),
    d.ui.aiVisuals.mini.pick.p,
  ];
  assertSame("cijene u prikazima sučelja", prices(hr), prices(en));
}
