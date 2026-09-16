import { requireAdmin } from "@/lib/auth/require-admin";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await requireAdmin();

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex">
        <AdminSidebar fullName={profile.full_name} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminMobileNav />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
