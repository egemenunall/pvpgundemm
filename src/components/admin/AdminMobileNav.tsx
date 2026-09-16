"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LayoutDashboard, Server, Megaphone, FileText, MessageSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Logo } from "@/components/layout/Logo";
import { logoutAction } from "@/app/admin/login/actions";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/servers", label: "Serverlar", icon: Server },
  { href: "/admin/advertisements", label: "Reklamlar", icon: Megaphone },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/messages", label: "Mesajlar", icon: MessageSquare },
];

export function AdminMobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-14 items-center justify-between border-b border-border px-4 md:hidden">
      <Logo />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Menü">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col gap-1">
          <SheetTitle>Admin Menü</SheetTitle>
          {LINKS.map((link) => {
            const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
            const Icon = link.icon;
            return (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium",
                    active ? "bg-accent/10 text-accent" : "text-text-secondary hover:bg-surface-hover"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              </SheetClose>
            );
          })}
          <form action={logoutAction} className="mt-2 border-t border-border pt-2">
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-text-secondary hover:bg-surface-hover"
            >
              <LogOut className="h-4 w-4" />
              Çıkış Yap
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
