-- PVPGÜNDEM — İlk şema
-- Supabase SQL Editor'de veya `supabase db push` ile çalıştırın.

create extension if not exists "pgcrypto";

-- ============================================================
-- updated_at otomatik güncelleme fonksiyonu
-- ============================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- admin_profiles
-- Supabase Auth (auth.users) üzerine ince bir admin yetki katmanı.
-- Bir kullanıcı admin yapılmak isteniyorsa buraya satır eklenir.
-- ============================================================
create table public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  is_admin boolean not null default true,
  full_name text,
  created_at timestamptz not null default now()
);

-- RLS kontrollerinde tekrar tekrar kullanılacak yardımcı fonksiyon.
-- security definer: RLS'i bypass ederek admin_profiles'a bakabilir,
-- böylece admin_profiles'ın kendi RLS politikasında sonsuz döngü olmaz.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_profiles
    where user_id = auth.uid() and is_admin = true
  );
$$;

alter table public.admin_profiles enable row level security;

create policy "admin_profiles: kullanıcı kendi kaydını okuyabilir"
  on public.admin_profiles for select
  using (auth.uid() = user_id);

create policy "admin_profiles: adminler tümünü yönetir"
  on public.admin_profiles for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- servers
-- ============================================================
create table public.servers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  opening_date date not null,
  opening_time time not null default '21:00',
  type text not null default 'emek'
    check (type in ('emek', 'farm', 'pvp', 'ws', 'oldschool', 'diger')),
  description text not null default '',
  features text[] not null default '{}',
  website_url text,
  discord_url text,
  is_active boolean not null default true,
  is_vip boolean not null default false,
  is_sponsored boolean not null default false,
  popularity_score integer not null default 0,
  view_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index servers_opening_date_idx on public.servers (opening_date);
create index servers_is_active_idx on public.servers (is_active);
create index servers_type_idx on public.servers (type);
create index servers_slug_idx on public.servers (slug);
create index servers_vip_sponsored_idx on public.servers (is_vip desc, is_sponsored desc, popularity_score desc);

create trigger servers_set_updated_at
  before update on public.servers
  for each row execute function public.set_updated_at();

alter table public.servers enable row level security;

create policy "servers: herkes aktif serverları okuyabilir"
  on public.servers for select
  using (is_active = true or public.is_admin());

create policy "servers: adminler tam CRUD yapabilir"
  on public.servers for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- advertisements
-- ============================================================
create table public.advertisements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null check (type in ('top', 'side', 'hero', 'mobile')),
  image_url text not null,
  mobile_image_url text,
  link_url text,
  start_date date,
  end_date date,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index advertisements_type_active_idx on public.advertisements (type, is_active);
create index advertisements_dates_idx on public.advertisements (start_date, end_date);

create trigger advertisements_set_updated_at
  before update on public.advertisements
  for each row execute function public.set_updated_at();

alter table public.advertisements enable row level security;

create policy "advertisements: herkes aktif ve tarihi uygun reklamları okuyabilir"
  on public.advertisements for select
  using (
    public.is_admin()
    or (
      is_active = true
      and (start_date is null or start_date <= current_date)
      and (end_date is null or end_date >= current_date)
    )
  );

create policy "advertisements: adminler tam CRUD yapabilir"
  on public.advertisements for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- blog_posts
-- ============================================================
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  cover_image_url text,
  content text not null default '',
  seo_title text,
  seo_description text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index blog_posts_status_idx on public.blog_posts (status, published_at desc);
create index blog_posts_slug_idx on public.blog_posts (slug);

create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

alter table public.blog_posts enable row level security;

create policy "blog_posts: herkes yayınlananları okuyabilir"
  on public.blog_posts for select
  using (status = 'published' or public.is_admin());

create policy "blog_posts: adminler tam CRUD yapabilir"
  on public.blog_posts for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- contact_messages
-- ============================================================
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'yeni' check (status in ('yeni', 'okundu', 'cozuldu')),
  created_at timestamptz not null default now()
);

create index contact_messages_status_idx on public.contact_messages (status, created_at desc);

alter table public.contact_messages enable row level security;

create policy "contact_messages: herkes mesaj gönderebilir"
  on public.contact_messages for insert
  with check (true);

create policy "contact_messages: sadece adminler okuyabilir/günceller"
  on public.contact_messages for select
  using (public.is_admin());

create policy "contact_messages: sadece adminler günceller"
  on public.contact_messages for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "contact_messages: sadece adminler siler"
  on public.contact_messages for delete
  using (public.is_admin());

-- ============================================================
-- view_count güvenli artırım fonksiyonu
-- Client'ın doğrudan UPDATE yapmasını engellemek için RPC.
-- ============================================================
create or replace function public.increment_server_view(server_slug text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.servers
  set view_count = view_count + 1
  where slug = server_slug and is_active = true;
end;
$$;

grant execute on function public.increment_server_view(text) to anon, authenticated;
