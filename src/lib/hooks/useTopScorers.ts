"use client";

import { useEffect, useState, useCallback } from "react";
import type { TopScorer } from "@/types/player";

interface UseTopScorersResult {
  players: TopScorer[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useTopScorers(): UseTopScorersResult {
  const [players, setPlayers] = useState<TopScorer[]>([]);
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
        const res = await fetch("/api/top-performers/football");
        const payload: { players?: TopScorer[]; error?: string } = await res.json();
        if (cancelled) return;

        if (!res.ok) {
          setError(payload.error ?? "Unable to load top performers.");
          setPlayers([]);
        } else {
          setPlayers(payload.players ?? []);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to reach the live data service.");
          setPlayers([]);
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

  return { players, loading, error, refetch };
}
