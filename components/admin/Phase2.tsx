/**
 * Faza 2: poslovni KPI-jevi Tavle. Samo struktura i formule — podaci se NE izmišljaju.
 * Izvor kad bude spreman: tablice business_monthly, sales_pipeline, product_daily (migrations/0002_phase2.sql)
 * ili sinkronizacija iz baze aplikacije (Supabase).
 */
const groups: { title: string; items: { name: string; formula: string }[] }[] = [
  {
    title: "Prodaja",
    items: [
      { name: "Novi upiti tjedno", formula: "broj zapisa u leads po tjednu" },
      { name: "Upit → održan demo", formula: "demo_held / lead" },
      { name: "Win rate", formula: "won / demo_held" },
      { name: "Prodajni ciklus", formula: "prosjek (closed_at − lead_at) u danima za won" },
      { name: "CAC", formula: "(marketing + prodaja) / novi objekti" },
    ],
  },
  {
    title: "Prihod",
    items: [
      { name: "MRR / ARR", formula: "zbroj mjesečnih pretplata; ARR = MRR × 12" },
      { name: "Aktivni objekti i ARPU", formula: "ARPU = MRR / aktivni objekti" },
      { name: "Churn", formula: "objekti koji su otišli / aktivni na početku mjeseca" },
      { name: "NRR", formula: "(MRR početak + ekspanzija − kontrakcija − churn) / MRR početak" },
      { name: "LTV i LTV/CAC", formula: "LTV = ARPU × bruto marža / churn; cilj LTV/CAC > 3" },
      { name: "Povrat CAC-a", formula: "CAC / (ARPU × bruto marža), u mjesecima" },
      { name: "Implementacija i Tavla+", formula: "jednokratni prihod; broj pretplatnika Tavla+" },
    ],
  },
  {
    title: "Proizvod",
    items: [
      { name: "Narudžbe po objektu dnevno", formula: "orders / aktivni objekti" },
      { name: "Udio narudžbi preko Tavle", formula: "orders_value / venue_total_revenue" },
      { name: "Prosječna narudžba", formula: "orders_value / orders" },
      { name: "Ponovi turu", formula: "repeat_round_orders / orders" },
      { name: "Prihvaćenost prijedloga", formula: "upsell_accepted / upsell_shown" },
      { name: "Vrijeme reakcije osoblja", formula: "medijan narudžba → prihvaćeno; poziv → riješeno" },
      { name: "Aktivni konobari tjedno", formula: "konobari s ≥ 1 prihvaćenom narudžbom" },
      { name: "Povratni gosti i ocjena", formula: "kad bude dostupno u aplikaciji" },
    ],
  },
];

export function Phase2() {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      {groups.map((g) => (
        <section key={g.title} className="rounded-[1.5rem] bg-graphite/60 p-5 ring-1 ring-inset ring-white/[0.04] sm:p-6">
          <h3 className="flex items-center justify-between text-[0.9375rem] font-medium">
            {g.title}
            <span className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[0.6875rem] font-medium text-white/60">Faza 2</span>
          </h3>
          <ul className="mt-4 divide-y divide-white/[0.05]">
            {g.items.map((i) => (
              <li key={i.name} className="flex items-start justify-between gap-4 py-3">
                <span>
                  <span className="block text-[0.875rem]">{i.name}</span>
                  <span className="mt-0.5 block text-[0.75rem] leading-snug text-soft">{i.formula}</span>
                </span>
                <span className="tabular text-lg text-white/30">—</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
