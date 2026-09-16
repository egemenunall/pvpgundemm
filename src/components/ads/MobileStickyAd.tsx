import { getActiveAds } from "@/lib/data/ads";
import { MobileStickyAdClient } from "@/components/ads/MobileStickyAdClient";

export async function MobileStickyAd() {
  const ads = await getActiveAds("mobile");
  const ad = ads[0] ?? (await getActiveAds("side"))[0];
  if (!ad) return null;

  return <MobileStickyAdClient ad={ad} />;
}
