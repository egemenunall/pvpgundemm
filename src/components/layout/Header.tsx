import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { SearchBox } from "@/components/layout/SearchBox";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { MobileSearchToggle } from "@/components/layout/MobileSearchToggle";
import { FrameCorners } from "@/components/ui/frame-corners";

const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/serverlar", label: "Serverlar" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 px-4 py-2 sm:px-6">
      <div className="ornate-frame mx-auto flex h-14 max-w-[1400px] items-center gap-4 bg-surface/95 px-4 backdrop-blur sm:px-5">
        <FrameCorners />
        <Logo />

        <div className="hidden flex-1 justify-center md:flex md:max-w-md md:mx-auto">
          <SearchBox />
        </div>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm px-3 py-2 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
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
