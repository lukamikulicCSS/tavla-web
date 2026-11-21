import type { Metadata } from "next";
import { getDict } from "@/content";
import { pageMetadata } from "@/lib/i18n/metadata";
import { NewsletterConfirm } from "@/components/pages/NewsletterPages";

export const metadata: Metadata = pageMetadata({ route: "newsletterConfirm", locale: "hr", title: getDict("hr").ui.newsletterConfirm.metaTitle, noindex: true });

export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <NewsletterConfirm locale="hr" searchParams={searchParams} />;
}
