import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Default is 1MB; our own upload validation (lib/storage.ts) allows
  // images up to 5MB, so this needs headroom above that plus the rest of
  // each form's text fields and multipart overhead.
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/media/**",
      },
    ],
  },
};

export default nextConfig;
