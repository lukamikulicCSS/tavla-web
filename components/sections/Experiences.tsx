import type { ReactNode } from "react";
import { getDict } from "@/content";
import { anchors, type Locale } from "@/content/routes";
import type { Feature } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SoonBadge } from "@/components/ui/StatusBadge";
import { PhoneFrame } from "@/components/product/PhoneFrame";
import { BrowserFrame, TabletFrame } from "@/components/product/DeviceFrames";
import { GuestApp } from "@/components/product/GuestApp";
import { StaffBoard } from "@/components/product/StaffBoard";
import { OwnerDashboard } from "@/components/product/OwnerDashboard";
import { DemoProvider } from "@/components/product/demo-store";

export function Experiences({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const t = d.home.experiences;
  return (
    <div id={anchors[locale].solutions} data-section="iskustva">
      {/* Uvod */}
      <section aria-labelledby="iskustva-naslov" className="surface-light bg-white pt-24 text-ink sm:pt-32">
        <div className="container-page">
          <SectionHeading
            id="iskustva-naslov"
            tone="light"
            title={t.title}
            lead={t.lead}
          />
        </div>
      </section>

      <Block
        tone="light"
        id="gosti"
        who={t.guests.who}
        title={t.guests.title}
        text={t.guests.text}
        features={d.features.guest}
        locale={locale}
        visual={
          <DemoProvider autoAdvance={false}>
            <PhoneFrame className="mx-auto w-[min(72vw,18.5rem)]" label={t.guests.visualLabel}>
              <GuestApp interactive={false} />
            </PhoneFrame>
          </DemoProvider>
        }
      />

      <Block
        tone="dark"
        id="osoblje"
        who={t.staff.who}
        title={t.staff.title}
        text={t.staff.text}
        features={d.features.staff}
        locale={locale}
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
        who={t.owners.who}
        title={t.owners.title}
        text={t.owners.text}
        features={d.features.owner}
        locale={locale}
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
  locale,
}: {
  tone: "dark" | "light";
  id: string;
  who: string;
  title: string;
  text: string;
  features: Feature[];
  visual: ReactNode;
  reverse?: boolean;
  locale: Locale;
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
