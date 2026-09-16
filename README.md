# PVPGündem

Türkiye'deki Metin2 PvP serverlarını takip eden platform. Next.js (App Router) +
TypeScript + Tailwind CSS + Supabase (Postgres, Auth, Storage) ile geliştirildi.

## Kurulum

### 1. Bağımlılıklar

```bash
npm install
```

### 2. Supabase projesi

1. [supabase.com](https://supabase.com) üzerinde yeni bir proje oluşturun.
2. Project Settings > API sayfasından `Project URL`, `anon public` key ve
   `service_role` key değerlerini alın.
3. `.env.example` dosyasını `.env.local` olarak kopyalayıp bu değerleri girin.

```bash
cp .env.example .env.local
```

### 3. Veritabanı şeması

Supabase Dashboard > SQL Editor'e girip sırasıyla çalıştırın:

1. `supabase/migrations/0001_init.sql` — tablolar, RLS politikaları, fonksiyonlar
2. `supabase/migrations/0002_storage.sql` — storage bucketları (server-logos,
   advertisements, blog-images) ve storage RLS politikaları
3. (opsiyonel, demo veri için) `supabase/seed.sql`

> Supabase CLI kullanıyorsanız `supabase db push` ile de uygulayabilirsiniz.

### 4. İlk admin kullanıcısını oluşturma

1. Supabase Dashboard > Authentication > Users > "Add user" ile bir kullanıcı
   oluşturun (e-posta + şifre).
2. SQL Editor'de bu kullanıcıyı admin yapın (`<USER_UUID>` değerini
   Authentication > Users sayfasından kopyalayın):

```sql
insert into public.admin_profiles (user_id, is_admin, full_name)
values ('<USER_UUID>', true, 'Adınız');
```

3. `/admin/login` adresinden bu bilgilerle giriş yapabilirsiniz.

### 5. Geliştirme sunucusu

```bash
npm run dev
```

Site: http://localhost:3000 — Admin panel: http://localhost:3000/admin

## Yapı

- `src/app/(public)` — herkese açık sayfalar (ana sayfa, serverlar, server
  detay, blog, iletişim)
- `src/app/admin` — admin paneli (`/admin/login` korumasız, `(dashboard)`
  route grubu Supabase Auth + `admin_profiles.is_admin` ile korunuyor)
- `src/proxy.ts` — Next.js 16'da eski `middleware.ts`'in yerini alan dosya;
  oturum tazeleme ve admin rotalarına girişsiz erişimi engelleme
- `src/lib/data` — Supabase sorguları (public okuma + admin CRUD)
- `src/lib/supabase` — üç ayrı istemci: `client.ts` (browser), `server.ts`
  (RSC/Server Action, kullanıcı oturumu ile), `admin.ts` (service role,
  sadece storage upload gibi RLS-bypass gereken işlemler için)
- `supabase/migrations` — SQL şeması, RLS politikaları, storage bucketları
- `supabase/seed.sql` — demo veri (10 server, örnek reklamlar, 2 blog yazısı)

## Production'a geçerken

- `supabase/seed.sql` ile eklenen demo verileri Supabase Studio'dan veya
  `delete from public.servers; delete from public.advertisements; delete from public.blog_posts;`
  ile temizleyin.
- `.env.local` değerlerini production ortamınıza (Vercel > Environment
  Variables) taşıyın. `SUPABASE_SERVICE_ROLE_KEY`'i asla client'a expose
  etmeyin.
- `NEXT_PUBLIC_SITE_URL`'i gerçek domain'inize göre güncelleyin
  (sitemap/robots/OG metadata bunu kullanıyor).
- Reklam ve server logosu görselleri için Supabase Storage bucketları zaten
  public-read olarak ayarlı; admin panelinden yüklenen görseller otomatik
  olarak bu bucketlara gider.

## Notlar

- Next.js 16 kullanılıyor (Turbopack varsayılan derleyici, `params` /
  `searchParams` Promise, `middleware.ts` yerine `proxy.ts`). Cache
  Components / PPR (`cacheComponents`) bilinçli olarak **açılmadı** — MVP
  için klasik ISR (`revalidate` + `revalidatePath`) tercih edildi.
- Oy sistemi yok (ekip kararı); organik sıralama açılış tarihine göre
  kronolojik. VIP/Sponsorlu rozetleri her zaman şeffaf gösteriliyor.
- Ödeme altyapısı (iyzico/PayTR) bu MVP'ye dahil değil; vitrin paketleri şu an
  admin panelinden manuel olarak (tarih aralığı girilerek) yönetiliyor.
