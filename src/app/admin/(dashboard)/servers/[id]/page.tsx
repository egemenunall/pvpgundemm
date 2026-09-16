import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ServerForm } from "@/components/admin/ServerForm";
import { updateServerAction } from "@/app/admin/(dashboard)/servers/actions";
import { adminGetServerById } from "@/lib/data/servers";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServerPage({ params }: PageProps) {
  const { id } = await params;
  const server = await adminGetServerById(id);
  if (!server) notFound();

  const boundAction = updateServerAction.bind(null, id);

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/servers"
        className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Serverlara dön
      </Link>
      <h1 className="mt-3 text-xl font-semibold text-text-primary">{server.name} — Düzenle</h1>

      <div className="mt-6">
        <ServerForm action={boundAction} server={server} />
      </div>
    </div>
  );
}
