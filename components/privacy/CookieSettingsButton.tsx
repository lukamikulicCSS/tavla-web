"use client";

import { useConsent } from "./consent";
import { useDict } from "@/components/i18n/LocaleProvider";

export function CookieSettingsButton({ className = "", label }: { className?: string; label?: string }) {
  const { openPanel } = useConsent();
  const fallback = useDict().ui.cookies.settings;
  return (
    <button type="button" onClick={openPanel} className={className}>
      {label ?? fallback}
    </button>
  );
}
