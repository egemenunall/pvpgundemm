import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ExternalLink, Eye, Swords } from "lucide-react";
import { getServerBySlug, getAllActiveServerSlugs } from "@/lib/data/servers";
import { VipBadge, SponsoredBadge, TypeBadge } from "@/components/servers/ServerBadge";
import { ViewTracker } from "@/components/servers/ViewTracker";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateTR, formatOpeningTime, relativeOpeningLabel, serverTypeLabel } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const server = await getServerBySlug(slug);
  if (!server) return { title: "Server bulunamadı" };

  const title = `${server.name} — ${serverTypeLabel(server.type)} | ${formatDateTR(server.opening_date)}`;
  const description =
    server.description || `${server.name} sunucusu ${formatDateTR(server.opening_date)} tarihinde açılıyor.`;

  return {
    title,
    description,
    alternates: { canonical: `/server/${server.slug}` },
    openGraph: {
      title,
      description,
      images: server.logo_url ? [server.logo_url] : undefined,
      type: "website",
    },
  };
}

export const revalidate = 60;
// Bilinmeyen (build sonrası eklenen) slug'lar için sayfa ilk istekte
// üretilip önbelleğe alınır — hibrit ISR.
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllActiveServerSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ServerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const server = await getServerBySlug(slug);
  if (!server) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: server.name,
    startDate: `${server.opening_date}T${server.opening_time}+03:00`,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    description: server.description,
    location: {
      "@type": "VirtualLocation",
      url: server.website_url ?? undefined,
    },
    image: server.logo_url ?? undefined,
  };

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-6 sm:px-6 sm:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ViewTracker slug={server.slug} />

      <div className="flex flex-wrap items-start gap-4">
        <div className="flex h-16 w-16 flex-none items-center justify-center overflow-hidden rounded-md border border-border bg-surface">
          {server.logo_url ? (
            <Image
              src={server.logo_url}
              alt={server.name}
              width={64}
              height={64}
              className="h-full w-full object-cover"
              unoptimized
            />
          ) : (
            <Swords className="h-6 w-6 text-text-muted" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {server.is_vip && <VipBadge />}
            {server.is_sponsored && <SponsoredBadge />}
          </div>
          <h1 className="mt-1 text-2xl font-semibold text-text-primary">{server.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-text-secondary">
            <span className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5 text-text-muted" />
              {server.view_count.toLocaleString("tr-TR")} görüntülenme
            </span>
            <Badge variant="seal">
              {relativeOpeningLabel(server.opening_date)}
            </Badge>
          </div>
        </div>

        <div className="flex flex-none flex-col gap-2 sm:flex-row">
          {server.website_url && (
            <Button asChild>
              <a href={server.website_url} target="_blank" rel="noopener noreferrer">
                Servera Git
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
          {server.discord_url && (
            <Button asChild variant="secondary">
              <a href={server.discord_url} target="_blank" rel="noopener noreferrer">
                Discord&apos;a Katıl
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-4 sm:pt-5">
            <h2 className="text-sm font-semibold text-text-primary">Server Bilgileri</h2>
            <dl className="mt-3 space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1.5 text-text-secondary">
                  <Calendar className="h-3.5 w-3.5" /> Açılış
                </dt>
                <dd className="text-text-primary">{formatDateTR(server.opening_date)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1.5 text-text-secondary">
                  <Clock className="h-3.5 w-3.5" /> Saat
                </dt>
                <dd className="text-text-primary">{formatOpeningTime(server.opening_time)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-text-secondary">Tür</dt>
                <dd>
                  <TypeBadge type={server.type} />
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {server.features.length > 0 && (
          <Card>
            <CardContent className="pt-4 sm:pt-5">
              <h2 className="text-sm font-semibold text-text-primary">Özellikler</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-text-secondary">
                {server.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {server.description && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-text-primary">Açıklama</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{server.description}</p>
        </div>
      )}

      <div className="mt-10">
        <Link href="/serverlar" className="text-sm text-accent hover:underline">
          ← Meydana dön
        </Link>
      </div>
    </div>
  );
}
