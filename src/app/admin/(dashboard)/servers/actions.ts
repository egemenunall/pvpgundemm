"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth/require-admin";
import { slugify, validateUploadSize } from "@/lib/utils";

const serverSchema = z.object({
  name: z.string().trim().min(2).max(100),
  slug: z.string().trim().min(2).max(120).optional().or(z.literal("")),
  opening_date: z.string().min(1, "Açılış tarihi zorunlu"),
  opening_time: z.string().min(1, "Açılış saati zorunlu"),
  type: z.enum(["emek", "farm", "pvp", "ws", "oldschool", "diger"]),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  features: z.string().trim().optional().or(z.literal("")),
  website_url: z.string().trim().url().optional().or(z.literal("")),
  discord_url: z.string().trim().url().optional().or(z.literal("")),
  popularity_score: z.coerce.number().int().min(0).max(100000).optional(),
});

// Checkbox'lar sadece işaretliyken formData'da "on" olarak gelir;
// zod coerce.boolean() burada yanıltıcı olduğu için elle okunuyor.
function readCheckbox(formData: FormData, name: string): boolean {
  return formData.get(name) === "on" || formData.get(name) === "true";
}

export interface ServerFormState {
  error?: string;
}

/** Dosya yoksa boş sonuç, boyut aşımı veya yükleme hatasında `error` döner. */
async function uploadLogoIfProvided(
  formData: FormData,
  slug: string
): Promise<{ url?: string; error?: string }> {
  const file = formData.get("logo") as File | null;
  if (!file || file.size === 0) return {};

  const sizeError = validateUploadSize(file);
  if (sizeError) return { error: sizeError };

  const admin = createAdminClient();
  const ext = file.name.split(".").pop() || "png";
  const path = `${slug}-${Date.now()}.${ext}`;

  const { error } = await admin.storage.from("server-logos").upload(path, file, {
    contentType: file.type,
    upsert: true,
  });

  if (error) {
    console.error("uploadLogoIfProvided", error);
    return { error: "Logo yüklenemedi." };
  }

  const { data } = admin.storage.from("server-logos").getPublicUrl(path);
  return { url: data.publicUrl };
}

function parseFeatures(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((f) => f.trim())
    .filter(Boolean);
}

export async function createServerAction(
  _prev: ServerFormState,
  formData: FormData
): Promise<ServerFormState> {
  await requireAdmin();

  const parsed = serverSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Form geçersiz." };
  }

  const slug = slugify(parsed.data.slug || parsed.data.name);
  const logo = await uploadLogoIfProvided(formData, slug);
  if (logo.error) return { error: logo.error };

  const supabase = await createClient();
  const { error } = await supabase.from("servers").insert({
    name: parsed.data.name,
    slug,
    logo_url: logo.url ?? null,
    opening_date: parsed.data.opening_date,
    opening_time: parsed.data.opening_time,
    type: parsed.data.type,
    description: parsed.data.description || "",
    features: parseFeatures(parsed.data.features),
    website_url: parsed.data.website_url || null,
    discord_url: parsed.data.discord_url || null,
    is_active: readCheckbox(formData, "is_active"),
    is_vip: readCheckbox(formData, "is_vip"),
    is_sponsored: readCheckbox(formData, "is_sponsored"),
    popularity_score: parsed.data.popularity_score ?? 0,
  });

  if (error) {
    console.error("createServerAction", error);
    return { error: error.code === "23505" ? "Bu slug zaten kullanılıyor." : "Server oluşturulamadı." };
  }

  revalidatePath("/admin/servers");
  revalidatePath("/serverlar");
  revalidatePath("/");
  redirect("/admin/servers");
}

export async function updateServerAction(
  id: string,
  _prev: ServerFormState,
  formData: FormData
): Promise<ServerFormState> {
  await requireAdmin();

  const parsed = serverSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Form geçersiz." };
  }

  const slug = slugify(parsed.data.slug || parsed.data.name);
  const logo = await uploadLogoIfProvided(formData, slug);
  if (logo.error) return { error: logo.error };

  const supabase = await createClient();
  const { error } = await supabase
    .from("servers")
    .update({
      name: parsed.data.name,
      slug,
      ...(logo.url ? { logo_url: logo.url } : {}),
      opening_date: parsed.data.opening_date,
      opening_time: parsed.data.opening_time,
      type: parsed.data.type,
      description: parsed.data.description || "",
      features: parseFeatures(parsed.data.features),
      website_url: parsed.data.website_url || null,
      discord_url: parsed.data.discord_url || null,
      is_active: readCheckbox(formData, "is_active"),
      is_vip: readCheckbox(formData, "is_vip"),
      is_sponsored: readCheckbox(formData, "is_sponsored"),
      popularity_score: parsed.data.popularity_score ?? 0,
    })
    .eq("id", id);

  if (error) {
    console.error("updateServerAction", error);
    return { error: "Server güncellenemedi." };
  }

  revalidatePath("/admin/servers");
  revalidatePath("/serverlar");
  revalidatePath(`/server/${slug}`);
  revalidatePath("/");
  redirect("/admin/servers");
}

export async function deleteServerAction(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("servers").delete().eq("id", id);
  if (error) {
    console.error("deleteServerAction", error);
    throw new Error("Server silinemedi.");
  }
  revalidatePath("/admin/servers");
  revalidatePath("/serverlar");
  revalidatePath("/");
}

export async function toggleServerFlagAction(
  id: string,
  field: "is_active" | "is_vip" | "is_sponsored",
  value: boolean
) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("servers")
    .update({ [field]: value })
    .eq("id", id);
  if (error) {
    console.error("toggleServerFlagAction", error);
    throw new Error("Güncellenemedi.");
  }
  revalidatePath("/admin/servers");
  revalidatePath("/serverlar");
  revalidatePath("/");
}
