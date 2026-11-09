import type { FeatureStatus } from "@/content/features";

/** Oznaka "Uskoro" za značajke u razvoju. Za "live" ne prikazuje ništa. */
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
