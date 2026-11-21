import Link from "next/link";
import { getDict } from "@/content";
import { anchors, href, pillarRoute, type Locale } from "@/content/routes";
import { site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { CookieSettingsButton } from "@/components/privacy/CookieSettingsButton";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const { email, phone, linkedin } = site.contact;
  const d = getDict(locale);
  const t = d.ui.footer;
  const mainNav = d.ui.nav.main.map((l) => ({ label: l.label, href: href("home", locale, l.anchor) }));
  return (
    <footer data-section="footer" className="border-t border-line-dark bg-ink pb-[max(2rem,env(safe-area-inset-bottom))] pt-16 text-white">
      <div className="container-page">
        <div id={anchors[locale].newsletter} className="grid gap-6 border-b border-line-dark pb-14 md:grid-cols-[1fr_1.1fr] md:items-end md:gap-12">
          <div>
            <h2 className="text-h3 font-semibold">{t.newsTitle}</h2>
            <p className="mt-2 max-w-sm text-[0.9375rem] text-soft">{t.newsText}</p>
          </div>
          <NewsletterForm source="footer" />
        </div>
      </div>

      <div className="container-page mt-14 grid gap-12 sm:grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo className="h-6 w-auto" />
          <p className="mt-5 text-sm leading-relaxed text-soft">{t.tagline}</p>
        </div>

        <nav aria-label={t.site}>
          <h2 className="text-sm font-medium">{t.site}</h2>
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
            <Link href={href("ai", locale)} className="hover:text-soft">Tavla AI</Link>
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-soft">
            {d.ai.pillars.map((p) => (
              <li key={p.slug}>
                <Link href={href(pillarRoute(p.slug), locale)} className="transition-colors hover:text-white">{p.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-medium">{t.contact}</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-soft">
            {email ? (
              <li>
                <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
              </li>
            ) : (
              <li>
                <Link href={href("home", locale, "contact")} className="hover:text-white">{t.contactForm}</Link>
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

        <nav aria-label={t.legalAria}>
          <h2 className="text-sm font-medium">{t.legal}</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-soft">
            {t.legalNav.map((l) => (
              <li key={l.route}>
                <Link href={href(l.route, locale)} className="transition-colors hover:text-white">{l.label}</Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className="transition-colors hover:text-white" />
            </li>
          </ul>
        </nav>
      </div>

      <div className="container-page mt-16 flex flex-col gap-4 border-t border-line-dark pt-6 text-xs text-soft sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {site.legal.companyName.startsWith("[") ? "Tavla" : site.legal.companyName}. {t.rights}</p>
        <div className="flex items-center gap-5">
          <p>{t.madeIn}</p>
          <LanguageSwitcher className="-mr-1.5" />
        </div>
      </div>
    </footer>
  );
}
