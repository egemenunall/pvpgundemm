import { createClient } from "@/lib/supabase/server";
import type { ContactMessageRow } from "@/lib/types";

export async function adminGetAllMessages(): Promise<ContactMessageRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("adminGetAllMessages", error);
    return [];
  }
  return data ?? [];
}
