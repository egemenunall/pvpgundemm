import { getActiveAds } from "@/lib/data/ads";
import { AdFrame } from "@/components/ads/AdFrame";

/**
 * Ana içeriği (main) sarmalayan gerçek 3 sütunlu bir flex satırı —
 * geniş ekranlarda (>=1800px) solda/sağda sticky reklam sütunları,
 * dar ekranlarda sütunlar tamamen kaldırılır ve içerik tek başına
 * ortalanır. `AdFrame` üst reklamla birebir aynı çerçeve/etiket
 * mantığını kullanır, dolayısıyla görsel dil üst reklamla tutarlıdır.
 * Daha önceki `fixed` konumlandırma, dar geniş ekranlarda (1700-1900px)
 * içerikle çakışabiliyordu — burada gerçek layout akışı kullanılarak
 * bu çakışma tamamen ortadan kaldırılıyor.
 */
export async function SideAd({ children }: { children: React.ReactNode }) {
  const ads = await getActiveAds("side");
  const left = ads[0];
  const right = ads[1] ?? ads[0];

  return (
    <div className="mx-auto flex w-full max-w-[1920px] flex-1 justify-center">
      {left && (
        <aside className="sticky top-16 hidden h-fit w-[260px] flex-none justify-end pr-4 [@media(min-width:1800px)]:flex">
          <AdFrame ad={left} width={230} height={950} className="h-[70vh] max-h-[950px] w-[230px]" />
        </aside>
      )}
      {children}
      {right && (
        <aside className="sticky top-16 hidden h-fit w-[260px] flex-none justify-start pl-4 [@media(min-width:1800px)]:flex">
          <AdFrame ad={right} width={230} height={950} className="h-[70vh] max-h-[950px] w-[230px]" />
        </aside>
      )}
    </div>
  );
}
