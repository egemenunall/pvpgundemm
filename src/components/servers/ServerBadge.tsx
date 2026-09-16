import { Star, Megaphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { serverTypeLabel } from "@/lib/utils";

export function VipBadge() {
  return (
    <Badge variant="seal">
      <Star className="h-3 w-3 fill-current" />
      VIP
    </Badge>
  );
}

export function SponsoredBadge() {
  return (
    <Badge variant="seal">
      <Megaphone className="h-3 w-3" />
      Sponsorlu
    </Badge>
  );
}

export function TypeBadge({ type }: { type: string }) {
  return <Badge variant="outline">{serverTypeLabel(type)}</Badge>;
}
