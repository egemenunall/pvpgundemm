"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PostFormState } from "@/app/admin/(dashboard)/blog/actions";
import type { BlogPostRow } from "@/lib/types";

export function BlogForm({
  action,
  post,
}: {
  action: (prev: PostFormState, formData: FormData) => Promise<PostFormState>;
  post?: BlogPostRow;
}) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="title">Başlık *</Label>
        <Input id="title" name="title" required defaultValue={post?.title} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="slug">Slug (boş bırakılırsa başlıktan üretilir)</Label>
        <Input id="slug" name="slug" defaultValue={post?.slug} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="excerpt">Kısa Açıklama</Label>
        <Textarea id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt ?? ""} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cover_image">Kapak Görseli {post?.cover_image_url && "(değiştirmek için yeni dosya seçin)"}</Label>
        {post?.cover_image_url && (
          <Image
            src={post.cover_image_url}
            alt={post.title}
            width={120}
            height={68}
            className="rounded-md border border-border object-cover"
            unoptimized
          />
        )}
        <Input id="cover_image" name="cover_image" type="file" accept="image/*" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="content">İçerik * (Markdown desteklenir)</Label>
        <Textarea id="content" name="content" rows={14} required defaultValue={post?.content} className="font-mono text-[13px]" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="seo_title">SEO Başlık</Label>
          <Input id="seo_title" name="seo_title" defaultValue={post?.seo_title ?? ""} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="seo_description">SEO Açıklama</Label>
          <Input id="seo_description" name="seo_description" defaultValue={post?.seo_description ?? ""} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="status">Durum</Label>
        <Select name="status" defaultValue={post?.status ?? "draft"}>
          <SelectTrigger id="status" className="max-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Taslak</SelectItem>
            <SelectItem value="published">Yayınlandı</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {state.error && (
        <p className="rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
          {state.error}
        </p>
      )}

      <div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Kaydediliyor..." : post ? "Değişiklikleri Kaydet" : "Yazıyı Oluştur"}
        </Button>
      </div>
    </form>
  );
}
