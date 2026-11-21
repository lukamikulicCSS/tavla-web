import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, pillarBySlug } from "@/content";
import { pillarRoute, pillarSegment, pillarSlugFromSegment } from "@/content/routes";
import { pageMetadata } from "@/lib/i18n/metadata";
import { PillarPage } from "@/components/ai/PillarPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDict("hr").ai.pillars.map((p) => ({ stup: pillarSegment(p.slug, "hr") }));
}

type Props = { params: Promise<{ stup: string }> };

const find = async (params: Props["params"]) => {
  const slug = pillarSlugFromSegment((await params).stup, "hr");
  return slug ? pillarBySlug("hr", slug) : undefined;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await find(params);
  if (!p) return {};
  return pageMetadata({ route: pillarRoute(p.slug), locale: "hr", title: p.metaTitle, description: p.metaDescription, absoluteTitle: true });
}

export default async function Page({ params }: Props) {
  const p = await find(params);
  if (!p) notFound();
  return <PillarPage pillar={p} locale="hr" />;
}
