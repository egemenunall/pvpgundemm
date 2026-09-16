import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { AdFormDialog } from "@/components/admin/AdFormDialog";
import { AdActiveToggle, AdRowActions } from "@/components/admin/AdRowActions";
import { adminGetAllAds } from "@/lib/data/ads";
import { createAdAction } from "@/app/admin/(dashboard)/advertisements/actions";
import { formatDateTR } from "@/lib/utils";

const TYPE_LABELS: Record<string, string> = {
  top: "Üst",
  side: "Yan",
  hero: "Hero",
  mobile: "Mobil",
};

export default async function AdminAdvertisementsPage() {
  const ads = await adminGetAllAds();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">Reklamlar</h1>
          <p className="mt-1 text-sm text-text-secondary">{ads.length} reklam kayıtlı.</p>
        </div>
        <AdFormDialog
          action={createAdAction}
          title="Yeni Reklam"
          trigger={
            <Button>
              <Plus className="h-4 w-4" />
              Reklam Ekle
            </Button>
          }
        />
      </div>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Görsel</TableHead>
              <TableHead>Başlık</TableHead>
              <TableHead>Alan</TableHead>
              <TableHead>Tarih Aralığı</TableHead>
              <TableHead>Sıra</TableHead>
              <TableHead>Aktif</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ads.map((ad) => (
              <TableRow key={ad.id}>
                <TableCell>
                  <Image
                    src={ad.image_url}
                    alt={ad.title}
                    width={64}
                    height={36}
                    className="h-9 w-16 rounded border border-border object-cover"
                    unoptimized
                  />
                </TableCell>
                <TableCell className="font-medium">{ad.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{TYPE_LABELS[ad.type] ?? ad.type}</Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap text-text-secondary">
                  {ad.start_date ? formatDateTR(ad.start_date) : "—"} —{" "}
                  {ad.end_date ? formatDateTR(ad.end_date) : "süresiz"}
                </TableCell>
                <TableCell className="text-text-secondary">{ad.display_order}</TableCell>
                <TableCell>
                  <AdActiveToggle ad={ad} />
                </TableCell>
                <TableCell>
                  <AdRowActions ad={ad} />
                </TableCell>
              </TableRow>
            ))}
            {ads.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-text-secondary">
                  Henüz reklam eklenmedi.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
