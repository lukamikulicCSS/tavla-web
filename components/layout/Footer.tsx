import Link from "next/link";
import { legalNav, mainNav } from "@/content/navigation";
import { pillars } from "@/content/ai";
import { site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { CookieSettingsButton } from "@/components/privacy/CookieSettingsButton";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";

export function Footer() {
  const year = new Date().getFullYear();
  const { email, phone, linkedin } = site.contact;
  return (
    <footer data-section="footer" className="border-t border-line-dark bg-ink pb-[max(2rem,env(safe-area-inset-bottom))] pt-16 text-white">
      <div className="container-page">
        <div id="novosti" className="grid gap-6 border-b border-line-dark pb-14 md:grid-cols-[1fr_1.1fr] md:items-end md:gap-12">
          <div>
            <h2 className="text-h3 font-semibold">Novosti iz Tavle</h2>
            <p className="mt-2 max-w-sm text-[0.9375rem] text-soft">Nove značajke, kada stižu u objekte i što smo naučili od ugostitelja.</p>
          </div>
          <NewsletterForm source="footer" />
        </div>
      </div>

      <div className="container-page mt-14 grid gap-12 sm:grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo className="h-6 w-auto" />
          <p className="mt-5 text-sm leading-relaxed text-soft">
            Digitalni meni i sustav za naručivanje za kafiće, restorane, barove i hotele.
          </p>
        </div>

        <nav aria-label="Stranica">
          <h2 className="text-sm font-medium">Stranica</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-soft">
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Tavla AI">
          <h2 className="text-sm font-medium">
            <Link href="/tavla-ai" className="hover:text-soft">Tavla AI</Link>
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-soft">
            {pillars.map((p) => (
              <li key={p.slug}>
                <Link href={`/tavla-ai/${p.slug}`} className="transition-colors hover:text-white">{p.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-medium">Kontakt</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-soft">
            {email ? (
              <li>
                <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
              </li>
            ) : (
              <li>
                <Link href="/#kontakt" className="hover:text-white">Obrazac za upit</Link>
              </li>
            )}
            {phone && (
              <li>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-white">{phone}</a>
              </li>
            )}
            {linkedin && (
              <li>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
              </li>
            )}
          </ul>
        </div>

        <nav aria-label="Pravne informacije">
          <h2 className="text-sm font-medium">Pravno</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-soft">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">{l.label}</Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className="transition-colors hover:text-white" />
            </li>
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
