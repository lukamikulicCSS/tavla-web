-- Tavla web: analitika, newsletter i upiti.
-- Bez IP adresa i bez user-agent stringova. Vrijeme je u milisekundama (UTC), dan je 'YYYY-MM-DD' (UTC).

-- ─────────────── Sirovi događaji (brišu se nakon roka čuvanja) ───────────────
CREATE TABLE IF NOT EXISTS events (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  ts           INTEGER NOT NULL,
  day          TEXT    NOT NULL,
  sid          TEXT    NOT NULL,          -- slučajni ID sesije (sessionStorage), nije vezan uz osobu
  type         TEXT    NOT NULL,
  path         TEXT    NOT NULL,
  section      TEXT,
  target       TEXT,
  value        REAL,
  x            REAL,
  y            REAL,
  label        TEXT,
  ref          TEXT,                       -- samo domena izvora
  utm_source   TEXT,
  utm_medium   TEXT,
  utm_campaign TEXT,
  device       TEXT,                       -- mobile | tablet | desktop
  sw           TEXT                        -- raspon širine ekrana
);
CREATE INDEX IF NOT EXISTS idx_events_day        ON events (day);
CREATE INDEX IF NOT EXISTS idx_events_day_type   ON events (day, type);
CREATE INDEX IF NOT EXISTS idx_events_path_day   ON events (path, day);
CREATE INDEX IF NOT EXISTS idx_events_sid        ON events (sid);

-- ─────────────── Zbirne dnevne tablice (čuvaju se trajno) ───────────────
CREATE TABLE IF NOT EXISTS daily_section_stats (
  day           TEXT    NOT NULL,
  path          TEXT    NOT NULL,
  section       TEXT    NOT NULL,
  views         INTEGER NOT NULL DEFAULT 0,
  total_seconds REAL    NOT NULL DEFAULT 0,
  clicks        INTEGER NOT NULL DEFAULT 0,
  cta_clicks    INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, path, section)
);
CREATE INDEX IF NOT EXISTS idx_dss_path_day ON daily_section_stats (path, day);

-- metric: sessions | engaged_sessions | page_views | form_view | form_start | form_submit | newsletter_signup | ...
-- dim: dodatna dimenzija (npr. izvor, uređaj, putanja) ili '' za ukupno
CREATE TABLE IF NOT EXISTS daily_kpi (
  day    TEXT NOT NULL,
  metric TEXT NOT NULL,
  dim    TEXT NOT NULL DEFAULT '',
  value  REAL NOT NULL DEFAULT 0,
  PRIMARY KEY (day, metric, dim)
);

-- ─────────────── Newsletter (double opt-in) ───────────────
CREATE TABLE IF NOT EXISTS newsletter_consents (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  email             TEXT    NOT NULL UNIQUE,     -- mala slova
  status            TEXT    NOT NULL CHECK (status IN ('pending', 'confirmed', 'unsubscribed')),
  source            TEXT    NOT NULL,            -- footer | kontakt | stup:<slug>
  interest          TEXT,                         -- npr. ai-tips
  consent_version   TEXT    NOT NULL,            -- verzija teksta privole
  created_at        INTEGER NOT NULL,
  confirmed_at      INTEGER,
  unsubscribed_at   INTEGER,
  token_hash        TEXT,                          -- HMAC-SHA256 jednokratnog tokena; sam token se ne sprema
  token_expires_at  INTEGER,
  resend_contact_id TEXT
);
CREATE INDEX IF NOT EXISTS idx_nl_token  ON newsletter_consents (token_hash);
CREATE INDEX IF NOT EXISTS idx_nl_status ON newsletter_consents (status, created_at);

-- ─────────────── Upiti za demo ───────────────
-- Pojedinačne upite vide samo vlasnici (ploča iza Cloudflare Accessa). E-mail i poruka se NE spremaju (stižu mailom).
CREATE TABLE IF NOT EXISTS leads (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at   INTEGER NOT NULL,
  day          TEXT    NOT NULL,
  name         TEXT    NOT NULL,
  business     TEXT    NOT NULL,
  venue_type   TEXT    NOT NULL,
  source       TEXT    NOT NULL,   -- direktno | google | linkedin | instagram | ... | nepoznato
  ref          TEXT,
  utm_source   TEXT,
  utm_medium   TEXT,
  utm_campaign TEXT,
  landing      TEXT,
  newsletter   INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_leads_day ON leads (day);
