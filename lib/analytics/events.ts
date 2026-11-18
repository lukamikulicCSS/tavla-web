/**
 * Zajednički tipovi događaja (klijent + server). Bez osobnih podataka.
 */
export const EVENT_TYPES = [
  "page_view",
  "section_view",
  "scroll_depth",
  "click",
  "cta_click",
  "demo_interaction",
  "form_start",
  "form_submit",
  "form_error",
  "newsletter_signup",
  "nav_open",
  "outbound_click",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

/** Podaci koji idu uz događaj. Svi su neobavezni i kratki. */
export type EventProps = {
  section?: string;
  target?: string;
  /** sekunde (section_view) ili postotak (scroll_depth) */
  value?: number;
  /** normalizirane koordinate 0–1 u odnosu na sekciju */
  x?: number;
  y?: number;
  /** ID forme, izvor newslettera, vrsta demo radnje... */
  label?: string;
};

export type TrackEvent = EventProps & { type: EventType; t: number };

export type DemoAction =
  | "guest_add"
  | "guest_order"
  | "guest_waiter"
  | "guest_bill"
  | "guest_repeat"
  | "staff_accept"
  | "owner_open";
