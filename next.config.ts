import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images — auto-optimize, lazy-load, responsive sizes
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [320, 640, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64],
  },

  // Speed up production builds
  experimental: {
    optimizePackageImports: ["@react-three/fiber", "@react-three/drei", "three", "framer-motion"],
  },

  // Disable unnecessary React features for static content
  reactStrictMode: true,
};

export default nextConfig;
