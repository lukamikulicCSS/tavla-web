import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, pillarBySlug } from "@/content";
import { pillarRoute, pillarSegment, pillarSlugFromSegment } from "@/content/routes";
import { pageMetadata } from "@/lib/i18n/metadata";
import { PillarPage } from "@/components/ai/PillarPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDict("en").ai.pillars.map((p) => ({ pillar: pillarSegment(p.slug, "en") }));
}

type Props = { params: Promise<{ pillar: string }> };

const find = async (params: Props["params"]) => {
  const slug = pillarSlugFromSegment((await params).pillar, "en");
  return slug ? pillarBySlug("en", slug) : undefined;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await find(params);
  if (!p) return {};
  return pageMetadata({ route: pillarRoute(p.slug), locale: "en", title: p.metaTitle, description: p.metaDescription, absoluteTitle: true });
}

export default async function Page({ params }: Props) {
  const p = await find(params);
  if (!p) notFound();
  return <PillarPage pillar={p} locale="en" />;
}
