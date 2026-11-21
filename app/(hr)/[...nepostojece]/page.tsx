import { notFound } from "next/navigation";

/**
 * Hvata nepostojeće adrese izvan /en, da se prikaže hrvatska 404 stranica unutar hrvatskog layouta.
 * (Aplikacija ima dva root layouta, pa nema jednog globalnog.)
 */
export default function CatchAll() {
  notFound();
}
