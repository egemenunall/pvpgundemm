import type { MetadataRoute } from "next";
import { createPublicClient } from "@/lib/supabase/public";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pvpgundem.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createPublicClient();

  const [{ data: servers }, { data: posts }] = await Promise.all([
    supabase.from("servers").select("slug, updated_at").eq("is_active", true),
    supabase.from("blog_posts").select("slug, updated_at").eq("status", "published"),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "hourly", priority: 1 },
    { url: `${siteUrl}/serverlar`, changeFrequency: "hourly", priority: 0.9 },
    { url: `${siteUrl}/blog`, changeFrequency: "daily", priority: 0.6 },
    { url: `${siteUrl}/iletisim`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const serverRoutes: MetadataRoute.Sitemap = (servers ?? []).map((s) => ({
    url: `${siteUrl}/server/${s.slug}`,
    lastModified: s.updated_at,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = (posts ?? []).map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: p.updated_at,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...serverRoutes, ...blogRoutes];
}
