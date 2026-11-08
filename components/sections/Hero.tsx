"use client";

import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ChefHat, Check, Inbox } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { images } from "@/content/navigation";
import { demoVenue } from "@/content/demo-data";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneFrame } from "@/components/product/PhoneFrame";
import { GuestApp, type GuestView } from "@/components/product/GuestApp";
import { DemoProvider, itemById, useDemo } from "@/components/product/demo-store";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-naslov" className="relative isolate overflow-hidden bg-ink pb-20 pt-32 sm:pt-40 lg:pb-28">
      {images.hero && (
        <>
          <Image src={images.hero} alt={images.heroAlt} fill priority sizes="100vw" className="-z-20 object-cover opacity-40" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" />
        </>
      )}

      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div className="max-w-[40rem]">
          {/* CSS animacija (samo pomak) — tekst je vidljiv od prvog iscrtavanja, bez čekanja na JavaScript */}
          <h1 id="hero-naslov" className="hero-rise text-display font-semibold">
            Nova razina ugostiteljskog iskustva.
          </h1>
          <p className="hero-rise mt-7 max-w-[34rem] text-lead text-soft [animation-delay:120ms]">
            Tavla povezuje goste, osoblje i vlasnike ugostiteljskih objekata u jedno jednostavno digitalno iskustvo. Manje čekanja,
            jednostavnije naručivanje i bolja kontrola poslovanja.
          </p>
          <m.div
            className="mt-10 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            <ButtonLink href="#kontakt" size="lg">Zatraži demonstraciju</ButtonLink>
            <ButtonLink href="#kako-funkcionira" size="lg" variant="secondary">Otkrij kako funkcionira</ButtonLink>
          </m.div>
        </div>

        <DemoProvider>
          <HeroStage />
        </DemoProvider>
      </div>
    </section>
  );
}

/**
 * Glavni trenutak stranice: mobitel sam odigra narudžbu, a točka iz logotipa
 * "odnese" je do obavijesti osoblja. Animacija staje izvan ekrana i za
 * korisnike koji su isključili pokrete.
 */
function HeroStage() {
  const demo = useDemo();
  const reduce = useReducedMotion();
  const [view, setView] = useState<GuestView>("menu");
  const [flash, setFlash] = useState<string>();
  const [visible, setVisible] = useState(false);
  const [sent, setSent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scenarij koji se ponavlja dok je hero vidljiv
  useEffect(() => {
    if (reduce || !visible) return;
    const t: number[] = [];
    const at = (ms: number, fn: () => void) => t.push(window.setTimeout(fn, ms));
    const run = () => {
      demo.reset();
      setView("menu");
      at(1200, () => { setFlash("kava-mlijeko"); demo.add("kava-mlijeko"); });
      at(1500, () => setFlash(undefined));
      at(2100, () => { setFlash("cappuccino"); demo.add("cappuccino"); });
      at(2400, () => setFlash(undefined));
      at(3300, () => setView("cart"));
      at(4400, () => demo.add("voda"));
      at(5600, () => { demo.place(); setView("status"); setSent((n) => n + 1); });
      at(15500, run);
    };
    run();
    return () => t.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, visible]);

  const order = demo.myLatest;

  return (
    <m.div
      ref={ref}
      className="relative mx-auto w-full max-w-[34rem]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.2, ease }}
    >
      <div aria-hidden className="stage-light absolute -inset-[20%] -z-10" />

      <PhoneFrame className="mx-auto w-[min(72vw,19.5rem)]" label="Tavla na mobitelu gosta: odabir pića i slanje narudžbe">
        <GuestApp view={view} onViewChange={setView} flashId={flash} interactive={false} />
      </PhoneFrame>

      {/* Obavijest za osoblje */}
      <div className="absolute -right-1 top-[3%] w-[min(58vw,15rem)] sm:top-[16%] sm:-right-6 lg:-right-16 xl:-right-20" aria-hidden>
        <AnimatePresence mode="wait">
          {order ? (
            <m.div
              key={order.id + order.status}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.45, ease }}
              className="glass rounded-[1.25rem] p-4 text-white"
            >
              <p className="flex items-center gap-2 text-xs text-soft">
                {order.status === "new" ? <Inbox className="size-3.5" /> : order.status === "preparing" ? <ChefHat className="size-3.5" /> : <Check className="size-3.5" />}
                {order.status === "new" ? "Nova narudžba" : order.status === "preparing" ? "U pripremi" : "Posluženo"}
              </p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.02em]">Stol {demoVenue.table}</p>
              <ul className="mt-1.5 space-y-0.5 text-[0.8125rem] text-white/75">
                {order.items.map((l) => (
                  <li key={l.id} className="truncate"><span className="tabular text-soft">{l.qty}×</span> {itemById(l.id).name}</li>
                ))}
              </ul>
            </m.div>
          ) : (
            <m.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass rounded-[1.25rem] p-4 text-white"
            >
              <p className="text-xs text-soft">Šank</p>
              <p className="mt-1 text-sm text-white/80">Čeka narudžbe sa stolova</p>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* Točka iz logotipa putuje od mobitela do šanka */}
      <AnimatePresence>
        {sent > 0 && !reduce && (
          <m.span
            key={sent}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[86%] z-10 size-3 rounded-full bg-white shadow-[0_0_24px_6px_rgb(255_255_255/0.45)]"
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.6 }}
            animate={{ x: ["0%", "300%", "900%"], y: ["0%", "-1600%", "-2800%"], opacity: [0, 1, 0], scale: [0.6, 1, 0.8] }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </m.div>
  );
}
