"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth/require-admin";

const adSchema = z.object({
  title: z.string().trim().min(2).max(150),
  type: z.enum(["top", "side", "hero", "mobile"]),
  link_url: z.string().trim().url().optional().or(z.literal("")),
  start_date: z.string().optional().or(z.literal("")),
  end_date: z.string().optional().or(z.literal("")),
  display_order: z.coerce.number().int().min(0).max(1000).optional(),
});

export interface AdFormState {
  error?: string;
  success?: boolean;
}

async function uploadImage(file: File | null, prefix: string): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const admin = createAdminClient();
  const ext = file.name.split(".").pop() || "png";
  const path = `${prefix}-${Date.now()}.${ext}`;

  const { error } = await admin.storage.from("advertisements").upload(path, file, {
    contentType: file.type,
    upsert: true,
  });
  if (error) {
    console.error("uploadImage(ads)", error);
    return null;
  }
  const { data } = admin.storage.from("advertisements").getPublicUrl(path);
  return data.publicUrl;
}

function readCheckbox(formData: FormData, name: string): boolean {
  return formData.get(name) === "on" || formData.get(name) === "true";
}

export async function createAdAction(_prev: AdFormState, formData: FormData): Promise<AdFormState> {
  await requireAdmin();

  const parsed = adSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Form geçersiz." };
  }

  const imageFile = formData.get("image") as File | null;
  const imageUrl = await uploadImage(imageFile, "ad");
  if (!imageUrl) {
    return { error: "Görsel yüklenemedi. Bir görsel seçtiğinizden emin olun." };
  }
  const mobileImageFile = formData.get("mobile_image") as File | null;
  const mobileImageUrl = await uploadImage(mobileImageFile, "ad-mobile");

  const supabase = await createClient();
  const { error } = await supabase.from("advertisements").insert({
    title: parsed.data.title,
    type: parsed.data.type,
    image_url: imageUrl,
    mobile_image_url: mobileImageUrl,
    link_url: parsed.data.link_url || null,
    start_date: parsed.data.start_date || null,
    end_date: parsed.data.end_date || null,
    display_order: parsed.data.display_order ?? 0,
    is_active: readCheckbox(formData, "is_active"),
  });

  if (error) {
    console.error("createAdAction", error);
    return { error: "Reklam oluşturulamadı." };
  }

  revalidatePath("/admin/advertisements");
  revalidatePath("/");
  return { success: true };
}

export async function updateAdAction(
  id: string,
  _prev: AdFormState,
  formData: FormData
): Promise<AdFormState> {
  await requireAdmin();

  const parsed = adSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Form geçersiz." };
  }

  const imageFile = formData.get("image") as File | null;
  const imageUrl = await uploadImage(imageFile, "ad");
  const mobileImageFile = formData.get("mobile_image") as File | null;
  const mobileImageUrl = await uploadImage(mobileImageFile, "ad-mobile");

  const supabase = await createClient();
  const { error } = await supabase
    .from("advertisements")
    .update({
      title: parsed.data.title,
      type: parsed.data.type,
      ...(imageUrl ? { image_url: imageUrl } : {}),
      ...(mobileImageUrl ? { mobile_image_url: mobileImageUrl } : {}),
      link_url: parsed.data.link_url || null,
      start_date: parsed.data.start_date || null,
      end_date: parsed.data.end_date || null,
      display_order: parsed.data.display_order ?? 0,
      is_active: readCheckbox(formData, "is_active"),
    })
    .eq("id", id);

  if (error) {
    console.error("updateAdAction", error);
    return { error: "Reklam güncellenemedi." };
  }

  revalidatePath("/admin/advertisements");
  revalidatePath("/");
  return { success: true };
}

export async function deleteAdAction(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("advertisements").delete().eq("id", id);
  if (error) {
    console.error("deleteAdAction", error);
    throw new Error("Reklam silinemedi.");
  }
  revalidatePath("/admin/advertisements");
  revalidatePath("/");
}

export async function toggleAdActiveAction(id: string, value: boolean) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("advertisements").update({ is_active: value }).eq("id", id);
  if (error) {
    console.error("toggleAdActiveAction", error);
    throw new Error("Güncellenemedi.");
  }
  revalidatePath("/admin/advertisements");
  revalidatePath("/");
}
