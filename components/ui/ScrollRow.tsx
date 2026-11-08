"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Vodoravni niz s gumbima za miš (desktop). Na dodir se lista prstom. */
export function ScrollRow({ children, label, className = "" }: { children: ReactNode; label: string; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const by = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * Math.min(ref.current.clientWidth * 0.8, 640), behavior: "smooth" });
  const btn = "grid size-11 place-items-center rounded-full bg-white/[0.08] text-white transition-[background-color,opacity] hover:bg-white/15 disabled:opacity-30";

  return (
    <div className={className}>
      <ul ref={ref} aria-label={label} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scroll-padding-inline:max(1.25rem,calc((100vw-76rem)/2+2rem))] [padding-inline:max(1.25rem,calc((100vw-76rem)/2+2rem))]">
        {children}
      </ul>
      <div className="container-page mt-4 hidden justify-end gap-2 md:flex">
        <button type="button" onClick={() => by(-1)} disabled={edge.start} aria-label="Prethodno" className={btn}>
          <ChevronLeft className="size-5" />
        </button>
        <button type="button" onClick={() => by(1)} disabled={edge.end} aria-label="Sljedeće" className={btn}>
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
