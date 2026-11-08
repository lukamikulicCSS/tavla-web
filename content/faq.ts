/**
 * Česta pitanja. Odgovori opisuju SAMO postojeću funkcionalnost.
 * Ne spominjati integracije s kasom, obradu plaćanja ni fiskalizaciju
 * dok to nije stvarno dostupno.
 */
export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  {
    q: "Što je Tavla?",
    a: "Tavla je digitalni meni i sustav za naručivanje za ugostiteljske objekte. Gost naručuje sa svog mobitela, osoblje narudžbu vidi odmah s brojem stola, a vlasnik u jednom pregledu prati narudžbe i prodaju.",
  },
  {
    q: "Kako funkcionira QR naručivanje?",
    a: "Svaki stol ima svoj QR kod. Gost ga skenira kamerom mobitela, otvara se meni vezan uz taj stol, odabere artikle i pošalje narudžbu. Narudžba se istog trenutka pojavljuje osoblju, a gost na mobitelu prati njezin status.",
  },
  {
    q: "Trebaju li gosti preuzeti aplikaciju?",
    a: "Ne. Tavla se otvara u pregledniku mobitela, bez preuzimanja, registracije i lozinke.",
  },
  {
    q: "Kako objekt prima narudžbe?",
    a: "Narudžbe stižu u sučelje za osoblje na tabletu, računalu ili mobitelu. Uz svaku narudžbu vidi se stol, artikli i napomena, a osoblje mijenja status kako narudžbu priprema i poslužuje.",
  },
  {
    q: "Može li se Tavla prilagoditi našem objektu?",
    a: "Da. Meni, kategorije, cijene, opise i prijevode uređujete sami u administraciji. Promjena je odmah vidljiva gostima, bez tiskanja novog jelovnika.",
  },
  {
    q: "Može li se upravljati s više stolova?",
    a: "Da. Svaki stol ima vlastiti kod, a osoblje vidi narudžbe i zahtjeve za sve stolove na jednom mjestu.",
  },
  {
    q: "Mogu li gosti pozvati konobara ili zatražiti račun?",
    a: "Da. Gost iz menija može pozvati konobara ili zatražiti račun, a zahtjev stiže osoblju s brojem stola.",
  },
  {
    q: "Pruža li Tavla poslovnu analitiku?",
    a: "Vlasnik vidi pregled narudžbi i prodaje, najprodavanije artikle i aktivnost stolova. Analitiku nastavljamo proširivati.",
  },
  {
    q: "Kako objekt može početi koristiti Tavlu?",
    a: "Zatražite demonstraciju putem obrasca. Pokazat ćemo vam kako Tavla radi, zajedno postavimo vaš meni i stolove, a vi dobivate kodove spremne za stolove.",
  },
  {
    q: "Kako se određuje cijena?",
    a: "Tavla se plaća mjesečnom pretplatom po objektu. Po dogovoru nudimo i jednokratno postavljanje sustava u objektu. Točnu ponudu dobit ćete nakon kratkog razgovora o vašem objektu.",
  },
];
