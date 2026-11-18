/**
 * Provjera Cloudflare Access JWT-a (header Cf-Access-Jwt-Assertion).
 *
 * Nije dovoljno da header postoji — provjeravamo potpis (RS256, javni ključevi s
 * https://<team>/cdn-cgi/access/certs), izdavatelja, publiku (AUD), istek i e-mail.
 * Bez ispravnog tokena stranica vraća 404.
 */
import { getSecret } from "./request";

type Jwk = JsonWebKey & { kid: string };
type Claims = { aud: string | string[]; iss: string; exp: number; nbf?: number; email?: string };

let jwksCache: { at: number; team: string; keys: Jwk[] } | null = null;

const b64urlToBytes = (s: string) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4)), (c) => c.charCodeAt(0));
const b64urlJson = <T,>(s: string) => JSON.parse(new TextDecoder().decode(b64urlToBytes(s))) as T;

async function keys(team: string): Promise<Jwk[]> {
  if (jwksCache && jwksCache.team === team && Date.now() - jwksCache.at < 3600_000) return jwksCache.keys;
  const res = await fetch(`https://${team}/cdn-cgi/access/certs`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = (await res.json()) as { keys?: Jwk[] };
  jwksCache = { at: Date.now(), team, keys: data.keys ?? [] };
  return jwksCache.keys;
}

/** Vraća e-mail prijavljenog vlasnika ili null. */
export async function verifyAccess(token: string | null): Promise<string | null> {
  // Lokalni razvoj (`next dev`) — samo uz izričitu zastavicu, nikad u produkciji
  if (process.env.NODE_ENV !== "production" && process.env.ADMIN_DEV_BYPASS === "1") return "dev@localhost";
  if (!token) return null;

  const team = (await getSecret("CF_ACCESS_TEAM_DOMAIN"))?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const aud = await getSecret("CF_ACCESS_AUD");
  if (!team || !aud) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const header = b64urlJson<{ alg: string; kid: string }>(parts[0]);
    if (header.alg !== "RS256") return null;
    const jwk = (await keys(team)).find((k) => k.kid === header.kid);
    if (!jwk) return null;
    const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
    const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64urlToBytes(parts[2]), new TextEncoder().encode(`${parts[0]}.${parts[1]}`));
    if (!ok) return null;

    const c = b64urlJson<Claims>(parts[1]);
    const now = Math.floor(Date.now() / 1000);
    const auds = Array.isArray(c.aud) ? c.aud : [c.aud];
    if (!auds.includes(aud) || c.iss !== `https://${team}` || c.exp < now || (c.nbf && c.nbf > now + 60)) return null;

    const email = c.email?.toLowerCase();
    const allowed = ((await getSecret("ADMIN_EMAILS")) ?? "lmikulic@tavlahr.com,aspajic@tavlahr.com")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    return email && allowed.includes(email) ? email : null;
  } catch {
    return null;
  }
}
