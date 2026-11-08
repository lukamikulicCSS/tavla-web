import type { ReactNode } from "react";

/** Tablet okvir za prikaz osoblja. Unutra je @container pa se raspored prilagođava širini. */
export function TabletFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[2rem] bg-[#1c1c1f] p-2.5 shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_40px_80px_-30px_rgb(0_0_0/0.8)] sm:rounded-[2.4rem] sm:p-3.5 ${className}`}
    >
      <div className="@container relative h-full overflow-hidden rounded-[1.4rem] bg-graphite text-white sm:rounded-[1.6rem]">{children}</div>
    </div>
  );
}

/** Prozor preglednika za administraciju vlasnika. */
export function BrowserFrame({ children, className = "", url = "app.tavla.hr/admin" }: { children: ReactNode; className?: string; url?: string }) {
  return (
    <div className={`overflow-hidden rounded-[1.25rem] bg-white text-ink shadow-[0_0_0_1px_rgb(11_11_13/0.06),0_40px_90px_-40px_rgb(11_11_13/0.45)] ${className}`}>
      <div className="flex h-10 items-center gap-3 border-b border-line-light bg-[#fafafa] px-4">
        <span aria-hidden className="flex gap-1.5">
          <i className="size-2.5 rounded-full bg-ink/15" />
          <i className="size-2.5 rounded-full bg-ink/15" />
          <i className="size-2.5 rounded-full bg-ink/15" />
        </span>
        <span className="mx-auto max-w-[60%] truncate rounded-md bg-ink/[0.04] px-3 py-1 text-[0.6875rem] text-slate">{url}</span>
        <span className="w-[42px]" aria-hidden />
      </div>
      <div className="@container">{children}</div>
    </div>
  );
}
