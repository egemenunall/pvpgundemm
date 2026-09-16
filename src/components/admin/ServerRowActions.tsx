"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
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
import {
  deleteServerAction,
  toggleServerFlagAction,
} from "@/app/admin/(dashboard)/servers/actions";
import type { ServerRow } from "@/lib/types";

export function ServerFlagToggle({
  id,
  field,
  defaultChecked,
}: {
  id: string;
  field: "is_active" | "is_vip" | "is_sponsored";
  defaultChecked: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  const [isPending, startTransition] = useTransition();

  return (
    <Switch
      checked={checked}
      disabled={isPending}
      onCheckedChange={(value) => {
        setChecked(value);
        startTransition(async () => {
          try {
            await toggleServerFlagAction(id, field, value);
          } catch {
            setChecked(!value);
            toast.error("Güncellenemedi.");
          }
        });
      }}
    />
  );
}

export function ServerRowActions({ server }: { server: ServerRow }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-end gap-1">
      <Button asChild variant="ghost" size="icon">
        <Link href={`/admin/servers/${server.id}`} aria-label="Düzenle">
          <Pencil className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Sil">
        <Trash2 className="h-4 w-4 text-danger" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Serverı sil</DialogTitle>
            <DialogDescription>
              &quot;{server.name}&quot; kalıcı olarak silinecek. Bu işlem geri alınamaz.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Vazgeç
            </Button>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  try {
                    await deleteServerAction(server.id);
                    toast.success("Server silindi.");
                    setOpen(false);
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
