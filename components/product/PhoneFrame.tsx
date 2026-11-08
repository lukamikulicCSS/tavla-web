import type { ReactNode } from "react";

/**
 * Okvir mobitela nacrtan u CSS-u (bez slika — oštar na svakom ekranu, nula KB).
 * Sadržaj ekrana je pravo sučelje, ne screenshot.
 */
export function PhoneFrame({ children, className = "", label }: { children: ReactNode; className?: string; label?: string }) {
  return (
    <div
      className={`relative aspect-[9/19.5] rounded-[3rem] bg-[#1c1c1f] p-[0.55rem] shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_40px_80px_-30px_rgb(0_0_0/0.8),inset_0_0_0_1px_rgb(255_255_255/0.06)] ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {/* bočne tipke */}
      <span aria-hidden className="absolute -left-[3px] top-[22%] h-[7%] w-[3px] rounded-l bg-[#2a2a2e]" />
      <span aria-hidden className="absolute -left-[3px] top-[31%] h-[7%] w-[3px] rounded-l bg-[#2a2a2e]" />
      <span aria-hidden className="absolute -right-[3px] top-[26%] h-[11%] w-[3px] rounded-r bg-[#2a2a2e]" />
      <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-white text-ink [container-type:inline-size]">
        {/* dynamic island */}
        <span aria-hidden className="absolute left-1/2 top-[0.6rem] z-30 h-[1.6rem] w-[30%] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}

export function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div aria-hidden className={`flex h-11 shrink-0 items-end justify-between px-[8cqw] pb-1 text-[3.6cqw] font-semibold ${dark ? "text-white" : "text-ink"}`}>
      <span className="tabular">9:41</span>
      <span className="flex items-center gap-[1.2cqw]">
        <svg viewBox="0 0 18 12" className="h-[3cqw]" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="7" rx="1" /><rect x="10" y="2.5" width="3" height="9.5" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
        <svg viewBox="0 0 26 12" className="h-[3cqw]" fill="none" stroke="currentColor"><rect x="0.5" y="0.5" width="22" height="11" rx="3" opacity=".4" /><rect x="2" y="2" width="17" height="8" rx="1.8" fill="currentColor" stroke="none" /><path d="M24.5 4v4" strokeLinecap="round" opacity=".4" /></svg>
      </span>
    </div>
  );
}
