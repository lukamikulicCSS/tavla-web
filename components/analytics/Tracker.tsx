"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useConsent } from "@/components/privacy/consent";

type TrackModule = typeof import("@/lib/analytics/track");

/**
 * Pokreće vlastitu analitiku TEK kad je consent.analytics === true.
 * Modul s trackerom učitava se dinamički, pa posjetitelji bez pristanka ne preuzimaju ni taj kod.
 */
export function Tracker() {
  const { consent, ready } = useConsent();
  const pathname = usePathname();
  const mod = useRef<TrackModule | null>(null);
  const allowed = consent?.analytics === true;

  useEffect(() => {
    let cancelled = false;
    if (!allowed) {
      mod.current?.stop();
      // tek kad je pristanak pročitan (inače bi se ID sesije brisao pri svakom učitavanju)
      if (ready)
        try {
          sessionStorage.removeItem("tavla_sid");
          sessionStorage.removeItem("tavla_attr");
        } catch {
          /* ignoriraj */
        }
      return;
    }
    void import("@/lib/analytics/track").then((m) => {
      if (cancelled) return;
      mod.current = m;
      m.start();
      m.pageView(location.pathname);
    });
    return () => {
      cancelled = true;
    };
  }, [allowed, ready]);

  // promjena rute unutar aplikacije
  useEffect(() => {
    if (allowed && mod.current) mod.current.pageView(pathname);
  }, [pathname, allowed]);

  return null;
}
