import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/serverlar", label: "Serverlar" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-3 text-sm text-text-secondary">
            Türkiye&apos;deki Metin2 PvP serverlarını takip etmek için kullanılan
            güncel ve düzenli bir platform.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-2 px-4 py-4 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} PVPGündem. Tüm hakları saklıdır.</p>
          <p>Türkiye&apos;deki Metin2 PvP server gündemi.</p>
        </div>
      </div>
    </footer>
  );
}
