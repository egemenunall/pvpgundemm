"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Server,
  Megaphone,
  FileText,
  MessageSquare,
  LogOut,
  ExternalLink,
} from "lucide-react";
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

export function AdminSidebar({ fullName }: { fullName?: string | null }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 flex-none flex-col border-r border-border bg-surface">
      <div className="flex h-14 items-center border-b border-border px-4">
        <Logo />
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {LINKS.map((link) => {
          const active =
            link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-accent/10 text-accent"
                  : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary"
        >
          <ExternalLink className="h-4 w-4" />
          Siteyi Görüntüle
        </Link>
        {fullName && (
          <p className="truncate px-3 pt-2 text-xs text-text-muted">{fullName}</p>
        )}
        <form action={logoutAction}>
          <button
            type="submit"
            className="mt-1 flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary"
          >
            <LogOut className="h-4 w-4" />
            Çıkış Yap
          </button>
        </form>
      </div>
    </aside>
  );
}
