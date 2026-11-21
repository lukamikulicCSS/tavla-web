/**
 * Priprema fotografija za brzo učitavanje.
 *
 * Za svaku sliku u public/images (jpg, jpeg, png, webp) napravi WebP verzije
 * u nekoliko širina u public/_img, s otiskom sadržaja (hash) u imenu.
 * Zato se mogu keširati godinu dana: kad zamijeniš sliku, mijenja se i ime.
 *
 * Pokreće se samo prije builda (npm "prebuild"), a može i ručno:
 *   node scripts/optimize-images.mjs
 *
 * Gotove datoteke se commitaju u git, pa build na Cloudflareu ne ovisi o ovoj skripti.
 */
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "public", "images");
const OUT = path.join(ROOT, "public", "_img");
const MANIFEST = path.join(ROOT, "lib", "image-manifest.json");
/** Mora odgovarati WIDTHS u lib/image-loader.ts */
const WIDTHS = [384, 640, 828, 1200, 1920];
const QUALITY = 72;

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("[slike] sharp nije instaliran, preskačem optimizaciju (koriste se postojeće datoteke).");
  process.exit(0);
}

async function walk(dir) {
  const out = [];
  let entries = [];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(jpe?g|png|webp)$/i.test(e.name)) out.push(p);
  }
  return out;
}

const files = await walk(SRC);
const manifest = {};
const keep = new Set();
let made = 0;

for (const file of files) {
  const buf = await readFile(file);
  const hash = createHash("sha1").update(buf).digest("hex").slice(0, 8);
  const rel = path.relative(path.join(ROOT, "public"), file).split(path.sep).join("/"); // images/stats/x.jpg
  const src = "/" + rel;
  const base = rel.replace(/^images\//, "").replace(/\.(jpe?g|png|webp)$/i, ""); // stats/x
  const meta = await sharp(buf).metadata();
  // Ne radi verzije šire od originala (osim najmanje koja ga pokriva)
  const max = meta.width ?? WIDTHS[WIDTHS.length - 1];
  const widths = WIDTHS.filter((w, i) => w <= max || (i > 0 && WIDTHS[i - 1] < max && w > max) || i === 0);
  manifest[src] = { h: hash, w: widths };

  for (const w of widths) {
    const name = `${base}.${hash}-${w}.webp`;
    const target = path.join(OUT, name);
    keep.add(path.normalize(target));
    try {
      await stat(target);
      continue; // već postoji (isti sadržaj, isti hash)
    } catch {}
    await mkdir(path.dirname(target), { recursive: true });
    await sharp(buf)
      .rotate()
      .resize({ width: Math.min(w, meta.width ?? w), withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(target);
    made++;
  }
}

// Ukloni stare verzije slika koje više ne postoje
for (const f of await walk(OUT)) {
  if (!keep.has(path.normalize(f))) await rm(f);
}

await mkdir(path.dirname(MANIFEST), { recursive: true });
const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + "\n");
console.log(`[slike] ${files.length} slika, ${made} novih datoteka u public/_img`);
