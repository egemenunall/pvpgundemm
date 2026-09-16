"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AdFormDialog } from "@/components/admin/AdFormDialog";
import { deleteAdAction, toggleAdActiveAction, updateAdAction } from "@/app/admin/(dashboard)/advertisements/actions";
import type { AdvertisementRow } from "@/lib/types";

export function AdActiveToggle({ ad }: { ad: AdvertisementRow }) {
  const [checked, setChecked] = useState(ad.is_active);
  const [isPending, startTransition] = useTransition();

  return (
    <Switch
      checked={checked}
      disabled={isPending}
      onCheckedChange={(value) => {
        setChecked(value);
        startTransition(async () => {
          try {
            await toggleAdActiveAction(ad.id, value);
          } catch {
            setChecked(!value);
            toast.error("Güncellenemedi.");
          }
        });
      }}
    />
  );
}

export function AdRowActions({ ad }: { ad: AdvertisementRow }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-end gap-1">
      <AdFormDialog
        action={updateAdAction.bind(null, ad.id)}
        ad={ad}
        title={`${ad.title} — Düzenle`}
        trigger={
          <Button variant="ghost" size="icon" aria-label="Düzenle">
            <Pencil className="h-4 w-4" />
          </Button>
        }
      />
      <Button variant="ghost" size="icon" onClick={() => setConfirmOpen(true)} aria-label="Sil">
        <Trash2 className="h-4 w-4 text-danger" />
      </Button>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reklamı sil</DialogTitle>
            <DialogDescription>
              &quot;{ad.title}&quot; kalıcı olarak silinecek.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
              Vazgeç
            </Button>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  try {
                    await deleteAdAction(ad.id);
                    toast.success("Reklam silindi.");
                    setConfirmOpen(false);
                  } catch {
                    toast.error("Silinemedi.");
                  }
                })
              }
            >
              {isPending ? "Siliniyor..." : "Evet, Sil"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
