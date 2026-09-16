import { getActiveAds } from "@/lib/data/ads";
import { AdFrame } from "@/components/ads/AdFrame";

/**
 * Ana içeriği (main) sarmalayan gerçek 3 sütunlu bir flex satırı —
 * laptop ve üzeri (>=1280px / `xl`) solda/sağda sticky reklam sütunları.
 * Her iki tarafta da aynı reklam gösterilir.
 * Aside `self-start sticky top-[72px]` ile kart header'ın altına yapışır;
 * içindeki AdFrame `h-[calc(100vh-72px)]` ile yapışık haldeyken
 * görünür alanı tamamen doldurur.
 */
export async function SideAd({ children }: { children: React.ReactNode }) {
  const ads = await getActiveAds("side");
  const ad = ads[0];

  return (
    <div className="mx-auto flex w-full max-w-[1920px] flex-1 justify-center">
      {ad && (
        <aside className="self-start sticky top-[72px] hidden w-[180px] flex-none justify-end pr-3 xl:flex 2xl:w-[260px] 2xl:pr-4">
          <AdFrame
            ad={ad}
            width={230}
            height={950}
            className="h-[calc(100vh-72px)] w-[160px] 2xl:w-[230px]"
          />
        </aside>
      )}
      {children}
      {ad && (
        <aside className="self-start sticky top-[72px] hidden w-[180px] flex-none justify-start pl-3 xl:flex 2xl:w-[260px] 2xl:pl-4">
          <AdFrame
            ad={ad}
            width={230}
            height={950}
            className="h-[calc(100vh-72px)] w-[160px] 2xl:w-[230px]"
          />
        </aside>
      )}
    </div>
  );
}
