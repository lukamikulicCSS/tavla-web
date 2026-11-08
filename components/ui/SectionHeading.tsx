import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  id,
  title,
  lead,
  tone = "dark",
  align = "left",
  className = "",
}: {
  id?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const leadColor = tone === "dark" ? "text-soft" : "text-slate";
  return (
    <Reveal as="header" className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <h2 id={id} className="text-h2 font-semibold">
        {title}
      </h2>
      {lead && <p className={`mt-5 text-lead ${leadColor} max-w-[38rem] ${align === "center" ? "mx-auto" : ""}`}>{lead}</p>}
    </Reveal>
  );
}
