import type { Metadata } from "next";
import { LegalRoute, legalMetadata } from "@/components/pages/LegalRoute";

export const metadata: Metadata = legalMetadata("privacy", "hr");

export default function Page() {
  return <LegalRoute which="privacy" locale="hr" />;
}
