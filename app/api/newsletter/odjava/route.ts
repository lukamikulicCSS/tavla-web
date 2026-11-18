import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/lib/server/request";
import { unsubscribe, verifyUnsubscribe } from "@/lib/server/newsletter";

export const dynamic = "force-dynamic";

/**
 * Odjava jednim klikom (RFC 8058): e-mail klijent šalje POST s tijelom
 * "List-Unsubscribe=One-Click" na URL iz List-Unsubscribe headera.
 * Isti endpoint koristi i gumb na stranici /newsletter/odjava.
 */
export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  let e = url.searchParams.get("e") ?? "";
  let t = url.searchParams.get("t") ?? "";
  if (!e || !t) {
    const form = await req.formData().catch(() => null);
    e = String(form?.get("e") ?? "");
    t = String(form?.get("t") ?? "");
  }
  const email = await verifyUnsubscribe(e, t);
  if (!email) return new NextResponse("Neispravan link za odjavu.", { status: 400 });

  try {
    await unsubscribe(await getDb(), email);
  } catch (err) {
    console.error("[newsletter] odjava", err instanceof Error ? err.message : err);
    return new NextResponse("Odjava trenutno nije moguća.", { status: 503 });
  }

  // One-click iz mail klijenta očekuje 200; gumb na stranici vraćamo na potvrdu.
  const fromPage = req.headers.get("sec-fetch-dest") === "document";
  if (fromPage) return NextResponse.redirect(new URL("/newsletter/odjava?gotovo=1", url.origin), 303);
  return new NextResponse("Odjavljeni ste.", { status: 200 });
}
