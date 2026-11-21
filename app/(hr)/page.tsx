import type { Metadata } from "next";
import { getDict } from "@/content";
import { pageMetadata } from "@/lib/i18n/metadata";
import { HomePage } from "@/components/pages/HomePage";

const t = getDict("hr").ui.meta;
export const metadata: Metadata = pageMetadata({ route: "home", locale: "hr", title: t.title, description: t.description, absoluteTitle: true });

export default function Page() {
  return <HomePage locale="hr" />;
}
