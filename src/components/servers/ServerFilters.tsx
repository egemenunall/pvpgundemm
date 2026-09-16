"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVER_TYPES } from "@/lib/utils";
import { cn } from "@/lib/utils";

const SEGMENTS = [
  { value: "tumu", label: "Tüm Serverlar" },
  { value: "aktif", label: "Aktif Serverlar" },
  { value: "bu-hafta", label: "Bu Hafta Açılanlar" },
  { value: "yakinda", label: "Yakında Açılacaklar" },
] as const;

const SORTS = [
  { value: "onerilen", label: "Önerilen" },
  { value: "yeni", label: "Yeni Eklenen" },
  { value: "acilis", label: "Açılış Tarihi" },
  { value: "populerlik", label: "Popülerlik" },
] as const;

export function ServerFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [q, setQ] = useState(searchParams.get("q") ?? "");

  const segment = searchParams.get("segment") ?? "tumu";
  const type = searchParams.get("type") ?? "";
  const sort = searchParams.get("sort") ?? "onerilen";

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, router, searchParams]
  );

  return (
    <div className={cn("flex flex-col gap-4", isPending && "opacity-70")}>
      <div className="flex flex-wrap gap-2">
        {SEGMENTS.map((s) => (
          <button
            key={s.value}
            onClick={() => updateParams({ segment: s.value === "tumu" ? null : s.value })}
            className={cn(
              "rounded-sm border px-3.5 py-1.5 text-sm font-semibold transition-colors",
              segment === s.value
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-text-secondary hover:text-text-primary hover:border-border-strong"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <form
          className="relative flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            updateParams({ q: q.trim() || null });
          }}
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Server adı ara..."
            className="pl-9"
          />
        </form>

        <Select value={type || "all"} onValueChange={(v) => updateParams({ type: v === "all" ? null : v })}>
          <SelectTrigger className="sm:w-44">
            <SelectValue placeholder="Server türü" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Türler</SelectItem>
            {SERVER_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => updateParams({ sort: v === "onerilen" ? null : v })}>
          <SelectTrigger className="sm:w-44">
            <SelectValue placeholder="Sıralama" />
          </SelectTrigger>
          <SelectContent>
            {SORTS.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(q || type || sort !== "onerilen" || segment !== "tumu") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQ("");
              router.push(pathname);
            }}
          >
            Filtreleri Temizle
          </Button>
        )}
      </div>
    </div>
  );
}
