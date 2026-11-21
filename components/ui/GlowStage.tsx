"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Tamna "pozornica" od vrha stranice do prve svijetle sekcije.
 *
 * - Plavo svjetlo prati miš (desktop) ili prst (mobitel) kroz SVE tamne sekcije unutar omotača.
 * - Nekoliko mekih svjetlosnih mrlja i sitnih iskri: zatamnjene su, a zasvijetle kad im se
 *   svjetlo (pokazivač) približi.
 * - Kad pokazivač nije na pozornici, svjetlo se vrati iza mobitela u heroju.
 * - Pomiču se samo transform i opacity (GPU), jedna petlja requestAnimationFrame koja se
 *   gasi kad se sve smiri.
 * - Uz "smanji pokrete" sve stoji na mjestu.
 *
 * Tamne sekcije (izravna djeca s klasom bg-ink) dobivaju prozirnu pozadinu, a boju daje omotač,
 * pa se svjetlo vidi kroz cijelu pozornicu. Kartice unutar sekcija ostaju neprozirne.
 */

type Spot = {
  /** položaj u % širine i visine pozornice */
  x: number;
  y: number;
  /** promjer u px */
  size: number;
  kind: "orb" | "spark";
  /** boja jezgre (RGB) */
  rgb: string;
};

// Malo, ali dovoljno: rubovi i međuprostori, ne preko teksta.
const SPOTS: Spot[] = [
  { x: 6, y: 9, size: 340, kind: "orb", rgb: "47 107 255" },
  { x: 93, y: 16, size: 280, kind: "orb", rgb: "122 162 255" },
  { x: 88, y: 41, size: 300, kind: "orb", rgb: "47 107 255" },
  { x: 4, y: 55, size: 260, kind: "orb", rgb: "122 162 255" },
  { x: 22, y: 82, size: 320, kind: "orb", rgb: "47 107 255" },
];

const GLOW = 760; // promjer glavnog svjetla (desktop)
const GLOW_MOBILE = 520;

