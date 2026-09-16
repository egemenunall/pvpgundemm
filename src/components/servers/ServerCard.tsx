import Link from "next/link";
import Image from "next/image";
import { Swords, Calendar, Clock, ArrowRight, Eye, Globe, MessageCircle } from "lucide-react";
import type { ServerRow } from "@/lib/types";
import { formatDateTR, formatOpeningTime, relativeOpeningLabel, truncate } from "@/lib/utils";
import { VipBadge, SponsoredBadge, TypeBadge } from "@/components/servers/ServerBadge";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ServerCard({ server }: { server: ServerRow }) {
  const highlighted = server.is_vip || server.is_sponsored;
  const extraFeatures = Math.max(server.features.length - 2, 0);

  return (
    <Link
      href={`/server/${server.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-md border bg-surface shadow-[0_2px_10px_rgb(74_50_28/0.07)] transition-all hover:border-border-strong hover:shadow-[0_5px_18px_rgb(74_50_28/0.14)]",
        highlighted ? "border-accent/35" : "border-border"
      )}
    >
      <div className="relative aspect-[16/9] w-full flex-none overflow-hidden bg-background">
        {server.logo_url ? (
          <Image
            src={server.logo_url}
            alt={server.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
            className="h-full w-full object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Swords className="h-8 w-8 text-text-muted" />
          </div>
        )}

        {(server.is_vip || server.is_sponsored) && (
          <div className="absolute left-2 top-2 flex flex-wrap items-center gap-1.5">
            {server.is_vip && <VipBadge />}
            {server.is_sponsored && <SponsoredBadge />}
          </div>
        )}

        <span className="absolute right-2 top-2 rounded bg-background/85 px-1.5 py-0.5 text-[11px] font-medium text-text-primary">
          {relativeOpeningLabel(server.opening_date)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="truncate text-[15px] font-semibold text-text-primary group-hover:text-accent">
          {server.name}
        </h3>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-text-muted" />
            {formatDateTR(server.opening_date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-text-muted" />
            {formatOpeningTime(server.opening_time)}
          </span>
        </div>

        <div>
          <TypeBadge type={server.type} />
        </div>

        {server.description && (
          <p className="text-sm text-text-secondary">{truncate(server.description, 110)}</p>
        )}

        {server.features.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {server.features.slice(0, 2).map((feature) => (
              <Badge key={feature} variant="outline" className="font-normal">
                {truncate(feature, 20)}
              </Badge>
            ))}
            {extraFeatures > 0 && <span className="text-xs text-text-muted">+{extraFeatures}</span>}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-2 text-xs text-text-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1" title="Görüntülenme">
              <Eye className="h-3.5 w-3.5" />
              {server.view_count.toLocaleString("tr-TR")}
            </span>
            {server.website_url && <Globe className="h-3.5 w-3.5" aria-label="Web sitesi mevcut" />}
            {server.discord_url && <MessageCircle className="h-3.5 w-3.5" aria-label="Discord mevcut" />}
          </div>
          <span className="flex items-center gap-1 font-medium text-accent">
            Detayları Gör
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
