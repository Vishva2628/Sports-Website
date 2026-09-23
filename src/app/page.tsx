import { FilterBar } from "@/components/layout/FilterBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SportTabs } from "@/components/layout/SportTabs";
import { TickerBar } from "@/components/layout/TickerBar";
import { LiveAndToday } from "@/components/sidebar/LiveAndToday";
import { PromoCards } from "@/components/sidebar/PromoCards";
import { FeaturedMatch } from "@/components/center/FeaturedMatch";
import { HighlightedTransfers } from "@/components/center/HighlightedTransfers";
import { RankingCards } from "@/components/center/RankingCards";
import { TopPerformances } from "@/components/center/TopPerformances";
import { CompareLinks } from "@/components/center/CompareLinks";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-cream-100">
      <TickerBar />
      <SiteHeader />
      <SportTabs />
      <FilterBar />

      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-4 px-6 py-4 lg:grid-cols-[340px_1fr_300px]">
        <LiveAndToday />

        <div className="flex flex-col gap-4">
          <FeaturedMatch />
          <HighlightedTransfers />
          <RankingCards />
          <TopPerformances />
          <CompareLinks />
        </div>

        <PromoCards />
      </main>

      <SiteFooter />
    </div>
  );
}
