import { getDict } from "@/content";
import { site } from "@/content/site";
import type { Locale } from "@/content/routes";
import { SimplePage } from "@/components/layout/SimplePage";
import { ConfirmNewsletter } from "@/components/newsletter/ConfirmNewsletter";

type SP = Promise<Record<string, string | string[] | undefined>>;

export async function NewsletterConfirm({ locale, searchParams }: { locale: Locale; searchParams: SP }) {
  const t = (await searchParams).token;
  const token = typeof t === "string" ? t.slice(0, 64) : "";
  return (
    <SimplePage locale={locale}>
      <ConfirmNewsletter token={token} />
    </SimplePage>
  );
}

/** Odjava traži jedan klik na gumb (POST), da je ne bi pokrenuli skeneri linkova. */
export async function NewsletterUnsubscribe({ locale, searchParams }: { locale: Locale; searchParams: SP }) {
  const q = await searchParams;
  const t = getDict(locale).ui.newsletterUnsubscribe;
  const done = q.gotovo === "1";
  const e = typeof q.e === "string" ? q.e.slice(0, 300) : "";
  const tok = typeof q.t === "string" ? q.t.slice(0, 100) : "";

  return (
    <SimplePage locale={locale}>
      <div className="glass mx-auto max-w-lg rounded-[2rem] p-8 text-center sm:p-12">
        {done ? (
          <>
            <h1 className="text-h3 font-semibold">{t.doneTitle}</h1>
            <p className="mt-3 text-soft">{t.doneText}</p>
          </>
        ) : e && tok ? (
          <form method="post" action={`/api/newsletter/odjava`}>
            <input type="hidden" name="e" value={e} />
            <input type="hidden" name="t" value={tok} />
            <input type="hidden" name="l" value={locale} />
            <h1 className="text-h3 font-semibold">{t.title}</h1>
            <p className="mt-3 text-soft">{t.text}</p>
            <button type="submit" className="mt-8 inline-flex h-11 items-center rounded-full bg-white px-6 text-[0.9375rem] font-medium text-ink hover:bg-white/90">
              {t.button}
            </button>
          </form>
        ) : (
          <>
            <h1 className="text-h3 font-semibold">{t.incompleteTitle}</h1>
            <p className="mt-3 text-soft">{t.incompleteText(site.contact.email)}</p>
          </>
        )}
      </div>
    </SimplePage>
  );
}
