import Image from "next/image";
import type { AdvertisementRow } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Tüm reklam tiplerinin ortak render mantığı: link varsa <a>, yoksa düz görsel.
 * Reklamların üstünde her zaman küçük "Reklam" etiketi olur (şeffaflık).
 */
export function AdFrame({
  ad,
  width,
  height,
  className,
  imageClassName,
  useMobileImage = false,
  sizes,
}: {
  ad: AdvertisementRow;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
  useMobileImage?: boolean;
  sizes?: string;
}) {
  const src = (useMobileImage && ad.mobile_image_url) || ad.image_url;

  const content = (
    <div className={cn("relative overflow-hidden rounded-md border border-border bg-surface", className)}>
      <span className="absolute left-2 top-2 z-10 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-text-muted">
        Reklam
      </span>
      <Image
        src={src}
        alt={ad.title}
        width={width}
        height={height}
        sizes={sizes}
        className={cn("h-full w-full object-cover", imageClassName)}
        unoptimized
      />
    </div>
  );

  if (ad.link_url) {
    return (
      <a
        href={ad.link_url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label={ad.title}
      >
        {content}
      </a>
    );
  }

  return content;
}
