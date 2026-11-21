import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// `next dev` dobiva Cloudflare bindinge (D1 "DB") iz wrangler.jsonc — lokalna baza u .wrangler/
initOpenNextCloudflareForDev();

const isDev = process.env.NODE_ENV !== "production";

/**
 * Vanjski izvori dopušteni u CSP-u. Dodaju se SAMO ako je pripadna
 * varijabla okruženja postavljena — inače stranica ne učitava ništa izvana.
 */
function originOf(url?: string) {
  if (!url) return "";
  try {
    return new URL(url).origin;
  } catch {
    return "";
  }
}

const analyticsOrigin = originOf(process.env.NEXT_PUBLIC_ANALYTICS_SRC);
const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
const turnstile = turnstileEnabled ? "https://challenges.cloudflare.com" : "";

/**
 * Cloudflare Web Analytics (bez kolačića, ne treba pristanak). Cloudflare beacon sam umeće
 * u HTML kad je analitika uključena u dashboardu, pa ga CSP mora dopustiti.
 */
const cfBeaconScript = "https://static.cloudflareinsights.com";
const cfBeaconConnect = "https://cloudflareinsights.com";

const csp = [
  `default-src 'self'`,
  // 'unsafe-inline' je potreban za Next.js inline skripte kod statičkog renderiranja
  // (nonce bi forsirao dinamičko renderiranje svake stranice). Nema eval-a u produkciji.
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""} ${analyticsOrigin} ${turnstile} ${cfBeaconScript}`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob:`,
  `font-src 'self'`,
  `connect-src 'self' ${analyticsOrigin} ${turnstile} ${cfBeaconConnect} ${isDev ? "ws:" : ""}`,
  `frame-src ${turnstile || "'none'"}`,
  `frame-ancestors 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `object-src 'none'`,
  isDev ? "" : "upgrade-insecure-requests",
]
  .map((d) => d.replace(/\s+/g, " ").trim())
  .filter(Boolean)
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [384],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
