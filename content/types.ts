/**
 * Zajednički tipovi sadržaja. Hrvatski i engleski sadržaj koriste iste tipove,
 * a content/index.ts pri buildu provjerava da se statusi, ID-jevi i cijene podudaraju.
 */

/**
 * status:
 *   "live" — radi u trenutnoj verziji aplikacije, prikazuje se kao dostupno
 *   "soon" — u razvoju, prikazuje se s oznakom "Uskoro"
 *   "planned" — u planu; prikazuje se SAMO na stranicama Tavla AI uz oznaku "U planu", nikad kao dostupno
 */
export type FeatureStatus = "live" | "soon" | "planned";

export type Feature = {
  id: string;
  title: string;
  text: string;
  status: FeatureStatus;
};

export type AiVisual = "menu" | "tips" | "staff" | "loyalty" | "insights" | "branding" | "analytics" | "pos" | "language";

export type AiFeature = {
  /** stabilni ID (isti na oba jezika) — analitika, newsletter interes */
  id: string;
  /** sidro na stranici stupa, npr. "ai-tips" (može se razlikovati po jeziku) */
  anchor: string;
  name: string;
  /** najviše 6 riječi, za izbornik */
  short: string;
  title: string;
  body: string;
  points: string[];
  status: FeatureStatus;
  ai: boolean;
  visual: AiVisual;
};

/** Interni ID stupa (hrvatski slug). URL po jeziku je u content/routes.ts. */
export type PillarSlug = "poslovanje" | "tim" | "gosti" | "rast";

export type FaqItem = { q: string; a: string };

export type AiPillar = {
  slug: PillarSlug;
  /** naziv u izborniku i natpis iznad H1 */
  name: string;
  headline: string;
  lead: string;
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  features: AiFeature[];
  /** "Kako AI pomaže" prikazuje se samo ako stup ima AI značajke */
  aiSteps?: [string, string, string];
  faq: FaqItem[];
};

export type AiOverview = {
  headline: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  transparency: { title: string; lead: string; items: { title: string; text: string }[] };
};

export type Industry = {
  id: string;
  name: string;
  text: string;
  image: string;
  imageAlt: string;
};

/**
 * photo: putanja u /public (npr. "/team/luka.jpg"), prazno = monogram
 * bio / linkedin: prazno = ne prikazuje se
 */
export type TeamMember = {
  name: string;
  role: string;
  photo?: string;
  bio?: string;
  linkedin?: string;
};

/**
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

/** status: "uvodi" (tek kreću) | "koristi" (Tavla je u radu) */
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
