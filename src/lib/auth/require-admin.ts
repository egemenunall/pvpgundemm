import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Server Component'lerde admin korumalı sayfaların başında çağrılır.
 * Asıl güvenlik katmanı RLS'de (is_admin()) olduğu için burası
 * kullanıcı deneyimi + gereksiz sorgu yapılmaması amaçlıdır.
 */
export async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("user_id, is_admin, full_name")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile?.is_admin) {
    redirect("/admin/login?error=yetkisiz");
  }

  return { user, profile };
}