export function GlowStage({ children, className = "" }: { children: ReactNode; className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const spotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const stage = stageRef.current;
    const glow = glowRef.current;
    if (!stage || !glow) return;

    let w = stage.clientWidth;
    let h = stage.clientHeight;
    let size = w < 768 ? GLOW_MOBILE : GLOW;
    const heroH = () => (stage.firstElementChild as HTMLElement | null)?.offsetHeight ?? h * 0.3;
    // mirni položaj: iza mobitela u heroju
    const home = () => (w >= 1024 ? { x: w * 0.72, y: heroH() * 0.5 } : { x: w * 0.5, y: heroH() * 0.72 });

    let target = home();
    const pos = { ...target };
    const level = SPOTS.map(() => 0); // trenutna svjetlina mrlja 0..1
    let inside = false;
    let last: { x: number; y: number } | null = null; // zadnji pokazivač (client koordinate)
    let raf = 0;

    const paint = () => {
      glow.style.transform = `translate3d(${pos.x - size / 2}px, ${pos.y - size / 2}px, 0)`;
    };
    const paintSpots = (snap = false) => {
      let moving = false;
      SPOTS.forEach((s, i) => {
        const el = spotRefs.current[i];
        if (!el) return;
        const cx = (s.x / 100) * w;
        const cy = (s.y / 100) * h;
        const R = s.kind === "orb" ? 420 : 300;
        const d = Math.hypot(pos.x - cx, pos.y - cy);
        const t = inside ? Math.max(0, 1 - d / R) : 0;
        const want = t * t * (3 - 2 * t); // smoothstep
        level[i] = snap ? want : level[i] + (want - level[i]) * 0.12;
        if (Math.abs(want - level[i]) > 0.002) moving = true;
        const k = level[i];
        if (s.kind === "orb") {
          el.style.opacity = String(0.32 + 0.68 * k);
          el.style.transform = `translate(-50%, -50%) scale(${1 + 0.12 * k})`;
        } else {
          el.style.opacity = String(0.35 + 0.65 * k);
          el.style.transform = `translate(-50%, -50%) scale(${1 + 0.9 * k})`;
        }
      });
      return moving;
    };

    paint();
    paintSpots(true);
    if (reduce) return;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.09;
      pos.y += (target.y - pos.y) * 0.09;
      paint();
      const spotsMoving = paintSpots();
      const glowMoving = Math.abs(target.x - pos.x) > 0.4 || Math.abs(target.y - pos.y) > 0.4;
      raf = glowMoving || spotsMoving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const aim = () => {
      if (!last) return;
      const r = stage.getBoundingClientRect();
      const x = last.x - r.left;
      const y = last.y - r.top;
      inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      target = inside ? { x, y } : home();
      glow.style.opacity = inside ? "1" : "0.75";
      kick();
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      last = { x: e.clientX, y: e.clientY };
      aim();
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      last = { x: t.clientX, y: t.clientY };
      aim();
    };
    const onLeave = () => {
      last = null;
      inside = false;
      target = home();
      glow.style.opacity = "0.75";
      kick();
    };
    // kod skrolanja miš stoji, ali stranica se pomiče: svjetlo ostaje ispod pokazivača
    const onScroll = () => aim();
    const onResize = () => {
      w = stage.clientWidth;
      h = stage.clientHeight;
      size = w < 768 ? GLOW_MOBILE : GLOW;
      glow.style.width = glow.style.height = `${size}px`;
      if (!inside) target = home();
      kick();
    };

    glow.style.width = glow.style.height = `${size}px`;
    const ro = new ResizeObserver(onResize);
    ro.observe(stage);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    stage.addEventListener("touchstart", onTouch, { passive: true });
    stage.addEventListener("touchmove", onTouch, { passive: true });
    stage.addEventListener("touchend", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("touchstart", onTouch);
      stage.removeEventListener("touchmove", onTouch);
      stage.removeEventListener("touchend", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduce]);

  return (
    <div ref={stageRef} className={`glow-stage relative isolate overflow-hidden bg-ink ${className}`}>
      <style>{`
        .glow-stage > .bg-ink, .glow-stage > * > section.bg-ink { background-color: transparent; }
        @keyframes glow-twinkle { 0%,100% { opacity: .55 } 50% { opacity: 1 } }
        @media (prefers-reduced-motion: reduce) { .glow-spark-core { animation: none !important } }
      `}</style>

      {/* sloj svjetla, iza sadržaja */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {SPOTS.map((s, i) => (
          <div
            key={i}
            ref={(el) => {
              spotRefs.current[i] = el;
            }}
            className="absolute will-change-transform"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.kind === "orb" ? s.size : s.size * 7,
              height: s.kind === "orb" ? s.size : s.size * 7,
              transform: "translate(-50%, -50%)",
              opacity: 0.32,
            }}
          >
            {s.kind === "orb" ? (
              <div
                className="size-full rounded-full"
                style={{ background: `radial-gradient(closest-side, rgb(${s.rgb} / 0.20), rgb(${s.rgb} / 0.07) 55%, transparent)` }}
              />
            ) : (
              <div
                className="glow-spark-core size-full rounded-full"
                style={{
                  background: `radial-gradient(closest-side, rgb(255 255 255 / 0.95) 0 ${(s.size / (s.size * 7)) * 50}%, rgb(${s.rgb} / 0.35) ${(s.size / (s.size * 7)) * 100}%, rgb(${s.rgb} / 0.08) 45%, transparent 70%)`,
                  animation: `glow-twinkle ${5 + (i % 3)}s ease-in-out ${i * 0.7}s infinite`,
                }}
              />
            )}
          </div>
        ))}

        {/* glavno plavo svjetlo */}
        <div
          ref={glowRef}
          className="absolute left-0 top-0 opacity-75 transition-opacity duration-700 will-change-transform"
          style={{
            width: GLOW,
            height: GLOW,
            background: "radial-gradient(closest-side, rgb(47 107 255 / 0.34), rgb(47 107 255 / 0.13) 45%, transparent 75%)",
          }}
        />
      </div>

      {children}
    </div>
  );
}
