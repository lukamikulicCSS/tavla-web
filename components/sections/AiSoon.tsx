import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { getDict } from "@/content";
import { formatEur } from "@/content/demo-data";
import { href, type Locale } from "@/content/routes";

/**
 * Kratka najava AI značajki koje su U RAZVOJU (tekst: content/{hr,en}/home.ts → aiSoon).
 * Kad značajka postane dostupna, ukloni je odande i dodaj u content/{hr,en}/features.ts.
 */
export function AiSoon({ locale }: { locale: Locale }) {
  const t = getDict(locale).home.aiSoon;
  return (
    <section data-section="uskoro" aria-labelledby="uskoro-naslov" className="relative isolate overflow-hidden bg-ink pb-20 sm:pb-24">
      {/* blagi plavi sjaj */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-3/4 bg-[radial-gradient(45%_55%_at_70%_50%,rgb(47_107_255/0.22),transparent_70%)]"
      />
      <div className="container-page">
        <Reveal className="grid items-center gap-8 rounded-[2rem] bg-white/[0.04] p-6 ring-1 ring-inset ring-white/[0.06] sm:p-10 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2f6bff]/15 px-3 py-1 text-[0.8125rem] font-medium text-[#7aa2ff]">
              <Sparkles className="size-3.5" aria-hidden /> {t.badge}
            </span>
            <h2 id="uskoro-naslov" className="mt-4 text-h3 font-semibold">
              {t.title}
            </h2>
            <p className="mt-3 max-w-sm text-soft">{t.text}</p>
            <Link
              href={href("ai", locale)}
              data-track="uskoro-cta-tavla-ai"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full text-[0.9375rem] font-medium text-[#7aa2ff] transition-colors hover:text-white"
            >
              {t.link} <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {t.items.map((it) => (
              <li key={it.name} className="flex flex-col rounded-[1.5rem] bg-graphite p-5">
                <div aria-hidden className="mb-5 flex min-h-[6.25rem] flex-col justify-center">
                  {it.visual === "menu" ? <MenuChip locale={locale} /> : <TipsChip locale={locale} />}
                </div>
                <p className="flex items-center gap-2 font-semibold">
                  {it.name}
                  <span className="rounded-full bg-[#2f6bff]/15 px-2 py-0.5 text-[0.6875rem] font-medium text-[#7aa2ff]">{t.badge}</span>
                </p>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-soft">{it.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** Mali isječak sučelja: preporuka u meniju (primjer, nije gotova funkcionalnost). */
function MenuChip({ locale }: { locale: Locale }) {
  const c = getDict(locale).home.aiSoon.menuChip;
  return (
    <div className="rounded-2xl bg-white p-3 text-ink">
      <p className="flex items-center gap-1.5 text-[0.6875rem] font-semibold text-[#1f4fd8]">
        <Sparkles className="size-3" /> {c.pick}
      </p>
      <div className="mt-2 flex items-center justify-between rounded-xl bg-mist px-3 py-2 text-[0.8125rem]">
        <span>
          <span className="block font-semibold">{c.name}</span>
          <span className="block text-[0.6875rem] text-slate">{c.why}</span>
        </span>
        <span className="tabular font-medium">{formatEur(c.price, locale)}</span>
      </div>
    </div>
  );
}

/** Mali isječak sučelja: prijedlog napojnice (primjer). */
function TipsChip({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const c = d.home.aiSoon.tipsChip;
  return (
    <div className="rounded-2xl bg-white p-3 text-ink">
      <p className="text-[0.6875rem] font-semibold">{c.question}</p>
      <div className="mt-2 grid grid-cols-3 gap-1.5 text-center text-[0.8125rem]">
        {[5, 10, 15].map((p) => (
          <span key={p} className={`tabular relative rounded-xl py-2.5 font-semibold ${p === 10 ? "bg-ink text-white" : "bg-mist"}`}>
            {d.ui.aiVisuals.percent(p)}
            {p === 10 && <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#2f6bff] px-1.5 py-px text-[0.5625rem] font-medium text-white">{c.suggested}</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
