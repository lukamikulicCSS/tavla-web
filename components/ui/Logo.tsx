import { WORDMARK_PATH, WORDMARK_VIEWBOX } from "./logo-paths";

type Props = { className?: string; title?: string };

/** Puni logotip (znak + "Tavla"). Boja = currentColor, pa radi na tamnoj i svijetloj podlozi. */
export function Logo({ className, title = "Tavla" }: Props) {
  return (
    <svg viewBox={WORDMARK_VIEWBOX} className={className} role="img" aria-label={title} fill="currentColor">
      <path fillRule="evenodd" d={WORDMARK_PATH} />
    </svg>
  );
}

/** Samo znak — za male prostore i ukrasne trenutke. */
export function LogoMark({ className, title }: Props) {
  return (
    <svg
      viewBox="0 0 582 578"
      className={className}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <circle cx="490" cy="52" r="52" />
      <rect x="0" y="178" width="582" height="125" rx="62.5" />
      <path d="M228 240h126v274a63 63 0 0 1-126 0z" />
    </svg>
  );
}
