import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  reactStrictMode: false, 
  images: {
    unoptimized: true, 
  },
  experimental: {
    optimizePackageImports: ["react-markdown"]
  }
};

export default nextConfig;