import type { Metadata } from "next";
import { SimplePage } from "@/components/layout/SimplePage";
import { ConfirmNewsletter } from "@/components/newsletter/ConfirmNewsletter";

export const metadata: Metadata = {
  title: "Potvrda prijave",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default async function NewsletterConfirmPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const t = (await searchParams).token;
  const token = typeof t === "string" ? t.slice(0, 64) : "";
  return (
    <SimplePage>
      <ConfirmNewsletter token={token} />
    </SimplePage>
  );
}
