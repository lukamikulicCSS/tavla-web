"use client";

import type { AiVisual, FeatureStatus } from "@/content/types";
import { useDict } from "@/components/i18n/LocaleProvider";
import { PhoneFrame, StatusBar } from "@/components/product/PhoneFrame";
import { BrowserFrame, TabletFrame } from "@/components/product/DeviceFrames";
import { BrandingScreen, LanguageScreen, LoyaltyScreen, MenuScreen, TipsScreen } from "./visuals/PhoneScreens";
import { AnalyticsScreen, InsightsScreen, PosScreen, StaffScreen } from "./visuals/BoardScreens";

const phone: Partial<Record<AiVisual, () => React.ReactNode>> = {
  menu: MenuScreen,
  tips: TipsScreen,
  loyalty: LoyaltyScreen,
  language: LanguageScreen,
  branding: BrandingScreen,
};


/**
 * Živi prikaz sučelja u okviru uređaja. HTML/CSS, bez slika.
 * Kad značajka nije "live", jasno je označen kao "Primjer".
 * data-nosnippet: demo artikli i cijene ne smiju završiti u isječcima tražilica.
 */
export function FeatureVisual({ visual, status, className = "" }: { visual: AiVisual; status: FeatureStatus; className?: string }) {
  const t = useDict().ui.aiVisuals;
  const LABELS = t.labels;
  const Phone = phone[visual];
  const example = status !== "live";
  const badge = example ? (
    <span className="absolute -top-3 left-1/2 z-40 -translate-x-1/2 rounded-full bg-graphite px-3 py-1 text-[0.6875rem] font-medium text-white/75 ring-1 ring-white/10">
      {t.example}
    </span>
  ) : null;

  if (Phone) {
    return (
      <div data-nosnippet className={`relative mx-auto w-full max-w-[17.5rem] ${className}`}>
        {badge}
        <PhoneFrame label={LABELS[visual]}>
          <div aria-hidden className="flex h-full flex-col">
            <StatusBar />
            <div className="min-h-0 flex-1">
              <Phone />
            </div>
          </div>
        </PhoneFrame>
      </div>
    );
  }

  if (visual === "staff" || visual === "pos") {
    return (
      <div data-nosnippet role="img" aria-label={LABELS[visual]} className={`relative w-full ${className}`}>
        {badge}
        <TabletFrame className="aspect-[4/3]">
          <div aria-hidden className="h-full">{visual === "staff" ? <StaffScreen /> : <PosScreen />}</div>
        </TabletFrame>
      </div>
    );
  }

  return (
    <div data-nosnippet role="img" aria-label={LABELS[visual]} className={`relative w-full ${className}`}>
      {badge}
      <BrowserFrame>
        <div aria-hidden>{visual === "insights" ? <InsightsScreen /> : <AnalyticsScreen />}</div>
      </BrowserFrame>
    </div>
  );
}
