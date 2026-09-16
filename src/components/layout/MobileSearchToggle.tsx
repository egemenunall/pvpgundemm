"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/layout/SearchBox";
import { cn } from "@/lib/utils";

export function MobileSearchToggle() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        aria-label={open ? "Aramayı kapat" : "Ara"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
      </Button>
      <div
        className={cn(
          "absolute right-0 top-full z-50 mt-2 w-[80vw] max-w-xs origin-top-right transition-all",
          open ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"
        )}
      >
        <SearchBox />
      </div>
    </div>
  );
}
