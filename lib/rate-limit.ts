/**
 * Rate limiting za forme i analitiku.
 * - Ako su postavljeni UPSTASH_REDIS_REST_URL i _TOKEN: dijeljeni limit preko Redisa
 *   (ispravno radi na serverless okruženju s više instanci).
 * - Inače: limit u memoriji jedne instance (dovoljno za razvoj i mali promet).
 */
type Opts = { windowS?: number; max?: number; namespace?: string };

const memory = new Map<string, { count: number; reset: number }>();

export async function rateLimit(key: string, opts: Opts = {}): Promise<{ ok: boolean; retryAfter: number }> {
  const WINDOW_S = opts.windowS ?? 600; // 10 minuta
  const MAX = opts.max ?? 5; // najviše 5 zahtjeva u prozoru
  const ns = opts.namespace ?? "contact";
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    try {
      const k = `tavla:${ns}:${key}`;
      const res = await fetch(`${url}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify([["INCR", k], ["EXPIRE", k, WINDOW_S, "NX"], ["TTL", k]]),
        cache: "no-store",
      });
      if (res.ok) {
        const data = (await res.json()) as { result: number }[];
        const count = data[0]?.result ?? 0;
        const ttl = data[2]?.result ?? WINDOW_S;
        return { ok: count <= MAX, retryAfter: Math.max(ttl, 1) };
      }
    } catch {
      // Ako Redis nije dostupan, padamo na memorijski limit umjesto da blokiramo formu.
    }
  }

  const now = Date.now();
  const mk = `${ns}:${key}`;
  const entry = memory.get(mk);
  if (!entry || entry.reset < now) {
    memory.set(mk, { count: 1, reset: now + WINDOW_S * 1000 });
    if (memory.size > 5000) for (const [k, v] of memory) if (v.reset < now) memory.delete(k);
    return { ok: true, retryAfter: WINDOW_S };
  }
  entry.count += 1;
  return { ok: entry.count <= MAX, retryAfter: Math.ceil((entry.reset - now) / 1000) };
}
