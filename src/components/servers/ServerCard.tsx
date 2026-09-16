import Link from "next/link";
import Image from "next/image";
import { Shield, Swords } from "lucide-react";
import type { ServerRow } from "@/lib/types";
import { formatDateTR, formatOpeningTime, relativeOpeningLabel, truncate } from "@/lib/utils";
import { VipBadge, SponsoredBadge } from "@/components/servers/ServerBadge";
import { serverTypeLabel } from "@/lib/utils";

export function ServerCard({ server }: { server: ServerRow }) {
  const tags = [serverTypeLabel(server.type), ...server.features].filter(Boolean).slice(0, 3);

  return (
    <Link
      href={`/server/${server.slug}`}
      className="group flex h-full flex-col justify-between overflow-hidden rounded-xl border border-[#4a121a] bg-[#130b10] shadow-lg transition-all hover:border-[#d49a36]/60"
    >
      <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-[#200a12]">
        <div className="relative h-full w-full">
          {server.logo_url ? (
            <Image
              src={server.logo_url}
              alt={server.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center gap-3 text-[#d49a36]/70">
              <Swords className="h-9 w-9" />
              <Shield className="h-9 w-9" />
            </div>
          )}

          {(server.is_vip || server.is_sponsored) && (
            <div className="absolute left-3 top-3 z-10 flex flex-wrap items-center gap-2">
              {server.is_vip && <VipBadge />}
              {server.is_sponsored && <SponsoredBadge />}
            </div>
          )}

          <span className="absolute right-3 top-3 z-10 rounded bg-[#991b1b] px-2 py-0.5 text-[11px] font-bold text-[#fff2a8]">
            {relativeOpeningLabel(server.opening_date)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="truncate text-lg font-bold text-[#f8fafc]">{server.name}</h3>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-[#5c1d24] bg-[#2a0e17] px-2.5 py-1 text-xs text-[#fca5a5]"
              >
                {truncate(tag, 18)}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-semibold text-[#f59e0b]">
            {formatDateTR(server.opening_date)} · {formatOpeningTime(server.opening_time)}
          </p>
          <span className="mt-3 block w-full rounded-lg bg-gradient-to-r from-[#991b1b] to-[#7f1d1d] py-2.5 text-center text-xs font-bold text-[#fff2a8] transition group-hover:brightness-110">
            Servera Git
          </span>
        </div>
      </div>
    </Link>
  );
}
