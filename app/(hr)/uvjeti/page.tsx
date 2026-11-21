import type { Metadata } from "next";
import { LegalRoute, legalMetadata } from "@/components/pages/LegalRoute";

export const metadata: Metadata = legalMetadata("terms", "hr");

export default function Page() {
  return <LegalRoute which="terms" locale="hr" />;
}
