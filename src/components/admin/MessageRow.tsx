"use client";

import { useState, useTransition } from "react";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableRow, TableCell } from "@/components/ui/table";
import { updateMessageStatusAction, deleteMessageAction } from "@/app/admin/(dashboard)/messages/actions";
import { formatDateTR } from "@/lib/utils";
import type { ContactMessageRow, ContactStatus } from "@/lib/types";

const STATUS_LABELS: Record<ContactStatus, string> = {
  yeni: "Yeni",
  okundu: "Okundu",
  cozuldu: "Çözüldü",
};

const STATUS_VARIANT: Record<ContactStatus, "accent" | "outline" | "muted"> = {
  yeni: "accent",
  okundu: "outline",
  cozuldu: "muted",
};

export function MessageRow({ message }: { message: ContactMessageRow }) {
  const [status, setStatus] = useState<ContactStatus>(message.status);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function openDetail() {
    setDetailOpen(true);
    if (status === "yeni") {
      setStatus("okundu");
      startTransition(() => updateMessageStatusAction(message.id, "okundu"));
    }
  }

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{message.name}</TableCell>
        <TableCell className="text-text-secondary">{message.subject}</TableCell>
        <TableCell className="text-text-secondary">{formatDateTR(message.created_at)}</TableCell>
        <TableCell>
          <Badge variant={STATUS_VARIANT[status]}>{STATUS_LABELS[status]}</Badge>
        </TableCell>
        <TableCell>
          <div className="flex items-center justify-end gap-1">
            <Button variant="ghost" size="icon" onClick={openDetail} aria-label="Görüntüle">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setDeleteOpen(true)} aria-label="Sil">
              <Trash2 className="h-4 w-4 text-danger" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{message.subject}</DialogTitle>
            <DialogDescription>
              {message.name} — {message.email} — {formatDateTR(message.created_at)}
            </DialogDescription>
          </DialogHeader>

          <p className="whitespace-pre-wrap text-sm text-text-secondary">{message.message}</p>

          <div className="mt-4 flex flex-col gap-1.5">
            <span className="text-xs font-medium text-text-muted">Durum</span>
            <Select
              value={status}
              onValueChange={(value) => {
                const next = value as ContactStatus;
                setStatus(next);
                startTransition(async () => {
                  try {
                    await updateMessageStatusAction(message.id, next);
                  } catch {
                    toast.error("Durum güncellenemedi.");
                  }
                });
              }}
            >
              <SelectTrigger className="max-w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yeni">Yeni</SelectItem>
                <SelectItem value="okundu">Okundu</SelectItem>
                <SelectItem value="cozuldu">Çözüldü</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mesajı sil</DialogTitle>
            <DialogDescription>Bu mesaj kalıcı olarak silinecek.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setDeleteOpen(false)}>
              Vazgeç
            </Button>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  try {
                    await deleteMessageAction(message.id);
                    toast.success("Mesaj silindi.");
                    setDeleteOpen(false);
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
    </>
  );
}
