import { getActiveAds } from "@/lib/data/ads";
import { AdFrame } from "@/components/ads/AdFrame";

export async function TopAd() {
  const ads = await getActiveAds("top");
  const ad = ads[0];
  if (!ad) return null;

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6">
      <AdFrame
        ad={ad}
        width={1400}
        height={200}
        className="aspect-[7/1] w-full"
        sizes="(max-width: 768px) 100vw, 1400px"
      />
    </div>
  );
}
