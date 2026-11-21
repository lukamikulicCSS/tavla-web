/**
 * Poruke validacije (zod), odgovori API ruta i potvrdni mail za newsletter.
 * Koriste ih i preglednik i poslužitelj. Engleski: content/en/messages.ts.
 */
export const messages = {
  venueTypes: {
    kafic: "Kafić",
    restoran: "Restoran",
    bar: "Bar",
    "beach-bar": "Beach bar",
    "nocni-klub": "Noćni klub",
    hotel: "Hotel",
    ostalo: "Ostalo",
  },

  contact: {
    nameMin: "Upišite ime i prezime.",
    nameMax: "Ime je predugo.",
    businessMin: "Upišite naziv objekta.",
    businessMax: "Naziv je predug.",
    email: "Upišite ispravnu e-mail adresu.",
    phoneMax: "Broj je predug.",
    phoneChars: "Broj smije sadržavati samo znamenke, razmake i +.",
    venueType: "Odaberite vrstu objekta.",
    messageMin: "Napišite barem nekoliko riječi.",
    messageMax: "Poruka može imati najviše 2000 znakova.",
    privacy: "Potrebno je potvrditi da ste pročitali obavijest o privatnosti.",
  },

  api: {
    forbidden: "Zahtjev nije dopušten.",
    badFormat: "Neispravan format zahtjeva.",
    tooLong: "Poruka je preduga.",
    tooLarge: "Zahtjev je prevelik.",
    rateLimited: "Poslali ste previše upita u kratkom vremenu. Pokušajte ponovno za nekoliko minuta.",
    nlRateLimited: "Previše pokušaja. Pokušajte ponovno za nekoliko minuta.",
    checkFields: "Provjerite označena polja.",
    turnstile: "Provjera da niste robot nije uspjela. Osvježite stranicu i pokušajte ponovno.",
    unavailable: "Slanje trenutno nije moguće. Pokušajte kasnije ili nam pišite izravno e-mailom.",
    sendFailed: "Slanje nije uspjelo. Pokušajte ponovno za minutu.",
    nlCheckInbox: "Provjerite inbox i potvrdite prijavu.",
    nlCheckAddress: "Provjerite upisanu adresu.",
    nlUnavailable: "Prijava trenutno nije moguća. Pokušajte kasnije.",
    methodNotAllowed: "Metoda nije dopuštena.",
    unsubInvalid: "Neispravan link za odjavu.",
    unsubUnavailable: "Odjava trenutno nije moguća.",
    unsubDone: "Odjavljeni ste.",
  },

  newsletter: {
    /** Tekst privole — verzija je u lib/newsletter-schema.ts (NEWSLETTER_CONSENT_VERSION) */
    consentText:
      "Prijavom pristajete da vam Tavla šalje novosti i ponude e-mailom, najviše jednom mjesečno. Odjava je moguća u svakom mailu.",
    email: {
      subject: "Potvrdite prijavu na novosti iz Tavle",
      htmlTitle: "Potvrdite prijavu",
      heading: "Potvrdite prijavu.",
      body: "Netko je (nadamo se vi) prijavio ovu adresu na novosti iz Tavle. Šaljemo najviše jedan mail mjesečno: što je novo u Tavli i kada nove značajke stižu u objekte.",
      button: "Potvrdi prijavu",
      expiry: "Link vrijedi 48 sati. Ako se niste prijavili, zanemarite ovaj mail i nećete dobivati ništa.",
      unsubscribe: "Odjava",
      textIntro: "Potvrdite prijavu na novosti iz Tavle",
      textBody: "Šaljemo najviše jedan mail mjesečno. Za potvrdu otvorite:",
      textExpiry: "Link vrijedi 48 sati. Ako se niste prijavili, zanemarite ovaj mail.",
    },
  },
};

export type Messages = typeof messages;
