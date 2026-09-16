import type { ServerRow } from "@/lib/types";
import { ServerCard } from "@/components/servers/ServerCard";

export function ServerGrid({
  servers,
  emptyMessage = "Aradığın kriterlerde server yok; filtreleri biraz gevşetip tekrar bak.",
}: {
  servers: ServerRow[];
  emptyMessage?: string;
}) {
  if (servers.length === 0) {
    return (
      <div className="rounded-xl border border-[#4a121a] bg-[#130b10] py-9 text-center text-sm text-[#d4b4b8]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {servers.map((server) => (
        <ServerCard key={server.id} server={server} />
      ))}
    </div>
  );
}
