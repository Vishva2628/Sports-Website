"use client";

import { useEffect, useState, useCallback } from "react";
import type { LiveMatch } from "@/types/match";
import { fetchAllMockMatches } from "@/lib/mock/normalize";

interface UseMockMatchesResult {
  matches: LiveMatch[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useMockMatches(): UseMockMatchesResult {
  const [matches, setMatches] = useState<LiveMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const refetch = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const all = await fetchAllMockMatches();
        if (!cancelled) setMatches(all);
      } catch {
        if (!cancelled) {
          setError("Unable to load preview data.");
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
  }, [attempt]);

  return { matches, loading, error, refetch };
}
