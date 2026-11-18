import { NextResponse, type NextRequest } from "next/server";
import { createHash } from "node:crypto";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const json = (status: number, body: Record<string, unknown>, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function clientIp(req: NextRequest) {
  const cf = req.headers.get("cf-connecting-ip");
  const fwd = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return cf || fwd || req.headers.get("x-real-ip") || "unknown";
}

/** IP se nikad ne sprema — samo kratki jednosmjerni hash kao ključ za rate limit u memoriji/Redisu. */
export const ipKey = (req: NextRequest) => createHash("sha256").update(clientIp(req)).digest("hex").slice(0, 32);

/** CSRF zaštita: zahtjev mora doći s iste domene (Origin == Host). */
export function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** D1 baza ili null (npr. `next dev` bez bindinga). */
export async function getDb(): Promise<D1Database | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env.DB ?? null;
  } catch {
    return null;
  }
}

/** Varijabla okruženja / Secret s Cloudflarea (u `next dev` iz .env.local). */
export async function getSecret(name: string): Promise<string | undefined> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const v = (env as unknown as Record<string, unknown>)[name];
    if (typeof v === "string" && v) return v;
  } catch {
    /* nismo na Workersu */
  }
  return process.env[name] || undefined;
}

export const isoDay = (ts: number) => new Date(ts).toISOString().slice(0, 10);

/** Grubo razvrstavanje izvora prometa (za upite i ploču). */
export function classifySource(ref?: string, utmSource?: string): string {
  const s = (utmSource || ref || "").toLowerCase();
  if (!s) return "direktno";
  if (/google|bing|duckduckgo|yahoo|ecosia/.test(s)) return "pretrazivac";
  if (/linkedin|lnkd/.test(s)) return "linkedin";
  if (/instagram/.test(s)) return "instagram";
  if (/facebook|fb\.|^fb$/.test(s)) return "facebook";
  if (/chatgpt|openai|perplexity|claude|gemini|copilot/.test(s)) return "ai-asistent";
  return "ostalo";
}
