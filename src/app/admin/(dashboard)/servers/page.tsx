import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { TypeBadge } from "@/components/servers/ServerBadge";
import { ServerFlagToggle, ServerRowActions } from "@/components/admin/ServerRowActions";
import { adminGetAllServers } from "@/lib/data/servers";
import { formatDateTR, formatOpeningTime } from "@/lib/utils";

export default async function AdminServersPage() {
  const servers = await adminGetAllServers();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">Serverlar</h1>
          <p className="mt-1 text-sm text-text-secondary">{servers.length} server kayıtlı.</p>
        </div>
        <Button asChild>
          <Link href="/admin/servers/new">
            <Plus className="h-4 w-4" />
            Server Ekle
          </Link>
        </Button>
      </div>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Server</TableHead>
              <TableHead>Tür</TableHead>
              <TableHead>Açılış</TableHead>
              <TableHead>Görüntülenme</TableHead>
              <TableHead>Aktif</TableHead>
              <TableHead>VIP</TableHead>
              <TableHead>Sponsorlu</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servers.map((server) => (
              <TableRow key={server.id}>
                <TableCell className="font-medium">{server.name}</TableCell>
                <TableCell>
                  <TypeBadge type={server.type} />
                </TableCell>
                <TableCell className="whitespace-nowrap text-text-secondary">
                  {formatDateTR(server.opening_date)} — {formatOpeningTime(server.opening_time)}
                </TableCell>
                <TableCell className="text-text-secondary">
                  {server.view_count.toLocaleString("tr-TR")}
                </TableCell>
                <TableCell>
                  <ServerFlagToggle id={server.id} field="is_active" defaultChecked={server.is_active} />
                </TableCell>
                <TableCell>
                  <ServerFlagToggle id={server.id} field="is_vip" defaultChecked={server.is_vip} />
                </TableCell>
                <TableCell>
                  <ServerFlagToggle
                    id={server.id}
                    field="is_sponsored"
                    defaultChecked={server.is_sponsored}
                  />
                </TableCell>
                <TableCell>
                  <ServerRowActions server={server} />
                </TableCell>
              </TableRow>
            ))}
            {servers.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-text-secondary">
                  Henüz server eklenmedi.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
