import { getActiveAds } from "@/lib/data/ads";
import { AdFrame } from "@/components/ads/AdFrame";

/**
 * Ana içeriği (main) sarmalayan gerçek 3 sütunlu bir flex satırı —
 * laptop ve üzeri (>=1280px / `xl`) solda/sağda sticky reklam sütunları,
 * telefon ve küçük tabletlerde sütunlar kaldırılır (alt bant reklamı
 * `MobileStickyAd` o aralığı karşılar). Sütunlar flex akışında yer
 * aldığı için içerikle çakışmaz; dar laptoplarda reklam biraz daha
 * ince, geniş ekranlarda tam 230px gösterilir.
 */
export async function SideAd({ children }: { children: React.ReactNode }) {
  const ads = await getActiveAds("side");
  const left = ads[0];
  const right = ads[1] ?? ads[0];

  return (
    <div className="mx-auto flex w-full max-w-[1920px] flex-1 justify-center">
      {left && (
        <aside className="sticky top-16 hidden h-fit w-[180px] flex-none justify-end pr-3 xl:flex 2xl:w-[260px] 2xl:pr-4">
          <AdFrame
            ad={left}
            width={230}
            height={950}
            className="h-[60vh] max-h-[950px] w-[160px] 2xl:h-[70vh] 2xl:w-[230px]"
          />
        </aside>
      )}
      {children}
      {right && (
        <aside className="sticky top-16 hidden h-fit w-[180px] flex-none justify-start pl-3 xl:flex 2xl:w-[260px] 2xl:pl-4">
          <AdFrame
            ad={right}
            width={230}
            height={950}
            className="h-[60vh] max-h-[950px] w-[160px] 2xl:h-[70vh] 2xl:w-[230px]"
          />
        </aside>
      )}
    </div>
  );
}
