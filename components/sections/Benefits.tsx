import { Clock, Eye, LayoutList, MessageSquareOff, Smile, TrendingUp, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Kvalitativne koristi — namjerno BEZ brojki.
 * Statistike dodati tek kad postoje provjereni podaci iz stvarnih objekata.
 */
const benefits = [
  { icon: Smile, title: "Bolje iskustvo gosta", text: "Gost ne traži pogled konobara. Meni, narudžba i račun su mu na dohvat ruke." },
  { icon: Zap, title: "Brže naručivanje", text: "Narudžba ide izravno sa stola na šank, bez koraka u kojem se zapisuje i prenosi." },
  { icon: MessageSquareOff, title: "Manje prekidanja osoblja", text: "Pitanja tipa „što imate od piva” odgovara meni, a osoblje se bavi posluživanjem." },
  { icon: Clock, title: "Učinkovitija usluga", text: "Kad osoblje manje hoda po narudžbe, ostaje mu više vremena za goste." },
  { icon: TrendingUp, title: "Prilike za dodatnu prodaju", text: "Prijedlozi uz narudžbu i ponavljanje ture potiču drugu rundu bez nametanja." },
  { icon: Eye, title: "Jasan pregled poslovanja", text: "Što se prodaje, kada je najveća gužva i koji su stolovi aktivni, vidite u stvarnom vremenu." },
  { icon: LayoutList, title: "Jednostavnije upravljanje narudžbama", text: "Svaka narudžba ima stol, status i vrijeme. Ništa se ne izgubi između stola i šanka." },
];

export function Benefits() {
  return (
    <section aria-labelledby="koristi-naslov" className="surface-light bg-mist py-24 text-ink sm:py-32">
      <div className="container-page">
        <SectionHeading id="koristi-naslov" tone="light" title="Napravljeno da ugostiteljstvo radi bolje." />
        <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal as="li" key={b.title} delay={(i % 3) * 0.05} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <b.icon className="size-6 text-ink" strokeWidth={1.6} aria-hidden />
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.015em]">{b.title}</h3>
              <p className="mt-2 max-w-sm leading-relaxed text-slate">{b.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
