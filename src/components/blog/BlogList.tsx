import type { BlogPostRow } from "@/lib/types";
import { BlogCard } from "@/components/blog/BlogCard";

export function BlogList({ posts }: { posts: BlogPostRow[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-[#4a121a] bg-[#130b10] py-9 text-center text-sm text-[#d4b4b8]">
        Meydandan henüz haber yok; ilk duyuru yolda.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
