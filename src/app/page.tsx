"use client";

import { useState } from "react";
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
import { useSportMatches } from "@/lib/hooks/useSportMatches";
import type { SportTabKey } from "@/types/sport-tab";

function SectionUnavailable({ sport }: { sport: SportTabKey }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-card-border bg-cream-200 px-4 py-6 text-center text-sm text-muted-500">
      Transfers, rankings & top performances aren&apos;t tracked for {sport} yet.
    </div>
  );
}

export default function Home() {
  const [sport, setSport] = useState<SportTabKey>("trending");
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const { matches, loading, error, refetch } = useSportMatches(sport);

  function handleSportChange(next: SportTabKey) {
    setSport(next);
    setSelectedMatchId(null);
  }

  // Default to the first match of the current sport whenever there's no
  // explicit pick (or the old pick no longer exists in this sport's list) —
  // derived at render time so switching sports never needs an extra effect.
  const effectiveMatchId =
    selectedMatchId && matches.some((m) => m.id === selectedMatchId)
      ? selectedMatchId
      : (matches[0]?.id ?? null);

  const showFootballSections = sport === "trending" || sport === "football";

  return (
    <div className="flex min-h-screen flex-col bg-cream-100">
      <TickerBar />
      <SiteHeader />
      <SportTabs active={sport} onChange={handleSportChange} />
      <FilterBar />

      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-4 px-6 py-4 lg:grid-cols-[340px_1fr_300px]">
        <LiveAndToday
          matches={matches}
          loading={loading}
          error={error}
          refetch={refetch}
          selectedMatchId={effectiveMatchId}
          onSelectMatch={setSelectedMatchId}
        />

        <div className="flex flex-col gap-4">
          <FeaturedMatch
            matches={matches}
            selectedMatchId={effectiveMatchId}
            onSelectMatch={setSelectedMatchId}
            loading={loading}
            error={error}
            refetch={refetch}
          />
          {showFootballSections ? (
            <>
              <HighlightedTransfers />
              <RankingCards />
              <TopPerformances />
            </>
          ) : (
            <SectionUnavailable sport={sport} />
          )}
          <CompareLinks />
        </div>

        <PromoCards />
      </main>

      <SiteFooter />
    </div>
  );
}
