import type { Metadata, Viewport } from "next";
import { RootShell, rootMetadata, rootViewport } from "@/components/layout/RootShell";

/** Root layout hrvatske verzije (korijen stranice). <html lang="hr"> */
export const metadata: Metadata = rootMetadata("hr");
export const viewport: Viewport = rootViewport;

export default function HrRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="hr">{children}</RootShell>;
}
