import type { Metadata } from "next";
import { BlogList } from "@/components/blog/BlogList";
import { getPublishedPosts } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Metin2 PvP dünyasından haberler, server rehberleri ve PVPGündem duyuruları.",
};

export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">Blog</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Metin2 PvP gündemi, server rehberleri ve duyurular.
      </p>
      <div className="mt-6">
        <BlogList posts={posts} />
      </div>
    </div>
  );
}
