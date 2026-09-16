"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { deletePostAction } from "@/app/admin/(dashboard)/blog/actions";
import type { BlogPostRow } from "@/lib/types";

export function PostRowActions({ post }: { post: BlogPostRow }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-end gap-1">
      <Button asChild variant="ghost" size="icon">
        <Link href={`/admin/blog/${post.id}`} aria-label="Düzenle">
          <Pencil className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Sil">
        <Trash2 className="h-4 w-4 text-danger" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yazıyı sil</DialogTitle>
            <DialogDescription>
              &quot;{post.title}&quot; kalıcı olarak silinecek.
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
                    await deletePostAction(post.id);
                    toast.success("Yazı silindi.");
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
