"use client";

import Image from "next/image";
import type { Photo } from "@/content/images";
import { PhoneFrame } from "./PhoneFrame";
import { BrowserFrame, TabletFrame } from "./DeviceFrames";
import { GuestApp } from "./GuestApp";
import { StaffBoard } from "./StaffBoard";
import { OwnerDashboard } from "./OwnerDashboard";
import { DemoProvider } from "./demo-store";

export type Persona = "gosti" | "osoblje" | "vlasnici";

/**
 * Vizual za pojedinu ulogu. Ako postoji fotografija, prikazuje fotografiju s
 * plutajućim isječkom sučelja; inače samo sučelje.
 * variant="card" — izrezani prikaz za kartice na početnoj.
 */
export function PersonaVisual({ persona, photo, variant = "full", priority }: { persona: Persona; photo?: Photo; variant?: "full" | "card"; priority?: boolean }) {
  const ui = <DeviceUi persona={persona} variant={variant} />;

  if (photo?.src) {
    return (
      <div className={`relative overflow-hidden rounded-[2rem] ${variant === "card" ? "h-full" : "aspect-[4/5] sm:aspect-[5/4]"}`}>
        <Image src={photo.src} alt={photo.alt} fill priority={priority} sizes={variant === "card" ? "(min-width: 1024px) 33vw, 100vw" : "(min-width: 1024px) 55vw, 100vw"} className="object-cover" />
        {variant === "full" && <div className="absolute bottom-4 right-4 w-[46%] max-w-[15rem] sm:bottom-8 sm:right-8">{persona === "gosti" ? ui : null}</div>}
      </div>
    );
  }
  return ui;
}

function DeviceUi({ persona, variant }: { persona: Persona; variant: "full" | "card" }) {
  const card = variant === "card";
  return (
    <DemoProvider autoAdvance={false}>
      {persona === "gosti" && (
        <PhoneFrame className={card ? "mx-auto w-[14.5rem]" : "mx-auto w-[min(72vw,18.5rem)]"} label="Sučelje za goste: digitalni meni">
          <GuestApp interactive={false} />
        </PhoneFrame>
      )}
      {persona === "osoblje" && (
        <TabletFrame className={card ? "w-[38rem] max-w-none" : "w-full"}>
          <StaffBoard interactive={false} />
        </TabletFrame>
      )}
      {persona === "vlasnici" && (
        <BrowserFrame className={card ? "w-[38rem] max-w-none" : ""}>
          <OwnerDashboard />
        </BrowserFrame>
      )}
    </DemoProvider>
  );
}
