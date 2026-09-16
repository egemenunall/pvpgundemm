import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Çerezlere/oturuma bağlı OLMAYAN, salt-okunur public istemci.
 *
 * Neden ayrı bir istemci: lib/supabase/server.ts'teki istemci `cookies()`
 * kullandığı için o istemciyi kullanan her sayfa Next.js tarafından otomatik
 * olarak dinamik (her istekte sunucu render) işaretleniyor — statik/ISR
 * avantajını (bkz. proje analiz raporundaki "hibrit ISR" önerisi) ortadan
 * kaldırıyor. Herkese açık, kişiselleştirilmemiş okumalar (server listesi,
 * reklamlar, blog) bu istemciyi kullanarak sayfaların `export const
 * revalidate = ...` ile statik üretilip zamanlanmış aralıklarla
 * yenilenmesini sağlar. Admin verisi ve kullanıcı oturumuna bağlı işlemler
 * hâlâ lib/supabase/server.ts'teki çerez tabanlı istemciyi kullanmalı.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
