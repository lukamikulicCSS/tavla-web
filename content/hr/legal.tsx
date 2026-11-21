/**
 * Pravni tekstovi (hrvatski — pravno obvezujuća verzija).
 * Premješteno iz app/privatnost, app/kolacici i app/uvjeti bez izmjene teksta.
 * Engleski prijevod: content/en/legal.tsx
 */
import Link from "next/link";
import { site } from "../site";
import { href } from "../routes";
import { CookieSettingsButton } from "@/components/privacy/CookieSettingsButton";

const L = site.legal;

export const legal = {
  privacy: {
    title: "Politika privatnosti",
    description: "Kako Tavla prikuplja, koristi i štiti osobne podatke posjetitelja web stranice i korisnika kontakt obrasca.",
    Body: function PrivacyBody() {
      return (
        <>
          <p>
            Ova politika objašnjava kako obrađujemo osobne podatke kad posjećujete ovu web stranicu i kad nam pošaljete upit. Obrada se
            temelji na Općoj uredbi o zaštiti podataka (GDPR, Uredba (EU) 2016/679) i Zakonu o provedbi Opće uredbe o zaštiti podataka.
          </p>

          <h2>1. Voditelj obrade</h2>
          <p>
            <strong>{L.companyName}</strong>, OIB {L.oib}, {L.address}, upisan u {L.registry}.<br />
            Kontakt za pitanja o privatnosti: <strong>{L.privacyEmail}</strong>
          </p>
          <p>[UPISATI: službenik za zaštitu podataka, ako je imenovan]</p>

          <h2>2. Koje podatke obrađujemo i zašto</h2>
          <table>
            <thead>
              <tr><th>Podaci</th><th>Svrha</th><th>Pravna osnova</th><th>Rok čuvanja</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Ime i prezime, naziv objekta, e-mail, telefon (neobavezno), vrsta objekta, poruka</td>
                <td>Odgovor na upit i dogovor demonstracije</td>
                <td>Radnje prije sklapanja ugovora na vaš zahtjev (čl. 6. st. 1. t. b GDPR-a) i legitimni interes odgovora na upit (t. f)</td>
                <td>[UPISATI: npr. 12 mjeseci od zadnjeg kontakta, osim ako sklopimo ugovor]</td>
              </tr>
              <tr>
                <td>Jednosmjerni hash IP adrese</td>
                <td>Zaštita obrasca od zloupotrebe i spama (ograničenje broja upita)</td>
                <td>Legitimni interes sigurnosti (t. f)</td>
                <td>Najviše 10 minuta</td>
              </tr>
              <tr>
                <td>Izbor o kolačićima</td>
                <td>Pamćenje vaše odluke o kolačićima</td>
                <td>Pravna obveza i legitimni interes (t. c i f)</td>
                <td>6 mjeseci</td>
              </tr>
              <tr>
                <td>Ime i prezime, naziv objekta, vrsta objekta i izvor posjeta (npr. „Google”, UTM kampanja — samo ako ste pristali na analitiku). E-mail i poruka se ne spremaju u bazu, stižu nam samo e-poštom.</td>
                <td>Evidencija upita za demonstraciju i mjerenje koji kanali donose upite</td>
                <td>Legitimni interes (t. f)</td>
                <td>[UPISATI: npr. 24 mjeseca od upita]</td>
              </tr>
              <tr>
                <td>Zbirna statistika posjeta bez kolačića (Cloudflare Web Analytics): broj posjeta, izvor, država, vrsta uređaja, brzina učitavanja</td>
                <td>Mjerenje posjećenosti i tehničke kvalitete stranice</td>
                <td>Legitimni interes (t. f). Ne koristi kolačiće ni identifikatore u pregledniku.</td>
                <td>Prema postavkama Cloudflarea; vidimo samo zbirne podatke</td>
              </tr>
              <tr>
                <td>
                  Podaci o korištenju stranice (samo uz pristanak „Analitički”): posjećene stranice, vrijeme provedeno na sekciji, dubina skrolanja,
                  klikovi na gumbe (položaj u odnosu na sekciju), domena s koje ste došli, UTM parametri, vrsta uređaja i raspon širine ekrana,
                  slučajni ID sesije koji se čuva samo u sessionStorage i briše zatvaranjem kartice. Bez IP adrese, bez user-agenta, bez kolačića,
                  bez sadržaja koji upisujete u obrasce.
                </td>
                <td>Poboljšanje stranice: što je posjetiteljima korisno, gdje odustaju i koliko ih zatraži demonstraciju</td>
                <td>Privola (t. a), koju možete povući u bilo kojem trenutku</td>
                <td>Pojedinačni događaji 13 mjeseci, nakon toga samo zbirni dnevni podaci bez ID-a sesije</td>
              </tr>
              <tr id="newsletter">
                <td>E-mail adresa, izvor prijave (podnožje, obrazac, stranica značajke), interes (npr. AI Tips), verzija teksta privole i vrijeme prijave, potvrde i odjave</td>
                <td>Slanje novosti i ponuda Tavle, najviše jednom mjesečno. Prijava se potvrđuje klikom na link iz maila (dvostruka potvrda).</td>
                <td>Privola (t. a). Povlačenje: link „Odjava” u svakom mailu ili e-mail na {L.privacyEmail}.</td>
                <td>Do odjave. Nepotvrđene prijave brišemo nakon 30 dana. Nakon odjave čuvamo samo adresu i vrijeme odjave kao dokaz, [UPISATI: npr. 3 godine].</td>
              </tr>
            </tbody>
          </table>
          <p>Ne prikupljamo više podataka nego što je potrebno, ne prodajemo ih i ne koristimo ih za automatizirano odlučivanje ni profiliranje.</p>

          <h2>3. Primatelji i izvršitelji obrade</h2>
          <p>Podatke dijelimo samo s pružateljima usluga koji nam pomažu u radu stranice, na temelju ugovora o obradi podataka:</p>
          <ul>
            <li>Cloudflare, Inc. — smještaj web stranice (Cloudflare Workers), baza podataka za analitiku, upite i newsletter (Cloudflare D1), statistika posjeta bez kolačića (Cloudflare Web Analytics) i zaštita pristupa internim stranicama; baza se nalazi u zapadnoj Europi (EU)</li>
            <li>Resend — slanje e-pošte (upiti iz obrasca, potvrda prijave na newsletter) i popis primatelja newslettera</li>
            <li>[UPISATI: ako se koristi — Upstash (ograničenje broja upita), Cloudflare Turnstile (zaštita od spama)]</li>
          </ul>
          <p>
            Ako se podaci prenose izvan Europskog gospodarskog prostora, prijenos se temelji na odluci o primjerenosti ili standardnim
            ugovornim klauzulama Europske komisije. [UPISATI: potvrditi za svakog izvršitelja]
          </p>

          <h2 id="prava">4. Vaša prava</h2>
          <p>U svakom trenutku možete zatražiti:</p>
          <ul>
            <li><strong>pristup</strong> podacima koje o vama obrađujemo i kopiju tih podataka,</li>
            <li><strong>ispravak</strong> netočnih ili nepotpunih podataka,</li>
            <li><strong>brisanje</strong> podataka,</li>
            <li><strong>ograničenje obrade</strong>,</li>
            <li><strong>prenosivost</strong> podataka u strukturiranom, strojno čitljivom obliku,</li>
            <li><strong>prigovor</strong> na obradu temeljenu na legitimnom interesu,</li>
            <li><strong>povlačenje privole</strong>, bez utjecaja na zakonitost obrade prije povlačenja. Pristanak na kolačiće mijenjate putem poveznice „Postavke kolačića” u podnožju stranice.</li>
          </ul>

          <h2 id="zahtjevi">5. Kako podnijeti zahtjev</h2>
          <p>
            Zahtjev pošaljite na <strong>{L.privacyEmail}</strong> s naznakom o kojem se pravu radi. Odgovorit ćemo bez nepotrebnog
            odgađanja, a najkasnije u roku od mjesec dana. Kako bismo zaštitili vaše podatke, možemo zatražiti potvrdu identiteta.
          </p>
          <p>
            Ako smatrate da obrada krši propise, imate pravo podnijeti prigovor Agenciji za zaštitu osobnih podataka (AZOP),
            Selska cesta 136, 10000 Zagreb, <a href="https://azop.hr" rel="noopener noreferrer" target="_blank">azop.hr</a>.
          </p>

          <h2>6. Sigurnost</h2>
          <p>
            Stranica se prenosi isključivo preko šifrirane veze (HTTPS). Pristupni ključevi servisa nikad nisu dostupni u pregledniku,
            upiti se provjeravaju na poslužitelju, a pristup podacima imaju samo osobe kojima je to potrebno za odgovor na upit.
          </p>

          <h2>7. Izmjene</h2>
          <p>Politiku možemo izmijeniti kad se promijeni način obrade. Datum zadnje izmjene naveden je na vrhu stranice.</p>
        </>
      );
    },
  },
  cookies: {
    title: "Politika kolačića",
    description: "Koje kolačiće koristi web stranica Tavla, zašto i kako upravljati svojim pristankom.",
    Body: function CookiesBody() {
      return (
        <>
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
          <p>Kako obrađujemo osobne podatke opisano je u <Link href={href("privacy", "hr")}>Politici privatnosti</Link>.</p>
        </>
      );
    },
  },
  terms: {
    title: "Uvjeti korištenja",
    description: "Uvjeti korištenja web stranice Tavla.",
    Body: function TermsBody() {
      return (
        <>
          <p>
            Ovi uvjeti uređuju korištenje web stranice {site.url.replace("https://", "")}. Korištenjem stranice prihvaćate ove uvjete.
            Korištenje usluge Tavla u ugostiteljskom objektu uređuje se zasebnim ugovorom s korisnikom.
          </p>

          <h2>1. Pružatelj</h2>
          <p>{L.companyName}, OIB {L.oib}, {L.address}.</p>

          <h2>2. Sadržaj stranice</h2>
          <p>
            Sadržaj stranice informativne je naravi. Opisi i prikazi sučelja služe za upoznavanje s uslugom. Mogućnosti označene kao
            „Uskoro” su u razvoju i nisu dio trenutne ponude.
          </p>

          <h2>3. Interaktivni demo</h2>
          <p>
            Demo na stranici koristi izmišljene podatke i radi isključivo u vašem pregledniku. Narudžbe iz dema ne šalju se nijednom
            stvarnom objektu niti se spremaju na naše poslužitelje.
          </p>

          <h2>4. Intelektualno vlasništvo</h2>
          <p>
            Naziv i logotip Tavla, dizajn stranice, tekstovi i prikazi sučelja zaštićeni su. Ne smiju se kopirati ni koristiti bez
            prethodnog pisanog dopuštenja.
          </p>

          <h2>5. Dopušteno korištenje</h2>
          <ul>
            <li>Zabranjeno je slanje automatiziranih ili zlonamjernih upita putem kontakt obrasca.</li>
            <li>Zabranjeni su pokušaji neovlaštenog pristupa stranici, poslužiteljima ili podacima.</li>
          </ul>

          <h2>6. Odgovornost</h2>
          <p>
            Trudimo se da stranica bude dostupna i točna, ali ne jamčimo neprekidan rad. [UPISATI: ograničenje odgovornosti u skladu s
            propisima, uz pravnu provjeru]
          </p>

          <h2>7. Mjerodavno pravo</h2>
          <p>Na ove uvjete primjenjuje se pravo Republike Hrvatske. [UPISATI: nadležni sud]</p>

          <h2>8. Kontakt</h2>
          <p>Pitanja o ovim uvjetima pošaljite na {L.privacyEmail}.</p>
        </>
      );
    },
  },
};

export type LegalText = typeof legal;
