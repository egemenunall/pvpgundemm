import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BlogForm } from "@/components/admin/BlogForm";
import { updatePostAction } from "@/app/admin/(dashboard)/blog/actions";
import { adminGetPostById } from "@/lib/data/blog";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await adminGetPostById(id);
  if (!post) notFound();

  const boundAction = updatePostAction.bind(null, id);

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/blog"
        className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Blog yazılarına dön
      </Link>
      <h1 className="mt-3 text-xl font-semibold text-text-primary">{post.title} — Düzenle</h1>

      <div className="mt-6">
        <BlogForm action={boundAction} post={post} />
      </div>
    </div>
  );
}
