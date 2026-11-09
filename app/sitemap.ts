import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const pages: { path: string; priority: number; freq: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, freq: "monthly" },
  { path: "/rjesenja", priority: 0.8, freq: "monthly" },
  { path: "/rjesenja/gosti", priority: 0.9, freq: "monthly" },
  { path: "/rjesenja/osoblje", priority: 0.9, freq: "monthly" },
  { path: "/rjesenja/vlasnici", priority: 0.9, freq: "monthly" },
  { path: "/tavla-ai", priority: 0.8, freq: "monthly" },
  { path: "/kako-funkcionira", priority: 0.9, freq: "monthly" },
  { path: "/o-nama", priority: 0.6, freq: "monthly" },
  { path: "/kontakt", priority: 0.8, freq: "yearly" },
  { path: "/privatnost", priority: 0.3, freq: "yearly" },
  { path: "/kolacici", priority: 0.3, freq: "yearly" },
  { path: "/uvjeti", priority: 0.3, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return pages.map((p) => ({ url: `${site.url}${p.path}`, lastModified: now, changeFrequency: p.freq, priority: p.priority }));
}
