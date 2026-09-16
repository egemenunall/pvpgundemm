import { createClient } from "@/lib/supabase/server";
import { getCurrentWeekRange, formatDateInputTR } from "@/lib/utils";

export interface DashboardStats {
  totalServers: number;
  activeServers: number;
  thisWeekServers: number;
  totalViews: number;
  activeAds: number;
  blogPosts: number;
  newMessages: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();
  const { start, end } = getCurrentWeekRange();

  const [
    totalServers,
    activeServers,
    thisWeekServers,
    viewsResult,
    activeAds,
    blogPosts,
    newMessages,
  ] = await Promise.all([
    supabase.from("servers").select("id", { count: "exact", head: true }),
    supabase.from("servers").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase
      .from("servers")
      .select("id", { count: "exact", head: true })
      .gte("opening_date", formatDateInputTR(start))
      .lte("opening_date", formatDateInputTR(end)),
    supabase.from("servers").select("view_count"),
    supabase.from("advertisements").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "yeni"),
  ]);

  const totalViews = (viewsResult.data ?? []).reduce((sum, row) => sum + (row.view_count ?? 0), 0);

  return {
    totalServers: totalServers.count ?? 0,
    activeServers: activeServers.count ?? 0,
    thisWeekServers: thisWeekServers.count ?? 0,
    totalViews,
    activeAds: activeAds.count ?? 0,
    blogPosts: blogPosts.count ?? 0,
    newMessages: newMessages.count ?? 0,
  };
}
