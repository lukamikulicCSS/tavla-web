/**
 * Tekstovi sekcija početne stranice (redoslijed kao na stranici).
 * Engleski: content/en/home.ts — isti ključevi (tip HomeText).
 */
export const home = {
  hero: {
    title: "Nova razina ugostiteljskog iskustva.",
    lead: "Digitalni meni i naručivanje za kafiće, restorane i hotele. Gost naručuje s mobitela, osoblje narudžbu vidi odmah.",
    cta: "Zatraži demonstraciju",
    secondary: "Otkrij kako funkcionira",
  },

  partnerStrip: { aria: "Partneri", label: "Uz nas:" },

  /**
   * Kratka najava AI značajki koje su U RAZVOJU.
   * Kad značajka postane dostupna, ukloni je odavde i dodaj u content/hr/features.ts.
   */
  aiSoon: {
    badge: "Uskoro",
    title: "Tavla AI dolazi u vaš objekt.",
    text: "Dvije nove značajke na kojima radimo, za goste i za osoblje.",
    link: "Sve o Tavla AI",
    items: [
      { name: "AI Menu", text: "Meni koji gostu preporuči pića prema dobu dana i onome što je već naručio.", visual: "menu" as const },
      { name: "AI Tips", text: "Pametan prijedlog napojnice pri plaćanju, prilagođen iznosu računa.", visual: "tips" as const },
    ],
    menuChip: { pick: "Odabrano za vas", name: "Spritz", why: "Popularno u ovo doba dana", price: 6.5 },
    tipsChip: { question: "Dodati napojnicu?", suggested: "Prijedlog" },
  },

  how: {
    title: "Tri koraka od stola do narudžbe.",
    lead: "Bez aplikacije za preuzimanje, bez registracije, bez čekanja konobara.",
    stepsAria: "Koraci",
    steps: [
      { title: "Skeniraj", text: "Gost kamerom mobitela skenira kod na svom stolu. Meni se otvara u pregledniku, već povezan s tim stolom." },
      { title: "Naruči", text: "Gost pregledava meni, bira pića i šalje narudžbu sa svog mobitela, kad je on spreman." },
      { title: "Uživaj", text: "Osoblje odmah dobiva narudžbu i priprema je, a gost na mobitelu prati njezin status." },
    ],
    phoneLabel: (step: number, title: string) => `Mobitel gosta, korak ${step}: ${title}`,
  },

  experiences: {
    title: "Tri iskustva. Jedna platforma.",
    lead: "Gost, osoblje i vlasnik vide istu narudžbu, svatko iz svoje perspektive i u istom trenutku.",
    guests: {
      who: "Za goste",
      title: "Sve što treba, na dlanu.",
      text: "Meni se otvara skeniranjem koda na stolu. Gost bira, naručuje i prati narudžbu bez čekanja da ga netko primijeti.",
      visualLabel: "Sučelje za goste: digitalni meni s kategorijama i cijenama",
    },
    staff: {
      who: "Za osoblje",
      title: "Posluživanje bez nepotrebnog trčanja.",
      text: "Narudžbe i zahtjevi gostiju stižu na tablet za šankom, s brojem stola. Osoblje vidi što je novo, što se priprema i što je posluženo.",
    },
    owners: {
      who: "Za vlasnike",
      title: "Cijeli objekt u jednom pregledu.",
      text: "Meni uređujete sami, a promet, najprodavaniji artikli i aktivnost stolova vidljivi su bez prepisivanja iz bilježnice.",
    },
  },

  demo: {
    title: "Isprobajte Tavlu.",
    lead: "Naručite kao gost, primite narudžbu kao osoblje i pogledajte brojke kao vlasnik. Sve je jedan povezani demo.",
    tabsAria: "Odaberite perspektivu",
    tabs: {
      guest: { label: "Gost", hint: "Dodajte piće u košaricu i pošaljite narudžbu. Nakon slanja možete ponoviti turu, pozvati konobara ili zatražiti račun." },
      staff: { label: "Osoblje", hint: "Ovdje stižu narudžbe i zahtjevi sa stolova. Prihvatite narudžbu pa je označite posluženom." },
      owner: { label: "Vlasnik", hint: "Pregled prometa, najprodavanijih artikala i aktivnih stolova. Vaše demo narudžbe već su uračunate." },
    },
    newCount: (n: number) => `${n} novo`,
    note: "Demo radi samo u vašem pregledniku, s izmišljenim podacima. Ništa se ne šalje stvarnom objektu.",
    reset: "Vrati demo na početak",
  },

  /**
   * Kvalitativne koristi — namjerno BEZ brojki.
   * Statistike dodati tek kad postoje provjereni podaci iz stvarnih objekata.
   * Redoslijed odgovara ikonama u components/sections/Benefits.tsx.
   */
  benefits: {
    title: "Napravljeno da ugostiteljstvo radi bolje.",
    items: [
      { title: "Bolje iskustvo gosta", text: "Gost ne traži pogled konobara. Meni, narudžba i račun su mu na dohvat ruke." },
      { title: "Brže naručivanje", text: "Narudžba ide izravno sa stola na šank, bez koraka u kojem se zapisuje i prenosi." },
      { title: "Manje prekidanja osoblja", text: "Pitanja tipa „što imate od piva” odgovara meni, a osoblje se bavi posluživanjem." },
      { title: "Učinkovitija usluga", text: "Kad osoblje manje hoda po narudžbe, ostaje mu više vremena za goste." },
      { title: "Prilike za dodatnu prodaju", text: "Prijedlozi uz narudžbu i ponavljanje ture potiču drugu rundu bez nametanja." },
      { title: "Jasan pregled poslovanja", text: "Što se prodaje, kada je najveća gužva i koji su stolovi aktivni, vidite u stvarnom vremenu." },
      { title: "Jednostavnije upravljanje narudžbama", text: "Svaka narudžba ima stol, status i vrijeme. Ništa se ne izgubi između stola i šanka." },
    ],
  },

  industries: {
    title: "Gdje god gost sjedi i naručuje.",
    lead: "Od jutarnje kave na terasi do separea u klubu, Tavla radi isto: narudžba sa stola stiže osoblju odmah.",
    listAria: "Vrste objekata",
  },

  why: {
    title: "Tehnologija koja radi iza dobrog ugostiteljstva.",
    lead: "Najbolja usluga je ona koju gost ne primijeti. Tavla radi u pozadini da bi osoblje moglo raditi ispred.",
    principles: [
      { word: "Jednostavnost", text: "Gost ne preuzima aplikaciju i ne otvara račun. Kod, meni, narudžba." },
      { word: "Brzina", text: "Narudžba stiže na šank u trenutku slanja, a status se gostu osvježava sam." },
      { word: "Moderna tehnologija", text: "Web aplikacija koja radi na svakom mobitelu i tabletu, bez posebnog hardvera." },
      { word: "Bolja komunikacija", text: "Narudžba, poziv i račun uvijek dolaze s brojem stola. Nema dovikivanja ni nesporazuma." },
      { word: "Iskustvo gosta", text: "Gost naručuje svojim tempom i na svom jeziku, hrvatskom ili engleskom." },
      { word: "Učinkovitost", text: "Manje hodanja po narudžbe znači više vremena za goste kojima osoblje stvarno treba." },
      { word: "Stalni razvoj", text: "Tavlu stalno razvijamo. Nove mogućnosti stižu same, bez instalacije i bez prekida rada." },
    ],
  },

  team: {
    title: "Ljudi iza Tavle.",
    lead: "Tavlu razvijamo u Hrvatskoj, za ugostitelje koji žele da posluživanje teče bez zastoja.",
    linkedin: "LinkedIn profil",
  },

  partners: {
    title: "Partneri",
    logoAlt: (name: string) => `${name}, logotip`,
    newTab: (name: string) => `${name} (otvara se u novoj kartici)`,
  },

  testimonials: {
    emptyTitle: "Prvi objekti s Tavlom bit će predstavljeni ovdje.",
    emptyText: "Tražimo kafiće, restorane i barove koji žele uvesti Tavlu među prvima i pomoći nam da je oblikujemo prema stvarnim smjenama.",
    emptyCta: "Javite nam se",
    title: "Što kažu ugostitelji.",
    kind: { owner: "Vlasnik", manager: "Voditelj", partner: "Partner" },
    quote: (q: string) => `„${q}”`,
  },

  faq: {
    title: "Česta pitanja.",
    lead: "Ne vidite svoje pitanje? Pošaljite ga kroz obrazac i odgovorit ćemo izravno.",
  },

  contact: {
    title: "Spremni za drukčiju smjenu?",
    lead: "Pokazat ćemo vam kako Tavla može pojednostaviti svakodnevni rad i stvoriti bolje iskustvo za vaše goste.",
    points: [
      "Kratka demonstracija uživo ili online",
      "Postavljamo vaš meni i stolove zajedno s vama",
      "Ponuda prema veličini i vrsti objekta",
    ],
  },
};

export type HomeText = typeof home;
