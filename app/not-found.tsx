import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { ButtonLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";

export const metadata: Metadata = { title: "Stranica ne postoji", robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="sadrzaj" className="grid min-h-dvh place-items-center bg-ink px-6 text-center">
        <div>
          <LogoMark className="mx-auto h-10 w-auto text-white/20" />
          <h1 className="mt-8 text-h2 font-semibold">Ova stranica ne postoji.</h1>
          <p className="mx-auto mt-4 max-w-sm text-soft">Poveznica je možda zastarjela ili je adresa krivo upisana.</p>
          <ButtonLink href="/" size="lg" className="mt-10">Natrag na početnu</ButtonLink>
        </div>
      </main>
    </>
  );
}
