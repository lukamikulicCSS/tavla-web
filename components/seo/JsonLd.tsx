import { site } from "@/content/site";
import { getDict } from "@/content";
import { href, langTag, routes, type Locale, type RouteKey } from "@/content/routes";

/**
 * Schema.org.
 *  - Organization: JEDNA za oba jezika (isti @id).
 *  - WebSite: po jeziku (vlastiti @id i inLanguage).
 *  - WebPage: za svaku stranicu, s inLanguage i vezom na WebSite.
 */
const ORG_ID = `${site.url}/#organizacija`;
const websiteId = (locale: Locale) => `${site.url}${locale === "hr" ? "/" : href("home", "en") + "/"}#web`;

function organization() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/tavla-icon-512.png`,
    ...(site.contact.linkedin ? { sameAs: [site.contact.linkedin] } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    founder: [
      { "@type": "Person", name: "Ante Spajić" },
      { "@type": "Person", name: "Luka Mikulić" },
    ],
  };
}

function website(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": websiteId(locale),
    url: `${site.url}${routes.home[locale] === "/" ? "" : routes.home[locale]}`,
    name: site.name,
    inLanguage: langTag[locale],
    publisher: { "@id": ORG_ID },
  };
}

function webPage(route: RouteKey, locale: Locale, name: string, description?: string) {
  const url = `${site.url}${routes[route][locale]}`;
  return {
    "@type": "WebPage",
    "@id": `${url}#stranica`,
    url,
    name,
    ...(description ? { description } : {}),
    inLanguage: langTag[locale],
    isPartOf: { "@id": websiteId(locale) },
    publisher: { "@id": ORG_ID },
  };
}

/** Organization, WebSite, WebPage, SoftwareApplication i FAQPage za početnu. */
export function HomeJsonLd({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const graph = [
    organization(),
    website(locale),
    webPage("home", locale, d.ui.meta.title, d.ui.meta.description),
    {
      "@type": "SoftwareApplication",
      name: "Tavla",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: d.ui.meta.appSubCategory,
      operatingSystem: "Web, iOS, Android",
      description: d.ui.meta.description,
      url: `${site.url}${routes.home[locale] === "/" ? "" : routes.home[locale]}`,
      inLanguage: langTag[locale],
      publisher: { "@id": ORG_ID },
      // Cijena se namjerno ne navodi dok nije javno objavljena.
    },
    {
      "@type": "FAQPage",
      inLanguage: langTag[locale],
      mainEntity: d.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />;
}

/** WebPage (+ Organization i WebSite istog jezika) za podstranice. */
export function WebPageJsonLd({ route, locale, name, description }: { route: RouteKey; locale: Locale; name: string; description?: string }) {
  return <JsonLd data={{ "@context": "https://schema.org", "@graph": [organization(), website(locale), webPage(route, locale, name, description)] }} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
      }}
    />
  );
}

export function FaqJsonLd({ faq, locale }: { faq: { q: string; a: string }[]; locale?: Locale }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        ...(locale ? { inLanguage: langTag[locale] } : {}),
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }}
    />
  );
}

/** SoftwareApplication s popisom značajki (samo dostupne + jasno označene u razvoju). */
export function AiSoftwareJsonLd({ features, description, locale }: { features: { name: string; status: "live" | "soon" | "planned" }[]; description: string; locale: Locale }) {
  const m = getDict(locale).ui.meta;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Tavla",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: m.aiAppSubCategory,
        operatingSystem: "Web, iOS, Android",
        description,
        url: `${site.url}${routes.ai[locale]}`,
        inLanguage: langTag[locale],
        featureList: features.map((f) => `${f.name}${m.statusSuffix[f.status]}`),
        publisher: { "@id": ORG_ID },
      }}
    />
  );
}

function JsonLd({ data }: { data: unknown }) {
  // Escapiranje "<" sprječava zatvaranje <script> taga iz sadržaja
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
