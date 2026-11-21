"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { emit } from "@/lib/analytics/emit";
import { href } from "@/content/routes";
import { useDict, useLocale } from "@/components/i18n/LocaleProvider";

type State = "working" | "ok" | "invalid" | "error";

/** Automatski potvrđuje prijavu (POST) čim se stranica otvori u pregledniku. */
export function ConfirmNewsletter({ token }: { token: string }) {
  const [state, setState] = useState<State>(token ? "working" : "invalid");
  const locale = useLocale();
  const t = useDict().ui.newsletterConfirm;

  useEffect(() => {
    if (!token) return;
    let off = false;
    fetch("/api/newsletter/potvrda", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token }) })
      .then(async (r) => {
        const d = (await r.json().catch(() => ({}))) as { ok?: boolean };
        if (off) return;
        if (r.ok && d.ok) {
          setState("ok");
          emit("newsletter_signup", { label: "confirmed" });
        } else setState(r.status === 503 ? "error" : "invalid");
      })
      .catch(() => !off && setState("error"));
    return () => {
      off = true;
    };
  }, [token]);

  return (
    <div role="status" aria-live="polite" className="glass mx-auto max-w-lg rounded-[2rem] p-8 text-center sm:p-12">
      {state === "working" && (
        <>
          <Loader2 className="mx-auto size-8 animate-spin text-soft" aria-hidden />
          <h1 className="mt-6 text-h3 font-semibold">{t.working}</h1>
        </>
      )}
      {state === "ok" && (
        <>
          <CheckCircle2 className="mx-auto size-10" strokeWidth={1.4} aria-hidden />
          <h1 className="mt-6 text-h3 font-semibold">{t.okTitle}</h1>
          <p className="mt-3 text-soft">{t.okText}</p>
          <ButtonLink href={href("ai", locale)} variant="secondary" className="mt-8">{t.okCta}</ButtonLink>
        </>
      )}
      {state === "invalid" && (
        <>
          <h1 className="text-h3 font-semibold">{t.invalidTitle}</h1>
          <p className="mt-3 text-soft">{t.invalidText}</p>
          <ButtonLink href={href("home", locale, "newsletter")} variant="secondary" className="mt-8">{t.invalidCta}</ButtonLink>
        </>
      )}
      {state === "error" && (
        <>
          <h1 className="text-h3 font-semibold">{t.errorTitle}</h1>
          <p className="mt-3 text-soft">{t.errorText}</p>
        </>
      )}
    </div>
  );
}
