"use client";

import { AnimatePresence, m } from "framer-motion";
import { BarChart3, ConciergeBell, RotateCcw, Smartphone } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhoneFrame } from "@/components/product/PhoneFrame";
import { BrowserFrame, TabletFrame } from "@/components/product/DeviceFrames";
import { GuestApp, type GuestView } from "@/components/product/GuestApp";
import { StaffBoard } from "@/components/product/StaffBoard";
import { OwnerDashboard } from "@/components/product/OwnerDashboard";
import { DemoProvider, useDemo } from "@/components/product/demo-store";
import { emit } from "@/lib/analytics/emit";
import { anchors } from "@/content/routes";
import { useDict, useLocale } from "@/components/i18n/LocaleProvider";

type Tab = "guest" | "staff" | "owner";

const tabs: { key: Tab; icon: typeof Smartphone }[] = [
  { key: "guest", icon: Smartphone },
  { key: "staff", icon: ConciergeBell },
  { key: "owner", icon: BarChart3 },
];

export function ProductDemo() {
  const locale = useLocale();
  const t = useDict().home.demo;
  return (
    <section id={anchors[locale].demo} data-section="demo" aria-labelledby="demo-naslov" className="bg-ink py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="demo-naslov"
          align="center"
          title={t.title}
          lead={t.lead}
        />
        <DemoProvider>
          <DemoTabs />
        </DemoProvider>
        <p className="mt-8 text-center text-xs text-soft">{t.note}</p>
      </div>
    </section>
  );
}

function DemoTabs() {
  const [tab, setTab] = useState<Tab>("guest");
  const [guestView, setGuestView] = useState<GuestView>("menu");
  const demo = useDemo();
  const t = useDict().home.demo;
  const newCount = demo.orders.filter((o) => o.status === "new").length + demo.requests.filter((r) => !r.done).length;
  const current = t.tabs[tab];

  return (
    <div className="mt-12">
      <div className="flex flex-col items-center gap-4">
        <div role="tablist" aria-label={t.tabsAria} className="glass inline-flex rounded-full p-1">
          {tabs.map(({ key, icon: Icon }) => {
            const on = tab === key;
            return (
              <button
                key={key}
                role="tab"
                id={`tab-${key}`}
                aria-selected={on}
                aria-controls={`panel-${key}`}
                onClick={() => {
                  setTab(key);
                  if (key === "owner") emit("demo_interaction", { section: "demo", label: "owner_open" });
                }}
                data-track={`demo-tab-${key}`}
                className={`relative flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors sm:px-5 ${on ? "text-ink" : "text-white/75 hover:text-white"}`}
              >
                {on && <m.span layoutId="demo-tab" className="absolute inset-0 -z-10 rounded-full bg-white" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                <Icon className="size-4" aria-hidden />
                {t.tabs[key].label}
                {key === "staff" && newCount > 0 && (
                  <span className={`tabular grid min-w-5 place-items-center rounded-full px-1 text-[0.6875rem] ${on ? "bg-ink text-white" : "bg-white text-ink"}`} aria-label={t.newCount(newCount)}>
                    {newCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <p className="max-w-lg text-center text-sm text-soft" aria-live="polite">{current.hint}</p>
      </div>

      <div className="relative isolate mt-12">
        <div aria-hidden className="stage-light absolute -inset-x-[10%] -inset-y-[20%] -z-10" />
        <AnimatePresence mode="wait">
          <m.div
            key={tab}
            role="tabpanel"
            id={`panel-${tab}`}
            aria-labelledby={`tab-${tab}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {tab === "guest" && (
              <PhoneFrame className="mx-auto w-[min(84vw,20rem)]">
                <GuestApp view={guestView} onViewChange={setGuestView} />
              </PhoneFrame>
            )}
            {tab === "staff" && (
              <TabletFrame className="mx-auto min-h-[30rem] max-w-5xl">
                <StaffBoard />
              </TabletFrame>
            )}
            {tab === "owner" && (
              <BrowserFrame className="mx-auto max-w-5xl">
                <OwnerDashboard />
              </BrowserFrame>
            )}
          </m.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center">
        <button onClick={() => { demo.reset(); setGuestView("menu"); }} className="flex items-center gap-2 rounded-full px-4 py-2 text-sm text-soft transition-colors hover:text-white">
          <RotateCcw className="size-3.5" aria-hidden /> {t.reset}
        </button>
      </div>
    </div>
  );
}
