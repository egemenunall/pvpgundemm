import type { BlogPostRow } from "@/lib/types";
import { BlogCard } from "@/components/blog/BlogCard";

export function BlogList({ posts }: { posts: BlogPostRow[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border py-12 text-center text-sm text-text-secondary">
        Henüz blog yazısı yayınlanmadı.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
