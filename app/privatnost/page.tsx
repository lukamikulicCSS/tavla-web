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
            <td>Anonimni podaci o posjetu (samo uz pristanak)</td>
            <td>Statistika korištenja stranice</td>
            <td>Privola (t. a)</td>
            <td>[UPISATI: prema postavkama alata za analitiku]</td>
          </tr>
        </tbody>
      </table>
      <p>Ne prikupljamo više podataka nego što je potrebno, ne prodajemo ih i ne koristimo ih za automatizirano odlučivanje ni profiliranje.</p>

      <h2>3. Primatelji i izvršitelji obrade</h2>
      <p>Podatke dijelimo samo s pružateljima usluga koji nam pomažu u radu stranice, na temelju ugovora o obradi podataka:</p>
      <ul>
        <li>[UPISATI: hosting, npr. Vercel Inc. — smještaj web stranice]</li>
        <li>[UPISATI: slanje e-pošte, npr. Resend — dostava upita iz obrasca]</li>
        <li>[UPISATI: ako se koristi — Upstash (ograničenje broja upita), Cloudflare Turnstile (zaštita od spama), alat za analitiku]</li>
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
