import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroAd } from "@/components/ads/HeroAd";
import { ServerGrid } from "@/components/servers/ServerGrid";
import { BlogList } from "@/components/blog/BlogList";
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

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <HeroAd />

      <section className="mt-10">
        <div className="relative flex flex-col items-center gap-2 text-center">
          <div className="mx-auto">
            <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">
              Bu Hafta Açılan Serverlar
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              {formatDateTR(start)} — {formatDateTR(end)} arası açılışlar
            </p>
          </div>
          <Link
            href="/serverlar?segment=bu-hafta"
            className="flex items-center gap-1 text-sm font-medium text-accent hover:underline sm:absolute sm:bottom-0 sm:right-0"
          >
            Tümünü Gör
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-5">
          <ServerGrid
            servers={thisWeek}
            emptyMessage="Bu hafta için henüz duyurulmuş bir açılış yok. Yakında açılacakları serverlar sayfasından takip edebilirsiniz."
          />
        </div>
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-xl font-semibold text-text-primary sm:text-2xl">Aktif Serverlar</h2>
          <Link
            href="/serverlar?segment=aktif"
            className="flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            Tümünü Gör
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-5">
          <ServerGrid servers={active} />
        </div>
      </section>

      {posts.length > 0 && (
        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 className="text-xl font-semibold text-text-primary sm:text-2xl">PvP Gündem</h2>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-sm font-medium text-accent hover:underline"
            >
              Tüm Yazılar
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-5">
            <BlogList posts={posts} />
          </div>
        </section>
      )}
    </div>
  );
}
