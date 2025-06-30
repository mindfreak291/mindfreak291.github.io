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
  
  // Base path for GitHub Pages (replace 'sahil-portfolio' with your actual repo name)
  basePath: process.env.NODE_ENV === 'production' ? '/sahil-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/sahil-portfolio/' : '',
  
  // Disable server-side features for static export
  distDir: 'out',
  
  // ESLint configuration for static export
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  
  // TypeScript configuration
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  }
};

export default nextConfig;