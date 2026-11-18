"use client";

import { AnimatePresence, m } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useLiveLoop } from "../useLiveLoop";

/** Prikazi sučelja na ekranu mobitela (gost). Svi artikli i cijene su primjeri. */

const item = "flex items-center justify-between rounded-[3cqw] px-[4cqw] py-[3cqw]";

function Header({ title }: { title: string }) {
  return (
    <div className="px-[6cqw] pb-[3cqw] pt-[2cqw]">
      <p className="text-[3.4cqw] text-slate">Kavana Primjer · Stol 7</p>
      <p className="mt-[1cqw] text-[6cqw] font-semibold tracking-[-0.02em]">{title}</p>
    </div>
  );
}

export function MenuScreen() {
  const { ref, tick } = useLiveLoop<HTMLDivElement>(3200);
  const picks = [
    { n: "Spritz", p: "6,50 €", why: "Popularno u ovo doba dana" },
    { n: "Limunada", p: "3,80 €", why: "Često uz vašu narudžbu" },
    { n: "Espresso tonic", p: "4,20 €", why: "Novo u meniju" },
  ];
  const pick = picks[tick % picks.length];
  return (
    <div ref={ref} className="flex h-full flex-col">
      <Header title="Pića" />
      <div className="mx-[5cqw] rounded-[4cqw] bg-[#2f6bff]/[0.07] p-[3.5cqw] ring-1 ring-[#2f6bff]/20">
        <p className="flex items-center gap-[1.5cqw] text-[3.2cqw] font-semibold text-[#1f4fd8]">
          <Sparkles className="size-[3.4cqw]" aria-hidden /> Odabrano za vas
        </p>
        <AnimatePresence mode="wait">
          <m.div key={pick.n} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }} className={`${item} mt-[2cqw] bg-white`}>
            <span>
              <span className="block text-[4cqw] font-semibold">{pick.n}</span>
              <span className="block text-[3cqw] text-slate">{pick.why}</span>
            </span>
            <span className="tabular text-[3.8cqw] font-medium">{pick.p}</span>
          </m.div>
        </AnimatePresence>
      </div>
      <div className="mt-[4cqw] space-y-[2cqw] px-[5cqw]">
        {[
          ["Kava s mlijekom", "2,20 €"],
          ["Cappuccino", "2,60 €"],
          ["Domaći ledeni čaj", "3,50 €"],
          ["Prirodni sok", "3,20 €"],
        ].map(([n, p]) => (
          <div key={n} className={`${item} bg-mist text-[3.8cqw]`}>
            <span className="font-medium">{n}</span>
            <span className="tabular text-slate">{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TipsScreen() {
  const { ref, tick } = useLiveLoop<HTMLDivElement>(2600);
  const opts = ["5 %", "10 %", "15 %"];
  const sel = [1, 1, 2, 0][tick % 4];
  return (
    <div ref={ref} className="flex h-full flex-col px-[6cqw]">
      <p className="pt-[2cqw] text-[3.4cqw] text-slate">Kavana Primjer · Stol 7</p>
      <p className="mt-[1cqw] text-[6cqw] font-semibold tracking-[-0.02em]">Plaćanje</p>
      <div className="mt-[4cqw] space-y-[1.5cqw] rounded-[4cqw] bg-mist p-[4cqw] text-[3.6cqw]">
        {[
          ["2× Cappuccino", "5,20 €"],
          ["1× Spritz", "6,50 €"],
          ["1× Prirodni sok", "3,20 €"],
        ].map(([n, p]) => (
          <p key={n} className="flex justify-between">
            <span>{n}</span>
            <span className="tabular">{p}</span>
          </p>
        ))}
        <p className="flex justify-between border-t border-ink/10 pt-[2cqw] font-semibold">
          <span>Ukupno</span>
          <span className="tabular">14,90 €</span>
        </p>
      </div>
      <p className="mt-[5cqw] text-[4cqw] font-semibold">Dodati napojnicu?</p>
      <div className="mt-[3cqw] grid grid-cols-3 gap-[2cqw] text-center">
        {opts.map((o, i) => (
          <span
            key={o}
            className={`tabular relative rounded-[3cqw] py-[3.5cqw] text-[3.8cqw] font-semibold transition-colors duration-300 ${sel === i ? "bg-ink text-white" : "bg-mist"}`}
          >
            {o}
            {i === 1 && (
              <span className="absolute -top-[2.2cqw] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#2f6bff] px-[1.8cqw] py-[0.3cqw] text-[2.5cqw] font-medium text-white">
                Prijedlog
              </span>
            )}
          </span>
        ))}
      </div>
      <div className="mt-[2cqw] grid grid-cols-2 gap-[2cqw] text-center text-[3.4cqw] text-slate">
        <span className="rounded-[3cqw] bg-mist py-[3cqw]">Drugi iznos</span>
        <span className="rounded-[3cqw] bg-mist py-[3cqw]">Bez napojnice</span>
      </div>
      <span className="mt-auto mb-[6cqw] rounded-full bg-ink py-[4cqw] text-center text-[4cqw] font-semibold text-white">Plati</span>
    </div>
  );
}

export function LoyaltyScreen() {
  const { ref, tick } = useLiveLoop<HTMLDivElement>(2400);
  const pts = 60 + (tick % 5) * 10;
  return (
    <div ref={ref} className="flex h-full flex-col px-[6cqw]">
      <p className="pt-[2cqw] text-[6cqw] font-semibold tracking-[-0.02em]">Tavla+</p>
      <div className="mt-[4cqw] rounded-[5cqw] bg-ink p-[5cqw] text-white">
        <p className="text-[3.2cqw] text-white/60">Vaši bodovi u Kavani Primjer</p>
        <p className="tabular mt-[1cqw] text-[9cqw] font-semibold tracking-[-0.03em]">{pts}</p>
        <div className="mt-[3cqw] h-[1.8cqw] overflow-hidden rounded-full bg-white/15">
          <m.div className="h-full rounded-full bg-[#2f6bff]" animate={{ width: `${pts}%` }} transition={{ duration: 0.6 }} />
        </div>
        <p className="mt-[2cqw] text-[3.2cqw] text-white/70">Još {100 - pts} bodova do nagrade</p>
      </div>
      <p className="mt-[5cqw] text-[3.8cqw] font-semibold">Pogodnosti objekta</p>
      <div className="mt-[2cqw] space-y-[2cqw] text-[3.6cqw]">
        {["Kava gratis na 100 bodova", "Popust za stalne goste utorkom"].map((t) => (
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
  const en = tick % 2 === 1;
  const rows: [string, string, string][] = [
    ["Kava s mlijekom", "Coffee with milk", "2,20 €"],
    ["Domaći ledeni čaj", "Homemade iced tea", "3,50 €"],
    ["Pršut i sir", "Prosciutto and cheese", "9,00 €"],
    ["Rožata", "Rozata (custard)", "4,50 €"],
  ];
  return (
    <div ref={ref} className="flex h-full flex-col px-[6cqw]">
      <div className="flex items-center justify-between pt-[2cqw]">
        <p className="text-[6cqw] font-semibold tracking-[-0.02em]">{en ? "Menu" : "Meni"}</p>
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
  const themes = [
    { bg: "#0b0b0d", fg: "#ffffff", accent: "#c8a96a", name: "Noćni bar" },
    { bg: "#f3ede4", fg: "#2b2620", accent: "#b5562f", name: "Konoba" },
    { bg: "#e8f2f5", fg: "#0f2f3a", accent: "#0f7c8a", name: "Beach bar" },
  ];
  const t = themes[tick % themes.length];
  return (
    <div ref={ref} className="flex h-full flex-col transition-colors duration-500" style={{ background: t.bg, color: t.fg }}>
      <div className="px-[6cqw] pt-[3cqw]">
        <p className="text-[3.2cqw] opacity-60">Prijedlog stila: {t.name}</p>
        <p className="mt-[1cqw] text-[7cqw] font-semibold tracking-[-0.03em]">Kavana Primjer</p>
      </div>
      <div className="mt-[4cqw] space-y-[2cqw] px-[5cqw]">
        {["Kava s mlijekom", "Spritz", "Prirodni sok"].map((n) => (
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
