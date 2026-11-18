import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description: "Kako Tavla prikuplja, koristi i štiti osobne podatke posjetitelja web stranice i korisnika kontakt obrasca.",
  alternates: { canonical: "/privatnost" },
};

export default function PrivacyPage() {
  const L = site.legal;
  return (
    <LegalPage title="Politika privatnosti" path="/privatnost">
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
    </LegalPage>
  );
}
