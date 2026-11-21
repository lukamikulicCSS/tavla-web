/**
 * IZVOR ISTINE za mega izbornik "Tavla AI" i stranice /tavla-ai/*.
 *
 * Pravila:
 *  - status "live"    = radi danas u aplikaciji
 *  - status "soon"    = u razvoju, oznaka "Uskoro"
 *  - status "planned" = u planu, oznaka "U planu" (prikazuje se samo na stranicama Tavla AI)
 *  - nikakve brojke koje nisu provjerene ili javno citirane
 *
 * [PROVJERI s Antom] status svake stavke prije objave.
 */
import type { AiOverview, AiPillar } from "../types";

export const pillars: AiPillar[] = [
  {
    slug: "poslovanje",
    name: "Unaprijedite poslovanje",
    headline: "Manje trčanja. Više posluženih stolova.",
    lead: "Narudžbe, pozivi i računi stižu osoblju s brojem stola, a meni se uređuje bez tiskanja.",
    metaTitle: "Tavla za poslovanje: panel za osoblje i AI Menu",
    metaDescription:
      "Narudžbe i pozivi stižu osoblju s brojem stola. AI Menu u razvoju piše opise i prijevode artikala, a vlasnik sve odobrava.",
    features: [
      {
        id: "panel-za-osoblje",
        anchor: "panel-za-osoblje",
        name: "Panel za osoblje",
        short: "Narudžbe stižu s brojem stola",
        title: "Sve narudžbe na jednom ekranu.",
        body: "Narudžbe, pozivi konobara i zahtjevi za račun stižu uživo, s brojem stola i napomenom. Osoblje mijenja status jednim dodirom, a gost ga vidi na svom mobitelu.",
        points: ["Narudžbe uživo s brojem stola", "Pozivi i računi na istom mjestu", "Status vidljiv i gostu"],
        status: "live",
        ai: false,
        visual: "staff",
      },
      {
        id: "ai-menu",
        anchor: "ai-menu",
        name: "AI Menu",
        short: "Opisi, prijevodi i redoslijed artikala",
        title: "Meni koji se piše i slaže uz pomoć AI-ja.",
        body: "AI predlaže opise artikala, prevodi meni i predlaže redoslijed i istaknute artikle na temelju vaše prodaje. Ništa ne ide gostima dok vi ne odobrite.",
        points: ["Prijedlozi opisa i prijevoda", "Redoslijed prema stvarnoj prodaji", "Vi odobravate svaku promjenu"],
        status: "soon",
        ai: true,
        visual: "menu",
      },
      {
        id: "integracija-s-kasom",
        anchor: "integracija-s-kasom",
        name: "Integracija s kasom",
        short: "Narudžba ide u vašu kasu",
        title: "Narudžba ide ravno u vašu kasu.",
        // [PROVJERI: s kojim kasama Tavla radi ili će raditi]
        body: "Narudžba s mobitela gosta upisuje se u postojeću kasu objekta, bez ručnog prepisivanja. Popis podržanih kasa objavit ćemo kad integracija bude spremna.",
        points: ["Bez dvostrukog unosa", "Fiskalizacija ostaje u vašoj kasi", "Manje grešaka pri naplati"],
        status: "soon",
        ai: false,
        visual: "pos",
      },
      {
        id: "jezik-gosta",
        anchor: "jezik-gosta",
        name: "Jezik gosta",
        short: "Meni na hrvatskom i engleskom",
        title: "Gost čita meni na svom jeziku.",
        body: "Meni je dostupan na hrvatskom i engleskom. Gost bira jezik jednim dodirom, a vi uređujete oba prijevoda na jednom mjestu.",
        points: ["Hrvatski i engleski", "Promjena jezika jednim dodirom", "Prijevodi uz artikl, na jednom mjestu"],
        status: "live",
        ai: false,
        visual: "language",
      },
    ],
    aiSteps: [
      "AI čita vaše artikle, kategorije i prodaju po satu.",
      "Predlaže opise, prijevode i redoslijed u meniju.",
      "Vi pregledate, izmijenite i odobrite. Tek tada gosti vide promjenu.",
    ],
    faq: [
      {
        q: "Mijenja li AI Menu meni bez mog odobrenja?",
        a: "Ne. AI Menu samo predlaže opise, prijevode i redoslijed. Svaka promjena čeka vaše odobrenje prije nego što je gosti vide.",
      },
      {
        q: "Treba li osoblju posebna oprema za panel?",
        a: "Ne treba. Panel za osoblje radi u pregledniku na tabletu, mobitelu ili računalu koje već imate.",
      },
      {
        q: "S kojim kasama radi integracija?",
        a: "Integracija s kasom je u razvoju. Popis podržanih kasa objavit ćemo kad bude spreman, a do tada nam pišite koju kasu koristite.",
      },
    ],
  },
  {
    slug: "tim",
    name: "Zadržite i motivirajte tim",
    headline: "Tim koji zna da se trud vidi.",
    lead: "Napojnice, ocjene i priznanja vezani uz konobara koji je zaista poslužio stol.",
    metaTitle: "Tavla za tim: AI Tips i profili konobara",
    metaDescription:
      "AI Tips u razvoju predlaže napojnicu prema iznosu računa, a gost uvijek bira sam. Profili konobara pokazuju učinak i ocjene.",
    features: [
      {
        id: "ai-tips",
        anchor: "ai-tips",
        name: "AI Tips",
        short: "Prijedlog napojnice pri plaćanju",
        title: "Napojnica bez neugodnog trenutka.",
        body: "Pri plaćanju s mobitela gost vidi prijedlog napojnice prilagođen iznosu računa. Uvijek može odabrati drugi iznos ili ništa.",
        points: ["Prijedlog prema iznosu računa", "Gost uvijek bira sam", "Napojnica ide uz konobara"],
        status: "soon",
        ai: true,
        visual: "tips",
      },
      {
        id: "profili-konobara",
        anchor: "profili-konobara",
        name: "Profili konobara",
        short: "Učinak i ocjene po konobaru",
        title: "Svaki konobar ima svoj profil.",
        body: "Vlasnik vidi koliko je narudžbi tko preuzeo, koliko brzo i kako su ga gosti ocijenili. Konobar vidi vlastiti napredak.",
        points: ["Broj i brzina posluženih narudžbi", "Ocjene gostiju po konobaru", "Pregled po smjeni"],
        status: "soon",
        ai: false,
        visual: "staff",
      },
      {
        id: "konobar-mjeseca",
        anchor: "konobar-mjeseca",
        name: "Konobar mjeseca",
        short: "Priznanje najboljima",
        title: "Priznanje temeljeno na ocjenama gostiju.",
        body: "Na kraju mjeseca Tavla predlaže konobara s najboljim ocjenama gostiju. Vi odlučujete hoćete li i kako ga nagraditi.",
        points: ["Temeljeno na ocjenama gostiju", "Vi potvrđujete odabir", "Vidljivo cijelom timu"],
        status: "planned",
        ai: false,
        visual: "insights",
      },
    ],
    aiSteps: [
      "AI gleda iznos računa i uobičajene napojnice u vašem objektu.",
      "Predlaže tri iznosa, od kojih je jedan istaknut.",
      "Gost bira iznos, upisuje svoj ili preskače. Pravila postavljate vi.",
    ],
    faq: [
      {
        q: "Mora li gost ostaviti napojnicu?",
        a: "Ne. AI Tips samo predlaže iznos. Gost uvijek može upisati drugi iznos ili preskočiti napojnicu.",
      },
      {
        q: "Kome ide napojnica?",
        a: "Napojnica se bilježi uz konobara koji je poslužio stol. Kako se napojnice dijele u timu, određuje vlasnik objekta.",
      },
      {
        q: "Vide li konobari ocjene drugih konobara?",
        a: "Ne. Svaki konobar vidi svoj profil, a cijeli pregled vidi samo vlasnik ili voditelj.",
      },
    ],
  },
  {
    slug: "gosti",
    name: "Privucite i angažirajte goste",
    headline: "Gost koji se vraća.",
    lead: "Program vjernosti, preporuke i meni u stilu vašeg objekta.",
    metaTitle: "Tavla za goste: Tavla+ loyalty i AI preporuke",
    metaDescription:
      "Tavla+ program vjernosti i AI preporuke pića prema dobu dana su u razvoju. Pogodnosti i pravila uvijek postavlja vlasnik objekta.",
    features: [
      {
        id: "tavla-plus",
        anchor: "tavla-plus",
        name: "Tavla+ loyalty",
        short: "Bodovi, krediti i pogodnosti",
        title: "Program vjernosti koji gost stvarno koristi.",
        body: "Gost skuplja bodove i kredite pri svakoj narudžbi. Program vjernosti postavlja vlasnik, a gost ga koristi u svim objektima koji imaju Tavlu.",
        points: ["Pravila i pogodnosti postavljate vi", "Bez plastičnih kartica", "Jedan račun za sve Tavla objekte"],
        status: "soon",
        ai: false,
        visual: "loyalty",
      },
      {
        id: "ai-preporuke",
        anchor: "ai-preporuke",
        name: "AI preporuke",
        short: "Preporuke prema dobu dana",
        title: "Pravo piće u pravo vrijeme.",
        body: "Meni gostu preporuči piće prema dobu dana i onome što je već naručio. Preporuke se temelje na narudžbama u objektu, ne na osobnim podacima gosta.",
        points: ["Prema dobu dana", "Prema onome što je već naručeno", "Vi birate što se smije preporučiti"],
        status: "soon",
        ai: true,
        visual: "menu",
      },
      {
        id: "stalni-gosti",
        anchor: "stalni-gosti",
        name: "Prepoznavanje stalnih gostiju",
        short: "Stalni gost, prepoznat",
        title: "Stalni gost se osjeća kao stalni gost.",
        body: "Gost koji se prijavi na Tavla+ može biti prepoznat pri povratku, uz njegov pristanak. Osoblje vidi samo ono što gost dopusti.",
        points: ["Samo uz pristanak gosta", "Omiljene narudžbe na dohvat", "Bez dijeljenja podataka s drugim objektima"],
        status: "planned",
        ai: false,
        visual: "loyalty",
      },
      {
        id: "ai-branding",
        anchor: "ai-branding",
        name: "AI Branding",
        short: "Meni u stilu objekta",
        title: "Meni i stalci u stilu vašeg objekta.",
        body: "Meni i stalci za stol u bojama i stilu objekta, uz AI prijedloge vizuala. Vi birate i odobravate konačan izgled.",
        points: ["Boje i stil vašeg objekta", "Prijedlozi vizuala uz pomoć AI-ja", "Konačan izbor je vaš"],
        status: "planned",
        ai: true,
        visual: "branding",
      },
      {
        id: "narudzba-unaprijed",
        anchor: "narudzba-unaprijed",
        name: "Naruči unaprijed i za van",
        short: "Narudžba prije dolaska",
        title: "Narudžba prije nego gost sjedne.",
        body: "Gost naruči unaprijed ili za van iz istog menija. Narudžba stiže osoblju kao i svaka druga.",
        points: ["Isti meni, isti panel", "Manje čekanja u gužvi", "Vi određujete kada je dostupno"],
        status: "planned",
        ai: false,
        visual: "staff",
      },
    ],
    aiSteps: [
      "AI gleda što se u vašem objektu naručuje u koje doba dana.",
      "Gostu predlaže piće koje se dobro slaže s onim što je već naručio.",
      "Vi birate artikle koji se smiju preporučiti i kada.",
    ],
    faq: [
      {
        q: "Koristi li Tavla osobne podatke gostiju za preporuke?",
        a: "Ne. AI preporuke se temelje na narudžbama u objektu i dobu dana, a osobni podaci gostiju ne koriste se za treniranje modela.",
      },
      {
        q: "Tko određuje pogodnosti u programu vjernosti?",
        a: "Vlasnik objekta. Vi postavljate koliko bodova vrijedi narudžba i što gost za njih dobiva.",
      },
      {
        q: "Je li Tavla+ već dostupan?",
        a: "Tavla+ je u razvoju. Prijavite se na novosti i javit ćemo vam kad ga možete uključiti u svom objektu.",
      },
    ],
  },
  {
    slug: "rast",
    name: "Potaknite razvoj poslovanja",
    headline: "Odluke na temelju podataka, ne osjećaja.",
    lead: "Prodaja po satu, najprodavaniji artikli i tjedni sažetak koji kaže što napraviti.",
    metaTitle: "Tavla za rast: analitika prodaje i AI uvidi",
    metaDescription:
      "Pregled prometa po satu, najprodavanijih artikala i aktivnosti stolova. AI uvidi u razvoju šalju tjedni sažetak s prijedlozima.",
    features: [
      {
        id: "analitika-prodaje",
        anchor: "analitika-prodaje",
        name: "Analitika prodaje",
        short: "Promet po satu i artiklu",
        title: "Vidite kako se kreće dan.",
        // [PROVJERI: koliko je od analitike vidljivo vlasniku u sučelju danas]
        body: "Promet i broj narudžbi po satu, najprodavaniji artikli i aktivnost stolova, na jednom ekranu.",
        points: ["Promet po satu i danu", "Najprodavaniji artikli", "Aktivnost stolova"],
        status: "live",
        ai: false,
        visual: "analytics",
      },
      {
        id: "ai-uvidi",
        anchor: "ai-uvidi",
        name: "AI uvidi",
        short: "Tjedni sažetak s prijedlozima",
        title: "Tjedni sažetak na vašem jeziku.",
        body: "Jednom tjedno dobivate kratak sažetak s prijedlozima, npr. „Utorkom od 17 do 19 h prodaja limunade raste. Istaknite je u meniju.” Vi odlučujete što ćete napraviti.",
        points: ["Kratko, bez tablica", "Prijedlog uz svaki uvid", "Temeljeno na vašoj prodaji"],
        status: "soon",
        ai: true,
        visual: "insights",
      },
      {
        id: "analitika-gostiju",
        anchor: "analitika-gostiju",
        name: "Analitika gostiju",
        short: "Povratni gosti i potrošnja",
        title: "Tko se vraća i koliko često.",
        body: "Udio povratnih gostiju, prosječna potrošnja i učestalost dolazaka, iz anonimiziranih podataka o narudžbama.",
        points: ["Povratni gosti", "Prosječna potrošnja", "Učestalost dolazaka"],
        status: "planned",
        ai: false,
        visual: "analytics",
      },
    ],
    aiSteps: [
      "AI čita prodaju po satu, danu i artiklu.",
      "Pronalazi obrasce i piše kratak prijedlog.",
      "Vi odlučujete hoćete li postupiti po prijedlogu.",
    ],
    faq: [
      {
        q: "Što vlasnik vidi u analitici danas?",
        a: "Promet i broj narudžbi po danu i satu, najprodavanije artikle i aktivnost stolova.",
      },
      {
        q: "Što su AI uvidi?",
        a: "Tjedni sažetak prodaje s kratkim prijedlozima. AI uvidi su u razvoju i ne mijenjaju ništa u objektu sami od sebe.",
      },
      {
        q: "Gdje se čuvaju podaci o prodaji?",
        a: "Podaci o prodaji pripadaju objektu i koriste se samo za prikaz vlasniku. Detalje o regiji pohrane navodimo u Politici privatnosti.",
      },
    ],
  },
];

