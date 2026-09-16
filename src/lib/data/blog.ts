import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import type { BlogPostRow } from "@/lib/types";

export async function getPublishedPosts(limit?: number): Promise<BlogPostRow[]> {
  const supabase = createPublicClient();
  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("getPublishedPosts", error);
    return [];
  }
  return data ?? [];
}

export async function getAllPublishedPostSlugs(): Promise<string[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("blog_posts").select("slug").eq("status", "published");
  if (error) {
    console.error("getAllPublishedPostSlugs", error);
    return [];
  }
  return (data ?? []).map((row) => row.slug);
}

export async function getPostBySlug(slug: string): Promise<BlogPostRow | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("getPostBySlug", error);
    return null;
  }
  return data;
}

export async function adminGetAllPosts(): Promise<BlogPostRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("adminGetAllPosts", error);
    return [];
  }
  return data ?? [];
}

export async function adminGetPostById(id: string): Promise<BlogPostRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("adminGetPostById", error);
    return null;
  }
  return data;
}
