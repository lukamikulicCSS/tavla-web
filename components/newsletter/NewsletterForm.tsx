"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { emit } from "@/lib/analytics/emit";
import { newsletterSchema } from "@/lib/newsletter-schema";

type Status = "idle" | "sending" | "done" | "error";

/**
 * Prijava na novosti (double opt-in). Ista forma u podnožju i na stranicama Tavla AI.
 * source: "footer" | "kontakt" | "stup:<slug>", interest: npr. "ai-tips"
 */
export function NewsletterForm({ source, interest, compact = false }: { source: string; interest?: string; compact?: boolean }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");
  const startedAt = useRef(0);
  const started = useRef(false);
  const formId = `newsletter-${source.replace(":", "-")}`;

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.currentTarget);
    const payload = { email: String(fd.get("email") ?? ""), source, interest, website: String(fd.get("website") ?? ""), startedAt: startedAt.current || Date.now() };
    const check = newsletterSchema.safeParse(payload);
    if (!check.success) {
      setStatus("error");
      setMsg("Upišite ispravnu e-mail adresu.");
      emit("form_error", { label: formId, target: "email" });
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; error?: string };
      if (res.ok && data.ok) {
        setStatus("done");
        setMsg(data.message ?? "Provjerite inbox i potvrdite prijavu.");
        emit("form_submit", { label: formId });
        emit("newsletter_signup", { label: `${source}:pending` });
      } else {
        setStatus("error");
        setMsg(data.error ?? "Prijava nije uspjela. Pokušajte ponovno.");
        emit("form_error", { label: formId, target: res.status === 422 ? "email" : `http-${res.status}` });
      }
    } catch {
      setStatus("error");
      setMsg("Nema veze s poslužiteljem. Pokušajte ponovno.");
    }
  }

  if (status === "done") {
    return (
      <p role="status" className="rounded-2xl bg-white/[0.06] px-4 py-3.5 text-[0.9375rem] text-white">
        {msg}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={`${id}-msg`} data-form={formId}>
      <div className={`flex gap-2 ${compact ? "flex-col sm:flex-row" : "flex-col sm:flex-row"}`}>
        <label htmlFor={`${id}-email`} className="sr-only">E-mail adresa</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={160}
          placeholder="vas@objekt.hr"
          onFocus={() => {
            if (!started.current) {
              started.current = true;
              emit("form_start", { label: formId });
            }
          }}
          aria-invalid={status === "error"}
          className="h-12 min-w-0 flex-1 rounded-full bg-white/[0.06] px-5 text-base text-white outline-none ring-1 ring-inset ring-white/10 transition-shadow placeholder:text-white/35 focus:ring-2 focus:ring-[#2f6bff]"
        />
        <button
          type="submit"
          data-track={`newsletter-${source.replace(":", "-")}`}
          disabled={status === "sending"}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-white/90 disabled:opacity-60"
        >
          {status === "sending" && <Loader2 className="size-4 animate-spin" aria-hidden />}
          Prijavi se
        </button>
      </div>
      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${id}-web`}>Web stranica</label>
        <input id={`${id}-web`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p id={`${id}-msg`} role={status === "error" ? "alert" : undefined} className={`mt-3 text-[0.8125rem] leading-relaxed ${status === "error" ? "text-red-300" : "text-soft"}`}>
        {status === "error" ? (
          msg
        ) : (
          <>
            Najviše jedan mail mjesečno. Odjava jednim klikom.{" "}
            <Link href="/privatnost#newsletter" className="underline underline-offset-4 hover:text-white">Privatnost</Link>
          </>
        )}
      </p>
    </form>
  );
}
