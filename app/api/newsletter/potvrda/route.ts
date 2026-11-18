import type { NextRequest } from "next/server";
import { getDb, json, sameOrigin } from "@/lib/server/request";
import { confirm } from "@/lib/server/newsletter";

export const dynamic = "force-dynamic";

/**
 * Potvrda prijave. Namjerno POST (a ne GET na link iz maila), da sigurnosni skeneri
 * e-mail klijenata koji "otvaraju" linkove ne bi potvrdili prijavu umjesto čovjeka.
 */
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return json(403, { ok: false });
  const body = (await req.json().catch(() => ({}))) as { token?: unknown };
  const token = typeof body.token === "string" ? body.token : "";
  const db = await getDb();
  if (!db) return json(503, { ok: false });
  try {
    return json(200, { ok: await confirm(db, token) });
  } catch (err) {
    console.error("[newsletter] potvrda", err instanceof Error ? err.message : err);
    return json(503, { ok: false });
  }
}
