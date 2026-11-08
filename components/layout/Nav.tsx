"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/content/navigation";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";

/** solid: uvijek staklena podloga (za stranice sa svijetlom pozadinom pri vrhu) */
export function Nav({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      menuBtn.current?.focus();
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <a href="#sadrzaj" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
        Preskoči na sadržaj
      </a>
      <div className="container-page">
        <nav
          aria-label="Glavna navigacija"
          className={`flex h-14 items-center justify-between rounded-full pl-5 pr-2 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-[var(--ease-apple)] ${
            solid ? "glass !bg-[rgb(11_11_13/0.86)]" : scrolled || open ? "glass" : "bg-transparent"
          }`}
        >
          <Link href="/#top" className="text-white" aria-label="Tavla — početna">
            <Logo className="h-[1.375rem] w-auto" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.slice(1).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="rounded-full px-3.5 py-2 text-[0.875rem] text-white/75 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <ButtonLink href="/#kontakt" size="md" className="h-10 max-sm:hidden">
              Zatraži demo
            </ButtonLink>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobilni-meni"
              aria-label={open ? "Zatvori izbornik" : "Otvori izbornik"}
              className="grid size-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <m.div
              id="mobilni-meni"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="glass mt-2 origin-top rounded-[1.75rem] p-3 lg:hidden"
            >
              <ul>
                {mainNav.map((l, i) => (
                  <m.li key={l.href} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i + 0.05 }}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center rounded-2xl px-4 text-xl font-medium tracking-[-0.02em] text-white hover:bg-white/[0.06]"
                    >
                      {l.label}
                    </Link>
                  </m.li>
                ))}
              </ul>
              <ButtonLink href="/#kontakt" onClick={() => setOpen(false)} size="lg" className="mt-2 w-full">
                Zatraži demo
              </ButtonLink>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
