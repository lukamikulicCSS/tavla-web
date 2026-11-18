import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="kontakt" data-section="kontakt" aria-labelledby="kontakt-naslov" className="relative isolate overflow-hidden bg-ink py-24 sm:py-32">
      <div aria-hidden className="stage-light absolute inset-x-0 top-0 -z-10 h-[60%]" />
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div className="max-w-xl lg:pt-4">
          <h2 id="kontakt-naslov" className="text-h2 font-semibold">Spremni za drukčiju smjenu?</h2>
          <p className="mt-6 text-lead text-soft">
            Pokazat ćemo vam kako Tavla može pojednostaviti svakodnevni rad i stvoriti bolje iskustvo za vaše goste.
          </p>
          <ul className="mt-10 space-y-3 text-[0.9375rem] text-white/80">
            <li>Kratka demonstracija uživo ili online</li>
            <li>Postavljamo vaš meni i stolove zajedno s vama</li>
            <li>Ponuda prema veličini i vrsti objekta</li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
