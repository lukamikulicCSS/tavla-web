import type { Metadata } from "next";
import { getDict } from "@/content";
import { NotFoundPage } from "@/components/pages/NotFoundPage";

export const metadata: Metadata = { title: getDict("en").ui.notFound.metaTitle, robots: { index: false } };

export default function NotFound() {
  return <NotFoundPage locale="en" />;
}
