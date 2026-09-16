"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { SearchBox } from "@/components/layout/SearchBox";

const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/serverlar", label: "Serverlar" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Menüyü aç">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-6">
        <SheetTitle>Menü</SheetTitle>
        <SearchBox />
        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
