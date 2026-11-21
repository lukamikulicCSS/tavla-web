import { Clock, Eye, LayoutList, MessageSquareOff, Smile, TrendingUp, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { getDict } from "@/content";
import type { Locale } from "@/content/routes";

/**
 * Kvalitativne koristi — namjerno BEZ brojki (tekst: content/{hr,en}/home.ts → benefits).
 * Ikone redom odgovaraju stavkama.
 */
const icons = [Smile, Zap, MessageSquareOff, Clock, TrendingUp, Eye, LayoutList];

export function Benefits({ locale }: { locale: Locale }) {
  const t = getDict(locale).home.benefits;
  const benefits = t.items.map((b, i) => ({ ...b, icon: icons[i] ?? Smile }));
  return (
    <section data-section="koristi" aria-labelledby="koristi-naslov" className="surface-light bg-mist py-24 text-ink sm:py-32">
      <div className="container-page">
        <SectionHeading id="koristi-naslov" tone="light" title={t.title} />
        <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal as="li" key={b.title} delay={(i % 3) * 0.05} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <b.icon className="size-6 text-ink" strokeWidth={1.6} aria-hidden />
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.015em]">{b.title}</h3>
              <p className="mt-2 max-w-sm leading-relaxed text-slate">{b.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
