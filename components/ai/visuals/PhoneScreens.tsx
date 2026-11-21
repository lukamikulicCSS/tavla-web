"use client";

import { AnimatePresence, m } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useLiveLoop } from "../useLiveLoop";
import { formatEur } from "@/content/demo-data";
import { useDict, useLocale } from "@/components/i18n/LocaleProvider";

/** Tekstovi prikaza (content/{hr,en}/ui.ts → aiVisuals) + formatiranje cijena na jeziku stranice */
function useV() {
  const locale = useLocale();
  const d = useDict();
  return { v: d.ui.aiVisuals, table: d.ui.product.table, eur: (n: number) => formatEur(n, locale) };
}

/** Prikazi sučelja na ekranu mobitela (gost). Svi artikli i cijene su primjeri. */

const item = "flex items-center justify-between rounded-[3cqw] px-[4cqw] py-[3cqw]";

function Header({ title }: { title: string }) {
  const { v, table } = useV();
  return (
    <div className="px-[6cqw] pb-[3cqw] pt-[2cqw]">
      <p className="text-[3.4cqw] text-slate">{v.venue} · {table} 7</p>
      <p className="mt-[1cqw] text-[6cqw] font-semibold tracking-[-0.02em]">{title}</p>
    </div>
  );
}

export function MenuScreen() {
  const { ref, tick } = useLiveLoop<HTMLDivElement>(3200);
  const { v, eur } = useV();
  const picks = v.menu.picks;
  const pick = picks[tick % picks.length];
  return (
    <div ref={ref} className="flex h-full flex-col">
      <Header title={v.menu.title} />
      <div className="mx-[5cqw] rounded-[4cqw] bg-[#2f6bff]/[0.07] p-[3.5cqw] ring-1 ring-[#2f6bff]/20">
        <p className="flex items-center gap-[1.5cqw] text-[3.2cqw] font-semibold text-[#1f4fd8]">
          <Sparkles className="size-[3.4cqw]" aria-hidden /> {v.pickedForYou}
        </p>
        <AnimatePresence mode="wait">
          <m.div key={pick.n} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }} className={`${item} mt-[2cqw] bg-white`}>
            <span>
              <span className="block text-[4cqw] font-semibold">{pick.n}</span>
              <span className="block text-[3cqw] text-slate">{pick.why}</span>
            </span>
            <span className="tabular text-[3.8cqw] font-medium">{eur(pick.p)}</span>
          </m.div>
        </AnimatePresence>
      </div>
      <div className="mt-[4cqw] space-y-[2cqw] px-[5cqw]">
        {v.menu.list.map(({ n, p }) => (
          <div key={n} className={`${item} bg-mist text-[3.8cqw]`}>
            <span className="font-medium">{n}</span>
            <span className="tabular text-slate">{eur(p)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TipsScreen() {
  const { ref, tick } = useLiveLoop<HTMLDivElement>(2600);
  const { v, table, eur } = useV();
  const opts = [5, 10, 15].map(v.percent);
  const sel = [1, 1, 2, 0][tick % 4];
  return (
    <div ref={ref} className="flex h-full flex-col px-[6cqw]">
      <p className="pt-[2cqw] text-[3.4cqw] text-slate">{v.venue} · {table} 7</p>
      <p className="mt-[1cqw] text-[6cqw] font-semibold tracking-[-0.02em]">{v.tips.title}</p>
      <div className="mt-[4cqw] space-y-[1.5cqw] rounded-[4cqw] bg-mist p-[4cqw] text-[3.6cqw]">
        {v.tips.lines.map(({ n, p }) => (
          <p key={n} className="flex justify-between">
            <span>{n}</span>
            <span className="tabular">{eur(p)}</span>
          </p>
        ))}
        <p className="flex justify-between border-t border-ink/10 pt-[2cqw] font-semibold">
          <span>{v.tips.total}</span>
          <span className="tabular">{eur(v.tips.totalValue)}</span>
        </p>
      </div>
      <p className="mt-[5cqw] text-[4cqw] font-semibold">{v.tipQuestion}</p>
      <div className="mt-[3cqw] grid grid-cols-3 gap-[2cqw] text-center">
        {opts.map((o, i) => (
          <span
            key={o}
            className={`tabular relative rounded-[3cqw] py-[3.5cqw] text-[3.8cqw] font-semibold transition-colors duration-300 ${sel === i ? "bg-ink text-white" : "bg-mist"}`}
          >
            {o}
            {i === 1 && (
              <span className="absolute -top-[2.2cqw] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#2f6bff] px-[1.8cqw] py-[0.3cqw] text-[2.5cqw] font-medium text-white">
                {v.suggested}
              </span>
            )}
          </span>
        ))}
      </div>
      <div className="mt-[2cqw] grid grid-cols-2 gap-[2cqw] text-center text-[3.4cqw] text-slate">
        <span className="rounded-[3cqw] bg-mist py-[3cqw]">{v.tips.other}</span>
        <span className="rounded-[3cqw] bg-mist py-[3cqw]">{v.tips.none}</span>
      </div>
      <span className="mt-auto mb-[6cqw] rounded-full bg-ink py-[4cqw] text-center text-[4cqw] font-semibold text-white">{v.tips.pay}</span>
    </div>
  );
}

export function LoyaltyScreen() {
  const { ref, tick } = useLiveLoop<HTMLDivElement>(2400);
  const { v } = useV();
  const pts = 60 + (tick % 5) * 10;
  return (
    <div ref={ref} className="flex h-full flex-col px-[6cqw]">
      <p className="pt-[2cqw] text-[6cqw] font-semibold tracking-[-0.02em]">Tavla+</p>
      <div className="mt-[4cqw] rounded-[5cqw] bg-ink p-[5cqw] text-white">
        <p className="text-[3.2cqw] text-white/60">{v.loyalty.points}</p>
        <p className="tabular mt-[1cqw] text-[9cqw] font-semibold tracking-[-0.03em]">{pts}</p>
        <div className="mt-[3cqw] h-[1.8cqw] overflow-hidden rounded-full bg-white/15">
          <m.div className="h-full rounded-full bg-[#2f6bff]" animate={{ width: `${pts}%` }} transition={{ duration: 0.6 }} />
        </div>
        <p className="mt-[2cqw] text-[3.2cqw] text-white/70">{v.loyalty.toReward(100 - pts)}</p>
      </div>
      <p className="mt-[5cqw] text-[3.8cqw] font-semibold">{v.loyalty.perks}</p>
      <div className="mt-[2cqw] space-y-[2cqw] text-[3.6cqw]">
        {v.loyalty.perkList.map((t) => (
          <p key={t} className={`${item} bg-mist`}>
            <span>{t}</span>
            <Check className="size-[3.6cqw] text-slate" aria-hidden />
          </p>
        ))}
      </div>
    </div>
  );
}

export function LanguageScreen() {
  const { ref, tick } = useLiveLoop<HTMLDivElement>(3000);
  const { v, eur } = useV();
  const en = tick % 2 === 1;
  // Namjerno dvojezično: prikaz pokazuje prebacivanje menija HR ↔ EN
  const rows = v.language.rows.map((r) => [r.hr, r.en, eur(r.p)] as const);
  return (
    <div ref={ref} className="flex h-full flex-col px-[6cqw]">
      <div className="flex items-center justify-between pt-[2cqw]">
        <p className="text-[6cqw] font-semibold tracking-[-0.02em]">{en ? v.language.titleEn : v.language.titleHr}</p>
        <span className="flex rounded-full bg-mist p-[0.8cqw] text-[3.2cqw] font-semibold">
          {["HR", "EN"].map((l, i) => (
            <span key={l} className={`rounded-full px-[3cqw] py-[1.2cqw] transition-colors duration-300 ${(i === 1) === en ? "bg-ink text-white" : "text-slate"}`}>
              {l}
            </span>
          ))}
        </span>
      </div>
      <div className="mt-[5cqw] space-y-[2cqw]">
        {rows.map(([hr, eng, p]) => (
          <div key={hr} className={`${item} bg-mist text-[3.8cqw]`}>
            <AnimatePresence mode="wait">
              <m.span key={en ? eng : hr} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="font-medium">
                {en ? eng : hr}
              </m.span>
            </AnimatePresence>
            <span className="tabular text-slate">{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BrandingScreen() {
  const { ref, tick } = useLiveLoop<HTMLDivElement>(2800);
  const { v } = useV();
  const names = v.branding.themes;
  const themes = [
    { bg: "#0b0b0d", fg: "#ffffff", accent: "#c8a96a", name: names[0] },
    { bg: "#f3ede4", fg: "#2b2620", accent: "#b5562f", name: names[1] },
    { bg: "#e8f2f5", fg: "#0f2f3a", accent: "#0f7c8a", name: names[2] },
  ];
  const t = themes[tick % themes.length];
  return (
    <div ref={ref} className="flex h-full flex-col transition-colors duration-500" style={{ background: t.bg, color: t.fg }}>
      <div className="px-[6cqw] pt-[3cqw]">
        <p className="text-[3.2cqw] opacity-60">{v.branding.suggestion} {t.name}</p>
        <p className="mt-[1cqw] text-[7cqw] font-semibold tracking-[-0.03em]">{v.venue}</p>
      </div>
      <div className="mt-[4cqw] space-y-[2cqw] px-[5cqw]">
        {v.branding.items.map((n) => (
          <div key={n} className={`${item} text-[3.8cqw] transition-colors duration-500`} style={{ background: `color-mix(in srgb, ${t.fg} 7%, transparent)` }}>
            <span className="font-medium">{n}</span>
            <span className="size-[2.6cqw] rounded-full transition-colors duration-500" style={{ background: t.accent }} />
          </div>
        ))}
      </div>
      <div className="mt-auto mb-[6cqw] flex justify-center gap-[2cqw]">
        {themes.map((th) => (
          <span key={th.name} className={`size-[6cqw] rounded-full ring-2 transition-[box-shadow] ${th === t ? "ring-[#2f6bff]" : "ring-transparent"}`} style={{ background: th.accent }} />
        ))}
      </div>
    </div>
  );
}
