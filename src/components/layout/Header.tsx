import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { SearchBox } from "@/components/layout/SearchBox";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { MobileSearchToggle } from "@/components/layout/MobileSearchToggle";

const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/serverlar", label: "Serverlar" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4 sm:px-6">
        <Logo />

        <div className="hidden flex-1 justify-center md:flex md:max-w-md md:mx-auto">
          <SearchBox />
        </div>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:hidden">
          <MobileSearchToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
