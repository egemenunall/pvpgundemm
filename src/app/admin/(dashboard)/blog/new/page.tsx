import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogForm } from "@/components/admin/BlogForm";
import { createPostAction } from "@/app/admin/(dashboard)/blog/actions";

export default function NewBlogPostPage() {
  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/blog"
        className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Blog yazılarına dön
      </Link>
      <h1 className="mt-3 text-xl font-semibold text-text-primary">Yeni Blog Yazısı</h1>

      <div className="mt-6">
        <BlogForm action={createPostAction} />
      </div>
    </div>
  );
}
