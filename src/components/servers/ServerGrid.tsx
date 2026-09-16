import type { ServerRow } from "@/lib/types";
import { ServerCard } from "@/components/servers/ServerCard";

export function ServerGrid({
  servers,
  emptyMessage = "Bu kriterlere uyan server bulunamadı.",
}: {
  servers: ServerRow[];
  emptyMessage?: string;
}) {
  if (servers.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border py-12 text-center text-sm text-text-secondary">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {servers.map((server) => (
        <ServerCard key={server.id} server={server} />
      ))}
    </div>
  );
}
