import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { locales, routes, type RouteKey } from "@/content/routes";

/** Obje jezične verzije svake indeksirane rute, s hreflang alternativama (iz content/routes.ts). */
const abs = (path: string) => `${site.url}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return (Object.keys(routes) as RouteKey[])
    .filter((k) => routes[k].index)
    .flatMap((k) => {
      const r = routes[k] as (typeof routes)[RouteKey] & { priority?: number; changeFrequency?: "monthly" | "yearly" };
      const languages = { hr: abs(r.hr), en: abs(r.en), "x-default": abs(r.hr) };
      return locales.map((l) => ({
        url: abs(r[l]),
        lastModified: now,
        changeFrequency: r.changeFrequency,
        priority: r.priority,
        alternates: { languages },
      }));
    });
}
