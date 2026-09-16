import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import { getCurrentWeekRange, formatDateInputTR } from "@/lib/utils";
import type { ServerRow } from "@/lib/types";

/**
 * Bu hafta açılan (Cuma -> Perşembe, Europe/Istanbul) aktif serverlar.
 * Kronolojik sırada (en yakın açılış üstte) — ekip kararı: oy sistemi yok,
 * organik sıralama açılış tarihine göre.
 */
export async function getThisWeekServers(): Promise<ServerRow[]> {
  const supabase = createPublicClient();
  const { start, end } = getCurrentWeekRange();

  const { data, error } = await supabase
    .from("servers")
    .select("*")
    .eq("is_active", true)
    .gte("opening_date", formatDateInputTR(start))
    .lte("opening_date", formatDateInputTR(end))
    .order("opening_date", { ascending: true })
    .order("opening_time", { ascending: true });

  if (error) {
    console.error("getThisWeekServers", error);
    return [];
  }
  return data ?? [];
}

/**
 * Ana sayfa "Aktif Serverlar" bölümü.
 * Sıralama: VIP -> Sponsorlu -> popularity_score -> normal.
 */
export async function getActiveServers(limit = 12): Promise<ServerRow[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("servers")
    .select("*")
    .eq("is_active", true)
    .order("is_vip", { ascending: false })
    .order("is_sponsored", { ascending: false })
    .order("popularity_score", { ascending: false })
    .order("opening_date", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getActiveServers", error);
    return [];
  }
  return data ?? [];
}

export interface ServerFilters {
  type?: string;
  q?: string;
  segment?: "aktif" | "yakinda" | "bu-hafta" | "tumu";
  sort?: "onerilen" | "yeni" | "acilis" | "populerlik";
}

export async function getFilteredServers(filters: ServerFilters): Promise<ServerRow[]> {
  const supabase = createPublicClient();
  let query = supabase.from("servers").select("*").eq("is_active", true);

  if (filters.type) {
    query = query.eq("type", filters.type);
  }
  if (filters.q) {
    query = query.ilike("name", `%${filters.q}%`);
  }

  if (filters.segment === "yakinda") {
    query = query.gte("opening_date", formatDateInputTR(new Date()));
  } else if (filters.segment === "bu-hafta") {
    const { start, end } = getCurrentWeekRange();
    query = query
      .gte("opening_date", formatDateInputTR(start))
      .lte("opening_date", formatDateInputTR(end));
  }

  switch (filters.sort) {
    case "yeni":
      query = query.order("created_at", { ascending: false });
      break;
    case "populerlik":
      query = query.order("popularity_score", { ascending: false });
      break;
    case "acilis":
      query = query.order("opening_date", { ascending: true }).order("opening_time", { ascending: true });
      break;
    case "onerilen":
    default:
      query = query
        .order("is_vip", { ascending: false })
        .order("is_sponsored", { ascending: false })
        .order("popularity_score", { ascending: false });
      break;
  }

  const { data, error } = await query;
  if (error) {
    console.error("getFilteredServers", error);
    return [];
  }
  return data ?? [];
}

/**
 * Build time'da statik olarak üretilecek server detay sayfalarının slug
 * listesi (hibrit ISR — bkz. lib/supabase/public.ts'teki not).
 */
export async function getAllActiveServerSlugs(): Promise<string[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("servers").select("slug").eq("is_active", true);
  if (error) {
    console.error("getAllActiveServerSlugs", error);
    return [];
  }
  return (data ?? []).map((row) => row.slug);
}

export async function getServerBySlug(slug: string): Promise<ServerRow | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("servers")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("getServerBySlug", error);
    return null;
  }
  return data;
}

export async function incrementServerView(slug: string): Promise<void> {
  const supabase = createPublicClient();
  await supabase.rpc("increment_server_view", { server_slug: slug });
}

// ---- Admin (kullanıcı oturumuna/çerezlere bağlı, RLS is_admin() ile korunur) ----

export async function adminGetAllServers(): Promise<ServerRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("servers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("adminGetAllServers", error);
    return [];
  }
  return data ?? [];
}

export async function adminGetServerById(id: string): Promise<ServerRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("servers").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("adminGetServerById", error);
    return null;
  }
  return data;
}
