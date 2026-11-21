import type { Metadata } from "next";
import { getDict } from "@/content";
import { pageMetadata } from "@/lib/i18n/metadata";
import { AiOverviewPage } from "@/components/pages/AiOverviewPage";

const o = getDict("en").ai.overview;
export const metadata: Metadata = pageMetadata({ route: "ai", locale: "en", title: o.metaTitle, description: o.metaDescription, absoluteTitle: true });

export default function Page() {
  return <AiOverviewPage locale="en" />;
}
