import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { CookieSettingsButton } from "@/components/privacy/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Politika kolačića",
  description: "Koje kolačiće koristi web stranica Tavla, zašto i kako upravljati svojim pristankom.",
  alternates: { canonical: "/kolacici" },
};

export default function CookiesPage() {
  return (
    <LegalPage title="Politika kolačića" path="/kolacici">
      <p>
        Kolačići su male datoteke koje stranica sprema u vaš preglednik. Nužne kolačiće koristimo jer bez njih stranica ne radi
        ispravno. Sve ostale koristimo samo ako na to izričito pristanete, a prije toga se ne učitavaju.
      </p>

      <p>
        <CookieSettingsButton className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-[0.9375rem] font-medium text-white" label="Promijeni postavke kolačića" />
      </p>

      <h2>Kolačići koje koristimo</h2>
      <table>
        <thead>
          <tr><th>Naziv</th><th>Kategorija</th><th>Svrha</th><th>Trajanje</th></tr>
        </thead>
        <tbody>
          <tr><td>tavla_consent</td><td>Nužni</td><td>Pamti vaš izbor o kolačićima</td><td>6 mjeseci</td></tr>
          <tr>
            <td>cf_* (samo ako je uključen Cloudflare Turnstile)</td>
            <td>Nužni</td>
            <td>Zaštita kontakt obrasca od automatiziranog spama</td>
            <td>Sesija</td>
          </tr>
        </tbody>
      </table>

      <h2>Druga pohrana u pregledniku</h2>
      <table>
        <thead>
          <tr><th>Naziv</th><th>Kategorija</th><th>Svrha</th><th>Trajanje</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>tavla_sid, tavla_attr (sessionStorage)</td>
            <td>Analitički — samo uz pristanak</td>
            <td>Slučajni ID sesije i izvor posjeta (domena, UTM) za vlastitu statistiku korištenja stranice. Ne sadrži IP adresu ni podatke o uređaju.</td>
            <td>Do zatvaranja kartice</td>
          </tr>
        </tbody>
      </table>

      <h2>Statistika bez kolačića</h2>
      <p>
        Za ukupan broj posjeta i brzinu učitavanja koristimo <strong>Cloudflare Web Analytics</strong>. Ne postavlja kolačiće, ne koristi
        lokalnu pohranu i ne prepoznaje vas između posjeta, pa se učitava bez pristanka. Vidimo samo zbirne podatke (broj posjeta, izvor,
        država, vrsta uređaja).
      </p>
      <p>
        Vlastitu statistiku korištenja (koje sekcije su korisne, gdje posjetitelji odustaju) prikupljamo <strong>samo ako pristanete na
        analitičke kolačiće</strong>. Pojedinačni događaji čuvaju se 13 mjeseci, a nakon toga samo zbirni dnevni podaci. Kad povučete
        pristanak, slanje odmah prestaje, a ID sesije se briše.
      </p>
      <p>Marketinške kolačiće trenutno ne koristimo. Ako ih uvedemo, ova tablica će biti dopunjena i tražit ćemo novi pristanak.</p>

      <h2>Upravljanje pristankom</h2>
      <ul>
        <li>Pri prvom posjetu možete prihvatiti sve, odbiti neobavezne ili odabrati kategorije. Ništa neobavezno nije unaprijed označeno.</li>
        <li>Odluku možete promijeniti u bilo kojem trenutku putem poveznice „Postavke kolačića” u podnožju svake stranice.</li>
        <li>Kad povučete pristanak na analitiku, uklanjamo analitičke kolačiće i stranica se osvježava bez njih.</li>
        <li>Kolačiće možete obrisati i u postavkama svog preglednika.</li>
      </ul>

      <h2>Više informacija</h2>
      <p>Kako obrađujemo osobne podatke opisano je u <a href="/privatnost">Politici privatnosti</a>.</p>
    </LegalPage>
  );
}
