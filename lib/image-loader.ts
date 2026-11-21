import manifest from "./image-manifest.json";

/**
 * Loader za next/image: umjesto optimizacije na serveru (spora na Cloudflare Workersima)
 * vraća unaprijed pripremljenu WebP datoteku iz public/_img.
 * Datoteke radi scripts/optimize-images.mjs.
 */
type Entry = { h: string; w: number[] };

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const entry = (manifest as Record<string, Entry>)[src];
  // SVG, vanjske slike i slike koje skripta još nije obradila idu kakve jesu
  if (!entry) return src;
  const w = entry.w.find((x) => x >= width) ?? entry.w[entry.w.length - 1];
  const base = src.replace(/^\/images\//, "").replace(/\.(jpe?g|png|webp)$/i, "");
  return `/_img/${base}.${entry.h}-${w}.webp`;
}
