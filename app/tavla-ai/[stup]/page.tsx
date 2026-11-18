import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pillarBySlug, pillars } from "@/content/ai";
import { PillarPage } from "@/components/ai/PillarPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return pillars.map((p) => ({ stup: p.slug }));
}

type Props = { params: Promise<{ stup: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = pillarBySlug((await params).stup);
  if (!p) return {};
  const path = `/tavla-ai/${p.slug}`;
  return {
    title: { absolute: p.metaTitle },
    description: p.metaDescription,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title: p.metaTitle, description: p.metaDescription, siteName: "Tavla", locale: "hr_HR" },
    twitter: { card: "summary_large_image", title: p.metaTitle, description: p.metaDescription },
  };
}

export default async function Page({ params }: Props) {
  const p = pillarBySlug((await params).stup);
  if (!p) notFound();
  return <PillarPage pillar={p} />;
}
