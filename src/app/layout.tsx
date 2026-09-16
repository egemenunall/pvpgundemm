import type { Metadata } from "next";
import { Bitter, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const bitter = Bitter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bitter",
  display: "swap",
  weight: ["700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pvpgundem.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PVPGündem — Bu hafta açılan Metin2 PvP serverları",
    template: "%s | PVPGündem",
  },
  description:
    "Türkiye'deki Metin2 PvP serverlarını takip edin. Bu hafta açılan ve aktif serverları, açılış tarihi ve saatiyle PVPGündem'de bulun.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "PVPGündem",
    title: "PVPGündem — Bu hafta açılan Metin2 PvP serverları",
    description:
      "Türkiye'deki Metin2 PvP serverlarını takip edin. Bu hafta açılan ve aktif serverları keşfedin.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${manrope.variable} ${bitter.variable}`}>
      <body className="min-h-screen antialiased">
        {children}
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            style: {
              background: "var(--surface)",
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
            },
          }}
        />
      </body>
    </html>
  );
}
