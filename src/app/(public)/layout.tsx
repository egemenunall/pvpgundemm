import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TopAd } from "@/components/ads/TopAd";
import { SideAd } from "@/components/ads/SideAd";
import { MobileStickyAd } from "@/components/ads/MobileStickyAd";
import { ParchmentEdges } from "@/components/layout/ParchmentEdges";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Parşömen kenar efekti — z-0, içeriğin arkasında kalır */}
      <ParchmentEdges />

      {/* Tüm içerik z-[1]: parşömen kenarlarının önünde, kendi içinde normal z-index hiyerarşisi korunur */}
      <div className="relative z-[1] flex min-h-screen flex-col">
        <TopAd />
        <Header />
        <SideAd>
          <main className="min-w-0 flex-1 pb-16 md:pb-0">{children}</main>
        </SideAd>
        <Footer />
        <MobileStickyAd />
      </div>
    </>
  );
}
