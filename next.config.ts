import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Settings recommended for deploying as a GitHub Pages project site
  basePath: "/Trabalho",
  assetPrefix: "/Trabalho/",
  trailingSlash: true,
  // Disable Next.js image optimization for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
