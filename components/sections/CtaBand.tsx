import { ButtonLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";

/** Kratki završni poziv na dnu svake stranice — vodi na /kontakt. */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-naslov" className="bg-ink py-20 sm:py-24">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-graphite px-6 py-14 text-center sm:px-12 sm:py-20">
          <div aria-hidden className="electric-glow absolute -inset-x-1/4 -bottom-1/2 top-1/3 -z-10 opacity-70" />
          <LogoMark className="mx-auto h-7 w-auto text-white" />
          <h2 id="cta-naslov" className="mx-auto mt-8 max-w-2xl text-h2 font-semibold">Spremni za drukčiju smjenu?</h2>
          <p className="mx-auto mt-5 max-w-md text-lead text-soft">Pokazat ćemo vam kako Tavla radi na primjeru vašeg menija.</p>
          <ButtonLink href="/kontakt" size="lg" className="mt-9">Zatraži demonstraciju</ButtonLink>
        </div>
      </div>
    </section>
  );
}
