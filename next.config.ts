import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images and reduce bundle size
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Enable React strict mode for better performance warnings
  reactStrictMode: true,
  // Output static HTML for Capacitor (Android app)
  output: 'export',
};

export default nextConfig;
