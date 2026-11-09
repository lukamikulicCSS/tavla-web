"use client";

import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhoneFrame, StatusBar } from "@/components/product/PhoneFrame";
import { GuestApp, type GuestView } from "@/components/product/GuestApp";
import { DemoProvider, useDemo } from "@/components/product/demo-store";

const steps = [
  { title: "Skeniraj", text: "Gost kamerom mobitela skenira kod na svom stolu. Meni se otvara u pregledniku, već povezan s tim stolom." },
  { title: "Naruči", text: "Gost pregledava meni, bira pića i šalje narudžbu sa svog mobitela, kad je on spreman." },
  { title: "Uživaj", text: "Osoblje odmah dobiva narudžbu i priprema je, a gost na mobitelu prati njezin status." },
];

export function HowItWorks({ compact = false }: { compact?: boolean }) {
  return (
    <section id="koraci" aria-label="Tri koraka" className={`bg-ink ${compact ? "pb-20 pt-4 sm:pb-28" : "py-24 sm:py-32"}`}>
      <div className="container-page">
        {!compact && <SectionHeading title="Tri koraka od stola do narudžbe." lead="Bez aplikacije za preuzimanje, bez registracije, bez čekanja konobara." />}
        <DemoProvider autoAdvance={false}>
          <Stepper />
        </DemoProvider>
      </div>
    </section>
  );
}

function Stepper() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const demo = useDemo();

  useEffect(() => {
    if (!auto || !inView || reduce) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % steps.length), 4200);
    return () => clearTimeout(t);
  }, [active, auto, inView, reduce]);

  // Pripremi stanje mobitela za svaki korak
  useEffect(() => {
    if (active === 0) demo.reset();
    if (active === 1) {
      demo.reset();
      demo.add("kava-mlijeko");
      demo.add("cappuccino");
    }
    if (active === 2) {
      demo.reset();
      demo.add("kava-mlijeko");
      demo.add("cappuccino");
      demo.place();
      demo.advance("A-1042"); // prva narudžba nakon reseta uvijek ima ovaj broj
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const views: GuestView[] = ["menu", "menu", "status"];

  return (
    <div ref={ref} className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-24">
      <ol className="space-y-2" aria-label="Koraci">
        {steps.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => {
                  setActive(i);
                  setAuto(false);
                }}
                aria-current={on ? "step" : undefined}
                className={`group relative w-full overflow-hidden rounded-[1.5rem] p-6 text-left transition-colors duration-500 sm:p-8 ${on ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"}`}
              >
                <span className="flex items-baseline gap-5">
                  <span className={`tabular text-sm transition-colors ${on ? "text-electric-light" : "text-soft"}`}>{i + 1}</span>
                  <span>
                    <span className={`block text-h3 font-semibold transition-colors ${on ? "text-white" : "text-white/45"}`}>{s.title}</span>
                    <AnimatePresence initial={false}>
                      {on && (
                        <m.span
                          className="block overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45 }}
                        >
                          <span className="block max-w-md pt-3 text-soft">{s.text}</span>
                        </m.span>
                      )}
                    </AnimatePresence>
                  </span>
                </span>
                {/* tanka traka napretka za automatsko prebacivanje */}
                {on && auto && inView && !reduce && (
                  <m.span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-[2px] bg-electric"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4.2, ease: "linear" }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="relative mx-auto">
        <div aria-hidden className="stage-light absolute -inset-[25%] -z-10" />
        <PhoneFrame className="w-[min(70vw,17.5rem)]" label={`Mobitel gosta, korak ${active + 1}: ${steps[active].title}`}>
          <AnimatePresence mode="wait">
            <m.div
              key={active}
              className="h-full"
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.35 }}
            >
              {active === 0 ? <ScanScreen /> : <GuestApp view={views[active]} interactive={false} />}
            </m.div>
          </AnimatePresence>
        </PhoneFrame>
      </div>
    </div>
  );
}

/** Kamera s okvirom za skeniranje — originalna ilustracija. */
function ScanScreen() {
  return (
    <div className="relative flex h-full flex-col bg-[#101012] text-white">
      <StatusBar dark />
      <div className="relative flex flex-1 items-center justify-center">
        {/* stol */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#2a241f] to-transparent" />
        <div className="relative grid size-[56cqw] place-items-center">
          <QrGlyph />
          {(["tl", "tr", "bl", "br"] as const).map((c) => (
            <span
              key={c}
              aria-hidden
              className={`absolute size-[10cqw] border-white ${
                c === "tl" ? "left-0 top-0 rounded-tl-[4cqw] border-l-[0.9cqw] border-t-[0.9cqw]" : c === "tr" ? "right-0 top-0 rounded-tr-[4cqw] border-r-[0.9cqw] border-t-[0.9cqw]" : c === "bl" ? "bottom-0 left-0 rounded-bl-[4cqw] border-b-[0.9cqw] border-l-[0.9cqw]" : "bottom-0 right-0 rounded-br-[4cqw] border-b-[0.9cqw] border-r-[0.9cqw]"
              }`}
            />
          ))}
          <m.span
            aria-hidden
            className="absolute inset-x-[6cqw] h-[0.5cqw] rounded-full bg-white/80 shadow-[0_0_12px_2px_rgb(255_255_255/0.5)]"
            initial={{ top: "12%" }}
            animate={{ top: ["12%", "86%", "12%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
      <div className="glass mx-[5cqw] mb-[8cqw] rounded-[5cqw] p-[4cqw] text-[3.6cqw]">
        <p className="font-semibold">tavla.hr</p>
        <p className="text-white/70">Otvori meni za stol 7</p>
      </div>
    </div>
  );
}

function QrGlyph() {
  // Ilustrativni uzorak (nije pravi QR kod koji se može skenirati)
  const cells = [
    "1111111001011111111", "1000001010101000001", "1011101001001011101", "1011101011101011101", "1011101000001011101",
    "1000001010101000001", "1111111010101111111", "0000000011100000000", "1101011100110101101", "0110100011011010010",
    "1011011101100111011", "0000000010101101001", "1111111001110101100", "1000001011010010111", "1011101000111101001",
    "1011101011001011010", "1011101010110110101", "1000001001011001011", "1111111011100110101",
  ];
  return (
    <svg viewBox="0 0 19 19" className="size-[40cqw] rounded-[2cqw] bg-white p-[2.4cqw]" aria-hidden shapeRendering="crispEdges">
      {cells.flatMap((row, y) => [...row].map((c, x) => (c === "1" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#0B0B0D" /> : null)))}
    </svg>
  );
}
