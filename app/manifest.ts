import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "K9 Mart",
    short_name: "K9 Mart",
    description: "Mobile-first e-commerce demo built with Next.js, Supabase, and Zustand.",
    start_url: "/welcome",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#6c757d",
    theme_color: "#6c757d",
    lang: "id",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
