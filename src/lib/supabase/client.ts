"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Client Component'lerde kullanılacak Supabase istemcisi (anon key).
 *
 * Not: Bu projede kurulu @supabase/supabase-js sürümünde `SupabaseClient<Database>`
 * generic'i (Database tipi doğru şekilde Tables/Views/Functions içerse bile)
 * `.from()` çağrılarını "never" tipine düşürüyor — üst düzey istemci sınıfının
 * generic varsayılan zinciriyle ilgili bir sorun. Bu yüzden istemci generic'siz
 * bırakılıyor; tip güvenliği src/lib/data/* fonksiyonlarının dönüş tipleri
 * (ServerRow[] vb.) üzerinden sağlanıyor.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
