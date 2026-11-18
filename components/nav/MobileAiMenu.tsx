"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { pillars } from "@/content/ai";
import { emit } from "@/lib/analytics/emit";
import { StatusPill } from "@/components/ui/StatusBadge";

/** "Tavla AI" kao harmonika u mobilnom izborniku (<1024 px). Bez promo kartice. */
export function MobileAiMenu({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobilni-tavla-ai"
        data-track="nav-mobile-tavla-ai"
        onClick={() => {
          if (!open) emit("nav_open", { label: "tavla-ai" });
          setOpen((v) => !v);
        }}
        className="flex min-h-12 w-full items-center gap-2.5 rounded-2xl px-4 text-left text-xl font-medium tracking-[-0.02em] text-white hover:bg-white/[0.06]"
      >
        <span aria-hidden className="size-2 rounded-full bg-[#2f6bff] shadow-[0_0_10px_rgb(47_107_255/0.9)]" />
        Tavla AI
        <ChevronDown aria-hidden className={`ml-auto size-5 text-soft transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id="mobilni-tavla-ai"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-4 px-2 pb-3 pt-1">
              <Link
                href="/tavla-ai"
                onClick={onNavigate}
                className="flex min-h-11 items-center rounded-xl px-2 text-[0.9375rem] font-medium text-[#7aa2ff]"
              >
                Pregled Tavla AI ekosustava
              </Link>
              {pillars.map((p) => (
                <div key={p.slug}>
                  <Link
                    href={`/tavla-ai/${p.slug}`}
                    onClick={onNavigate}
                    className="flex min-h-11 items-center rounded-xl px-2 text-[0.8125rem] font-medium text-soft hover:text-white"
                  >
                    {p.name}
                  </Link>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f.id}>
                        <Link
                          href={`/tavla-ai/${p.slug}#${f.id}`}
                          onClick={onNavigate}
                          className="flex min-h-11 items-center gap-2 rounded-xl px-2 text-base text-white hover:bg-white/[0.06]"
                        >
                          {f.name}
                          <StatusPill status={f.status} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
