"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Suzdržano otkrivanje pri skrolanju: kratak pomak i fade, jednom.
 * Koristi se samo za naslove sekcija i ključne blokove — ne za svaku karticu.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "header";
}) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}
