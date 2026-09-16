import { Server, CheckCircle2, CalendarClock, Eye, Megaphone, FileText, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardStats } from "@/lib/data/dashboard";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    { label: "Toplam Server", value: stats.totalServers, icon: Server },
    { label: "Aktif Server", value: stats.activeServers, icon: CheckCircle2 },
    { label: "Bu Hafta Açılan", value: stats.thisWeekServers, icon: CalendarClock },
    { label: "Toplam Görüntülenme", value: stats.totalViews.toLocaleString("tr-TR"), icon: Eye },
    { label: "Aktif Reklam", value: stats.activeAds, icon: Megaphone },
    { label: "Yayınlanan Blog Yazısı", value: stats.blogPosts, icon: FileText },
    { label: "Yeni Mesaj", value: stats.newMessages, icon: Mail },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">Dashboard</h1>
      <p className="mt-1 text-sm text-text-secondary">Sitenin genel durumuna hızlı bakış.</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardContent className="flex items-center gap-3 pt-4 sm:pt-5">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-accent/10 text-accent">
                <card.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-lg font-semibold text-text-primary">{card.value}</p>
                <p className="truncate text-xs text-text-secondary">{card.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
