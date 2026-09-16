"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth/require-admin";
import { slugify, validateUploadSize } from "@/lib/utils";

const postSchema = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z.string().trim().max(220).optional().or(z.literal("")),
  excerpt: z.string().trim().max(300).optional().or(z.literal("")),
  content: z.string().trim().min(10, "İçerik en az 10 karakter olmalı"),
  seo_title: z.string().trim().max(200).optional().or(z.literal("")),
  seo_description: z.string().trim().max(300).optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
});

export interface PostFormState {
  error?: string;
}

/** Dosya yoksa boş sonuç, boyut aşımı veya yükleme hatasında `error` döner. */
async function uploadCoverIfProvided(
  formData: FormData,
  slug: string
): Promise<{ url?: string; error?: string }> {
  const file = formData.get("cover_image") as File | null;
  if (!file || file.size === 0) return {};

  const sizeError = validateUploadSize(file);
  if (sizeError) return { error: sizeError };

  const admin = createAdminClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${slug}-${Date.now()}.${ext}`;

  const { error } = await admin.storage.from("blog-images").upload(path, file, {
    contentType: file.type,
    upsert: true,
  });
  if (error) {
    console.error("uploadCoverIfProvided", error);
    return { error: "Kapak görseli yüklenemedi." };
  }
  const { data } = admin.storage.from("blog-images").getPublicUrl(path);
  return { url: data.publicUrl };
}

export async function createPostAction(
  _prev: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  await requireAdmin();

  const parsed = postSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Form geçersiz." };
  }

  const slug = slugify(parsed.data.slug || parsed.data.title);
  const cover = await uploadCoverIfProvided(formData, slug);
  if (cover.error) return { error: cover.error };

  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").insert({
    title: parsed.data.title,
    slug,
    excerpt: parsed.data.excerpt || null,
    cover_image_url: cover.url ?? null,
    content: parsed.data.content,
    seo_title: parsed.data.seo_title || null,
    seo_description: parsed.data.seo_description || null,
    status: parsed.data.status,
    published_at: parsed.data.status === "published" ? new Date().toISOString() : null,
  });

  if (error) {
    console.error("createPostAction", error);
    return { error: error.code === "23505" ? "Bu slug zaten kullanılıyor." : "Yazı oluşturulamadı." };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function updatePostAction(
  id: string,
  _prev: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  await requireAdmin();

  const parsed = postSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Form geçersiz." };
  }

  const slug = slugify(parsed.data.slug || parsed.data.title);
  const cover = await uploadCoverIfProvided(formData, slug);
  if (cover.error) return { error: cover.error };

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("blog_posts")
    .select("status, published_at")
    .eq("id", id)
    .maybeSingle();

  const becomingPublished = parsed.data.status === "published" && existing?.status !== "published";

  const { error } = await supabase
    .from("blog_posts")
    .update({
      title: parsed.data.title,
      slug,
      excerpt: parsed.data.excerpt || null,
      ...(cover.url ? { cover_image_url: cover.url } : {}),
      content: parsed.data.content,
      seo_title: parsed.data.seo_title || null,
      seo_description: parsed.data.seo_description || null,
      status: parsed.data.status,
      published_at: becomingPublished ? new Date().toISOString() : existing?.published_at ?? null,
    })
    .eq("id", id);

  if (error) {
    console.error("updatePostAction", error);
    return { error: "Yazı güncellenemedi." };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function deletePostAction(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) {
    console.error("deletePostAction", error);
    throw new Error("Yazı silinemedi.");
  }
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
}
