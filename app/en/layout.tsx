import type { Metadata, Viewport } from "next";
import { RootShell, rootMetadata, rootViewport } from "@/components/layout/RootShell";

/** Root layout of the English version (/en). <html lang="en"> */
export const metadata: Metadata = rootMetadata("en");
export const viewport: Viewport = rootViewport;

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
