import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { MessageRow } from "@/components/admin/MessageRow";
import { adminGetAllMessages } from "@/lib/data/messages";

export default async function AdminMessagesPage() {
  const messages = await adminGetAllMessages();

  return (
    <div>
      <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">Mesajlar</h1>
      <p className="mt-1 text-sm text-text-secondary">
        İletişim formundan gelen {messages.length} mesaj.
      </p>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gönderen</TableHead>
              <TableHead>Konu</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <MessageRow key={message.id} message={message} />
            ))}
            {messages.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-text-secondary">
                  Henüz mesaj yok.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
