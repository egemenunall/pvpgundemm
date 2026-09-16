-- Geliştirme/demo verisi. Production'a geçerken:
--   delete from public.servers where id in (select id from public.servers order by created_at desc limit 1000);
-- gibi bir sorguyla (veya Supabase Studio'dan) kolayca temizlenebilir.
-- Bu dosyayı `supabase db reset` ile veya SQL Editor'e yapıştırarak çalıştırabilirsiniz.

insert into public.servers
  (name, slug, opening_date, opening_time, type, description, features, website_url, discord_url, is_active, is_vip, is_sponsored, popularity_score, view_count)
values
  ('Lorgan2', 'lorgan2-emek', current_date + 2, '21:00', 'emek', 'Editsiz, dengeli ekonomi ile klasik emek sunucusu. 1-99 level aralığı.', array['1-99 level','Editsiz','Lonca sistemi','Oto av yok'], 'https://example.com/lorgan2', 'https://discord.gg/example1', true, true, false, 980, 15420),
  ('Nirvanamt2', 'nirvanamt2', current_date + 2, '20:00', 'emek', 'Orta zorlukta, uzun soluklu oynanış hedefleyen emek serverı.', array['1-99 level','Orta zorluk','Aktif GM desteği'], 'https://example.com/nirvana', 'https://discord.gg/example2', true, true, false, 940, 12300),
  ('Anka2', 'anka2', current_date + 3, '21:00', 'ws', 'CTE Yazılım ağının WS serverı, kısa dönem hızlı oynanış.', array['1-105 level','WS','Hızlı ilerleme'], 'https://example.com/anka2', 'https://discord.gg/example3', true, false, true, 610, 6800),
  ('Ekinoks2', 'ekinoks2', current_date + 4, '21:00', 'farm', 'Farm/pvp dengeli, düşük client limitli sakin sunucu.', array['1-99 level','Farm','Düşük client limiti'], 'https://example.com/ekinoks2', 'https://discord.gg/example4', true, false, false, 340, 2100),
  ('Saka2', 'saka2', current_date + 5, '20:30', 'pvp', 'Rekabetçi pvp odaklı, sık lonca savaşlı server.', array['1-90 level','PvP odaklı','Haftalık lonca savaşı'], 'https://example.com/saka2', 'https://discord.gg/example5', true, false, false, 290, 1740),
  ('Rubinum2', 'rubinum2', current_date + 5, '21:00', 'emek', 'Serinin ikinci sürümü, geri dönen oyuncular için tanıdık deneyim.', array['1-99 level','Klasik emek','Item çekilişleri'], null, 'https://discord.gg/example6', true, false, false, 260, 1520),
  ('Goktukmt2', 'goktukmt2', current_date + 6, '21:00', 'oldschool', 'Nostaljik oldschool oynanış, sade item sistemi.', array['1-99 level','Oldschool','Sade sistem'], 'https://example.com/gokturk', null, true, false, false, 180, 940),
  ('Mobile2 Alesta', 'mobile2-alesta', current_date - 3, '19:00', 'diger', 'mobile2.global platformunda ayrı bir world.', array['Mobil uyumlu','Cross-platform'], 'https://example.com/mobile2', 'https://discord.gg/example7', true, false, false, 150, 780),
  ('Aslanmt2', 'aslanmt2', current_date - 5, '21:00', 'emek', 'Aktif oyuncu kitlesine sahip, uzun süredir açık emek serverı.', array['1-99 level','Aktif topluluk'], 'https://example.com/aslan', 'https://discord.gg/example8', true, false, false, 210, 3200),
  ('Zarenmt2', 'zarenmt2', current_date - 10, '21:00', 'farm', 'Sakin tempolu, uzun vadeli farm serverı.', array['1-99 level','Uzun vade'], null, null, true, false, false, 90, 410)
on conflict (slug) do nothing;

insert into public.advertisements
  (title, type, image_url, mobile_image_url, link_url, start_date, end_date, is_active, display_order)
values
  ('PVPGündem lansman reklamı', 'top', 'https://placehold.co/1400x200/141416/d9a544?text=1400x200+Reklam+Alani', null, 'https://example.com', current_date - 1, current_date + 30, true, 1),
  ('Sol reklam örneği', 'side', 'https://placehold.co/230x950/141416/d9a544?text=230x950', 'https://placehold.co/320x100/141416/d9a544?text=320x100', 'https://example.com', current_date - 1, current_date + 30, true, 1),
  ('Sağ reklam örneği', 'side', 'https://placehold.co/230x950/141416/9a9aa2?text=230x950', 'https://placehold.co/320x100/141416/9a9aa2?text=320x100', 'https://example.com', current_date - 1, current_date + 30, true, 2),
  ('Hero slider 1', 'hero', 'https://placehold.co/1280x420/141416/d9a544?text=Hero+Reklam+1', null, 'https://example.com', current_date - 1, current_date + 30, true, 1),
  ('Hero slider 2', 'hero', 'https://placehold.co/1280x420/141416/9a9aa2?text=Hero+Reklam+2', null, 'https://example.com', current_date - 1, current_date + 30, true, 2)
on conflict do nothing;

insert into public.blog_posts
  (title, slug, excerpt, content, seo_title, seo_description, status, published_at)
values
  (
    'Bu hafta açılan Metin2 PvP serverları',
    'bu-hafta-acilan-metin2-pvp-serverlari',
    'Cuma ile Perşembe arasında açılışı planlanan öne çıkan serverları derledik.',
    E'## Bu hafta öne çıkanlar\n\nBu hafta açılan serverları takip etmek için PVPGündem ana sayfasını kontrol edebilirsiniz. Her Cuma güncellenen listede açılış tarihi, saati ve server türü net şekilde yer alıyor.',
    'Bu Hafta Açılan Metin2 PvP Serverları | PVPGündem',
    'Bu hafta açılan Metin2 PvP serverlarının güncel listesi, açılış tarihleri ve saatleriyle PVPGündem''de.',
    'published',
    now()
  ),
  (
    'Server seçerken nelere dikkat etmeli?',
    'server-secerken-nelere-dikkat-etmeli',
    'Yeni bir serverda karar vermeden önce kontrol etmeniz gereken temel noktalar.',
    E'## Neye bakmalı?\n\nAçılış tarihi, server türü, client limiti ve Discord aktivitesi gibi temel kriterler yeni bir serverda vakit geçirmeden önce göz önünde bulundurulmalı.',
    'Metin2 PvP Server Seçerken Dikkat Edilmesi Gerekenler',
    'Yeni bir Metin2 PvP serverına başlamadan önce kontrol etmeniz gereken kriterler.',
    'published',
    now() - interval '3 days'
  )
on conflict (slug) do nothing;
