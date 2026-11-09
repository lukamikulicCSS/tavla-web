"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/content/navigation";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";

/** solid: uvijek staklena podloga (za stranice sa svijetlom pozadinom pri vrhu) */
export function Nav({ solid = false }: { solid?: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [mobileSub, setMobileSub] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const ddRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Zatvori izbornike pri promjeni stranice
  useEffect(() => {
    setOpen(false);
    setDropdown(false);
  }, [pathname]);

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

  useEffect(() => {
    if (!dropdown) return;
    const onDown = (e: MouseEvent) => !ddRef.current?.contains(e.target as Node) && setDropdown(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDropdown(false);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [dropdown]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <a href="#sadrzaj" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
        Preskoči na sadržaj
      </a>
      <div className="container-page">
        <nav
          aria-label="Glavna navigacija"
          className={`flex h-14 items-center justify-between rounded-full pl-5 pr-2 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-[var(--ease-apple)] ${
            solid ? "glass !bg-[rgb(11_11_13/0.86)]" : scrolled || open || dropdown ? "glass" : "bg-transparent"
          }`}
        >
          <Link href="/" className="text-white" aria-label="Tavla — početna">
            <Logo className="h-[1.375rem] w-auto" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((l) =>
              l.children ? (
                <li key={l.href} ref={ddRef} className="relative" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
                  <button
                    type="button"
                    aria-expanded={dropdown}
                    aria-controls="rjesenja-izbornik"
                    onClick={() => setDropdown((v) => !v)}
                    className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.875rem] transition-colors hover:text-white ${isActive(l.href) || l.children.some((c) => isActive(c.href)) ? "text-white" : "text-white/75"}`}
                  >
                    {l.label}
                    <ChevronDown className={`size-3.5 transition-transform duration-300 ${dropdown ? "rotate-180" : ""}`} aria-hidden />
                  </button>
                  <AnimatePresence>
                    {dropdown && (
                      <m.div
                        id="rjesenja-izbornik"
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3"
                      >
                        <ul className="glass !bg-[rgb(20_20_23/0.97)] rounded-[1.5rem] p-2">
                          {l.children.map((c) => (
                            <li key={c.href}>
                              <Link href={c.href} className="group flex flex-col rounded-2xl px-4 py-3 transition-colors hover:bg-white/[0.06]">
                                <span className="flex items-center gap-2 text-[0.9375rem] font-medium text-white">
                                  {c.label}
                                  {c.href === "/tavla-ai" && <i aria-hidden className="size-1.5 rounded-full bg-electric" />}
                                </span>
                                <span className="text-[0.8125rem] text-soft">{c.text}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </m.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[0.875rem] transition-colors hover:text-white ${isActive(l.href) ? "text-white" : "text-white/75"}`}
                  >
                    {l.label}
                    {isActive(l.href) && <i aria-hidden className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-electric" />}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-1.5">
            <ButtonLink href="/kontakt" size="md" className="h-10 max-sm:hidden">
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
              className="glass !bg-[rgb(20_20_23/0.92)] mt-2 max-h-[calc(100dvh-6rem)] origin-top overflow-y-auto rounded-[1.75rem] p-3 lg:hidden"
            >
              <ul>
                <li>
                  <Link href="/" className="flex min-h-12 items-center rounded-2xl px-4 text-xl font-medium tracking-[-0.02em] text-white hover:bg-white/[0.06]">
                    Početna
                  </Link>
                </li>
                {mainNav.map((l) =>
                  l.children ? (
                    <li key={l.href}>
                      <button
                        type="button"
                        aria-expanded={mobileSub}
                        onClick={() => setMobileSub((v) => !v)}
                        className="flex min-h-12 w-full items-center justify-between rounded-2xl px-4 text-xl font-medium tracking-[-0.02em] text-white hover:bg-white/[0.06]"
                      >
                        {l.label}
                        <ChevronDown className={`size-5 text-soft transition-transform duration-300 ${mobileSub ? "rotate-180" : ""}`} aria-hidden />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileSub && (
                          <m.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-3">
                            {l.children.map((c) => (
                              <li key={c.href}>
                                <Link href={c.href} className="flex min-h-11 items-center gap-2 rounded-2xl px-4 text-[1.0625rem] text-white/80 hover:bg-white/[0.06]">
                                  {c.label}
                                  {c.href === "/tavla-ai" && <i aria-hidden className="size-1.5 rounded-full bg-electric" />}
                                </Link>
                              </li>
                            ))}
                          </m.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  ) : (
                    <li key={l.href}>
                      <Link href={l.href} className="flex min-h-12 items-center rounded-2xl px-4 text-xl font-medium tracking-[-0.02em] text-white hover:bg-white/[0.06]">
                        {l.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
              <ButtonLink href="/kontakt" size="lg" className="mt-2 w-full">
                Zatraži demo
              </ButtonLink>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
