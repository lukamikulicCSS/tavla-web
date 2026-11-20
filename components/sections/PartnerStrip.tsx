import Image from "next/image";
import Link from "next/link";
import { partners } from "@/content/partners";

/** Diskretna traka ispod heroja: "Uz nas" + jednobojni logotipi partnera. */
export function PartnerStrip() {
  if (partners.length === 0) return null;
  return (
    <div aria-label="Partneri" className="border-y border-white/[0.06] bg-ink py-7">
      <div className="container-page flex flex-wrap items-center justify-center gap-x-12 gap-y-5 sm:justify-start">
        <p className="text-sm text-soft">Uz nas:</p>
        <ul className="flex flex-wrap items-center gap-x-12 gap-y-5">
          {partners.map((p) => (
            <li key={p.id}>
              <Link
                href="#partneri"
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
