import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroAd } from "@/components/ads/HeroAd";
import { ServerGrid } from "@/components/servers/ServerGrid";
import { BlogList } from "@/components/blog/BlogList";
import { CloudDivider, SectionHeading } from "@/components/layout/SectionHeading";
import { getThisWeekServers, getActiveServers } from "@/lib/data/servers";
import { getPublishedPosts } from "@/lib/data/blog";
import { getCurrentWeekRange, formatDateTR } from "@/lib/utils";

export const revalidate = 120;

export default async function HomePage() {
  const [thisWeek, active, posts] = await Promise.all([
    getThisWeekServers(),
    getActiveServers(8),
    getPublishedPosts(3),
  ]);

  const { start, end } = getCurrentWeekRange();
  const typePhrases = (
    [
      ["emek", "emek"],
      ["ws", "wslik"],
      ["farm", "farm"],
      ["pvp", "PvP"],
    ] as const
  )
    .map(([type, label]) => {
      const count = thisWeek.filter((server) => server.type === type).length;
      return count > 0 ? `${count}'ü ${label}` : null;
    })
    .filter((part): part is string => part !== null);
  const weeklySummary =
    thisWeek.length > 0
      ? `Bu hafta ${thisWeek.length} server açılıyor${typePhrases.length ? ` — ${typePhrases.join(", ")}` : ""}.`
      : "Bu hafta meydan sakin; yeni duyuruları bekliyoruz.";

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6 sm:py-6">
      <HeroAd />

      <section className="mt-8">
        <SectionHeading
          level="h1"
          title="Bu Hafta Ne Var?"
          featured
          description={
            <>
              <p>{weeklySummary}</p>
              <p className="mt-0.5 text-xs text-text-muted">
                {formatDateTR(start)} — {formatDateTR(end)}
              </p>
            </>
          }
          action={
            <Link
              href="/serverlar?segment=bu-hafta"
              className="flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
            >
              Hepsini Gör
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <div className="mt-4">
          <ServerGrid
            servers={thisWeek}
            emptyMessage="Bu hafta meydan sakin. Yeni server duyuruları geldiğinde burada olacak."
          />
        </div>
      </section>

      <CloudDivider className="mt-7" />

      <section className="mt-7">
        <SectionHeading
          title="Aktif Serverlar"
          action={
            <Link
              href="/serverlar?segment=aktif"
              className="flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
            >
              Hepsini Gör
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <div className="mt-4">
          <ServerGrid servers={active} />
        </div>
      </section>

      {posts.length > 0 && (
        <>
          <CloudDivider className="mt-7" />
          <section className="mt-7">
            <SectionHeading
              title="PvP Gündem"
              action={
                <Link
                  href="/blog"
                  className="flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                >
                  Hepsini Gör
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              }
            />
            <div className="mt-4">
              <BlogList posts={posts} />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
