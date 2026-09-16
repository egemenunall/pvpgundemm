"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVER_TYPES } from "@/lib/utils";
import type { ServerFormState } from "@/app/admin/(dashboard)/servers/actions";
import type { ServerRow } from "@/lib/types";

export function ServerForm({
  action,
  server,
}: {
  action: (prev: ServerFormState, formData: FormData) => Promise<ServerFormState>;
  server?: ServerRow;
}) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Server Adı *</Label>
          <Input id="name" name="name" required defaultValue={server?.name} placeholder="ör. Lorgan2" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="slug">Slug (boş bırakılırsa isimden üretilir)</Label>
          <Input id="slug" name="slug" defaultValue={server?.slug} placeholder="lorgan2-emek" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="opening_date">Açılış Tarihi *</Label>
          <Input
            id="opening_date"
            name="opening_date"
            type="date"
            required
            defaultValue={server?.opening_date}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="opening_time">Açılış Saati *</Label>
          <Input
            id="opening_time"
            name="opening_time"
            type="time"
            required
            defaultValue={server?.opening_time?.slice(0, 5) ?? "21:00"}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="type">Server Türü *</Label>
          <Select name="type" defaultValue={server?.type ?? "emek"}>
            <SelectTrigger id="type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SERVER_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Kısa Açıklama</Label>
        <Textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={server?.description}
          placeholder="Server hakkında kısa, doğrudan bir açıklama..."
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="features">Özellikler (virgülle ayırın)</Label>
        <Input
          id="features"
          name="features"
          defaultValue={server?.features?.join(", ")}
          placeholder="1-99 level, Editsiz, Lonca sistemi"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="website_url">Website</Label>
          <Input
            id="website_url"
            name="website_url"
            type="url"
            defaultValue={server?.website_url ?? ""}
            placeholder="https://..."
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="discord_url">Discord</Label>
          <Input
            id="discord_url"
            name="discord_url"
            type="url"
            defaultValue={server?.discord_url ?? ""}
            placeholder="https://discord.gg/..."
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="logo">Logo {server?.logo_url && "(değiştirmek için yeni dosya seçin)"}</Label>
        {server?.logo_url && (
          <Image
            src={server.logo_url}
            alt={server.name}
            width={48}
            height={48}
            className="rounded-md border border-border"
            unoptimized
          />
        )}
        <Input id="logo" name="logo" type="file" accept="image/*" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="popularity_score">Popülerlik Skoru</Label>
        <Input
          id="popularity_score"
          name="popularity_score"
          type="number"
          min={0}
          defaultValue={server?.popularity_score ?? 0}
          className="max-w-40"
        />
      </div>

      <div className="flex flex-wrap gap-6 rounded-md border border-border bg-background p-4">
        <label className="flex items-center gap-2.5 text-sm text-text-primary">
          <Switch name="is_active" defaultChecked={server?.is_active ?? true} />
          Aktif
        </label>
        <label className="flex items-center gap-2.5 text-sm text-text-primary">
          <Switch name="is_vip" defaultChecked={server?.is_vip ?? false} />
          VIP
        </label>
        <label className="flex items-center gap-2.5 text-sm text-text-primary">
          <Switch name="is_sponsored" defaultChecked={server?.is_sponsored ?? false} />
          Sponsorlu
        </label>
      </div>

      {state.error && (
        <p className="rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
          {state.error}
        </p>
      )}

      <div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Kaydediliyor..." : server ? "Değişiklikleri Kaydet" : "Server Ekle"}
        </Button>
      </div>
    </form>
  );
}
