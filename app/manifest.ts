import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tavla",
    short_name: "Tavla",
    description: "Digitalni meni i QR naručivanje za ugostiteljstvo",
    start_url: "/",
    display: "browser",
    background_color: "#0B0B0D",
    theme_color: "#0B0B0D",
    icons: [
      { src: "/brand/tavla-icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/tavla-icon-1024.png", sizes: "1024x1024", type: "image/png" },
    ],
  };
}
