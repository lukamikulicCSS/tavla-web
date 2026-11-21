"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { href } from "@/content/routes";
import { formatEur } from "@/content/demo-data";
import { useDict, useLocale } from "@/components/i18n/LocaleProvider";

/** Promo kartica u mega izborniku: mali "živi" isječak AI Menu prikaza (CSS, bez slika). */
export function AiPromoCard({ onNavigate }: { onNavigate?: () => void }) {
  const locale = useLocale();
  const promo = useDict().ui.nav.aiPromo;
  return (
    <Link
      href={href("ai", locale)}
      onClick={onNavigate}
      data-track="nav-ai-promo"
      className="group relative flex h-full min-h-[17rem] flex-col overflow-hidden rounded-[1.5rem] bg-ink p-4 ring-1 ring-inset ring-white/[0.07] transition-colors hover:ring-[#2f6bff]/40 focus-visible:outline-[#2f6bff]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-[radial-gradient(closest-side,rgb(47_107_255/0.35),transparent)] transition-opacity duration-500 group-hover:opacity-100 opacity-70"
      />
      <div aria-hidden className="relative mt-1 rounded-2xl bg-white p-2.5 text-ink shadow-[0_18px_40px_-20px_rgb(47_107_255/0.7)]">
        <p className="flex items-center gap-1 text-[0.625rem] font-semibold text-[#1f4fd8]">
          <Sparkles className="size-2.5" /> {promo.pick}
        </p>
        <div className="mt-1.5 space-y-1">
          {promo.items.map(({ name: n, price }, i) => (
            <div
              key={n}
              className="promo-row flex items-center justify-between rounded-lg bg-mist px-2 py-1.5 text-[0.6875rem]"
              style={{ animationDelay: `${i * 1.6}s` }}
            >
              <span className="font-semibold">{n}</span>
              <span className="tabular">{formatEur(price, locale)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative mt-auto pt-5">
        <p className="text-base font-semibold tracking-[-0.01em] text-white">{promo.title}</p>
        <p className="mt-1 text-[0.8125rem] leading-snug text-soft">{promo.text}</p>
        <p className="mt-3 text-[0.8125rem] font-medium text-[#7aa2ff]">{promo.cta}</p>
      </div>
    </Link>
  );
}
