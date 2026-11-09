export type NavLink = { label: string; href: string; text?: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const solutions: NavLink[] = [
  { label: "Za goste", href: "/rjesenja/gosti", text: "Meni, narudžba i račun na mobitelu" },
  { label: "Za osoblje", href: "/rjesenja/osoblje", text: "Narudžbe i pozivi sa stolova uživo" },
  { label: "Za vlasnike", href: "/rjesenja/vlasnici", text: "Prodaja i stolovi u jednom pregledu" },
  { label: "Tavla AI", href: "/tavla-ai", text: "AI meni i AI napojnice" },
];

export const mainNav: NavItem[] = [
  { label: "Rješenja", href: "/rjesenja", children: solutions },
  { label: "Kako funkcionira", href: "/kako-funkcionira" },
  { label: "O nama", href: "/o-nama" },
  { label: "Kontakt", href: "/kontakt" },
];

export const legalNav: NavLink[] = [
  { label: "Politika privatnosti", href: "/privatnost" },
  { label: "Politika kolačića", href: "/kolacici" },
  { label: "Uvjeti korištenja", href: "/uvjeti" },
];
