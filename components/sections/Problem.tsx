import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const rows = [
  { now: "Gost čeka da mu netko donese meni.", tavla: "Meni je na stolu, u mobitelu gosta." },
  { now: "Gost čeka da konobar dođe po narudžbu.", tavla: "Gost naruči kad je spreman, narudžba stiže odmah." },
  { now: "Dodatna želja se izgubi u gužvi.", tavla: "Poziv konobara i račun stižu s brojem stola." },
  { now: "Osoblje hoda po narudžbe i zapisuje ih.", tavla: "Osoblje priprema i nosi, a narudžba je već zapisana." },
  { now: "Vlasnik ne vidi što se događa u smjeni.", tavla: "Narudžbe i prodaja vidljivi su u jednom pregledu." },
  { now: "Druga tura se ne dogodi jer nitko nije pitao.", tavla: "Prijedlozi uz narudžbu i „Ponovi turu” jednim dodirom." },
];

export function Problem() {
  return (
    <section aria-labelledby="problem-naslov" className="surface-light bg-white py-24 text-ink sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="problem-naslov"
          tone="light"
          title="Manje čekanja. Više iskustva."
          lead="Najveći dio čekanja u kafiću ili restoranu nije priprema, nego hodanje: po meni, po narudžbu, po račun. Tavla to hodanje skraćuje."
        />

        <Reveal className="mt-16">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Usporedba: kako je danas i kako je s Tavlom</caption>
            <thead className="hidden sm:table-header-group">
              <tr className="text-sm text-slate">
                <th scope="col" className="w-1/2 pb-4 pr-8 font-medium">Danas</th>
                <th scope="col" className="w-1/2 pb-4 font-medium">S Tavlom</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.now} className="block border-t border-line-light py-5 sm:table-row sm:py-0">
                  <td className="block pb-1.5 text-[1.0625rem] text-slate sm:table-cell sm:py-6 sm:pr-8 sm:text-xl">
                    <span className="sr-only sm:hidden">Danas: </span>
                    {r.now}
                  </td>
                  <td className="block text-[1.0625rem] font-medium tracking-[-0.01em] sm:table-cell sm:py-6 sm:text-xl">
                    <span className="sr-only">S Tavlom: </span>
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
