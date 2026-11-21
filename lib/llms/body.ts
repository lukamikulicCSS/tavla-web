/**
 * Sadržaj /llms.txt (hr) i /en/llms.txt (en) — sažetak za AI asistente i tražilice (GEO).
 * Generira se iz content/, pa su statusi uvijek isti kao na stranici.
 */
import { getDict } from "@/content";
import type { FeatureStatus } from "@/content/types";
import { site } from "@/content/site";
import { href, pillarRoute, type Locale } from "@/content/routes";

const T = {
  hr: {
    label: (s: FeatureStatus) => (s === "live" ? "dostupno" : s === "soon" ? "u razvoju" : "u planu"),
    intro:
      "Tavla je hrvatska digitalna platforma za ugostiteljstvo: QR/NFC digitalni meni i naručivanje sa stola, panel za osoblje i pregled poslovanja za vlasnike. Namijenjena je kafićima, restoranima, barovima, beach barovima i hotelima s gužvama.",
    lang: "- Jezik stranice: hrvatski",
    other: `- English version: ${site.url}${href("home", "en")} (${site.url}/en/llms.txt)`,
    contact: "Kontakt",
    or: "ili obrazac na",
    founders: "- Osnivači: Luka Mikulić (CEO), Ante Spajić (CTO)",
    noApp: "- Gost ne preuzima aplikaciju: skenira kod na stolu i naručuje iz preglednika.",
    core: "## Osnovne značajke",
    aiIntro: "AI u Tavli predlaže, a vlasnik objekta uvijek odobrava promjene. Osobni podaci gostiju ne koriste se za treniranje AI modela.",
    overview: "Pregled",
    important: "## Važno",
    notes: [
      '- Značajke označene "u razvoju" ili "u planu" još nisu dostupne u objektima.',
      "- Cijene se dogovaraju prema veličini i vrsti objekta; nisu javno objavljene.",
    ],
  },
  en: {
    label: (s: FeatureStatus) => (s === "live" ? "available" : s === "soon" ? "in development" : "planned"),
    intro:
      "Tavla is a Croatian digital platform for hospitality: a QR/NFC digital menu and ordering from the table, a staff panel and a business overview for owners. It is built for busy cafés, restaurants, bars, beach bars and hotels.",
    lang: "- Language: English (translation; the primary site is in Croatian)",
    other: `- Croatian version: ${site.url}/ (${site.url}/llms.txt)`,
    contact: "Contact",
    or: "or the form at",
    founders: "- Founders: Luka Mikulić (CEO), Ante Spajić (CTO)",
    noApp: "- Guests don't download an app: they scan the code on the table and order in the browser.",
    core: "## Core features",
    aiIntro: "AI in Tavla suggests, and the venue owner always approves changes. Guests' personal data is not used to train AI models.",
    overview: "Overview",
    important: "## Important",
    notes: [
      '- Features marked "in development" or "planned" are not yet available in venues.',
      "- Pricing is agreed based on the size and type of venue; it is not published.",
    ],
  },
} as const;

export function llmsBody(locale: Locale) {
  const d = getDict(locale);
  const t = T[locale];
  const core = [...d.features.guest, ...d.features.staff, ...d.features.owner];
  return `# Tavla

> ${t.intro}

- Web: ${site.url}${locale === "hr" ? "" : href("home", locale)}
${t.lang}
${t.other}
- ${t.contact}: ${site.contact.email} ${t.or} ${site.url}${href("home", locale, "contact")}
${t.founders}
${t.noApp}

${t.core}

${core.map((f) => `- ${f.title} (${t.label(f.status)}): ${f.text}`).join("\n")}

## Tavla AI

${t.aiIntro}
${t.overview}: ${site.url}${href("ai", locale)}

${d.ai.pillars
  .map(
    (p) => `### ${p.name}

${site.url}${href(pillarRoute(p.slug), locale)}

${p.features.map((f) => `- ${f.name} (${t.label(f.status)}): ${f.body}`).join("\n")}`,
  )
  .join("\n\n")}

${t.important}

${t.notes.join("\n")}
`;
}

export const llmsResponse = (locale: Locale) =>
  new Response(llmsBody(locale), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
