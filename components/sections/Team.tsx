import Image from "next/image";
import { team } from "@/content/team";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/Logo";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
}

export function Team() {
  return (
    <section id="o-nama" aria-labelledby="tim-naslov" className="bg-ink py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="tim-naslov" title="Ljudi iza Tavle." lead="Tavlu razvijamo u Hrvatskoj, za ugostitelje koji žele da posluživanje teče bez zastoja." />

        <ul className="mt-16 grid gap-6 md:grid-cols-2">
          {team.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 0.08}>
              <article className="flex h-full flex-col gap-7 rounded-[2rem] bg-graphite p-6 sm:flex-row sm:items-center sm:p-8">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-graphite-2 sm:w-40 sm:shrink-0">
                  {p.photo ? (
                    <Image src={p.photo} alt={`${p.name}, ${p.role}`} fill sizes="(min-width: 640px) 10rem, 100vw" className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center" aria-hidden>
                      <LogoMark className="absolute right-4 top-4 h-4 w-auto text-white/15" />
                      <span className="text-5xl font-semibold tracking-[-0.04em] text-white/25">{initials(p.name)}</span>
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-h3 font-semibold">{p.name}</h3>
                  <p className="mt-1 text-soft">{p.role}</p>
                  {p.bio && <p className="mt-4 max-w-prose leading-relaxed text-white/75">{p.bio}</p>}
                  {p.linkedin && (
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex h-10 items-center rounded-full bg-white/[0.06] px-4 text-sm transition-colors hover:bg-white/10"
                    >
                      LinkedIn profil
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
