import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nine store",
    short_name: "Nine store",
    description: "E-commerce app for Nine store",
    start_url: "/welcome",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#6E0D15",
    theme_color: "#6E0D15",
    lang: "id",
    icons: [
      {
        src: "/logo-nine.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo-nine.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/logo-nine.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
