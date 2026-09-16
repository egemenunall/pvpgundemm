"use server";

import { z } from "zod";
import { createPublicClient } from "@/lib/supabase/public";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Ad soyad en az 2 karakter olmalı").max(100),
  email: z.string().trim().email("Geçerli bir e-posta girin").max(200),
  subject: z.string().trim().min(3, "Konu en az 3 karakter olmalı").max(150),
  message: z.string().trim().min(10, "Mesaj en az 10 karakter olmalı").max(4000),
});

export interface ContactFormState {
  success: boolean;
  error?: string;
}

export async function submitContactMessage(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Form geçersiz." };
  }

  const supabase = createPublicClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject,
    message: parsed.data.message,
  });

  if (error) {
    console.error("submitContactMessage", error);
    return { success: false, error: "Mesaj gönderilemedi, lütfen tekrar deneyin." };
  }

  return { success: true };
}
