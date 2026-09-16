import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service role istemcisi — RLS'i bypass eder.
 * SADECE sunucu tarafında (route handler / server action) ve
 * SADECE admin doğrulaması yapıldıktan sonra kullanılmalı.
 * Storage upload gibi işlemler için gereklidir.
 *
 * Bilerek generic'siz: bkz. lib/supabase/client.ts'teki not.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY veya NEXT_PUBLIC_SUPABASE_URL tanımlı değil (.env.local kontrol edin)."
    );
  }

  return createSupabaseClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
