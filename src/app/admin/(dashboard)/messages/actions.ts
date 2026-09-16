"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import type { ContactStatus } from "@/lib/types";

export async function updateMessageStatusAction(id: string, status: ContactStatus) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").update({ status }).eq("id", id);
  if (error) {
    console.error("updateMessageStatusAction", error);
    throw new Error("Durum güncellenemedi.");
  }
  revalidatePath("/admin/messages");
}

export async function deleteMessageAction(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);
  if (error) {
    console.error("deleteMessageAction", error);
    throw new Error("Mesaj silinemedi.");
  }
  revalidatePath("/admin/messages");
}
