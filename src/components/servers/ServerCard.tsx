import Link from "next/link";
import Image from "next/image";
import { Swords, Calendar, Clock, ArrowRight, Eye, Globe, MessageCircle } from "lucide-react";
import type { ServerRow } from "@/lib/types";
import { formatDateTR, formatOpeningTime, relativeOpeningLabel, truncate } from "@/lib/utils";
import { VipBadge, SponsoredBadge, TypeBadge } from "@/components/servers/ServerBadge";
import { Badge } from "@/components/ui/badge";
import { FrameCorners } from "@/components/ui/frame-corners";
import { cn } from "@/lib/utils";

export function ServerCard({ server }: { server: ServerRow }) {
  const isVip = server.is_vip;
  const primaryFeature = server.features[0];
  const extraFeatures = Math.max(server.features.length - (isVip ? 3 : 2), 0);

  return (
    <Link
      href={`/server/${server.slug}`}
      className={cn(
        "ornate-frame ornate-card group relative flex flex-col overflow-hidden bg-card transition-colors hover:bg-card-hover",
        isVip && "vip-server-card sm:col-span-2"
      )}
    >
      <FrameCorners />

      <div
        className={cn(
          "relative w-full flex-none overflow-hidden bg-background",
          isVip ? "aspect-[21/9] sm:aspect-[5/2]" : "aspect-[16/7]"
        )}
      >
        {server.logo_url ? (
          <Image
            src={server.logo_url}
            alt={server.name}
            fill
            sizes={
              isVip
                ? "(max-width: 640px) 100vw, (max-width: 1280px) 66vw, 50vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            }
            className="h-full w-full object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Swords className="h-8 w-8 text-text-muted" />
          </div>
        )}

        {(isVip || server.is_sponsored) && (
          <div className="absolute left-3 top-3 z-10 flex flex-wrap items-center gap-2">
            {isVip && <VipBadge />}
            {server.is_sponsored && <SponsoredBadge />}
          </div>
        )}

        <Badge variant="seal" className="absolute right-3 top-3 z-10">
          {relativeOpeningLabel(server.opening_date)}
        </Badge>

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-center gap-x-3 gap-y-1 bg-[#21160f]/88 px-3 py-1.5 text-[11px] font-medium text-[#f2e9d8]">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDateTR(server.opening_date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {formatOpeningTime(server.opening_time)}
          </span>
          {primaryFeature && <span className="border-l border-[#f2e9d8]/35 pl-3">{truncate(primaryFeature, 18)}</span>}
        </div>
      </div>

      <div className={cn("relative z-[2] flex flex-1 flex-col gap-1.5", isVip ? "p-3.5" : "p-3")}>
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-[15px] font-bold text-text-primary group-hover:text-accent">
            {server.name}
          </h3>
          <TypeBadge type={server.type} />
        </div>

        {isVip && server.description && (
          <p className="text-sm leading-snug text-text-secondary">{truncate(server.description, 110)}</p>
        )}

        {server.features.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {server.features.slice(1, isVip ? 3 : 2).map((feature) => (
              <Badge key={feature} variant="outline" className="font-normal">
                {truncate(feature, 20)}
              </Badge>
            ))}
            {extraFeatures > 0 && <span className="text-xs text-text-muted">+{extraFeatures}</span>}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-1 text-xs text-text-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1" title="Görüntülenme">
              <Eye className="h-3.5 w-3.5" />
              {server.view_count.toLocaleString("tr-TR")}
            </span>
            {server.website_url && <Globe className="h-3.5 w-3.5" aria-label="Web sitesi mevcut" />}
            {server.discord_url && <MessageCircle className="h-3.5 w-3.5" aria-label="Discord mevcut" />}
          </div>
          <span className="flex items-center gap-1 font-semibold text-accent">
            Servera Git
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
