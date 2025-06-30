import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  
  // GitHub Pages configuration
  output: 'export',
  trailingSlash: true,
  
  // Image optimization disabled for static export
  images: {
    unoptimized: true
  },
  
  // Remove experimental config that might interfere
  
  // ESLint configuration for static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;