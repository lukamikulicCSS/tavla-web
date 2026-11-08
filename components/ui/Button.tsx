import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "primary-dark" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] " +
  "transition-[transform,background-color,color,box-shadow] duration-300 ease-[var(--ease-apple)] " +
  "active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none select-none";

const sizes = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

const variants: Record<Variant, string> = {
  // Bijeli gumb na tamnoj podlozi
  primary: "bg-white text-ink hover:bg-white/90 shadow-[0_8px_30px_-8px_rgb(255_255_255/0.35)]",
  // Staklo na tamnoj podlozi
  secondary: "glass text-white hover:bg-white/10",
  // Crni gumb na svijetloj podlozi
  "primary-dark": "bg-ink text-white hover:bg-graphite-2",
  ghost: "text-current hover:bg-current/5",
};

type Common = { variant?: Variant; size?: keyof typeof sizes; className?: string; children: ReactNode };

export function ButtonLink({ variant = "primary", size = "md", className = "", ...rest }: Common & ComponentProps<typeof Link>) {
  return <Link {...rest} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} />;
}

export function Button({ variant = "primary", size = "md", className = "", ...rest }: Common & ComponentProps<"button">) {
  return <button {...rest} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} />;
}
