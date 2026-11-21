import type { Metadata } from "next";
import { LegalRoute, legalMetadata } from "@/components/pages/LegalRoute";

export const metadata: Metadata = legalMetadata("cookies", "en");

export default function Page() {
  return <LegalRoute which="cookies" locale="en" />;
}
