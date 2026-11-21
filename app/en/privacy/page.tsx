import type { Metadata } from "next";
import { LegalRoute, legalMetadata } from "@/components/pages/LegalRoute";

export const metadata: Metadata = legalMetadata("privacy", "en");

export default function Page() {
  return <LegalRoute which="privacy" locale="en" />;
}
