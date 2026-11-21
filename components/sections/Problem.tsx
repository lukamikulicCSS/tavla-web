import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { getDict } from "@/content";
import type { Locale } from "@/content/routes";

export function Problem({ locale }: { locale: Locale }) {
  const t = getDict(locale).home.problem;
  return (
    <section data-section="problem" aria-labelledby="problem-naslov" className="surface-light bg-white py-24 text-ink sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="problem-naslov"
          tone="light"
          title={t.title}
          lead={t.lead}
        />

        <Reveal className="mt-16">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{t.caption}</caption>
            <thead className="hidden sm:table-header-group">
              <tr className="text-sm text-slate">
                <th scope="col" className="w-1/2 pb-4 pr-8 font-medium">{t.now}</th>
                <th scope="col" className="w-1/2 pb-4 font-medium">{t.withTavla}</th>
              </tr>
            </thead>
            <tbody>
              {t.rows.map((r) => (
                <tr key={r.now} className="block border-t border-line-light py-5 sm:table-row sm:py-0">
                  <td className="block pb-1.5 text-[1.0625rem] text-slate sm:table-cell sm:py-6 sm:pr-8 sm:text-xl">
                    <span className="sr-only sm:hidden">{t.now}: </span>
                    {r.now}
                  </td>
                  <td className="block text-[1.0625rem] font-medium tracking-[-0.01em] sm:table-cell sm:py-6 sm:text-xl">
                    <span className="sr-only">{t.withTavla}: </span>
                    {r.tavla}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
