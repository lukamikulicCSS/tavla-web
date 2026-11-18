/**
 * Vlastito (first-party) praćenje događaja. Učitava se dinamički i SAMO uz pristanak "Analitički".
 *
 * Privatnost:
 *  - ID sesije je slučajan i živi samo u sessionStorage (nestaje zatvaranjem kartice)
 *  - nema kolačića, nema IP-a, nema user-agent stringa (samo kategorija uređaja)
 *  - vrijednosti polja forme se nikad ne čitaju
 *
 * Slanje: navigator.sendBeacon, najviše jedan zahtjev u 10 s (+ pri skrivanju stranice).
 */
import { TRACK_EVENT } from "./emit";
import type { EventProps, EventType, TrackEvent } from "./events";

const ENDPOINT = "/api/e";
const FLUSH_MS = 10_000;
const MAX_QUEUE = 60;
const SID_KEY = "tavla_sid";
const ATTR_KEY = "tavla_attr";

type Attribution = { ref: string; us: string; um: string; uc: string; landing: string };

let active = false;
let sid = "";
let queue: (TrackEvent & { path: string })[] = [];
let lastFlush = 0;
let flushTimer: number | undefined;
let cleanups: (() => void)[] = [];
let sectionCleanup: (() => void) | undefined;
let scrollMarks = new Set<number>();
let currentPath = "";

function randomId() {
  const b = new Uint8Array(12);
  crypto.getRandomValues(b);
  return Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
}

function session() {
  try {
    let id = sessionStorage.getItem(SID_KEY);
    if (!id) {
      id = randomId();
      sessionStorage.setItem(SID_KEY, id);
    }
    return id;
  } catch {
    return randomId();
  }
}

export function deviceType(): "mobile" | "tablet" | "desktop" {
  const w = window.innerWidth;
  return w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop";
}

function widthBucket() {
  const w = window.innerWidth;
  return w < 400 ? "<400" : w < 768 ? "400-767" : w < 1024 ? "768-1023" : w < 1440 ? "1024-1439" : "1440+";
}

function refDomain() {
  try {
    if (!document.referrer) return "";
    const h = new URL(document.referrer).hostname.replace(/^www\./, "");
    return h === location.hostname.replace(/^www\./, "") ? "" : h;
  } catch {
    return "";
  }
}

/** Izvor posjeta za sesiju — prvi dolazak. Koristi ga i kontakt forma (samo uz pristanak). */
function attribution(): Attribution {
  try {
    const saved = sessionStorage.getItem(ATTR_KEY);
    if (saved) return JSON.parse(saved) as Attribution;
    const q = new URLSearchParams(location.search);
    const a: Attribution = {
      ref: refDomain(),
      us: (q.get("utm_source") ?? "").slice(0, 60),
      um: (q.get("utm_medium") ?? "").slice(0, 60),
      uc: (q.get("utm_campaign") ?? "").slice(0, 80),
      landing: location.pathname.slice(0, 120),
    };
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(a));
    return a;
  } catch {
    return { ref: "", us: "", um: "", uc: "", landing: "" };
  }
}

function push(type: EventType, props: EventProps = {}) {
  // interne stranice (KPI ploča) se ne prate
  if (!active || location.pathname.startsWith("/admin")) return;
  queue.push({ type, t: Date.now(), path: currentPath || location.pathname, ...props });
  if (queue.length > MAX_QUEUE) queue = queue.slice(-MAX_QUEUE);
  schedule();
}

function schedule() {
  if (flushTimer) return;
  const wait = Math.max(0, FLUSH_MS - (Date.now() - lastFlush));
  flushTimer = window.setTimeout(() => {
    flushTimer = undefined;
    flush();
  }, wait);
}

