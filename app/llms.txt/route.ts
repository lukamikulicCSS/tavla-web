/**
 * /llms.txt — sažetak za AI asistente i tražilice (GEO).
 * Generira se iz content/ai.ts i content/features.ts, pa su statusi uvijek isti kao na stranici.
 */
import { pillars } from "@/content/ai";
import { guestFeatures, ownerFeatures, staffFeatures, type FeatureStatus } from "@/content/features";
import { site } from "@/content/site";

export const dynamic = "force-static";

const label = (s: FeatureStatus) => (s === "live" ? "dostupno" : s === "soon" ? "u razvoju" : "u planu");

export function GET() {
  const core = [...guestFeatures, ...staffFeatures, ...ownerFeatures];
  const body = `# Tavla

> Tavla je hrvatska digitalna platforma za ugostiteljstvo: QR/NFC digitalni meni i naručivanje sa stola, panel za osoblje i pregled poslovanja za vlasnike. Namijenjena je kafićima, restoranima, barovima, beach barovima i hotelima s gužvama.

- Web: ${site.url}
- Jezik stranice: hrvatski
- Kontakt: ${site.contact.email} ili obrazac na ${site.url}/#kontakt
- Osnivači: Luka Mikulić (CEO), Ante Spajić (CTO)
- Gost ne preuzima aplikaciju: skenira kod na stolu i naručuje iz preglednika.

## Osnovne značajke

${core.map((f) => `- ${f.title} (${label(f.status)}): ${f.text}`).join("\n")}

## Tavla AI

AI u Tavli predlaže, a vlasnik objekta uvijek odobrava promjene. Osobni podaci gostiju ne koriste se za treniranje AI modela.
Pregled: ${site.url}/tavla-ai

${pillars
  .map(
    (p) => `### ${p.name}

${site.url}/tavla-ai/${p.slug}

${p.features.map((f) => `- ${f.name} (${label(f.status)}): ${f.body}`).join("\n")}`,
  )
  .join("\n\n")}

## Važno

- Značajke označene "u razvoju" ili "u planu" još nisu dostupne u objektima.
- Cijene se dogovaraju prema veličini i vrsti objekta; nisu javno objavljene.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
