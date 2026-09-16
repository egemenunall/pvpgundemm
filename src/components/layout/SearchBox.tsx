"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchBox({ className }: { className?: string }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = value.trim();
    router.push(query ? `/serverlar?q=${encodeURIComponent(query)}` : "/serverlar");
  }

  return (
    <form onSubmit={handleSubmit} className={cn("relative w-full", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="search"
        placeholder="Server ara..."
        className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/60"
      />
    </form>
  );
}
