"use client";

/**
 * Sučelje za goste unutar okvira mobitela.
 * Sve dimenzije su u cqw (postotak širine ekrana) pa se skalira s mobitelom.
 */
import { AnimatePresence, m } from "framer-motion";
import { Bell, Check, ChevronLeft, Minus, Plus, Receipt, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { demoCategoryIds, demoMenu, demoVenue } from "@/content/demo-data";
import { itemById, lineCount, lineTotal, useDemo, useDemoText, type OrderStatus } from "./demo-store";
import { StatusBar } from "./PhoneFrame";
import { emit } from "@/lib/analytics/emit";
import type { DemoAction } from "@/lib/analytics/events";

/** Analitika demoa — samo stvarni klikovi posjetitelja (ne automatska animacija u heroju). */
const demoEvent = (label: DemoAction) => emit("demo_interaction", { section: "demo", label });

export type GuestView = "menu" | "cart" | "status";

const steps: OrderStatus[] = ["new", "preparing", "served"];

export function GuestApp({
  view: controlledView,
  onViewChange,
  flashId,
  interactive = true,
}: {
  view?: GuestView;
  onViewChange?: (v: GuestView) => void;
  /** Kratko istakne gumb artikla (za automatsku animaciju u heroju) */
  flashId?: string;
  interactive?: boolean;
}) {
  const demo = useDemo();
  const dt = useDemoText();
  const g = dt.t.guest;
  const [innerView, setInnerView] = useState<GuestView>("menu");
  const view = controlledView ?? innerView;
  const setView = (v: GuestView) => (onViewChange ? onViewChange(v) : setInnerView(v));
  const [cat, setCat] = useState<(typeof demoCategoryIds)[number]>(demoCategoryIds[0]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const items = useMemo(() => demoMenu.filter((i) => i.cat === cat), [cat]);
  const count = lineCount(demo.cart);
  const total = lineTotal(demo.cart);

  const suggestions = useMemo(() => {
    const inCart = new Set(demo.cart.map((l) => l.id));
    const ids = new Set(demo.cart.flatMap((l) => itemById(l.id).pairsWith ?? []));
    return [...ids].filter((id) => !inCart.has(id)).slice(0, 2).map(itemById);
  }, [demo.cart]);

  const tabIndex = interactive ? 0 : -1;
  const order = demo.myLatest;

  return (
    <div className="relative flex h-full flex-col text-[3.9cqw] leading-snug" inert={!interactive || undefined}>
      <StatusBar />

      {/* Zaglavlje */}
      <div className="flex items-center justify-between px-[5.5cqw] pb-[3cqw] pt-[2cqw]">
        {view === "status" ? (
          <button tabIndex={tabIndex} onClick={() => setView("menu")} className="-ml-[1.5cqw] flex items-center gap-[0.5cqw] font-medium">
            <ChevronLeft className="size-[5cqw]" /> {g.menu}
          </button>
        ) : (
          <div>
            <p className="text-[3.2cqw] text-slate">{dt.venue}</p>
            <p className="text-[5.6cqw] font-semibold tracking-[-0.02em]">{dt.t.table} {demoVenue.table}</p>
          </div>
        )}
        <span className="rounded-full bg-mist px-[2.6cqw] py-[1cqw] text-[3.1cqw] font-medium text-slate">{g.langBadge}</span>
      </div>

      {view !== "status" ? (
        <>
          {/* Kategorije */}
          <div className="no-scrollbar flex gap-[2cqw] overflow-x-auto px-[5.5cqw] pb-[3cqw]" role="tablist" aria-label={g.categoriesAria}>
            {demoCategoryIds.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                tabIndex={tabIndex}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-[3.6cqw] py-[1.8cqw] text-[3.5cqw] font-medium transition-colors ${
                  cat === c ? "bg-ink text-white" : "bg-mist text-ink/70"
                }`}
              >
                {dt.category(c)}
              </button>
            ))}
          </div>

          {/* Artikli */}
          <ul className="no-scrollbar flex-1 space-y-[0.5cqw] overflow-y-auto px-[3cqw] pb-[24cqw]">
            {items.map((it) => {
              const inCart = demo.cart.find((l) => l.id === it.id)?.qty ?? 0;
              const flashing = flashId === it.id;
              return (
                <li key={it.id} className="flex items-center gap-[3cqw] rounded-[4cqw] px-[2.5cqw] py-[2.6cqw]">
                  <div aria-hidden className="grid size-[13cqw] shrink-0 place-items-center rounded-[3.5cqw] bg-mist text-[5.5cqw]">
                    <DrinkGlyph cat={it.cat} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold tracking-[-0.01em]">
                      {dt.name(it.id)}
                      {it.popular && (
                        <span className="ml-[1.5cqw] inline-flex items-center rounded-full bg-ink/[0.06] px-[1.6cqw] py-[0.3cqw] align-middle text-[2.6cqw] font-medium text-slate">
                          {g.popular}
                        </span>
                      )}
                    </p>
                    <p className="truncate text-[3.2cqw] text-slate">{dt.desc(it.id)}</p>
                    <p className="tabular mt-[0.5cqw] text-[3.5cqw] font-medium">{dt.eur(it.price)}</p>
                  </div>
                  <button
                    tabIndex={tabIndex}
                    onClick={() => {
                      demoEvent("guest_add");
                      demo.add(it.id);
                    }}
                    aria-label={g.add(dt.name(it.id))}
                    className={`relative grid size-[9cqw] shrink-0 place-items-center rounded-full transition-[transform,background-color] duration-200 active:scale-90 ${
                      inCart ? "bg-ink text-white" : "bg-mist text-ink"
                    } ${flashing ? "scale-90 bg-ink text-white" : ""}`}
                  >
                    {inCart ? <span className="tabular text-[3.4cqw] font-semibold">{inCart}</span> : <Plus className="size-[4.4cqw]" />}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Traka košarice */}
          <AnimatePresence>
            {count > 0 && view === "menu" && (
              <m.div
                initial={{ y: "120%" }}
                animate={{ y: 0 }}
                exit={{ y: "120%" }}
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
                className="absolute inset-x-[4cqw] bottom-[6cqw] z-20"
              >
                <button
                  tabIndex={tabIndex}
                  onClick={() => setView("cart")}
                  className="flex w-full items-center justify-between rounded-full bg-ink py-[3.6cqw] pl-[5cqw] pr-[3.6cqw] text-white shadow-[0_10px_30px_-10px_rgb(0_0_0/0.6)]"
                >
                  <span className="font-medium">{g.reviewOrder}</span>
                  <span className="tabular flex items-center gap-[2cqw]">
                    <span className="rounded-full bg-white/15 px-[2.2cqw] py-[0.6cqw] text-[3.2cqw]">{count}</span>
                    {dt.eur(total)}
                  </span>
                </button>
              </m.div>
            )}
          </AnimatePresence>

          {/* Košarica (bottom sheet) */}
          <AnimatePresence>
            {view === "cart" && (
              <>
                <m.div
                  key="scrim"
                  className="absolute inset-0 z-30 bg-black/25"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setView("menu")}
                />
                <m.div
                  key="sheet"
                  role="dialog"
                  aria-label={g.cartAria}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", stiffness: 340, damping: 36 }}
                  className="absolute inset-x-0 bottom-0 z-40 rounded-t-[7cqw] bg-white px-[5.5cqw] pb-[7cqw] pt-[3cqw] shadow-[0_-20px_40px_-20px_rgb(0_0_0/0.3)]"
                >
                  <span aria-hidden className="mx-auto mb-[4cqw] block h-[1.2cqw] w-[11cqw] rounded-full bg-ink/15" />
                  <p className="text-[5cqw] font-semibold tracking-[-0.02em]">{g.yourOrder}</p>
                  <ul className="mt-[3cqw] space-y-[2.4cqw]">
                    {demo.cart.map((l) => {
                      const name = dt.name(l.id);
                      return (
                        <li key={l.id} className="flex items-center justify-between gap-[2cqw]">
                          <span className="min-w-0 truncate">{name}</span>
                          <span className="flex shrink-0 items-center gap-[2cqw]">
                            <button tabIndex={tabIndex} aria-label={g.removeOne(name)} onClick={() => demo.dec(l.id)} className="grid size-[7cqw] place-items-center rounded-full bg-mist">
                              <Minus className="size-[3.4cqw]" />
                            </button>
                            <span className="tabular w-[4cqw] text-center font-medium">{l.qty}</span>
                            <button tabIndex={tabIndex} aria-label={g.addMore(name)} onClick={() => {
                              demoEvent("guest_add");
                              demo.add(l.id);
                            }} className="grid size-[7cqw] place-items-center rounded-full bg-mist">
                              <Plus className="size-[3.4cqw]" />
                            </button>
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {suggestions.length > 0 && (
                    <div className="mt-[5cqw]">
                      <p className="flex items-center gap-[1.4cqw] text-[3.2cqw] font-medium text-slate">
                        <Sparkles className="size-[3.4cqw]" /> {g.pairs}
                      </p>
                      <div className="mt-[2cqw] flex gap-[2cqw]">
                        {suggestions.map((s) => (
                          <button
                            key={s.id}
                            tabIndex={tabIndex}
                            onClick={() => {
                              demoEvent("guest_add");
                              demo.add(s.id);
                            }}
                            className="flex flex-1 items-center justify-between gap-[1cqw] rounded-[3.5cqw] bg-mist px-[3cqw] py-[2.4cqw] text-left text-[3.3cqw]"
                          >
                            <span className="min-w-0">
                              <span className="block truncate font-medium">{dt.name(s.id)}</span>
                              <span className="tabular text-slate">{dt.eur(s.price)}</span>
                            </span>
                            <Plus className="size-[3.6cqw] shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    tabIndex={tabIndex}
                    disabled={!count}
                    onClick={() => {
                      demoEvent("guest_order");
                      demo.place();
                      setView("status");
                    }}
                    className="tabular mt-[5cqw] flex w-full items-center justify-between rounded-full bg-ink px-[5cqw] py-[3.8cqw] font-medium text-white disabled:opacity-40"
                  >
                    <span>{g.send}</span>
                    <span>{dt.eur(total)}</span>
                  </button>
                </m.div>
              </>
            )}
          </AnimatePresence>
        </>
      ) : (
        <StatusView
          status={order?.status ?? "new"}
          orderId={order?.id}
          lines={order?.items ?? []}
          tabIndex={tabIndex}
          onRepeat={() => {
            demoEvent("guest_repeat");
            demo.repeat();
          }}
          onWaiter={() => {
            demoEvent("guest_waiter");
            demo.request("waiter");
            setToast(g.waiterToast);
          }}
          onBill={() => {
            demoEvent("guest_bill");
            demo.request("bill");
            setToast(g.billToast);
          }}
        />
      )}

      <AnimatePresence>
        {toast && (
          <m.div
            role="status"
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            className="absolute inset-x-[6cqw] top-[13cqw] z-50 flex items-center gap-[2cqw] rounded-full bg-ink px-[4cqw] py-[3cqw] text-[3.5cqw] font-medium text-white"
          >
            <Check className="size-[4cqw]" /> {toast}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusView({
  status,
  orderId,
  lines,
  tabIndex,
  onRepeat,
  onWaiter,
  onBill,
}: {
  status: OrderStatus;
  orderId?: string;
  lines: { id: string; qty: number }[];
  tabIndex: number;
  onRepeat: () => void;
  onWaiter: () => void;
  onBill: () => void;
}) {
  const dt = useDemoText();
  const g = dt.t.guest;
  const idx = steps.indexOf(status);
  const headline = g.headline[status];
  return (
    <div className="flex flex-1 flex-col px-[5.5cqw] pb-[6cqw]">
      <p className="text-[3.2cqw] text-slate">{g.order} {orderId}</p>
      <AnimatePresence mode="wait">
        <m.p
          key={status}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="mt-[1cqw] text-[7cqw] font-semibold leading-[1.1] tracking-[-0.03em]"
        >
          {headline}
        </m.p>
      </AnimatePresence>

      {/* Napredak */}
      <ol className="mt-[6cqw] grid grid-cols-3 gap-[2cqw]" aria-label={g.statusAria}>
        {steps.map((s, i) => (
          <li key={s} className="text-[3cqw]">
            <span className="block h-[1.2cqw] overflow-hidden rounded-full bg-ink/10">
              <m.span
                className="block h-full rounded-full bg-ink"
                initial={false}
                animate={{ width: i <= idx ? "100%" : "0%" }}
                transition={{ duration: 0.6 }}
              />
            </span>
            <span className={`mt-[1.5cqw] block ${i <= idx ? "font-medium text-ink" : "text-slate"}`}>{g.steps[s]}</span>
          </li>
        ))}
      </ol>

      <ul className="mt-[6cqw] space-y-[1.5cqw] rounded-[4cqw] bg-mist p-[4cqw] text-[3.5cqw]">
        {lines.map((l) => (
          <li key={l.id} className="flex justify-between">
            <span>
              <span className="tabular text-slate">{l.qty}×</span> {dt.name(l.id)}
            </span>
            <span className="tabular">{dt.eur(itemById(l.id).price * l.qty)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto grid gap-[2cqw]">
        <button tabIndex={tabIndex} onClick={onRepeat} className="flex items-center justify-center gap-[2cqw] rounded-full bg-ink py-[3.6cqw] font-medium text-white">
          <RotateCcw className="size-[4cqw]" /> {g.repeat}
        </button>
        <div className="grid grid-cols-2 gap-[2cqw]">
          <button tabIndex={tabIndex} onClick={onWaiter} className="flex items-center justify-center gap-[1.6cqw] rounded-full bg-mist py-[3.4cqw] font-medium">
            <Bell className="size-[3.8cqw]" /> {g.waiter}
          </button>
          <button tabIndex={tabIndex} onClick={onBill} className="flex items-center justify-center gap-[1.6cqw] rounded-full bg-mist py-[3.4cqw] font-medium">
            <Receipt className="size-[3.8cqw]" /> {g.bill}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Jednostavni piktogrami pića — originalni, bez fotografija. */
export function DrinkGlyph({ cat }: { cat: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (cat === "kava")
    return (
      <svg viewBox="0 0 24 24" className="size-[6.5cqw] text-ink/70" {...common}>
        <path d="M5 9h11v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V9Z" />
        <path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16" />
        <path d="M9 3.5c-.6.8-.6 1.7 0 2.5M12.5 3.5c-.6.8-.6 1.7 0 2.5" />
      </svg>
    );
  if (cat === "pivo")
    return (
      <svg viewBox="0 0 24 24" className="size-[6.5cqw] text-ink/70" {...common}>
        <path d="M6 7h10v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7Z" />
        <path d="M16 10h1.5a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H16" />
        <path d="M6 7a2.5 2.5 0 0 1 3-3 3 3 0 0 1 5 .5A2 2 0 0 1 16 7" />
      </svg>
    );
  if (cat === "kokteli")
    return (
      <svg viewBox="0 0 24 24" className="size-[6.5cqw] text-ink/70" {...common}>
        <path d="M4 5h16l-8 8-8-8Z" />
        <path d="M12 13v7M8 20h8" />
        <circle cx="17.5" cy="4" r="1.8" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="size-[6.5cqw] text-ink/70" {...common}>
      <path d="M7 4h10l-1.4 15.2a1 1 0 0 1-1 .8H9.4a1 1 0 0 1-1-.8L7 4Z" />
      <path d="M7.5 9h9" />
    </svg>
  );
}
