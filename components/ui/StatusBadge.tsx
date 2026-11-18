import type { FeatureStatus } from "@/content/features";

/** Oznaka "Uskoro" za značajke u razvoju. Za "live" i "planned" ne prikazuje ništa (planned se ne prikazuje na početnoj). */
export function SoonBadge({ status, tone = "dark" }: { status: FeatureStatus; tone?: "dark" | "light" }) {
  if (status !== "soon") return null;
  return (
    <span
      className={`ml-2 inline-flex translate-y-[-1px] items-center rounded-full px-2 py-0.5 align-middle text-[0.6875rem] font-medium ${
        tone === "dark" ? "bg-white/10 text-white/70" : "bg-ink/[0.06] text-slate"
      }`}
    >
      Uskoro
    </span>
  );
}

/**
 * Oznaka statusa za stranice Tavla AI: "Uskoro" (električno plavo) ili "U planu" (neutralno).
 * Za "live" ne prikazuje ništa.
 */
export function StatusPill({ status, className = "" }: { status: FeatureStatus; className?: string }) {
  if (status === "live") return null;
  const soon = status === "soon";
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-medium leading-4 ${
        soon ? "bg-[#2f6bff]/15 text-[#7aa2ff]" : "bg-white/[0.07] text-white/60"
      } ${className}`}
    >
      {soon ? "Uskoro" : "U planu"}
    </span>
  );
}
