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
    <header className="sticky top-0 z-40 border-b border-[#4a121a] bg-[#11070c]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4 sm:px-6">
        <Logo />

        <div className="hidden flex-1 justify-center md:flex md:mx-auto md:max-w-md">
          <SearchBox />
        </div>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-[#d4b4b8] transition-colors hover:bg-[#2a0e17] hover:text-[#f8fafc]"
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
