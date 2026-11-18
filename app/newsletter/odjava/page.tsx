import type { Metadata } from "next";
import { SimplePage } from "@/components/layout/SimplePage";

export const metadata: Metadata = {
  title: "Odjava s novosti",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

type SP = Promise<Record<string, string | string[] | undefined>>;

/** Odjava traži jedan klik na gumb (POST), da je ne bi pokrenuli skeneri linkova. */
export default async function NewsletterUnsubscribePage({ searchParams }: { searchParams: SP }) {
  const q = await searchParams;
  const done = q.gotovo === "1";
  const e = typeof q.e === "string" ? q.e.slice(0, 300) : "";
  const t = typeof q.t === "string" ? q.t.slice(0, 100) : "";

  return (
    <SimplePage>
      <div className="glass mx-auto max-w-lg rounded-[2rem] p-8 text-center sm:p-12">
        {done ? (
          <>
            <h1 className="text-h3 font-semibold">Odjavljeni ste.</h1>
            <p className="mt-3 text-soft">Više vam nećemo slati novosti. Ako ste se predomislili, prijavite se ponovno u podnožju stranice.</p>
          </>
        ) : e && t ? (
          <form method="post" action={`/api/newsletter/odjava`}>
            <input type="hidden" name="e" value={e} />
            <input type="hidden" name="t" value={t} />
            <h1 className="text-h3 font-semibold">Odjava s novosti iz Tavle</h1>
            <p className="mt-3 text-soft">Jednim klikom prestajete primati naše mailove.</p>
            <button type="submit" className="mt-8 inline-flex h-11 items-center rounded-full bg-white px-6 text-[0.9375rem] font-medium text-ink hover:bg-white/90">
              Odjavi me
            </button>
          </form>
        ) : (
          <>
            <h1 className="text-h3 font-semibold">Link za odjavu nije potpun.</h1>
            <p className="mt-3 text-soft">Otvorite link „Odjava” iz našeg maila ili nam pišite na info@tavlahr.com.</p>
          </>
        )}
      </div>
    </SimplePage>
  );
}
