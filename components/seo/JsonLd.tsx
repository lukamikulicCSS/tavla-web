import { site } from "@/content/site";
import { faq } from "@/content/faq";

/** Schema.org: Organization, WebSite, SoftwareApplication i FAQPage. */
export function HomeJsonLd() {
  const org = {
    "@type": "Organization",
    "@id": `${site.url}/#organizacija`,
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

  const graph = [
    org,
    {
      "@type": "WebSite",
      "@id": `${site.url}/#web`,
      url: site.url,
      name: site.name,
      inLanguage: "hr-HR",
      publisher: { "@id": `${site.url}/#organizacija` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Tavla",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Digitalni meni i QR naručivanje",
      operatingSystem: "Web, iOS, Android",
      description: site.description,
      url: site.url,
      publisher: { "@id": `${site.url}/#organizacija` },
      // Cijena se namjerno ne navodi dok nije javno objavljena.
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />;
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

function JsonLd({ data }: { data: unknown }) {
  // Escapiranje "<" sprječava zatvaranje <script> taga iz sadržaja
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
