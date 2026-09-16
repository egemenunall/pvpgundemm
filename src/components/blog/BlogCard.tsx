import Link from "next/link";
import Image from "next/image";
import { FileText } from "lucide-react";
import type { BlogPostRow } from "@/lib/types";
import { formatDateTR, truncate } from "@/lib/utils";

export function BlogCard({ post }: { post: BlogPostRow }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#4a121a] bg-[#130b10] shadow-lg transition-all hover:border-[#d49a36]/60"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-[#200a12]">
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
          <div className="flex h-full w-full items-center justify-center">
            <FileText className="h-8 w-8 text-[#d49a36]/70" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-sm font-semibold text-[#f59e0b]">
          {post.published_at ? formatDateTR(post.published_at) : formatDateTR(post.created_at)}
        </span>
        <h3 className="text-lg font-bold text-[#f8fafc] group-hover:text-[#d49a36]">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-[#d4b4b8]">{truncate(post.excerpt, 120)}</p>
        )}
      </div>
    </Link>
  );
}
