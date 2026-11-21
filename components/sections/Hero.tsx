"use client";

import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ChefHat, Check, Inbox } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { images } from "@/content/navigation";
import { demoVenue } from "@/content/demo-data";
import { anchors } from "@/content/routes";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneFrame } from "@/components/product/PhoneFrame";
import { GuestApp, type GuestView } from "@/components/product/GuestApp";
import { DemoProvider, useDemo, useDemoText } from "@/components/product/demo-store";
import { useDict, useLocale } from "@/components/i18n/LocaleProvider";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const locale = useLocale();
  const t = useDict().home.hero;
  const a = anchors[locale];
  return (
    <section
      ref={sectionRef}
      id="top"
      data-section="hero"
      aria-labelledby="hero-naslov"
      className="relative isolate overflow-hidden bg-ink pb-20 pt-32 sm:pt-40 lg:pb-28"
    >
      {images.hero && (
        <>
          <Image src={images.hero} alt={images.heroAlt[locale]} fill priority sizes="100vw" className="-z-20 object-cover opacity-40" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" />
        </>
      )}

      <PointerGlow targetRef={sectionRef} />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-8">
        <div className="max-w-[36rem]">
          {/* CSS animacija (samo pomak) — tekst je vidljiv od prvog iscrtavanja, bez čekanja na JavaScript */}
          <h1
            id="hero-naslov"
            className="hero-rise text-[clamp(2.5rem,1.45rem+3.3vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
          >
            {t.title}
          </h1>
          <p className="hero-rise mt-5 max-w-[30rem] text-[1.0625rem] leading-relaxed text-soft sm:text-lg [animation-delay:120ms]">
            {t.lead}
          </p>
          <m.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            <ButtonLink href={`#${a.contact}`} size="lg" data-track="hero-cta-demo">{t.cta}</ButtonLink>
            <ButtonLink href={`#${a.how}`} size="lg" variant="secondary" data-track="hero-kako-funkcionira">{t.secondary}</ButtonLink>
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
 * Plavo svjetlo koje prati miš (desktop) ili prst (mobitel).
 * - Pomiče se samo transform (GPU), bez ponovnog iscrtavanja → glatko i na slabijim mobitelima.
 * - Lagano "kasni" za pokazivačem (lerp) pa djeluje mekano, a ne nervozno.
 * - Kad pokazivač izađe, svjetlo se polako vrati iza mobitela.
 * - Uz "smanji pokrete" u sustavu svjetlo stoji na mjestu.
 */
function PointerGlow({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const glowRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const section = targetRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    const SIZE = 720;
    let w = section.clientWidth;
    let h = section.clientHeight;
    // početni položaj: iza mobitela (desno na desktopu, dolje na mobitelu)
    const home = () => (w >= 1024 ? { x: w * 0.72, y: h * 0.48 } : { x: w * 0.5, y: h * 0.72 });
    let target = home();
    const pos = { ...target };
    let raf = 0;
    let active = false;

    const apply = () => {
      glow.style.transform = `translate3d(${pos.x - SIZE / 2}px, ${pos.y - SIZE / 2}px, 0)`;
    };
    apply();
    if (reduce) return;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.09;
      pos.y += (target.y - pos.y) * 0.09;
      apply();
      if (Math.abs(target.x - pos.x) > 0.5 || Math.abs(target.y - pos.y) > 0.5) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const moveTo = (clientX: number, clientY: number) => {
      const r = section.getBoundingClientRect();
      target = { x: clientX - r.left, y: clientY - r.top };
      active = true;
      glow.style.opacity = "1";
      kick();
    };
    const goHome = () => {
      active = false;
      target = home();
      glow.style.opacity = "0.75";
      kick();
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === "mouse") moveTo(e.clientX, e.clientY);
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) moveTo(t.clientX, t.clientY);
    };
    const onResize = () => {
      w = section.clientWidth;
      h = section.clientHeight;
      if (!active) {
        target = home();
        kick();
      }
    };

    section.addEventListener("pointermove", onPointer, { passive: true });
    section.addEventListener("pointerleave", goHome);
    // passive → ne blokira skrolanje; svjetlo prati prst i dok se stranica pomiče
    section.addEventListener("touchstart", onTouch, { passive: true });
    section.addEventListener("touchmove", onTouch, { passive: true });
    section.addEventListener("touchend", goHome);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onPointer);
      section.removeEventListener("pointerleave", goHome);
      section.removeEventListener("touchstart", onTouch);
      section.removeEventListener("touchmove", onTouch);
      section.removeEventListener("touchend", goHome);
      window.removeEventListener("resize", onResize);
    };
  }, [targetRef, reduce]);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 -z-10 size-[720px] opacity-75 transition-opacity duration-700 will-change-transform"
      style={{
        background:
          "radial-gradient(closest-side, rgb(47 107 255 / 0.38), rgb(47 107 255 / 0.15) 45%, transparent 75%)",
      }}
    />
  );
}

/**
 * Glavni trenutak stranice: mobitel sam odigra narudžbu, a točka iz logotipa
 * "odnese" je do obavijesti osoblja. Animacija staje izvan ekrana i za
 * korisnike koji su isključili pokrete.
 */
function HeroStage() {
  const demo = useDemo();
  const dt = useDemoText();
  const h = dt.t.hero;
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

      <PhoneFrame className="mx-auto w-[min(72vw,19.5rem)]" label={h.phoneLabel}>
        <GuestApp view={view} onViewChange={setView} flashId={flash} interactive={false} />
      </PhoneFrame>

      {/* Obavijest za osoblje */}
      <div className="absolute -right-1 top-[11%] w-[min(58vw,15rem)] sm:top-[16%] sm:-right-6 lg:-right-16 xl:-right-20" aria-hidden>
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
                {order.status === "new" ? h.newOrder : order.status === "preparing" ? h.preparing : h.served}
              </p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.02em]">{dt.t.table} {demoVenue.table}</p>
              <ul className="mt-1.5 space-y-0.5 text-[0.8125rem] text-white/75">
                {order.items.map((l) => (
                  <li key={l.id} className="truncate"><span className="tabular text-soft">{l.qty}×</span> {dt.name(l.id)}</li>
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
              <p className="text-xs text-soft">{h.bar}</p>
              <p className="mt-1 text-sm text-white/80">{h.waiting}</p>
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
