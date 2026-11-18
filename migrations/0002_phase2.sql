-- Faza 2: poslovni KPI-jevi Tavle. Samo struktura — ništa se ne puni automatski.
-- Ručni unos (ili kasnije sinkronizacija iz baze aplikacije / Supabase).

-- Mjesečni snimak poslovanja (jedan red po mjesecu)
CREATE TABLE IF NOT EXISTS business_monthly (
  month                 TEXT PRIMARY KEY,    -- 'YYYY-MM'
  active_venues         INTEGER,             -- aktivni objekti na kraju mjeseca
  new_venues            INTEGER,             -- novi potpisani objekti
  churned_venues        INTEGER,             -- objekti koji su otišli
  mrr_eur               REAL,                -- mjesečni ponavljajući prihod
  expansion_mrr_eur     REAL,                -- dodatni MRR od postojećih objekata
  contraction_mrr_eur   REAL,                -- izgubljeni MRR od postojećih (bez churna)
  churned_mrr_eur       REAL,
  setup_revenue_eur     REAL,                -- jednokratni prihod od implementacije
  marketing_cost_eur    REAL,
  sales_cost_eur        REAL,
  tavla_plus_subs       INTEGER,             -- pretplatnici Tavla+ (gosti)
  updated_at            INTEGER
);

-- Prodajni lijevak po upitu (ručno ili iz CRM-a)
CREATE TABLE IF NOT EXISTS sales_pipeline (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  lead_id       INTEGER REFERENCES leads(id),
  stage         TEXT NOT NULL CHECK (stage IN ('lead', 'demo_scheduled', 'demo_held', 'proposal', 'won', 'lost')),
  lead_at       INTEGER,
  demo_at       INTEGER,
  closed_at     INTEGER,
  mrr_eur       REAL
);
CREATE INDEX IF NOT EXISTS idx_pipeline_stage ON sales_pipeline (stage);

-- Dnevni proizvodni KPI-jevi po objektu (iz aplikacije)
CREATE TABLE IF NOT EXISTS product_daily (
  day                        TEXT NOT NULL,
  venue_id                   TEXT NOT NULL,
  orders                     INTEGER,
  orders_value_eur           REAL,
  venue_total_revenue_eur    REAL,     -- ukupni promet objekta (za udio narudžbi preko Tavle)
  repeat_round_orders        INTEGER,  -- "Ponovi turu"
  upsell_shown               INTEGER,
  upsell_accepted            INTEGER,
  median_accept_seconds      REAL,     -- narudžba → prihvaćeno
  median_call_resolve_seconds REAL,    -- poziv konobara → riješeno
  active_waiters             INTEGER,
  returning_guests           INTEGER,
  avg_rating                 REAL,
  PRIMARY KEY (day, venue_id)
);
