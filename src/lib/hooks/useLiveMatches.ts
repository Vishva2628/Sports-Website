"use client";

import { useEffect, useState, useCallback } from "react";
import type { LiveMatch } from "@/types/match";
import type { RemoteSport } from "@/types/sport-tab";

interface UseLiveMatchesResult {
  matches: LiveMatch[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/** Pass `null` to skip fetching entirely (e.g. sport has no wired provider). */
export function useLiveMatches(sport: RemoteSport | null): UseLiveMatchesResult {
  const [matches, setMatches] = useState<LiveMatch[]>([]);
  const [loading, setLoading] = useState(sport !== null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const refetch = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (sport === null) {
        setMatches([]);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/live/${sport}`);
        const payload: { matches?: LiveMatch[]; error?: string } = await res.json();
        if (cancelled) return;

        if (!res.ok) {
          setError(payload.error ?? "Unable to load live data.");
          setMatches([]);
        } else {
          setMatches(payload.matches ?? []);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to reach the live data service.");
          setMatches([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [sport, attempt]);

  return { matches, loading, error, refetch };
}
