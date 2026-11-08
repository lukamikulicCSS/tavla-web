import type { ReactNode } from "react";
import { guestFeatures, ownerFeatures, staffFeatures, type Feature } from "@/content/features";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SoonBadge } from "@/components/ui/StatusBadge";
import { PhoneFrame } from "@/components/product/PhoneFrame";
import { BrowserFrame, TabletFrame } from "@/components/product/DeviceFrames";
import { GuestApp } from "@/components/product/GuestApp";
import { StaffBoard } from "@/components/product/StaffBoard";
import { OwnerDashboard } from "@/components/product/OwnerDashboard";
import { DemoProvider } from "@/components/product/demo-store";

export function Experiences() {
  return (
    <div id="rjesenja">
      {/* Uvod */}
      <section aria-labelledby="iskustva-naslov" className="surface-light bg-white pt-24 text-ink sm:pt-32">
        <div className="container-page">
          <SectionHeading
            id="iskustva-naslov"
            tone="light"
            title="Tri iskustva. Jedna platforma."
            lead="Gost, osoblje i vlasnik vide istu narudžbu, svatko iz svoje perspektive i u istom trenutku."
          />
        </div>
      </section>

      <Block
        tone="light"
        id="gosti"
        who="Za goste"
        title="Sve što treba, na dlanu."
        text="Meni se otvara skeniranjem koda na stolu. Gost bira, naručuje i prati narudžbu bez čekanja da ga netko primijeti."
        features={guestFeatures}
        visual={
          <DemoProvider autoAdvance={false}>
            <PhoneFrame className="mx-auto w-[min(72vw,18.5rem)]" label="Sučelje za goste: digitalni meni s kategorijama i cijenama">
              <GuestApp interactive={false} />
            </PhoneFrame>
          </DemoProvider>
        }
      />

      <Block
        tone="dark"
        id="osoblje"
        who="Za osoblje"
        title="Posluživanje bez nepotrebnog trčanja."
        text="Narudžbe i zahtjevi gostiju stižu na tablet za šankom, s brojem stola. Osoblje vidi što je novo, što se priprema i što je posluženo."
        features={staffFeatures}
        reverse
        visual={
          <DemoProvider autoAdvance={false}>
            <TabletFrame className="w-full">
              <StaffBoard interactive={false} />
            </TabletFrame>
          </DemoProvider>
        }
      />

      <Block
        tone="light"
        id="vlasnici"
        who="Za vlasnike"
        title="Cijeli objekt u jednom pregledu."
        text="Meni uređujete sami, a promet, najprodavaniji artikli i aktivnost stolova vidljivi su bez prepisivanja iz bilježnice."
        features={ownerFeatures}
        visual={
          <DemoProvider autoAdvance={false}>
            <BrowserFrame>
              <OwnerDashboard />
            </BrowserFrame>
          </DemoProvider>
        }
      />
    </div>
  );
}

function Block({
  tone,
  id,
  who,
  title,
  text,
  features,
  visual,
  reverse,
}: {
  tone: "dark" | "light";
  id: string;
  who: string;
  title: string;
  text: string;
  features: Feature[];
  visual: ReactNode;
  reverse?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      aria-labelledby={`${id}-naslov`}
      className={`${dark ? "bg-ink text-white" : "surface-light bg-white text-ink"} py-20 sm:py-28`}
    >
      <div className={`container-page grid items-center gap-14 lg:gap-20 ${reverse ? "lg:grid-cols-[1.25fr_1fr]" : "lg:grid-cols-[1fr_1.25fr]"}`}>
        <Reveal className={reverse ? "lg:order-2" : ""}>
          <p className={`text-[0.9375rem] font-medium ${dark ? "text-soft" : "text-slate"}`}>{who}</p>
          <h3 id={`${id}-naslov`} className="mt-3 text-h2 font-semibold">{title}</h3>
          <p className={`mt-5 max-w-md text-lead ${dark ? "text-soft" : "text-slate"}`}>{text}</p>
          <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f.id} className={f.status === "soon" ? "opacity-70" : ""}>
                <p className="font-medium tracking-[-0.01em]">
                  {f.title}
                  <SoonBadge status={f.status} tone={tone} />
                </p>
                <p className={`mt-1 text-[0.9375rem] leading-relaxed ${dark ? "text-soft" : "text-slate"}`}>{f.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className={`relative ${reverse ? "lg:order-1" : ""}`}>
          {dark && <div aria-hidden className="stage-light absolute -inset-[15%] -z-0" />}
          <div className="relative">{visual}</div>
        </Reveal>
      </div>
    </section>
  );
}
