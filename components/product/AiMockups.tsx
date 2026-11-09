import { Sparkles } from "lucide-react";
import { formatEur } from "@/content/demo-data";
import { PhoneFrame, StatusBar } from "./PhoneFrame";

/**
 * Statični prikazi AI značajki koje su U RAZVOJU.
 * Jasno označeni kao "Uskoro" i "Primjer" — ne prikazuju se kao gotova funkcionalnost.
 */
export function AiMenuMockup({ className = "" }: { className?: string }) {
  const recs = [
    { name: "Spritz", why: "Popularno u ovo doba dana", price: 6.5 },
    { name: "Domaća limunada", why: "Osvježenje uz vašu kavu", price: 3.2 },
  ];
  return (
    <PhoneFrame className={`w-[min(70vw,17rem)] ${className}`} label="Primjer AI menija: osobne preporuke pića">
      <div className="flex h-full flex-col text-[3.9cqw]">
        <StatusBar />
        <div className="px-[5.5cqw] pt-[2cqw]">
          <p className="text-[3.2cqw] text-slate">Demo bar · Stol 7</p>
          <p className="mt-[1cqw] text-[6.4cqw] font-semibold leading-tight tracking-[-0.03em]">Dobra večer!</p>
        </div>
        <div className="mx-[4cqw] mt-[5cqw] rounded-[5cqw] bg-electric/[0.08] p-[4cqw] ring-1 ring-inset ring-electric/20">
          <p className="flex items-center gap-[1.5cqw] text-[3.3cqw] font-semibold text-electric-dark">
            <Sparkles className="size-[3.8cqw]" aria-hidden /> Odabrano za vas
          </p>
          <ul className="mt-[3cqw] space-y-[2.4cqw]">
            {recs.map((r) => (
              <li key={r.name} className="flex items-center justify-between rounded-[3.5cqw] bg-white p-[3cqw]">
                <span>
                  <span className="block font-semibold">{r.name}</span>
                  <span className="block text-[3cqw] text-slate">{r.why}</span>
                </span>
                <span className="tabular text-[3.5cqw] font-medium">{formatEur(r.price)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-[5cqw] space-y-[3cqw] px-[5.5cqw] opacity-50" aria-hidden>
          {[70, 55, 62].map((w, i) => (
            <div key={i} className="flex items-center gap-[3cqw]">
              <span className="size-[11cqw] rounded-[3cqw] bg-mist" />
              <span className="h-[2.6cqw] rounded-full bg-mist" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

export function AiTipsMockup({ className = "" }: { className?: string }) {
  const total = 18.4;
  const options = [
    { pct: 5, on: false },
    { pct: 10, on: true },
    { pct: 15, on: false },
  ];
  return (
    <PhoneFrame className={`w-[min(70vw,17rem)] ${className}`} label="Primjer AI napojnica: prijedlog iznosa napojnice pri plaćanju">
      <div className="flex h-full flex-col text-[3.9cqw]">
        <StatusBar />
        <div className="px-[5.5cqw] pt-[2cqw]">
          <p className="text-[3.2cqw] text-slate">Stol 7 · Račun</p>
          <p className="tabular mt-[1cqw] text-[9cqw] font-semibold tracking-[-0.04em]">{formatEur(total)}</p>
        </div>
        <div className="mx-[4cqw] mt-[6cqw]">
          <p className="flex items-center gap-[1.5cqw] text-[3.4cqw] font-semibold">
            Dodati napojnicu?
          </p>
          <div className="mt-[3cqw] grid grid-cols-3 gap-[2cqw]">
            {options.map((o) => (
              <span
                key={o.pct}
                className={`relative rounded-[3.5cqw] py-[3.6cqw] text-center ${o.on ? "bg-ink text-white" : "bg-mist"}`}
              >
                <span className="tabular block font-semibold">{o.pct} %</span>
                <span className={`tabular block text-[2.8cqw] ${o.on ? "text-white/70" : "text-slate"}`}>{formatEur((total * o.pct) / 100)}</span>
                {o.on && (
                  <span className="absolute -top-[2.2cqw] left-1/2 flex -translate-x-1/2 items-center gap-[0.8cqw] whitespace-nowrap rounded-full bg-electric px-[2cqw] py-[0.6cqw] text-[2.5cqw] font-medium text-white">
                    <Sparkles className="size-[2.6cqw]" aria-hidden /> Prijedlog
                  </span>
                )}
              </span>
            ))}
          </div>
          <p className="mt-[3cqw] text-center text-[3cqw] text-slate">Drugi iznos · Bez napojnice</p>
        </div>
        <div className="mt-auto px-[4cqw] pb-[7cqw]">
          <span className="tabular flex w-full items-center justify-between rounded-full bg-ink px-[5cqw] py-[3.8cqw] font-medium text-white">
            <span>Plati</span>
            <span>{formatEur(total * 1.1)}</span>
          </span>
        </div>
      </div>
    </PhoneFrame>
  );
}
