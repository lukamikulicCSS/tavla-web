import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/privatnost`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/kolacici`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/uvjeti`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
