import { getDict } from "@/content";
import { href, type Locale } from "@/content/routes";
import { Nav } from "@/components/layout/Nav";
import { ButtonLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";

export function NotFoundPage({ locale }: { locale: Locale }) {
  const t = getDict(locale).ui.notFound;
  return (
    <>
      <Nav />
      <main id="sadrzaj" className="grid min-h-dvh place-items-center bg-ink px-6 text-center">
        <div>
          <LogoMark className="mx-auto h-10 w-auto text-white/20" />
          <h1 className="mt-8 text-h2 font-semibold">{t.title}</h1>
          <p className="mx-auto mt-4 max-w-sm text-soft">{t.text}</p>
          <ButtonLink href={href("home", locale)} size="lg" className="mt-10">{t.back}</ButtonLink>
        </div>
      </main>
    </>
  );
}
