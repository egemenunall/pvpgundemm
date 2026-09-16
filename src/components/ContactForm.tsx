"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContactMessage, type ContactFormState } from "@/app/(public)/iletisim/actions";

const initialState: ContactFormState = { success: false };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactMessage, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success("Mesajınız alındı, en kısa sürede dönüş yapacağız.");
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-4" key={state.success ? "sent" : "idle"}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Ad Soyad</Label>
          <Input id="name" name="name" required maxLength={100} placeholder="Adınız Soyadınız" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">E-posta</Label>
          <Input id="email" name="email" type="email" required maxLength={200} placeholder="ornek@mail.com" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="subject">Konu</Label>
        <Input id="subject" name="subject" required maxLength={150} placeholder="Mesaj konusu" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">Mesaj</Label>
        <Textarea id="message" name="message" required maxLength={4000} rows={6} placeholder="Mesajınızı yazın..." />
      </div>

      <Button type="submit" disabled={isPending} className="self-start">
        {isPending ? "Gönderiliyor..." : "Mesajı Gönder"}
      </Button>
    </form>
  );
}
