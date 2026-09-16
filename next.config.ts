import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Supabase Storage (server-logos, advertisements, blog-images bucketları)
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
      // Geliştirme/demo için placeholder görseller (supabase/seed.sql)
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;
