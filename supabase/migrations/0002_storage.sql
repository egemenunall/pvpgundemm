-- Storage bucketları: server-logos, advertisements, blog-images
-- Hepsi public-read (görseller sitede doğrudan gösterilecek),
-- yazma işlemleri sadece admin.

insert into storage.buckets (id, name, public)
values
  ('server-logos', 'server-logos', true),
  ('advertisements', 'advertisements', true),
  ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

create policy "storage: herkes public bucketlardan okuyabilir"
  on storage.objects for select
  using (bucket_id in ('server-logos', 'advertisements', 'blog-images'));

create policy "storage: adminler yükleyebilir"
  on storage.objects for insert
  with check (
    bucket_id in ('server-logos', 'advertisements', 'blog-images')
    and public.is_admin()
  );

create policy "storage: adminler güncelleyebilir"
  on storage.objects for update
  using (
    bucket_id in ('server-logos', 'advertisements', 'blog-images')
    and public.is_admin()
  );

create policy "storage: adminler silebilir"
  on storage.objects for delete
  using (
    bucket_id in ('server-logos', 'advertisements', 'blog-images')
    and public.is_admin()
  );
