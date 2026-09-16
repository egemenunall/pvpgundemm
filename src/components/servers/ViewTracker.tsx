"use client";

import { useEffect, useRef } from "react";
import { trackServerView } from "@/app/(public)/server/[slug]/actions";

/**
 * Sayfa mount olduğunda bir kez görüntülenme kaydı gönderir.
 * useRef guard: React StrictMode'un geliştirme ortamında effect'i iki kez
 * çalıştırmasına karşı, aynı mount içinde tekrar tetiklenmeyi önler.
 */
export function ViewTracker({ slug }: { slug: string }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackServerView(slug).catch(() => {
      // Görüntülenme sayacı en kötü ihtimalle bir isabeti kaçırır; kullanıcı
      // deneyimini etkilememesi için sessizce yok sayılıyor.
    });
  }, [slug]);

  return null;
}
