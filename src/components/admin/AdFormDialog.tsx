"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { AdFormState } from "@/app/admin/(dashboard)/advertisements/actions";
import type { AdvertisementRow } from "@/lib/types";
import { MAX_UPLOAD_MB, validateUploadTotal } from "@/lib/utils";

const AD_TYPES = [
  { value: "top", label: "Üst (1400x200)" },
  { value: "side", label: "Yan (230x950)" },
  { value: "hero", label: "Hero Slider (1280x420)" },
  { value: "mobile", label: "Mobil Sticky (320x100)" },
] as const;

export function AdFormDialog({
  action,
  ad,
  trigger,
  title,
}: {
  action: (prev: AdFormState, formData: FormData) => Promise<AdFormState>;
  ad?: AdvertisementRow;
  trigger: React.ReactNode;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(action, {});

  // Render sırasında önceki state ile karşılaştırıp dialog'u kapatmak,
  // React'in önerdiği "effect yerine render sırasında state ayarlama"
  // deseni — useEffect içinde setState çağırmaktan kaçınır.
  const [prevState, setPrevState] = useState(state);
  if (state !== prevState) {
    setPrevState(state);
    if (state.success && open) {
      setOpen(false);
    }
  }

  // Toast, dış bir sistemi (bildirim UI'ı) tetiklediği için gerçek bir
  // efekt — burada setState çağrılmıyor.
  useEffect(() => {
    if (state.success) {
      toast.success("Reklam kaydedildi.");
    }
  }, [state]);

  // Sunucuya boşa büyük istek göndermemek için dosya seçildiği anda uyar.
  // Limit isteğin bütününe uygulandığı için iki input'un toplamı kontrol edilir.
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    if (!input.files?.[0]) return;

    const form = input.form;
    const files = form
      ? Array.from(form.querySelectorAll<HTMLInputElement>('input[type="file"]')).map(
          (el) => el.files?.[0] ?? null
        )
      : [input.files[0]];

    const sizeError = validateUploadTotal(files);
    if (sizeError) {
      toast.error(sizeError);
      input.value = "";
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ad-title">Başlık</Label>
            <Input id="ad-title" name="title" required defaultValue={ad?.title} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ad-type">Reklam Alanı</Label>
            <Select name="type" defaultValue={ad?.type ?? "top"}>
              <SelectTrigger id="ad-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AD_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ad-image">Görsel (Desktop) {ad && "— boş bırakılırsa mevcut kalır"}</Label>
            <Input
              id="ad-image"
              name="image"
              type="file"
              accept="image/*,.gif"
              required={!ad}
              onChange={handleFileChange}
            />
            <p className="text-xs text-text-muted">
              GIF desteklenir. Desktop + mobil görsel toplamı en fazla {MAX_UPLOAD_MB} MB.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ad-mobile-image">Mobil Görsel (opsiyonel)</Label>
            <Input
              id="ad-mobile-image"
              name="mobile_image"
              type="file"
              accept="image/*,.gif"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ad-link">Link</Label>
            <Input id="ad-link" name="link_url" type="url" defaultValue={ad?.link_url ?? ""} placeholder="https://..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ad-start">Başlangıç Tarihi</Label>
              <Input id="ad-start" name="start_date" type="date" defaultValue={ad?.start_date ?? ""} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ad-end">Bitiş Tarihi</Label>
              <Input id="ad-end" name="end_date" type="date" defaultValue={ad?.end_date ?? ""} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ad-order">Sıra</Label>
            <Input
              id="ad-order"
              name="display_order"
              type="number"
              min={0}
              defaultValue={ad?.display_order ?? 0}
              className="max-w-32"
            />
          </div>

          <label className="flex items-center gap-2.5 text-sm text-text-primary">
            <Switch name="is_active" defaultChecked={ad?.is_active ?? true} />
            Aktif
          </label>

          {state.error && (
            <p className="rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
              {state.error}
            </p>
          )}

          <Button type="submit" disabled={isPending}>
            {isPending ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