/** Stranica /tavla-ai */
export const aiOverview: AiOverview = {
  headline: "Umjetna inteligencija koja radi za vaš šank.",
  lead: "Tavla AI predlaže, vi odlučujete. Četiri područja u kojima Tavla pomaže objektu, od menija do tjednog sažetka prodaje.",
  metaTitle: "Tavla AI: AI za kafiće, restorane i hotele",
  metaDescription:
    "Što Tavla AI radi danas, što je u razvoju i kako koristi podatke. AI predlaže, a vlasnik objekta uvijek ima zadnju riječ.",
  transparency: {
    title: "Kako Tavla koristi AI.",
    lead: "AI u Tavli predlaže. Odluke ostaju vaše.",
    items: [
      {
        title: "Koje podatke koristi",
        text: "Narudžbe, artikle, cijene i vrijeme narudžbe u vašem objektu. To je dovoljno za prijedloge menija, napojnica i tjedne uvide.",
      },
      {
        title: "Koje podatke ne koristi",
        text: "Osobni podaci gostiju ne koriste se za treniranje AI modela. Preporuke se ne temelje na tome tko je gost.",
      },
      {
        title: "Tko odlučuje",
        text: "Vlasnik. AI ne mijenja meni, cijene ni postavke sam od sebe. Svaki prijedlog čeka vaše odobrenje.",
      },
      {
        title: "Gdje su podaci",
        // [PROVJERI s Antom: regija baze i AI pružatelja]
        text: "[PROVJERI: regija pohrane podataka i AI pružatelja, npr. „Podaci se čuvaju u EU.”]",
      },
    ],
  },
};

/** Nazivi stupaca u izborniku + kratki tekst promo kartice */
export const aiMenuPromo = {
  title: "Tavla AI ekosustav",
  text: "Što AI radi za objekt i kako koristi podatke.",
  cta: "Saznajte više",
};
