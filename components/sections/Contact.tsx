import { ContactForm } from "./ContactForm";
import { getDict } from "@/content";
import { anchors, type Locale } from "@/content/routes";

export function Contact({ locale }: { locale: Locale }) {
  const t = getDict(locale).home.contact;
  return (
    <section id={anchors[locale].contact} data-section="kontakt" aria-labelledby="kontakt-naslov" className="relative isolate overflow-hidden bg-ink py-24 sm:py-32">
      <div aria-hidden className="stage-light absolute inset-x-0 top-0 -z-10 h-[60%]" />
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div className="max-w-xl lg:pt-4">
          <h2 id="kontakt-naslov" className="text-h2 font-semibold">{t.title}</h2>
          <p className="mt-6 text-lead text-soft">{t.lead}</p>
          <ul className="mt-10 space-y-3 text-[0.9375rem] text-white/80">
            {t.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
