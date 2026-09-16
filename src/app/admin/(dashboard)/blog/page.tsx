import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { PostRowActions } from "@/components/admin/PostRowActions";
import { adminGetAllPosts } from "@/lib/data/blog";
import { formatDateTR } from "@/lib/utils";

export default async function AdminBlogPage() {
  const posts = await adminGetAllPosts();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">Blog</h1>
          <p className="mt-1 text-sm text-text-secondary">{posts.length} yazı kayıtlı.</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="h-4 w-4" />
            Yazı Ekle
          </Link>
        </Button>
      </div>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Başlık</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>
                  <Badge variant={post.status === "published" ? "accent" : "muted"}>
                    {post.status === "published" ? "Yayınlandı" : "Taslak"}
                  </Badge>
                </TableCell>
                <TableCell className="text-text-secondary">
                  {formatDateTR(post.published_at ?? post.created_at)}
                </TableCell>
                <TableCell>
                  <PostRowActions post={post} />
                </TableCell>
              </TableRow>
            ))}
            {posts.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-text-secondary">
                  Henüz blog yazısı eklenmedi.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
