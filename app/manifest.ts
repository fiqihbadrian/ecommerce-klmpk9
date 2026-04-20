import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KLMPK9 Mart",
    short_name: "KLMPK9 Mart",
    description: "E-commerce app for KLMPK9 Mart",
    start_url: "/welcome",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#6c757d",
    theme_color: "#6c757d",
    lang: "id",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
