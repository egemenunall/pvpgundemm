import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ServerForm } from "@/components/admin/ServerForm";
import { createServerAction } from "@/app/admin/(dashboard)/servers/actions";

export default function NewServerPage() {
  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/servers"
        className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Serverlara dön
      </Link>
      <h1 className="mt-3 text-xl font-semibold text-text-primary">Yeni Server Ekle</h1>

      <div className="mt-6">
        <ServerForm action={createServerAction} />
      </div>
    </div>
  );
}
