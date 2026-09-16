import type { BlogPostRow } from "@/lib/types";
import { BlogCard } from "@/components/blog/BlogCard";

export function BlogList({ posts }: { posts: BlogPostRow[] }) {
  if (posts.length === 0) {
    return (
      <div className="ornate-frame section-plaque py-9 text-center text-sm text-text-secondary">
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
