import { getActiveAds } from "@/lib/data/ads";
import { HeroSlider } from "@/components/ads/HeroSlider";

export async function HeroAd() {
  const ads = await getActiveAds("hero");
  if (ads.length === 0) return null;

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
      <HeroSlider ads={ads} />
    </div>
  );
}
