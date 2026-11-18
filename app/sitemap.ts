import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { pillars } from "@/content/ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/tavla-ai`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...pillars.map((p) => ({
      url: `${site.url}/tavla-ai/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/privatnost`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/kolacici`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/uvjeti`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
