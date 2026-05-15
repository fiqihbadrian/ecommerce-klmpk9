import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images and reduce bundle size
  images: {
    formats: ['image/webp'],
  },
  // Enable React strict mode for better performance warnings
  reactStrictMode: true,
};

export default nextConfig;
