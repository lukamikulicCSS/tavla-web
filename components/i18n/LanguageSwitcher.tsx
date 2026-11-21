"use client";

import { usePathname } from "next/navigation";
import { locales, switchLocalePath, type Locale } from "@/content/routes";
import { useDict, useLocale } from "./LocaleProvider";

/**
 * Diskretni prebacivač "HR / EN". Vodi na ISTU stranicu na drugom jeziku (content/routes.ts),
 * uz prevedeno sidro ako je u adresi (npr. /#kontakt → /en#contact).
 * Obični <a>: hr i en imaju različite root layoute, pa je prijelaz ionako puno učitavanje.
 */
export function LanguageSwitcher({ className = "", onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname() ?? "/";
  const current = useLocale();
  const t = useDict().ui.lang;

  return (
    <ul aria-label={t.switcherLabel} className={`flex items-center gap-1 text-[0.8125rem] font-medium tracking-[0.02em] ${className}`}>
      {locales.map((l: Locale, i) => {
        const active = l === current;
        const path = switchLocalePath(pathname, l);
        return (
          <li key={l} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden className="text-white/30">/</span>}
            <a
              href={path}
              hrefLang={l}
              lang={l}
              aria-current={active ? "true" : undefined}
              aria-label={t.names[l]}
              data-track={`lang-${l}`}
              onClick={(e) => {
                onNavigate?.();
                if (active) return;
                // prevedi sidro iz trenutne adrese
                const hash = window.location.hash;
                if (hash) {
                  e.preventDefault();
                  window.location.assign(switchLocalePath(pathname, l, hash));
                }
              }}
              className={`inline-flex min-h-8 items-center rounded-full px-1.5 transition-colors ${active ? "text-white" : "text-white/60 hover:text-white"}`}
            >
              {l.toUpperCase()}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
