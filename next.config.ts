import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Varsayılan 1MB, animasyonlu GIF reklamlar için yetersiz.
      // 4.5MB Vercel'in serverless istek gövdesi tavanı — daha yükseği
      // platform tarafında reddedilir, uygulamaya ulaşmaz.
      bodySizeLimit: "4.5mb",
    },
  },
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
