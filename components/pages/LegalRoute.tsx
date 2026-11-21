import type { Metadata } from "next";
import { legal as hrLegal } from "@/content/hr/legal";
import { legal as enLegal } from "@/content/en/legal";
import type { Locale } from "@/content/routes";
import { LegalPage } from "@/components/layout/LegalPage";
import { pageMetadata } from "@/lib/i18n/metadata";

type LegalKey = "privacy" | "cookies" | "terms";
const texts = { hr: hrLegal, en: enLegal };

export function legalMetadata(key: LegalKey, locale: Locale): Metadata {
  const t = texts[locale][key];
  return pageMetadata({ route: key, locale, title: t.title, description: t.description });
}

/** Pravne stranice (privatnost, kolačići, uvjeti) na oba jezika. Tekst: content/{hr,en}/legal.tsx */
export function LegalRoute({ which, locale }: { which: LegalKey; locale: Locale }) {
  const t = texts[locale][which];
  const Body = t.Body;
  return (
    <LegalPage title={t.title} description={t.description} route={which} locale={locale}>
      <Body />
    </LegalPage>
  );
}
