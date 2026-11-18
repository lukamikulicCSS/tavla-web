/**
 * Minijaturni "event bus" za analitiku (≈200 B).
 *
 * Komponente zovu emit(); ako tracker nije učitan (nema pristanka),
 * događaj se jednostavno izgubi. Ništa se ne sprema i ništa se ne šalje.
 */
import type { EventProps, EventType } from "./events";

export const TRACK_EVENT = "tavla:track";

export function emit(type: EventType, props: EventProps = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(TRACK_EVENT, { detail: { type, ...props } }));
}
