import type { Metadata } from "next";
import { getDict } from "@/content";
import { pageMetadata } from "@/lib/i18n/metadata";
import { NewsletterUnsubscribe } from "@/components/pages/NewsletterPages";

export const metadata: Metadata = pageMetadata({ route: "newsletterUnsubscribe", locale: "hr", title: getDict("hr").ui.newsletterUnsubscribe.metaTitle, noindex: true });

export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <NewsletterUnsubscribe locale="hr" searchParams={searchParams} />;
}
