-- Jezik stranice na kojoj je prijava na newsletter napravljena ('hr' | 'en').
-- Postojeći zapisi dobivaju 'hr'. Kod radi i prije primjene (upis bez jezika).
ALTER TABLE newsletter_consents ADD COLUMN locale TEXT NOT NULL DEFAULT 'hr';
