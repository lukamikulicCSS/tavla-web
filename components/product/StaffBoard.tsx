"use client";

import { AnimatePresence, m } from "framer-motion";
import { Bell, Check, ChefHat, Receipt } from "lucide-react";
import { useEffect, useState } from "react";
import { demoVenue } from "@/content/demo-data";
import { itemById, minutesSince, useDemo, type OrderStatus } from "./demo-store";

const columns: { key: OrderStatus; title: string; action?: string }[] = [
  { key: "new", title: "Nove", action: "Prihvati" },
  { key: "preparing", title: "U pripremi", action: "Posluženo" },
  { key: "served", title: "Posluženo" },
];

const dot: Record<OrderStatus, string> = { new: "bg-info", preparing: "bg-wait", served: "bg-ok" };

/** Prikaz za osoblje: narudžbe po statusu i zahtjevi gostiju. */
export function StaffBoard({ interactive = true }: { interactive?: boolean }) {
  const demo = useDemo();
  const now = useNow();
  const openReqs = demo.requests.filter((r) => !r.done);
  const tabIndex = interactive ? 0 : -1;

  return (
    <div className="flex h-full flex-col p-4 text-sm @2xl:p-6" inert={!interactive || undefined}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-soft">{demoVenue.name}</p>
          <p className="text-lg font-semibold tracking-[-0.02em]">Narudžbe</p>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-soft">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-ok" />
          </span>
          Uživo
        </span>
      </div>

      {/* Zahtjevi gostiju */}
      <div className="mt-4 min-h-[2.75rem]" aria-live="polite">
        <AnimatePresence initial={false}>
          {openReqs.map((r) => (
            <m.div
              key={r.id}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-2 overflow-hidden"
            >
              <div
                className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5 ${
                  r.table === demoVenue.table ? "bg-white text-ink" : "bg-white/[0.06]"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  {r.kind === "bill" ? <Receipt className="size-4" /> : <Bell className="size-4" />}
                  <span>
                    <b className="font-semibold">Stol {r.table}</b> {r.kind === "bill" ? "traži račun" : "zove konobara"}
                  </span>
                </span>
                <button
                  tabIndex={tabIndex}
                  onClick={() => demo.resolve(r.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${r.table === demoVenue.table ? "bg-ink text-white" : "bg-white/10"}`}
                >
                  Riješeno
                </button>
              </div>
            </m.div>
          ))}
        </AnimatePresence>
        {openReqs.length === 0 && <p className="py-2.5 text-xs text-soft">Nema otvorenih zahtjeva.</p>}
      </div>

      {/* Stupci */}
      <div className="mt-2 grid flex-1 gap-3 @lg:grid-cols-3">
        {columns.map((col) => {
          const list = demo.orders.filter((o) => o.status === col.key).slice(0, col.key === "served" ? 2 : 4);
          return (
            <section key={col.key} aria-label={col.title} className="flex min-w-0 flex-col rounded-2xl bg-white/[0.03] p-2.5">
              <h4 className="flex items-center gap-2 px-1.5 pb-2 text-xs font-medium text-soft">
                <i className={`size-1.5 rounded-full ${dot[col.key]}`} />
                {col.title}
                <span className="tabular ml-auto">{demo.orders.filter((o) => o.status === col.key).length}</span>
              </h4>
              <ul className="space-y-2">
                <AnimatePresence initial={false}>
                  {list.map((o) => (
                    <m.li
                      key={o.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      className={`rounded-xl p-3 ${o.mine && o.status === "new" ? "bg-white/[0.12] ring-1 ring-white/30" : "bg-white/[0.06]"}`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-base font-semibold tracking-[-0.02em]">Stol {o.table}</span>
                        <span className="tabular shrink-0 text-[0.6875rem] text-soft">{minutesSince(o.createdAt, now)}</span>
                      </div>
                      <ul className="mt-1.5 space-y-0.5 text-[0.8125rem] text-white/80">
                        {o.items.map((l) => (
                          <li key={l.id} className="truncate">
                            <span className="tabular text-soft">{l.qty}×</span> {itemById(l.id).name}
                          </li>
                        ))}
                      </ul>
                      {col.action && (
                        <button
                          tabIndex={tabIndex}
                          onClick={() => demo.advance(o.id)}
                          className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-white py-1.5 text-xs font-semibold text-ink transition-transform active:scale-[0.97]"
                        >
                          {col.key === "new" ? <ChefHat className="size-3.5" /> : <Check className="size-3.5" />}
                          {col.action}
                        </button>
                      )}
                    </m.li>
                  ))}
                </AnimatePresence>
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function useNow(interval = 30_000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), interval);
    return () => clearInterval(t);
  }, [interval]);
  return now;
}
