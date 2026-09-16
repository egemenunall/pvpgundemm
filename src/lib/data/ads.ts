import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import { formatDateInputTR, nowInIstanbul } from "@/lib/utils";
import type { AdvertisementRow, AdvertisementType } from "@/lib/types";

export async function getActiveAds(type: AdvertisementType): Promise<AdvertisementRow[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("advertisements")
    .select("*")
    .eq("type", type)
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("getActiveAds", error);
    return [];
  }

  const today = formatDateInputTR(nowInIstanbul());
  return (data ?? []).filter((ad) => {
    if (ad.start_date && ad.start_date > today) return false;
    if (ad.end_date && ad.end_date < today) return false;
    return true;
  });
}

export async function adminGetAllAds(): Promise<AdvertisementRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("advertisements")
    .select("*")
    .order("type", { ascending: true })
    .order("display_order", { ascending: true });

  if (error) {
    console.error("adminGetAllAds", error);
    return [];
  }
  return data ?? [];
}

export async function adminGetAdById(id: string): Promise<AdvertisementRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("advertisements")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("adminGetAdById", error);
    return null;
  }
  return data;
}
