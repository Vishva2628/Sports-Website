"use client";

import type { LiveMatch } from "@/types/match";
import { isRemoteSport, type SportTabKey } from "@/types/sport-tab";
import { useLiveMatches } from "./useLiveMatches";
import { useMockMatches } from "./useMockMatches";

interface UseSportMatchesResult {
  matches: LiveMatch[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Single source of truth for "what matches belong to the currently selected
 * sport tab" — football/cricket/basketball hit the real provider APIs,
 * everything else (trending/tennis/baseball) falls back to the local mock
 * provider layer. Both the sidebar and the center column read from this so
 * they never show mismatched data.
 */
export function useSportMatches(sport: SportTabKey): UseSportMatchesResult {
  const remote = useLiveMatches(isRemoteSport(sport) ? sport : null);
  const mock = useMockMatches();

  if (isRemoteSport(sport)) {
    return remote;
  }

  const matches =
    sport === "trending" ? mock.matches : mock.matches.filter((m) => m.sport === sport);

  return {
    matches,
    loading: mock.loading,
    error: mock.error,
    refetch: mock.refetch,
  };
}
