"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AdvertisementRow } from "@/lib/types";
import { cn } from "@/lib/utils";

const AUTO_ROTATE_MS = 6000;

export function HeroSlider({ ads }: { ads: AdvertisementRow[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (ads.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % ads.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [ads.length]);

  const ad = ads[index];

  return (
    <div className="relative overflow-hidden rounded-md border border-border bg-surface">
      <span className="absolute left-2 top-2 z-10 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-text-muted">
        Reklam
      </span>

      {ad.link_url ? (
        <a href={ad.link_url} target="_blank" rel="noopener noreferrer sponsored" aria-label={ad.title}>
          <div className="relative aspect-[64/21] w-full">
            <Image
              src={ad.image_url}
              alt={ad.title}
              fill
              sizes="(max-width: 768px) 100vw, 1400px"
              className="object-cover transition-opacity duration-500"
              unoptimized
              priority={index === 0}
            />
          </div>
        </a>
      ) : (
        <div className="relative aspect-[64/21] w-full">
          <Image
            src={ad.image_url}
            alt={ad.title}
            fill
            sizes="(max-width: 768px) 100vw, 1400px"
            className="object-cover"
            unoptimized
            priority={index === 0}
          />
        </div>
      )}

      {ads.length > 1 && (
        <>
          <button
            aria-label="Önceki"
            onClick={() => setIndex((i) => (i - 1 + ads.length) % ads.length)}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/70 p-1.5 text-text-secondary hover:text-text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Sonraki"
            onClick={() => setIndex((i) => (i + 1) % ads.length)}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/70 p-1.5 text-text-secondary hover:text-text-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {ads.map((_, i) => (
              <button
                key={i}
                aria-label={`${i + 1}. reklama git`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-4 bg-accent" : "w-1.5 bg-text-muted/60"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
