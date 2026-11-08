"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { useConsent } from "./consent";

const categories = [
  { key: "necessary", title: "Nužni", text: "Pamte vaš izbor o kolačićima i štite obrazac od zloupotrebe. Bez njih stranica ne radi ispravno.", locked: true },
  { key: "analytics", title: "Analitički", text: "Anonimna statistika posjeta koja nam pokazuje koje su stranice korisne. Ne koristimo ih za oglašavanje." },
  { key: "marketing", title: "Marketinški", text: "Trenutno ih ne koristimo. Ako ih uvedemo, tražit ćemo vaš pristanak." },
] as const;

export function CookieBanner() {
  const { consent, ready, panelOpen, openPanel, closePanel, save } = useConsent();
  const showBanner = ready && !consent && !panelOpen;

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <m.div
            role="region"
            aria-label="Obavijest o kolačićima"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[60] sm:inset-x-auto sm:right-5 sm:max-w-md"
          >
            <div className="glass rounded-[1.5rem] p-5 text-white">
              <p className="text-sm leading-relaxed text-white/85">
                Koristimo nužne kolačiće da bi stranica radila. Analitičke kolačiće koristimo samo uz vaš pristanak.{" "}
                <Link href="/kolacici" className="text-white underline underline-offset-4">Saznajte više</Link>
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button onClick={() => save({ analytics: false, marketing: false })} className="h-11 rounded-full bg-white/10 text-sm font-medium transition-colors hover:bg-white/15">
                  Odbij neobavezne
                </button>
                <button onClick={() => save({ analytics: true, marketing: true })} className="h-11 rounded-full bg-white/10 text-sm font-medium transition-colors hover:bg-white/15">
                  Prihvati sve
                </button>
                <button onClick={openPanel} className="col-span-2 h-10 text-sm text-white/70 underline-offset-4 hover:text-white hover:underline">
                  Prilagodi postavke
                </button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
      <AnimatePresence>{panelOpen && <PreferencesDialog onClose={closePanel} />}</AnimatePresence>
    </>
  );
}

function PreferencesDialog({ onClose }: { onClose: () => void }) {
  const { consent, save } = useConsent();
  // Ništa neobavezno nije unaprijed označeno
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);
  const titleId = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>("button, input")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("button, input, a");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);

  const values = { analytics, marketing };
  const setters = { analytics: setAnalytics, marketing: setMarketing };

  return (
    <m.div className="fixed inset-0 z-[70] grid place-items-end sm:place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />
      <m.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        className="relative m-3 w-[calc(100%-1.5rem)] max-w-lg rounded-[1.75rem] bg-graphite p-6 text-white shadow-2xl sm:p-8"
      >
        <h2 id={titleId} className="text-xl font-semibold tracking-[-0.02em]">Postavke kolačića</h2>
        <p className="mt-2 text-sm text-soft">Odaberite koje kolačiće dopuštate. Izbor možete promijeniti u bilo kojem trenutku putem poveznice u podnožju stranice.</p>

        <ul className="mt-6 divide-y divide-white/10">
          {categories.map((c) => {
            const locked = "locked" in c;
            const checked = locked ? true : values[c.key as "analytics" | "marketing"];
            const id = `pref-${c.key}`;
            return (
              <li key={c.key} className="flex items-start justify-between gap-6 py-4">
                <div>
                  <label htmlFor={id} className="font-medium">{c.title}</label>
                  <p className="mt-1 text-sm leading-relaxed text-soft">{c.text}</p>
                </div>
                <span className="relative mt-0.5 inline-flex">
                  <input
                    id={id}
                    type="checkbox"
                    role="switch"
                    checked={checked}
                    disabled={locked}
                    aria-checked={checked}
                    onChange={(e) => !locked && setters[c.key as "analytics" | "marketing"](e.target.checked)}
                    className="peer absolute inset-0 z-10 cursor-pointer opacity-0 disabled:cursor-not-allowed"
                  />
                  <span aria-hidden className={`h-7 w-12 rounded-full transition-colors ${checked ? "bg-white" : "bg-white/15"} ${locked ? "opacity-50" : ""} peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white`} />
                  <span aria-hidden className={`absolute left-1 top-1 size-5 rounded-full transition-transform duration-300 ${checked ? "translate-x-5 bg-ink" : "bg-white"}`} />
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <button onClick={() => save({ analytics: false, marketing: false })} className="h-11 rounded-full bg-white/10 text-sm font-medium hover:bg-white/15">
            Odbij neobavezne
          </button>
          <button onClick={() => save(values)} className="h-11 rounded-full bg-white text-sm font-medium text-ink hover:bg-white/90">
            Spremi odabir
          </button>
        </div>
      </m.div>
    </m.div>
  );
}
