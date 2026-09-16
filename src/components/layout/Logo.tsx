import Link from "next/link";
import { Swords } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 text-text-primary transition-colors hover:text-text-primary",
        className
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/10 text-accent">
        <Swords className="h-4 w-4" />
      </span>
      <span className="text-[15px] font-semibold tracking-tight">
        PVP<span className="text-accent">Gündem</span>
      </span>
    </Link>
  );
}
