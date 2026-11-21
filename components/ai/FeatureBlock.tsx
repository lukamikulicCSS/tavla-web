"use client";

import { m, type Variants } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import type { AiFeature } from "@/content/types";
import { StatusPill } from "@/components/ui/StatusBadge";
import { FeatureVisual } from "./FeatureVisual";

const ease = [0.22, 1, 0.36, 1] as const;
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const up: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };
const visualIn: Variants = { hidden: { opacity: 0, y: 24, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease, delay: 0.15 } } };

/** Jedan blok značajke: tekst + živi prikaz, naizmjenično lijevo/desno. Jedan orkestrirani ulaz po bloku. */
export function FeatureBlock({ feature: f, reverse }: { feature: AiFeature; reverse: boolean }) {
  return (
    <m.section
      id={f.anchor}
      data-section={`ai-${f.id}`}
      aria-labelledby={`${f.id}-naslov`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      className="scroll-mt-28 grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-20"
    >
      <div className={reverse ? "lg:order-2" : ""}>
        <m.p variants={up} className="flex flex-wrap items-center gap-2 text-[0.9375rem] text-soft">
          {f.ai && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#2f6bff]/15 px-2 py-0.5 text-[0.6875rem] font-medium text-[#7aa2ff]">
              <Sparkles className="size-3" aria-hidden /> AI
            </span>
          )}
          {f.name}
          <StatusPill status={f.status} />
        </m.p>
        <m.h2 variants={up} id={`${f.id}-naslov`} className="mt-4 text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
          {f.title}
        </m.h2>
        <m.p variants={up} className="mt-5 max-w-[34rem] text-lead text-soft">
          {f.body}
        </m.p>
        <m.ul variants={up} className="mt-8 space-y-3">
          {f.points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-[0.9375rem] text-white/85">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white/[0.08]">
                <Check className="size-3" aria-hidden />
              </span>
              {p}
            </li>
          ))}
        </m.ul>
      </div>
      <m.div variants={visualIn} className={`relative ${reverse ? "lg:order-1" : ""}`}>
        <div aria-hidden className="stage-light absolute inset-[-15%] -z-10" />
        <FeatureVisual visual={f.visual} status={f.status} />
      </m.div>
    </m.section>
  );
}
