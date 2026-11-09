import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const principles = [
  { word: "Jednostavnost", text: "Gost ne preuzima aplikaciju i ne otvara račun. Kod, meni, narudžba." },
  { word: "Brzina", text: "Narudžba stiže na šank u trenutku slanja, a status se gostu osvježava sam." },
  { word: "Moderna tehnologija", text: "Web aplikacija koja radi na svakom mobitelu i tabletu, bez posebnog hardvera." },
  { word: "Bolja komunikacija", text: "Narudžba, poziv i račun uvijek dolaze s brojem stola. Nema dovikivanja ni nesporazuma." },
  { word: "Iskustvo gosta", text: "Gost naručuje svojim tempom i na svom jeziku, hrvatskom ili engleskom." },
  { word: "Učinkovitost", text: "Manje hodanja po narudžbe znači više vremena za goste kojima osoblje stvarno treba." },
  { word: "Stalni razvoj", text: "Tavlu stalno razvijamo. Nove mogućnosti stižu same, bez instalacije i bez prekida rada." },
];

export function WhyTavla() {
  return (
    <section aria-labelledby="zasto-naslov" className="surface-light bg-white py-24 text-ink sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading id="zasto-naslov" tone="light" title="Tehnologija koja radi iza dobrog ugostiteljstva." lead="Najbolja usluga je ona koju gost ne primijeti. Tavla radi u pozadini da bi osoblje moglo raditi ispred." />
        </div>
        <dl>
          {principles.map((p) => (
            <Reveal key={p.word} className="grid gap-2 border-t border-line-light py-7 sm:grid-cols-[13rem_1fr] sm:gap-8">
              <dt className="text-h3 font-semibold">{p.word}</dt>
              <dd className="leading-relaxed text-slate sm:pt-1.5">{p.text}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
