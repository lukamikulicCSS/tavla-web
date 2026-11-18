import { Sparkles } from "lucide-react";
import type { PillarSlug } from "@/content/ai";

/** Mali statični isječci sučelja za kartice stupova na /tavla-ai (primjeri). */
export function MiniVisual({ slug }: { slug: PillarSlug }) {
  return (
    <div aria-hidden data-nosnippet className="flex min-h-[7.5rem] items-center">
      {slug === "poslovanje" && (
        <div className="w-full space-y-1.5 text-[0.8125rem]">
          {[
            ["Stol 4", "2× Espresso", true],
            ["Stol 12", "1× Spritz, 1× Limunada", false],
          ].map(([t, i, fresh]) => (
            <div key={String(t)} className={`flex justify-between rounded-xl p-3 ${fresh ? "bg-white/[0.12] ring-1 ring-white/25" : "bg-white/[0.06]"}`}>
              <span className="font-semibold">{t}</span>
              <span className="text-white/65">{i}</span>
            </div>
          ))}
        </div>
      )}
      {slug === "tim" && (
        <div className="w-full rounded-2xl bg-white p-3 text-ink">
          <p className="text-[0.6875rem] font-semibold">Dodati napojnicu?</p>
          <div className="mt-2 grid grid-cols-3 gap-1.5 text-center text-[0.8125rem]">
            {[5, 10, 15].map((p) => (
              <span key={p} className={`tabular relative rounded-xl py-2.5 font-semibold ${p === 10 ? "bg-ink text-white" : "bg-mist"}`}>
                {p} %
                {p === 10 && <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#2f6bff] px-1.5 py-px text-[0.5625rem] font-medium text-white">Prijedlog</span>}
              </span>
            ))}
          </div>
        </div>
      )}
      {slug === "gosti" && (
        <div className="w-full rounded-2xl bg-white p-3 text-ink">
          <p className="flex items-center gap-1.5 text-[0.6875rem] font-semibold text-[#1f4fd8]">
            <Sparkles className="size-3" /> Odabrano za vas
          </p>
          <div className="mt-2 flex items-center justify-between rounded-xl bg-mist px-3 py-2 text-[0.8125rem]">
            <span>
              <span className="block font-semibold">Limunada</span>
              <span className="block text-[0.6875rem] text-slate">Često uz vašu narudžbu</span>
            </span>
            <span className="tabular font-medium">3,80 €</span>
          </div>
        </div>
      )}
      {slug === "rast" && (
        <div className="w-full">
          <svg viewBox="0 0 240 70" className="w-full">
            {[14, 20, 26, 38, 52, 46, 40, 58, 66, 60, 50, 32].map((h, i) => (
              <rect key={i} x={i * 20 + 3} width="14" rx="3" y={68 - h} height={h} className={i === 8 ? "fill-[#2f6bff]" : "fill-white/25"} />
            ))}
          </svg>
          <p className="mt-2 text-[0.75rem] text-soft">Utorkom od 17 do 19 h prodaja limunade raste.</p>
        </div>
      )}
    </div>
  );
}
