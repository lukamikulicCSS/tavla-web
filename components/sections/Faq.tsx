"use client";

import { AnimatePresence, m } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { faq } from "@/content/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section aria-labelledby="faq-naslov" className="surface-light bg-white pb-24 pt-8 text-ink sm:pb-32">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <SectionHeading id="faq-naslov" tone="light" title="Česta pitanja." lead="Ne vidite svoje pitanje? Pošaljite ga kroz obrazac i odgovorit ćemo izravno." />
        <ul className="border-b border-line-light">
          {faq.map((item, i) => {
            const isOpen = open === i;
            const btnId = `${base}-b-${i}`;
            const panelId = `${base}-p-${i}`;
            return (
              <li key={item.q} className="border-t border-line-light">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-lg font-medium tracking-[-0.015em]"
                  >
                    {item.q}
                    <Plus
                      aria-hidden
                      className={`size-5 shrink-0 text-slate transition-transform duration-500 ease-[var(--ease-apple)] ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 leading-relaxed text-slate">{item.a}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
