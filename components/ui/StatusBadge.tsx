import type { FeatureStatus } from "@/content/features";

/** Oznaka "Uskoro" za značajke u razvoju (električno plava). Za "live" ne prikazuje ništa. */
export function SoonBadge({ status, tone = "dark" }: { status: FeatureStatus; tone?: "dark" | "light" }) {
  if (status !== "soon") return null;
  return <Pill tone={tone}>Uskoro</Pill>;
}

export function Pill({ children, tone = "dark", className = "" }: { children: React.ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <span
      className={`ml-2 inline-flex translate-y-[-1px] items-center rounded-full px-2 py-0.5 align-middle text-[0.6875rem] font-medium ${
        tone === "dark" ? "bg-electric/15 text-electric-light" : "bg-electric/10 text-electric-dark"
      } ${className}`}
    >
      {children}
    </span>
  );
}
