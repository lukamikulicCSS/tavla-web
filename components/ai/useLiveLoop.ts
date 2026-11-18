"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Živa" petlja za prikaze sučelja: broji korake svakih `ms` milisekundi,
 * ali SAMO dok je element na ekranu, kartica vidljiva i korisnik nije tražio manje pokreta.
 */
export function useLiveLoop<T extends Element>(ms: number) {
  const ref = useRef<T>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    let visible = false;
    let id: number | undefined;
    const sync = () => {
      const run = visible && document.visibilityState === "visible";
      if (run && id === undefined) id = window.setInterval(() => setTick((t) => t + 1), ms);
      if (!run && id !== undefined) {
        clearInterval(id);
        id = undefined;
      }
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      if (id !== undefined) clearInterval(id);
    };
  }, [ms]);

  return { ref, tick };
}
