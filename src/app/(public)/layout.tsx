import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TopAd } from "@/components/ads/TopAd";
import { SideAd } from "@/components/ads/SideAd";
import { MobileStickyAd } from "@/components/ads/MobileStickyAd";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    /**
     * Dış katman: koyu/siyah arka plan — parşömen ortada harita/ferman gibi öne çıkar.
     * İç katman: parchment-bg.png ile kaplı max-width konteyner.
     * Padding: görsel kenarlarda worn/torn alanlar içine metin taşmaması için.
     */
    <div className="min-h-screen bg-[#0a0806] py-4 sm:py-6 lg:py-8">
      <div
        className="relative mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1440px] flex-col sm:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)]"
        style={{
          backgroundImage: "url('/parchment-bg.png')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* İçerik alanı — parşömen kenarına taşmama için yatay padding */}
        <div className="flex flex-1 flex-col px-6 sm:px-10 lg:px-14">
          <TopAd />
          <Header />
          <SideAd>
            <main className="min-w-0 flex-1 pb-16 md:pb-0">{children}</main>
          </SideAd>
          <Footer />
        </div>
        <MobileStickyAd />
      </div>
    </div>
  );
}
