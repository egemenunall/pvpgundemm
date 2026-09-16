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
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#4a121a] bg-[#2a0e17] text-[#d49a36]">
        <Swords className="h-4 w-4" />
      </span>
      <span className="font-heading text-[15px] font-bold tracking-tight text-[#f8fafc]">
        PVP<span className="text-[#d49a36]">Gündem</span>
      </span>
    </Link>
  );
}
