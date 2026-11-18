# Graph Report - tavla-web  (2026-11-18)

## Corpus Check
- Corpus is ~20,269 words - fits in a single context window. You may not need a graph.

## Summary
- 381 nodes · 792 edges · 26 communities (23 shown, 3 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.85)
- Token cost: 749,780 input · 0 output

## Community Hubs (Navigation)
- Demo Ordering Store
- Static Pages & SEO Routes
- Package Dependencies
- Homepage Sections
- Contact Form & API
- README Docs & Stack
- Layout & Cookie Consent
- TypeScript Config
- Feature Catalog
- Brand Logo Assets
- Security Headers & CSP
- OG Social Card
- Twitter Social Card
- Restaurants Imagery
- Favicon Icon
- App Icon 1024
- App Icon 512
- Brand Icon SVG
- Brand Mark SVG
- Bars & Clubs Imagery
- Beach Bar Imagery
- Hotels Imagery
- Cafes Imagery
- Apple Touch Icon
- White Brand Mark

## God Nodes (most connected - your core abstractions)
1. `next` - 23 edges
2. `react` - 23 edges
3. `SectionHeading()` - 22 edges
4. `HomePage()` - 17 edges
5. `GuestApp()` - 17 edges
6. `Reveal()` - 17 edges
7. `compilerOptions` - 16 edges
8. `framer-motion` - 15 edges
9. `useDemo()` - 13 edges
10. `lucide-react` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Tavla — nova razina ugostiteljskog iskustva (OG alt)` --conceptually_related_to--> `Tavla Marketing Website`  [INFERRED]
  app/opengraph-image.alt.txt → README.md
- `HomePage()` --calls--> `Footer()`  [EXTRACTED]
  app/page.tsx → components/layout/Footer.tsx
- `HomePage()` --calls--> `Nav()`  [EXTRACTED]
  app/page.tsx → components/layout/Nav.tsx
- `HomePage()` --calls--> `Contact()`  [EXTRACTED]
  app/page.tsx → components/sections/Contact.tsx
- `HomePage()` --calls--> `Experiences()`  [EXTRACTED]
  app/page.tsx → components/sections/Experiences.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Contact Form Protection Flow** — readme_contact_form, readme_form_security, readme_rate_limit, readme_upstash_redis, readme_cloudflare_turnstile, readme_resend [EXTRACTED 1.00]
- **Tavla Web Tech Stack** — readme_nextjs, readme_react, readme_typescript, readme_tailwind_css, readme_framer_motion, readme_geist_font [EXTRACTED 1.00]

## Communities (26 total, 3 thin omitted)

### Community 0 - "Demo Ordering Store"
Cohesion: 0.08
Nodes (57): Action, Ctx, DemoCtx, DemoProvider(), initState(), itemById(), Line, lineCount() (+49 more)

### Community 1 - "Static Pages & SEO Routes"
Cohesion: 0.08
Nodes (34): CookiesPage(), metadata, metadata, NotFound(), metadata, PrivacyPage(), metadata, TermsPage() (+26 more)

### Community 2 - "Package Dependencies"
Cohesion: 0.06
Nodes (44): dependencies, framer-motion@^14.10.1, geist@^1.9.2, lucide-react@^1.70.0, next@^16.4.5, @opennextjs/cloudflare@^1.20.16, react@^19.3.1, react-dom@^19.3.1 (+36 more)

### Community 3 - "Homepage Sections"
Cohesion: 0.13
Nodes (28): HomePage(), AiSoon(), items, MenuChip(), TipsChip(), Benefits, Faq(), HowItWorks() (+20 more)

### Community 4 - "Contact Form & API"
Cohesion: 0.11
Nodes (22): clientIp(), dynamic, escapeHtml(), GET(), json(), POST(), runtime, sameOrigin() (+14 more)

### Community 5 - "README Docs & Stack"
Cohesion: 0.08
Nodes (23): generate-agent-files.js, node_modules/next/dist/docs, Tavla — nova razina ugostiteljskog iskustva (OG alt), Tavla — nova razina ugostiteljskog iskustva (Twitter alt), Plausible / Umami Analytics, Cloudflare Turnstile, Contact Form (api/contact), content/ Directory (+15 more)

### Community 6 - "Layout & Cookie Consent"
Cohesion: 0.16
Nodes (17): metadata, RootLayout(), viewport, AnalyticsLoader(), clearAnalyticsCookies(), Consent, CONSENT_COOKIE, CONSENT_VERSION (+9 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Feature Catalog"
Cohesion: 0.38
Nodes (7): Block(), SoonBadge(), Feature, FeatureStatus, guestFeatures, ownerFeatures, staffFeatures

### Community 9 - "Brand Logo Assets"
Cohesion: 0.28
Nodes (9): Tavla Logo (SVG), Brand Color #1F1F21 (near-black), Tavla Logo (horizontal lockup), Tavla Symbol (rounded T with dot), Tavla T Symbol Mark, Tavla Logo (White), Tavla T Monogram Mark, Tavla Wordmark (+1 more)

### Community 10 - "Security Headers & CSP"
Cohesion: 0.29
Nodes (5): analyticsOrigin, csp, nextConfig, securityHeaders, turnstileEnabled

### Community 11 - "OG Social Card"
Cohesion: 0.67
Nodes (4): Digital Menu and QR Ordering for Cafes, Restaurants, Hotels, Tavla Open Graph Social Card, Tagline: Nova razina ugostiteljskog iskustva, Tavla Logo (T-glyph + wordmark)

### Community 12 - "Twitter Social Card"
Cohesion: 0.67
Nodes (4): Digital Menu & QR Ordering for Cafes, Restaurants, Hotels, Tavla Twitter/OG Social Card, Tagline: Nova razina ugostiteljskog iskustva, Tavla Logo (T mark + wordmark)

### Community 13 - "Restaurants Imagery"
Cohesion: 0.67
Nodes (4): NFC Tap Puck, Restaurants Industry (Restorani), Restaurant Industry Photo (restorani.jpg), Tavla QR Table Tent

### Community 14 - "Favicon Icon"
Cohesion: 0.67
Nodes (3): Tavla App Icon (favicon), Tavla 'T' Monogram with Dot, Tavla Brand

### Community 15 - "App Icon 1024"
Cohesion: 0.67
Nodes (3): Tavla App Icon (1024px), Black & White Brand Palette, T + Dot Monogram

### Community 16 - "App Icon 512"
Cohesion: 0.67
Nodes (3): Tavla App Icon (512px), Tavla 'T' Monogram with Dot, Tavla Brand

### Community 17 - "Brand Icon SVG"
Cohesion: 0.67
Nodes (3): Tavla App Icon, Monochrome Palette (#111214 / #FFFFFF), Stylized T Glyph with Dot

### Community 18 - "Brand Mark SVG"
Cohesion: 0.67
Nodes (3): Brand color #1F1F21 (near-black), Stylized 't' glyph with dot motif, Tavla Brand Mark (logo icon)

### Community 19 - "Bars & Clubs Imagery"
Cohesion: 1.00
Nodes (3): Contactless Table Ordering at Bars & Clubs, Bars & Clubs Industry Photo, Tavla QR/NFC Table Stand

### Community 20 - "Beach Bar Imagery"
Cohesion: 1.00
Nodes (3): Beach Bar Sunbed Ordering, Beach Bars Industry Photo, Tavla QR/NFC Table Stand

### Community 21 - "Hotels Imagery"
Cohesion: 1.00
Nodes (3): Hotel Industry Use Case, Hotels Industry Photo (hoteli.jpg), Tavla Room Service QR Stand

### Community 22 - "Cafes Imagery"
Cohesion: 1.00
Nodes (3): Cafes (Kafici) Industry Segment, Cafe Terrace Industry Photo (Kafici), Tavla QR/NFC Table Stand

## Knowledge Gaps
- **30 isolated node(s):** `node_modules/next/dist/docs`, `generate-agent-files.js`, `React 19`, `TypeScript`, `Tailwind CSS 4` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 128 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Static Pages & SEO Routes` to `Demo Ordering Store`, `Package Dependencies`, `Homepage Sections`, `Contact Form & API`, `Layout & Cookie Consent`, `Security Headers & CSP`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **What connects `node_modules/next/dist/docs`, `generate-agent-files.js`, `React 19` to the rest of the system?**
  _30 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Demo Ordering Store` be split into smaller, more focused modules?**
  _Cohesion score 0.08269394714407502 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Demo Ordering Store` to `Static Pages & SEO Routes`, `Package Dependencies`, `Homepage Sections`, `Contact Form & API`, `Layout & Cookie Consent`, `Feature Catalog`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Should `Static Pages & SEO Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.07744107744107744 - nodes in this community are weakly interconnected._
- **Why does `framer-motion` connect `Demo Ordering Store` to `Static Pages & SEO Routes`, `Package Dependencies`, `Homepage Sections`, `Contact Form & API`, `Layout & Cookie Consent`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `Package Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05507246376811594 - nodes in this community are weakly interconnected._