"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { pillars } from "@/content/ai";
import { emit } from "@/lib/analytics/emit";
import { StatusPill } from "@/components/ui/StatusBadge";
import { AiPromoCard } from "./AiPromoCard";

const OPEN_DELAY = 120;
const CLOSE_DELAY = 200;
const PANEL_ID = "tavla-ai-izbornik";

/**
 * Desktop mega izbornik "Tavla AI" (≥1024 px).
 * Otvara se hoverom s namjerom (120 ms / 200 ms) i klikom. Esc, klik izvan i odabir linka ga zatvaraju.
 * Strelice lijevo/desno skaču između stupaca, Esc vraća fokus na gumb.
 */
export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLLIElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const pathname = usePathname();
  const active = pathname.startsWith("/tavla-ai");

  const set = useCallback((v: boolean) => {
    window.clearTimeout(timer.current);
    setOpen((prev) => {
      if (v && !prev) emit("nav_open", { label: "tavla-ai" });
      return v;
    });
  }, []);

  const later = (v: boolean) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => set(v), v ? OPEN_DELAY : CLOSE_DELAY);
  };

  // zatvori pri promjeni rute
  useEffect(() => set(false), [pathname, set]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) set(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        set(false);
        btn.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, set]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  /** Strelice lijevo/desno: prvi link u susjednom stupcu */
  const onPanelKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const cols = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("[data-col]"));
    const i = cols.findIndex((c) => c.contains(document.activeElement));
    if (i < 0) return;
    e.preventDefault();
    const next = cols[(i + (e.key === "ArrowRight" ? 1 : cols.length - 1)) % cols.length];
    next.querySelector<HTMLElement>("a")?.focus();
  };

  return (
    <li
      ref={wrap}
      onPointerEnter={(e) => e.pointerType === "mouse" && later(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && later(false)}
    >
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        data-track="nav-tavla-ai"
        onClick={() => set(!open)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            set(true);
            requestAnimationFrame(() => document.querySelector<HTMLElement>(`#${PANEL_ID} a`)?.focus());
          }
        }}
        className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.875rem] transition-colors hover:text-white focus-visible:outline-[#2f6bff] ${
          open || active ? "text-white" : "text-white/75"
        }`}
      >
        <span aria-hidden className="size-1.5 rounded-full bg-[#2f6bff] shadow-[0_0_10px_rgb(47_107_255/0.9)]" />
        Tavla AI
        <ChevronDown aria-hidden className={`size-3.5 opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id={PANEL_ID}
            role="region"
            aria-label="Tavla AI"
            onKeyDown={onPanelKey}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-[calc(100%+0.5rem)] mx-auto max-w-[72rem] origin-top"
          >
            {/* nevidljivi most, da miš ne "padne" u razmak između navigacije i panela */}
            <span aria-hidden className="absolute inset-x-0 -top-2 h-2" />
            <div className="glass grid grid-cols-[repeat(4,minmax(0,1fr))_12.5rem] gap-2 rounded-[2rem] !bg-[rgb(20_20_23/0.94)] p-3 xl:grid-cols-[repeat(4,minmax(0,1fr))_15rem]">
              {pillars.map((p) => (
                <div key={p.slug} data-col className="rounded-[1.5rem] p-3">
                  <Link
                    href={`/tavla-ai/${p.slug}`}
                    onClick={() => set(false)}
                    data-track={`nav-ai-${p.slug}`}
                    className="block rounded-xl px-2 py-1.5 text-[0.8125rem] font-medium text-soft transition-colors hover:text-white focus-visible:outline-[#2f6bff]"
                  >
                    {p.name}
                  </Link>
                  <ul className="mt-1.5 space-y-0.5">
                    {p.features.map((f) => (
                      <li key={f.id}>
                        <Link
                          href={`/tavla-ai/${p.slug}#${f.id}`}
                          onClick={() => set(false)}
                          data-track={`nav-ai-${f.id}`}
                          className="group block rounded-xl px-2 py-2 transition-colors hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:outline-[#2f6bff]"
                        >
                          <span className="flex items-center gap-2 text-base font-medium leading-tight tracking-[-0.01em] text-white">
                            {f.name}
                            <StatusPill status={f.status} />
                          </span>
                          <span className="mt-0.5 block text-[0.8125rem] leading-snug text-soft">{f.short}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div data-col>
                <AiPromoCard onNavigate={() => set(false)} />
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  );
}
