import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getPostBySlug, getAllPublishedPostSlugs } from "@/lib/data/blog";
import { formatDateTR } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Yazı bulunamadı" };

  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt || undefined;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
      publishedTime: post.published_at ?? undefined,
    },
  };
}

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllPublishedPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const html = await marked.parse(post.content);

  return (
    <article className="mx-auto max-w-[800px] px-4 py-6 sm:px-6 sm:py-8">
      <Link href="/blog" className="text-sm text-accent hover:underline">
        ← Blog&apos;a dön
      </Link>

      <h1 className="mt-4 text-2xl font-semibold text-text-primary sm:text-3xl">{post.title}</h1>
      <p className="mt-2 text-sm text-text-muted">
        {formatDateTR(post.published_at ?? post.created_at)}
      </p>

      {post.cover_image_url && (
        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-md border border-border">
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            sizes="800px"
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      <div className="prose-pvp mt-8" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
