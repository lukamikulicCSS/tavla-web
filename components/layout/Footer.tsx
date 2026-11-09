import Link from "next/link";
import { legalNav, mainNav, solutions } from "@/content/navigation";
import { site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { CookieSettingsButton } from "@/components/privacy/CookieSettingsButton";

export function Footer() {
  const year = new Date().getFullYear();
  const { email, phone, linkedin } = site.contact;
  const pages = mainNav.filter((l) => !l.children);
  const col = "mt-4 space-y-2.5 text-sm text-soft";
  const link = "transition-colors hover:text-white";

  return (
    <footer className="border-t border-line-dark bg-ink pb-[max(2rem,env(safe-area-inset-bottom))] pt-16 text-white">
      <div className="container-page grid grid-cols-2 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div className="col-span-2 max-w-xs md:col-span-1">
          <Link href="/" aria-label="Tavla — početna">
            <Logo className="h-6 w-auto" />
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-soft">Digitalni meni i sustav za naručivanje za kafiće, restorane, barove i hotele.</p>
        </div>

        <nav aria-label="Rješenja">
          <h2 className="text-sm font-medium">Rješenja</h2>
          <ul className={col}>
            {solutions.map((l) => (
              <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Tavla">
          <h2 className="text-sm font-medium">Tavla</h2>
          <ul className={col}>
            {pages.map((l) => (
              <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-medium">Kontakt</h2>
          <ul className={col}>
            {email ? (
              <li><a href={`mailto:${email}`} className={link}>{email}</a></li>
            ) : (
              <li><Link href="/kontakt" className={link}>Obrazac za upit</Link></li>
            )}
            {phone && <li><a href={`tel:${phone.replace(/\s/g, "")}`} className={link}>{phone}</a></li>}
            {linkedin && <li><a href={linkedin} target="_blank" rel="noopener noreferrer" className={link}>LinkedIn</a></li>}
          </ul>
        </div>

        <nav aria-label="Pravne informacije">
          <h2 className="text-sm font-medium">Pravno</h2>
          <ul className={col}>
            {legalNav.map((l) => (
              <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>
            ))}
            <li><CookieSettingsButton className={link} /></li>
          </ul>
        </nav>
      </div>

      <div className="container-page mt-16 flex flex-col gap-2 border-t border-line-dark pt-6 text-xs text-soft sm:flex-row sm:justify-between">
        <p>© {year} {site.legal.companyName.startsWith("[") ? "Tavla" : site.legal.companyName}. Sva prava pridržana.</p>
        <p>Razvijeno u Hrvatskoj</p>
      </div>
    </footer>
  );
}
