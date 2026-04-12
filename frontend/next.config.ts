import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "127.0.0.1"],
  },
  // Transpile leaflet for SSR compatibility
  transpilePackages: ["react-leaflet", "leaflet"],
};

export default nextConfig;
