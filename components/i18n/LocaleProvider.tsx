"use client";

/**
 * Jezik za klijentske komponente. Postavlja ga root layout (app/(hr)/layout.tsx, app/en/layout.tsx).
 * Serverske komponente dobivaju jezik kroz prop `locale`.
 */
import { createContext, useContext, type ReactNode } from "react";
import { getDict, type Dict } from "@/content";
import type { Locale } from "@/content/routes";

const LocaleCtx = createContext<Locale>("hr");

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleCtx.Provider value={locale}>{children}</LocaleCtx.Provider>;
}

export const useLocale = () => useContext(LocaleCtx);

export function useDict(): Dict {
  return getDict(useLocale());
}
