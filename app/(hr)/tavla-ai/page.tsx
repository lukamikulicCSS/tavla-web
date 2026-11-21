import type { Metadata } from "next";
import { getDict } from "@/content";
import { pageMetadata } from "@/lib/i18n/metadata";
import { AiOverviewPage } from "@/components/pages/AiOverviewPage";

const o = getDict("hr").ai.overview;
export const metadata: Metadata = pageMetadata({ route: "ai", locale: "hr", title: o.metaTitle, description: o.metaDescription, absoluteTitle: true });

export default function Page() {
  return <AiOverviewPage locale="hr" />;
}
