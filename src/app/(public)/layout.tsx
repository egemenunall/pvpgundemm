import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TopAd } from "@/components/ads/TopAd";
import { SideAd } from "@/components/ads/SideAd";
import { MobileStickyAd } from "@/components/ads/MobileStickyAd";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopAd />
      <Header />
      <SideAd>
        <main className="min-w-0 flex-1 pb-16 md:pb-0">{children}</main>
      </SideAd>
      <Footer />
      <MobileStickyAd />
    </div>
  );
}
