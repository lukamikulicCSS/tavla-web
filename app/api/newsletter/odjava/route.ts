import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/lib/server/request";
import { unsubscribe, verifyUnsubscribe } from "@/lib/server/newsletter";
import { getDict } from "@/content";
import { href, isLocale } from "@/content/routes";

export const dynamic = "force-dynamic";

/**
 * Odjava jednim klikom (RFC 8058): e-mail klijent šalje POST s tijelom
 * "List-Unsubscribe=One-Click" na URL iz List-Unsubscribe headera.
 * Isti endpoint koristi i gumb na stranici /newsletter/odjava (i /en/newsletter/unsubscribe).
 * Jezik ("l") određuje samo jezik odgovora i stranicu potvrde.
 */
export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  let e = url.searchParams.get("e") ?? "";
  let t = url.searchParams.get("t") ?? "";
  let l = url.searchParams.get("l") ?? "";
  if (!e || !t) {
    const form = await req.formData().catch(() => null);
    e = String(form?.get("e") ?? "");
    t = String(form?.get("t") ?? "");
    l = String(form?.get("l") ?? l);
  }
  const locale = isLocale(l) ? l : "hr";
  const m = getDict(locale).messages.api;
  const text = { headers: { "Content-Type": "text/plain; charset=utf-8" } };
  const email = await verifyUnsubscribe(e, t);
  if (!email) return new NextResponse(m.unsubInvalid, { status: 400, ...text });

  try {
    await unsubscribe(await getDb(), email);
  } catch (err) {
    console.error("[newsletter] odjava", err instanceof Error ? err.message : err);
    return new NextResponse(m.unsubUnavailable, { status: 503, ...text });
  }

  // One-click iz mail klijenta očekuje 200; gumb na stranici vraćamo na potvrdu.
  const fromPage = req.headers.get("sec-fetch-dest") === "document";
  if (fromPage) return NextResponse.redirect(new URL(`${href("newsletterUnsubscribe", locale)}?gotovo=1`, url.origin), 303);
  return new NextResponse(m.unsubDone, { status: 200, ...text });
}
