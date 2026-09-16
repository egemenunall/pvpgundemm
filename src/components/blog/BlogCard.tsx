import Link from "next/link";
import Image from "next/image";
import { FileText } from "lucide-react";
import type { BlogPostRow } from "@/lib/types";
import { formatDateTR, truncate } from "@/lib/utils";

export function BlogCard({ post }: { post: BlogPostRow }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-md border border-border bg-surface transition-all hover:border-border-strong hover:shadow-[0_0_0_1px_rgb(201_162_39/0.25),0_4px_20px_-4px_rgb(0_0_0/0.6)]"
    >
      <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden border-b border-border bg-background">
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <FileText className="h-6 w-6 text-text-muted" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs text-text-muted">
          {post.published_at ? formatDateTR(post.published_at) : formatDateTR(post.created_at)}
        </span>
        <h3 className="text-[15px] font-semibold text-text-primary group-hover:text-accent">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-text-secondary">{truncate(post.excerpt, 120)}</p>
        )}
      </div>
    </Link>
  );
}
