"use client";

import { useTopScorers } from "@/lib/hooks/useTopScorers";

// Real season-average ratings from API-Football rarely exceed ~8.0 (unlike
// single-match ratings), so the green/amber split sits lower than it would
// for a per-match rating.
function ratingStyle(rating: number | null) {
  if (rating === null) return "bg-cream-200 text-muted-500";
  return rating >= 7.5 ? "bg-live-50 text-live-600" : "bg-amber-400/20 text-amber-500";
}

export function TopPerformances() {
  const { players, loading, error, refetch } = useTopScorers();

  return (
    <div className="rounded-[var(--radius-card)] border border-card-border bg-surface shadow-[var(--shadow-card)]">
      <div className="px-4 py-2.5">
        <h2 className="text-sm font-bold text-navy-900">Top Performances</h2>
        <p className="text-2xs text-muted-500">
          Premier League top scorers · 2024/25 season (api-football)
        </p>
      </div>

      {loading ? (
        <div className="border-t border-card-border px-4 py-6 text-center text-sm text-muted-500">
          Loading top performers…
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-2 border-t border-card-border px-4 py-6 text-center">
          <p className="text-sm text-muted-600">{error}</p>
          <button
            onClick={refetch}
            className="rounded-full bg-navy-900 px-3 py-1 text-2xs font-semibold text-white"
          >
            Retry
          </button>
        </div>
      ) : players.length === 0 ? (
        <div className="border-t border-card-border px-4 py-6 text-center text-sm text-muted-500">
          No player data available.
        </div>
      ) : (
        <div className="border-t border-card-border">
          {players.map((p, i) => {
            const initials = p.name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();

            return (
              <div
                key={p.id}
                className="flex items-center gap-3 px-4 py-2 hover:bg-cream-50"
              >
                <span className="w-4 shrink-0 text-2xs font-bold text-muted-500">
                  {i + 1}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-100 text-2xs font-bold text-navy-600">
                  {initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-navy-900">
                    {p.name}
                  </span>
                  <span className="block text-2xs text-muted-500">
                    {p.position} • {p.team} • {p.goals} goals
                  </span>
                </span>
                <span
                  className={`shrink-0 rounded px-2 py-0.5 text-2xs font-bold tabular-nums ${ratingStyle(
                    p.rating,
                  )}`}
                >
                  {p.rating !== null ? p.rating.toFixed(1) : "NA"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
