import { Suspense } from "react";
import type { Metadata } from "next";
import { ServerFilters } from "@/components/servers/ServerFilters";
import { ServerGrid } from "@/components/servers/ServerGrid";
import { getFilteredServers, type ServerFilters as Filters } from "@/lib/data/servers";

export const metadata: Metadata = {
  title: "Serverlar",
  description:
    "Türkiye'deki tüm Metin2 PvP serverlarını filtreleyerek keşfedin: aktif, bu hafta açılan ve yakında açılacak serverlar.",
};

interface PageProps {
  searchParams: Promise<{
    q?: string;
    type?: string;
    segment?: string;
    sort?: string;
  }>;
}

export default async function ServerlarPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters: Filters = {
    q: params.q,
    type: params.type,
    segment: (params.segment as Filters["segment"]) ?? "tumu",
    sort: (params.sort as Filters["sort"]) ?? "onerilen",
  };

  const servers = await getFilteredServers(filters);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">Serverlar</h1>
      <p className="mt-1 text-sm text-text-secondary">
        {servers.length} server listeleniyor.
      </p>

      <div className="mt-5">
        <Suspense fallback={<div className="h-24 animate-pulse rounded-md bg-surface" />}>
          <ServerFilters />
        </Suspense>
      </div>

      <div className="mt-6">
        <ServerGrid servers={servers} />
      </div>
    </div>
  );
}