function flush() {
  if (!active || !queue.length) return;
  const a = attribution();
  const body = JSON.stringify({
    sid,
    device: deviceType(),
    sw: widthBucket(),
    ref: a.ref,
    utm: { source: a.us, medium: a.um, campaign: a.uc },
    events: queue.splice(0, 50),
  });
  lastFlush = Date.now();
  const blob = new Blob([body], { type: "application/json" });
  if (!navigator.sendBeacon?.(ENDPOINT, blob)) {
    void fetch(ENDPOINT, { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
  }
  if (queue.length) schedule();
}

/* ─────────────── sekcije: vrijeme zadržavanja ─────────────── */

function observeSections() {
  sectionCleanup?.();
  const visibleSince = new Map<Element, number>();
  const report = (el: Element, now: number) => {
    const start = visibleSince.get(el);
    if (start === undefined) return;
    visibleSince.delete(el);
    const s = Math.round((now - start) / 100) / 10;
    if (s >= 0.5) push("section_view", { section: (el as HTMLElement).dataset.section, value: Math.min(s, 1800) });
  };
  const io = new IntersectionObserver(
    (entries) => {
      const now = Date.now();
      for (const e of entries) {
        // ≥ 50 % sekcije ili ≥ 50 % ekrana (za sekcije više od ekrana)
        const enough = e.intersectionRatio >= 0.5 || e.intersectionRect.height >= window.innerHeight * 0.5;
        if (enough && !visibleSince.has(e.target)) visibleSince.set(e.target, now);
        else if (!enough) report(e.target, now);
      }
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] },
  );
  document.querySelectorAll("[data-section]").forEach((el) => io.observe(el));
  const onHide = () => {
    if (document.visibilityState !== "hidden") {
      // nakon povratka sekcije opet broje od sada
      const now = Date.now();
      document.querySelectorAll("[data-section]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const vis = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
        if (vis >= Math.min(r.height, innerHeight) * 0.5) visibleSince.set(el, now);
      });
      return;
    }
    const now = Date.now();
    [...visibleSince.keys()].forEach((el) => report(el, now));
    flush();
  };
  document.addEventListener("visibilitychange", onHide);
  sectionCleanup = () => {
    const now = Date.now();
    [...visibleSince.keys()].forEach((el) => report(el, now));
    io.disconnect();
    document.removeEventListener("visibilitychange", onHide);
  };
}

/* ─────────────── skrolanje ─────────────── */

function onScroll() {
  const h = document.documentElement.scrollHeight - innerHeight;
  const pct = h <= 0 ? 100 : (scrollY / h) * 100;
  for (const m of [25, 50, 75, 100]) {
    if (pct >= m - 1 && !scrollMarks.has(m)) {
      scrollMarks.add(m);
      push("scroll_depth", { value: m });
    }
  }
}

/* ─────────────── klikovi ─────────────── */

function onClick(e: MouseEvent) {
  const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track], a, button");
  if (!el) return;
  // data-zone: područja koja nisu sekcije (npr. fiksna navigacija) — za klikove, ne za vrijeme zadržavanja
  const sectionEl = el.closest<HTMLElement>("[data-section], [data-zone]");
  const section = sectionEl?.dataset.section ?? sectionEl?.dataset.zone;
  let x: number | undefined;
  let y: number | undefined;
  if (sectionEl) {
    const r = sectionEl.getBoundingClientRect();
    x = Math.round(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * 1000) / 1000;
    y = Math.round(Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)) * 1000) / 1000;
  }
  const target = (el.dataset.track ?? el.getAttribute("aria-label") ?? el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 60);
  push("click", { section, target, x, y });
  if (el.dataset.track?.includes("cta")) push("cta_click", { section, target: el.dataset.track });
  if (el instanceof HTMLAnchorElement && el.href) {
    try {
      const u = new URL(el.href);
      if (/^https?:$/.test(u.protocol) && u.hostname !== location.hostname) push("outbound_click", { section, target: u.hostname });
    } catch {
      /* ignoriraj */
    }
  }
}

function onCustom(e: Event) {
  const d = (e as CustomEvent<EventProps & { type: EventType }>).detail;
  if (d?.type) push(d.type, d);
}

/* ─────────────── javni API ─────────────── */

export function start() {
  if (active) return;
  active = true;
  sid = session();
  attribution();
  const pageHide = () => flush();
  addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("click", onClick, { capture: true });
  addEventListener(TRACK_EVENT, onCustom);
  addEventListener("pagehide", pageHide);
  cleanups = [
    () => removeEventListener("scroll", onScroll),
    () => document.removeEventListener("click", onClick, { capture: true }),
    () => removeEventListener(TRACK_EVENT, onCustom),
    () => removeEventListener("pagehide", pageHide),
  ];
}

/** Poziva se na svakoj promjeni rute (i pri prvom učitavanju). */
export function pageView(path: string) {
  if (!active) return;
  if (currentPath && currentPath !== path) sectionCleanup?.();
  currentPath = path;
  scrollMarks = new Set();
  push("page_view");
  // pričekaj da se DOM nove stranice iscrta
  requestAnimationFrame(() => requestAnimationFrame(observeSections));
}

/** Povlačenje pristanka: odmah prestani, ništa više ne šalji, obriši ID sesije. */
export function stop() {
  if (!active) return;
  active = false;
  queue = [];
  sectionCleanup?.();
  sectionCleanup = undefined;
  cleanups.forEach((c) => c());
  cleanups = [];
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = undefined;
  try {
    sessionStorage.removeItem(SID_KEY);
    sessionStorage.removeItem(ATTR_KEY);
  } catch {
    /* ignoriraj */
  }
}
