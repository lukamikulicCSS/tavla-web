# Tavla — marketinška web stranica

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Geist (self-hosted)

Zaseban projekt od aplikacije Tavla. Ne dira repozitorij aplikacije ni njezinu bazu.

---

## Pokretanje lokalno (Windows CMD)

Potreban je Node.js 20.9 ili noviji.

```cmd
cd C:\putanja\do\tavla-web
npm install
copy .env.example .env.local
npm run dev
```

Otvori http://localhost:3000

U dev načinu kontakt forma radi i bez Resend ključa (upit se samo ispiše u terminal).

Provjera prije objave:

```cmd
npm run typecheck
npm run build
npm run start
npm run audit
```

---

## Objava na Vercel

1. Napravi novi GitHub repozitorij i pushaj projekt:
   ```cmd
   git init
   git add .
   git commit -m "Tavla web"
   git branch -M main
   git remote add origin https://github.com/KORISNIK/tavla-web.git
   git push -u origin main
   ```
2. Vercel → Add New → Project → odaberi repozitorij (framework se prepozna sam).
3. Settings → Environment Variables → upiši varijable iz tablice ispod.
4. Deploy. Zatim Settings → Domains → dodaj domenu (npr. tavla.hr).

---

## Varijable okruženja

| Varijabla | Obavezno | Opis |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | da | Javni URL, npr. `https://tavla.hr` (canonical, sitemap, OG) |
| `RESEND_API_KEY` | da | Ključ s resend.com — **tajno** |
| `CONTACT_TO_EMAIL` | da | Kamo stižu upiti |
| `CONTACT_FROM_EMAIL` | da | Pošiljatelj na verificiranoj domeni, npr. `Tavla <web@tavla.hr>` |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN` | preporučeno | Dijeljeni rate limit (besplatni Upstash plan je dovoljan) — **tajno** |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | ne | Cloudflare Turnstile protiv spama |
| `NEXT_PUBLIC_ANALYTICS_SRC` (+ `_DOMAIN` ili `_WEBSITE_ID`) | ne | Plausible ili Umami — učitava se tek nakon pristanka |

Bez Resend varijabli forma u produkciji vraća jasnu poruku da slanje trenutno nije moguće.

---

## Stranice

| URL | Sadržaj |
|---|---|
| `/` | Hero, brojke, tri uloge (kartice), Tavla AI, vrste objekata |
| `/rjesenja` | Pregled rješenja |
| `/rjesenja/gosti`, `/osoblje`, `/vlasnici` | Detalji po ulozi |
| `/tavla-ai` | AI meni i AI napojnice (Uskoro) |
| `/kako-funkcionira` | Tri koraka, usporedba, interaktivni demo |
| `/o-nama` | Tim, zašto Tavla, iskustva korisnika |
| `/kontakt` | Obrazac za demonstraciju |

## Gdje se što mijenja

| Što | Datoteka |
|---|---|
| **Fotografije** | `content/images.ts` — slike u `public/images/`, prazno = prikaz sučelja |
| **Brojke** | `content/stats.ts` — samo provjerene činjenice ili podaci s izvorom |
| **Značajke i status „Uskoro”** | `content/features.ts` — stavke s `PROVJERI` potvrditi prije objave |
| Navigacija | `content/navigation.ts` |
| Tim (fotografije, biografije, LinkedIn) | `content/team.ts` — fotografije u `public/team/` |
| Iskustva korisnika i logotipi partnera | `content/testimonials.ts` — samo stvarne, odobrene izjave |
| Vrste objekata (+ fotografije) | `content/industries.ts` |
| Pravni podaci tvrtke, kontakt | `content/site.ts` |
| Demo artikli i brojke | `content/demo-data.ts` |
| Oznaka „nacrt” na pravnim stranicama | `components/layout/LegalPage.tsx` → `LEGAL_DRAFT = false` |

## Struktura

```
app/                 stranice, API ruta, SEO (sitemap, robots, OG slika, ikone)
  api/contact/       obrada forme na serveru
  privatnost/ kolacici/ uvjeti/
components/
  layout/            Nav, Footer, LegalPage
  sections/          sekcije početne stranice
  product/           sučelja Tavle (gost, osoblje, vlasnik) + stanje demoa
  privacy/           pristanak na kolačiće, učitavanje analitike
  seo/               JSON-LD
  ui/                gumbi, logo, animacije
content/             sav tekst i podaci — mijenja se bez diranja komponenti
lib/                 validacija forme, rate limit
public/brand/        službeni logo (SVG + PNG)
```

## Engleska verzija (kasnije)

`content/site.ts` već ima popis jezika. Plan: dodati `content/en/…`, rute pod `app/en/`
i `alternates.languages` u `app/layout.tsx` za hreflang.

## Sigurnost — sažetak

- Sigurnosni headeri u `next.config.ts`: CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy
- Forma: provjera Origin headera (CSRF), zod validacija na serveru, ograničenje veličine, honeypot, vremenska zamka, rate limit (5 / 10 min po IP-u, IP se ne sprema već hashira), opcionalno Turnstile, HTML escapiranje u e-mailu
- Nijedan tajni ključ nema prefiks `NEXT_PUBLIC_` i nikad ne ide u preglednik
- Stranica ne koristi bazu podataka — demo radi samo u pregledniku posjetitelja
