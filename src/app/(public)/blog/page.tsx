import type { Metadata } from "next";
import { BlogList } from "@/components/blog/BlogList";
import { SectionHeading } from "@/components/layout/SectionHeading";
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
      <SectionHeading
        level="h1"
        title="PvP Gündem"
        description="Server haberleri, rehberler ve meydandan duyurular."
      />
      <div className="mt-4">
        <BlogList posts={posts} />
      </div>
    </div>
  );
}
