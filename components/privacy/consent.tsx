"use client";

/**
 * Pristanak na kolačiće.
 * - Odluka se sprema u nužni kolačić "tavla_consent" (6 mjeseci).
 * - Analitika i marketing NIKAD se ne učitavaju prije izričitog pristanka.
 * - Povlačenje pristanka briše analitičke kolačiće i osvježava stranicu.
 * - Promjena verzije (CONSENT_VERSION) ponovno traži pristanak.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export const CONSENT_COOKIE = "tavla_consent";
export const CONSENT_VERSION = 1;
const MAX_AGE = 60 * 60 * 24 * 182;

export type Consent = { v: number; necessary: true; analytics: boolean; marketing: boolean; ts: string };

type Ctx = {
  consent: Consent | null;
  ready: boolean;
  panelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  save: (c: { analytics: boolean; marketing: boolean }) => void;
};

const ConsentCtx = createContext<Ctx | null>(null);

function read(): Consent | null {
  try {
    const raw = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
    if (!raw) return null;
    const c = JSON.parse(decodeURIComponent(raw.split("=").slice(1).join("="))) as Consent;
    return c.v === CONSENT_VERSION ? c : null;
  } catch {
    return null;
  }
}

function clearAnalyticsCookies() {
  // Umami/Plausible ne postavljaju kolačiće, ali čistimo uobičajene za svaki slučaj.
  for (const c of document.cookie.split("; ")) {
    const name = c.split("=")[0];
    if (/^(_ga|_gid|_gat|umami|plausible)/i.test(name)) {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname}`;
    }
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    setConsent(read());
    setReady(true);
  }, []);

  const save = useCallback(
    (c: { analytics: boolean; marketing: boolean }) => {
      const hadAnalytics = consent?.analytics;
      const next: Consent = { v: CONSENT_VERSION, necessary: true, analytics: c.analytics, marketing: c.marketing, ts: new Date().toISOString() };
      const secure = location.protocol === "https:" ? "; Secure" : "";
      document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(next))}; Max-Age=${MAX_AGE}; path=/; SameSite=Lax${secure}`;
      setConsent(next);
      setPanelOpen(false);
      if (hadAnalytics && !c.analytics) {
        clearAnalyticsCookies();
        location.reload(); // ukloni već učitane skripte
      }
    },
    [consent],
  );

  const value = useMemo(
    () => ({ consent, ready, panelOpen, openPanel: () => setPanelOpen(true), closePanel: () => setPanelOpen(false), save }),
    [consent, ready, panelOpen, save],
  );

  return <ConsentCtx.Provider value={value}>{children}</ConsentCtx.Provider>;
}

export function useConsent() {
  const c = useContext(ConsentCtx);
  if (!c) throw new Error("useConsent mora biti unutar ConsentProvider");
  return c;
}
