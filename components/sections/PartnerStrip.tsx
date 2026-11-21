import Image from "next/image";
import Link from "next/link";
import { getDict } from "@/content";
import { anchors, type Locale } from "@/content/routes";

/** Diskretna traka ispod heroja: "Uz nas" + jednobojni logotipi partnera. */
export function PartnerStrip({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const t = d.home.partnerStrip;
  const partners = d.partners;
  if (partners.length === 0) return null;
  return (
    <div aria-label={t.aria} className="border-y border-white/[0.06] bg-ink py-7">
      <div className="container-page flex flex-wrap items-center justify-center gap-x-12 gap-y-5 sm:justify-start">
        <p className="text-sm text-soft">{t.label}</p>
        <ul className="flex flex-wrap items-center gap-x-12 gap-y-5">
          {partners.map((p) => (
            <li key={p.id}>
              <Link
                href={`#${anchors[locale].partners}`}
                className="block opacity-60 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100"
                aria-label={p.name}
              >
                <Image
                  src={p.logoMono}
                  alt={p.name}
                  width={Math.round(56 * p.ratio)}
                  height={56}
                  unoptimized
                  className="h-14 w-auto"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
