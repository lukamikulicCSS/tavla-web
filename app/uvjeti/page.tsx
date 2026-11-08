import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Uvjeti korištenja",
  description: "Uvjeti korištenja web stranice Tavla.",
  alternates: { canonical: "/uvjeti" },
};

export default function TermsPage() {
  const L = site.legal;
  return (
    <LegalPage title="Uvjeti korištenja" path="/uvjeti">
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
    </LegalPage>
  );
}
