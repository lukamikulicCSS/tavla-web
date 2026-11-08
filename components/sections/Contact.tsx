"use client";

import Link from "next/link";
import Script from "next/script";
import { AnimatePresence, m } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { contactSchema, venueTypes } from "@/lib/contact-schema";
import { Button } from "@/components/ui/Button";

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, o: Record<string, unknown>) => string; reset: (id?: string) => void };
  }
}

export function Contact() {
  return (
    <section id="kontakt" aria-labelledby="kontakt-naslov" className="relative isolate overflow-hidden bg-ink py-24 sm:py-32">
      <div aria-hidden className="stage-light absolute inset-x-0 top-0 -z-10 h-[60%]" />
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div className="max-w-xl lg:pt-4">
          <h2 id="kontakt-naslov" className="text-h2 font-semibold">Spremni za drukčiju smjenu?</h2>
          <p className="mt-6 text-lead text-soft">
            Pokazat ćemo vam kako Tavla može pojednostaviti svakodnevni rad i stvoriti bolje iskustvo za vaše goste.
          </p>
          <ul className="mt-10 space-y-3 text-[0.9375rem] text-white/80">
            <li>Kratka demonstracija uživo ili online</li>
            <li>Postavljamo vaš meni i stolove zajedno s vama</li>
            <li>Ponuda prema veličini i vrsti objekta</li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const tsRef = useRef<HTMLDivElement>(null);
  const tsId = useRef<string | undefined>(undefined);
  const tsToken = useRef<string | undefined>(undefined);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const renderTurnstile = () => {
    if (!TURNSTILE_KEY || !tsRef.current || !window.turnstile || tsId.current) return;
    tsId.current = window.turnstile.render(tsRef.current, {
      sitekey: TURNSTILE_KEY,
      theme: "dark",
      language: "hr",
      callback: (t: string) => (tsToken.current = t),
      "expired-callback": () => (tsToken.current = undefined),
    });
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      business: String(fd.get("business") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      venueType: String(fd.get("venueType") ?? ""),
      message: String(fd.get("message") ?? ""),
      privacy: fd.get("privacy") === "on",
      website: String(fd.get("website") ?? ""),
      startedAt: startedAt.current || Date.now(),
      turnstileToken: tsToken.current,
    };

    const check = contactSchema.safeParse(payload);
    if (!check.success) {
      const fe: Errors = {};
      for (const i of check.error.issues) {
        const k = String(i.path[0]);
        if (k !== "website" && !fe[k]) fe[k] = i.message;
      }
      setErrors(fe);
      setStatus("error");
      setMessage("Provjerite označena polja.");
      const first = Object.keys(fe)[0];
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: Errors };
      if (res.ok && data.ok) {
        setStatus("sent");
        formRef.current?.reset();
        return;
      }
      setErrors(data.fieldErrors ?? {});
      setStatus("error");
      setMessage(data.error ?? "Slanje nije uspjelo. Pokušajte ponovno.");
      if (tsId.current) window.turnstile?.reset(tsId.current);
    } catch {
      setStatus("error");
      setMessage("Nema veze s poslužiteljem. Provjerite internet i pošaljite ponovno.");
    }
  }

  const field = "mt-2 block w-full rounded-2xl bg-white/[0.06] px-4 py-3.5 text-base text-white placeholder:text-white/35 outline-none ring-1 ring-inset ring-white/10 transition-shadow focus:ring-2 focus:ring-white/60 aria-[invalid=true]:ring-red-400/80";

  return (
    <div className="glass rounded-[2rem] p-6 sm:p-9">
      {TURNSTILE_KEY && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="lazyOnload" onLoad={renderTurnstile} />
      )}
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <m.div key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center" role="status">
            <CheckCircle2 className="mx-auto size-10" strokeWidth={1.4} aria-hidden />
            <h3 className="mt-5 text-h3 font-semibold">Upit je poslan.</h3>
            <p className="mx-auto mt-3 max-w-sm text-soft">Javit ćemo vam se na upisanu e-mail adresu, najčešće unutar jednog radnog dana.</p>
            <button onClick={() => setStatus("idle")} className="mt-8 text-sm text-soft underline-offset-4 hover:text-white hover:underline">
              Pošalji novi upit
            </button>
          </m.div>
        ) : (
          <m.form key="form" ref={formRef} onSubmit={onSubmit} noValidate initial={false} exit={{ opacity: 0 }} aria-describedby="forma-poruka">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Ime i prezime" name="name" error={errors.name}>
                <input id="name" name="name" autoComplete="name" required maxLength={100} className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
              </Field>
              <Field label="Naziv objekta" name="business" error={errors.business}>
                <input id="business" name="business" autoComplete="organization" required maxLength={120} className={field} aria-invalid={!!errors.business} aria-describedby={errors.business ? "business-err" : undefined} />
              </Field>
              <Field label="E-mail" name="email" error={errors.email}>
                <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required maxLength={160} className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
              </Field>
              <Field label="Telefon" optional name="phone" error={errors.phone}>
                <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} className={field} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} />
              </Field>
              <Field label="Vrsta objekta" name="venueType" error={errors.venueType} className="sm:col-span-2">
                <select id="venueType" name="venueType" required defaultValue="" className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23a1a1aa%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10`} aria-invalid={!!errors.venueType} aria-describedby={errors.venueType ? "venueType-err" : undefined}>
                  <option value="" disabled>Odaberite</option>
                  {venueTypes.map((v) => (
                    <option key={v.value} value={v.value} className="bg-graphite">{v.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Poruka" name="message" error={errors.message} className="sm:col-span-2">
                <textarea id="message" name="message" rows={4} required maxLength={2000} placeholder="Npr. broj stolova, kada vam je najveća gužva, što biste htjeli riješiti" className={`${field} resize-y`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
              </Field>
            </div>

            {/* Honeypot — skriveno od ljudi i čitača zaslona */}
            <div aria-hidden className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
              <label htmlFor="website">Web stranica</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="mt-6">
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-white/75">
                <input
                  type="checkbox"
                  name="privacy"
                  required
                  className="mt-0.5 size-5 shrink-0 cursor-pointer accent-white"
                  aria-invalid={!!errors.privacy}
                  aria-describedby={errors.privacy ? "privacy-err" : undefined}
                />
                <span>
                  Podatke iz obrasca koristimo samo da bismo odgovorili na vaš upit. Pročitao/la sam{" "}
                  <Link href="/privatnost" className="text-white underline underline-offset-4">obavijest o privatnosti</Link>.
                </span>
              </label>
              {errors.privacy && <p id="privacy-err" className="mt-2 text-sm text-red-300">{errors.privacy}</p>}
            </div>

            {TURNSTILE_KEY && <div ref={tsRef} className="mt-6" />}

            <div className="mt-8 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p id="forma-poruka" role={status === "error" ? "alert" : undefined} className={`text-sm ${status === "error" ? "text-red-300" : "text-soft"}`}>
                {message || "Odgovaramo najčešće unutar jednog radnog dana."}
              </p>
              <Button type="submit" size="lg" disabled={status === "sending"} className="shrink-0">
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden /> Šaljem
                  </>
                ) : (
                  "Zatraži demonstraciju"
                )}
              </Button>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, name, error, optional, className = "", children }: { label: string; name: string; error?: string; optional?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-medium text-white/85">
        {label}
        {optional && <span className="font-normal text-soft"> (neobavezno)</span>}
      </label>
      {children}
      {error && <p id={`${name}-err`} className="mt-1.5 text-sm text-red-300">{error}</p>}
    </div>
  );
}
