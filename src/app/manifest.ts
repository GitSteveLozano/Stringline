import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stringline",
    short_name: "Stringline",
    description: "Run the day. Construction operations for exterior cladding subcontractors.",
    start_url: "/owner",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F4EFE6",
    theme_color: "#FFD400",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-maskable.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
