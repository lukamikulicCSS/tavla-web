"use client";

import { useConsent } from "./consent";

export function CookieSettingsButton({ className = "", label = "Postavke kolačića" }: { className?: string; label?: string }) {
  const { openPanel } = useConsent();
  return (
    <button type="button" onClick={openPanel} className={className}>
      {label}
    </button>
  );
}
