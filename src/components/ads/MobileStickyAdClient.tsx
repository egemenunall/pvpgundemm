"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { AdvertisementRow } from "@/lib/types";

const STORAGE_PREFIX = "pvpgundem_mobile_ad_dismissed_";

export function MobileStickyAdClient({ ad }: { ad: AdvertisementRow }) {
  const [dismissed, setDismissed] = useState(false);
  const storageKey = `${STORAGE_PREFIX}${ad.id}`;

  // Ziyaretçi reklamı kapattıysa, aynı oturum içinde (sayfa yenilense
  // veya başka bir sayfaya geçilse bile) tekrar göstermiyoruz. Reklam
  // kampanyası değişirse (farklı ad.id) otomatik olarak yeniden görünür.
  useEffect(() => {
    // Okuma işini bir microtask'a erteliyoruz: setState çağrısı effect
    // gövdesinde senkron değil, harici depolamadan (sessionStorage) gelen
    // bir sonucu işleyen bir callback içinde yapılmış oluyor.
    queueMicrotask(() => {
      try {
        if (sessionStorage.getItem(storageKey) === "1") {
          setDismissed(true);
        }
      } catch {
        // sessionStorage kullanılamıyorsa (gizli sekme, izin engeli vb.) sessizce yok say.
      }
    });
  }, [storageKey]);

  if (dismissed) return null;

  const src = ad.mobile_image_url ?? ad.image_url;

  const inner = (
    <div className="relative h-[70px] w-full overflow-hidden">
      <Image src={src} alt={ad.title} fill sizes="100vw" className="object-cover" unoptimized />
    </div>
  );

  function handleDismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      // yoksay
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface md:hidden">
      <div className="relative flex items-center">
        <span className="absolute left-1.5 top-1.5 z-10 rounded-sm bg-background/80 px-1 py-0.5 text-[9px] font-medium text-text-muted">
          Reklam
        </span>
        <div className="flex-1">
          {ad.link_url ? (
            <a href={ad.link_url} target="_blank" rel="noopener noreferrer sponsored" aria-label={ad.title}>
              {inner}
            </a>
          ) : (
            inner
          )}
        </div>
        <button
          aria-label="Reklamı kapat"
          onClick={handleDismiss}
          className="flex h-[70px] w-9 flex-none items-center justify-center border-l border-border text-text-muted hover:text-text-primary"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
