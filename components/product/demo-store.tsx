"use client";

/**
 * Lokalno stanje interaktivnog demoa. Sve živi u pregledniku posjetitelja,
 * ne šalje se nikamo i nije povezano s produkcijskim podacima.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, type ReactNode } from "react";
import { demoMenu, demoRequests, demoSeedOrders, demoVenue, type MenuItem } from "@/content/demo-data";

export type OrderStatus = "new" | "preparing" | "served";
export type Line = { id: string; qty: number };
export type Order = { id: string; table: number; items: Line[]; status: OrderStatus; createdAt: number; mine?: boolean };
export type Req = { id: string; table: number; kind: "waiter" | "bill"; createdAt: number; done?: boolean };

type State = { cart: Line[]; orders: Order[]; requests: Req[]; seq: number };

type Action =
  | { type: "add"; id: string }
  | { type: "dec"; id: string }
  | { type: "clearCart" }
  | { type: "place"; now: number }
  | { type: "repeat"; now: number }
  | { type: "advance"; orderId: string }
  | { type: "request"; kind: Req["kind"]; now: number }
  | { type: "resolve"; reqId: string }
  | { type: "reset" };

const menuById = new Map<string, MenuItem>(demoMenu.map((m) => [m.id, m]));
export const itemById = (id: string) => menuById.get(id)!;
export const lineTotal = (lines: Line[]) => lines.reduce((s, l) => s + itemById(l.id).price * l.qty, 0);
export const lineCount = (lines: Line[]) => lines.reduce((s, l) => s + l.qty, 0);

const next: Record<OrderStatus, OrderStatus> = { new: "preparing", preparing: "served", served: "served" };

function initState(): State {
  const now = Date.now();
  return {
    cart: [],
    seq: 1042,
    orders: demoSeedOrders.map((o) => ({ ...o, items: [...o.items], createdAt: now - o.minutesAgo * 60_000 })),
    requests: demoRequests.map((r, i) => ({ id: `R-${i}`, table: r.table, kind: r.kind, createdAt: now - r.minutesAgo * 60_000 })),
  };
}

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "add": {
      const ex = s.cart.find((l) => l.id === a.id);
      return { ...s, cart: ex ? s.cart.map((l) => (l.id === a.id ? { ...l, qty: l.qty + 1 } : l)) : [...s.cart, { id: a.id, qty: 1 }] };
    }
    case "dec":
      return { ...s, cart: s.cart.flatMap((l) => (l.id !== a.id ? [l] : l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : [])) };
    case "clearCart":
      return { ...s, cart: [] };
    case "place": {
      if (!s.cart.length) return s;
      const o: Order = { id: `A-${s.seq}`, table: demoVenue.table, items: s.cart, status: "new", createdAt: a.now, mine: true };
      return { ...s, cart: [], seq: s.seq + 1, orders: [o, ...s.orders] };
    }
    case "repeat": {
      const last = s.orders.find((o) => o.mine);
      if (!last) return s;
      const o: Order = { id: `A-${s.seq}`, table: demoVenue.table, items: last.items.map((l) => ({ ...l })), status: "new", createdAt: a.now, mine: true };
      return { ...s, seq: s.seq + 1, orders: [o, ...s.orders] };
    }
    case "advance":
      return { ...s, orders: s.orders.map((o) => (o.id === a.orderId ? { ...o, status: next[o.status] } : o)) };
    case "request": {
      const open = s.requests.find((r) => r.table === demoVenue.table && r.kind === a.kind && !r.done);
      if (open) return s;
      return { ...s, requests: [{ id: `R-${a.now}`, table: demoVenue.table, kind: a.kind, createdAt: a.now }, ...s.requests] };
    }
    case "resolve":
      return { ...s, requests: s.requests.map((r) => (r.id === a.reqId ? { ...r, done: true } : r)) };
    case "reset":
      return initState();
  }
}

type Ctx = State & {
  add: (id: string) => void;
  dec: (id: string) => void;
  place: () => void;
  repeat: () => void;
  advance: (orderId: string) => void;
  request: (kind: Req["kind"]) => void;
  resolve: (reqId: string) => void;
  reset: () => void;
  myLatest?: Order;
};

const DemoCtx = createContext<Ctx | null>(null);

export function DemoProvider({ children, autoAdvance = true }: { children: ReactNode; autoAdvance?: boolean }) {
  const [state, dispatch] = useReducer(reducer, undefined, initState);
  const timers = useRef<number[]>([]);

  const advance = useCallback((orderId: string) => dispatch({ type: "advance", orderId }), []);

  // Simulacija: gostova narudžba sama prelazi u "u pripremi" pa "posluženo".
  const place = useCallback(() => {
    dispatch({ type: "place", now: Date.now() });
  }, []);
  const repeat = useCallback(() => dispatch({ type: "repeat", now: Date.now() }), []);

  const myLatest = state.orders.find((o) => o.mine);
  const lastSeenId = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!autoAdvance || !myLatest || myLatest.id === lastSeenId.current) return;
    lastSeenId.current = myLatest.id;
    const id = myLatest.id;
    timers.current.push(window.setTimeout(() => dispatch({ type: "advance", orderId: id }), 3500));
    timers.current.push(window.setTimeout(() => dispatch({ type: "advance", orderId: id }), 9000));
  }, [myLatest, autoAdvance]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      myLatest,
      add: (id) => dispatch({ type: "add", id }),
      dec: (id) => dispatch({ type: "dec", id }),
      place,
      repeat,
      advance,
      request: (kind) => dispatch({ type: "request", kind, now: Date.now() }),
      resolve: (reqId) => dispatch({ type: "resolve", reqId }),
      reset: () => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
        lastSeenId.current = undefined;
        dispatch({ type: "reset" });
      },
    }),
    [state, myLatest, place, repeat, advance],
  );

  return <DemoCtx.Provider value={value}>{children}</DemoCtx.Provider>;
}

export function useDemo() {
  const c = useContext(DemoCtx);
  if (!c) throw new Error("useDemo mora biti unutar DemoProvider");
  return c;
}

export function minutesSince(ts: number, now: number) {
  const m = Math.max(0, Math.round((now - ts) / 60_000));
  return m === 0 ? "upravo" : `prije ${m} min`;
}
