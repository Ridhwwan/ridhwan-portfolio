import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The new case study layout was drafted at /work/sos-express-v2; it's now /work/sos-express.
  async redirects() {
    return [
      { source: "/work/sos-express-v2", destination: "/work/sos-express", permanent: true },
      { source: "/work/warehouse", destination: "/work/alveum", permanent: true },
      { source: "/work/ai-query", destination: "/work/native-file-search-ai", permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/store-map",
        destination: "https://store-map-pwa.vercel.app/store-map/",
      },
      {
        source: "/store-map/:path*",
        destination: "https://store-map-pwa.vercel.app/store-map/:path*",
      },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "globals.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
