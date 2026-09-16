import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Başlıklar için antik/klasik Latin yazı tipi */
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "600", "700"],
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
    <html lang="tr" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="min-h-screen antialiased">
        {children}
        <Toaster
          theme="light"
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
