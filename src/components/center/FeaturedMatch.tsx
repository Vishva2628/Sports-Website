"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type Vote = "home" | "draw" | "away";

interface Odds {
  bookmaker: string;
  home: number;
  draw: number;
  away: number;
}

interface FeaturedMatchData {
  competition: string;
  round: string;
  home: string;
  away: string;
  date: string;
  time: string;
  odds: Odds[];
}

const FEATURED_MATCHES: FeaturedMatchData[] = [
  {
    competition: "Premier League",
    round: "Round 16",
    home: "Arsenal",
    away: "Chelsea",
    date: "Sat, 12 Sep 2026",
    time: "19:30",
    odds: [
      { bookmaker: "Bet365", home: 1.95, draw: 3.6, away: 3.8 },
      { bookmaker: "Bwin", home: 1.91, draw: 3.5, away: 3.9 },
    ],
  },
  {
    competition: "La Liga",
    round: "Round 14",
    home: "Real Madrid",
    away: "Barcelona",
    date: "Sun, 14 Sep 2026",
    time: "20:00",
    odds: [
      { bookmaker: "Bet365", home: 2.1, draw: 3.4, away: 3.1 },
      { bookmaker: "Bwin", home: 2.05, draw: 3.35, away: 3.2 },
    ],
  },
];

function TeamCrest({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-100 text-lg font-bold text-navy-600">
        {initials}
      </div>
      <span className="text-sm font-semibold text-navy-900">{name}</span>
    </div>
  );
}

export function FeaturedMatch() {
  const [index, setIndex] = useState(0);
  const [vote, setVote] = useState<Vote | null>(null);
  const match = FEATURED_MATCHES[index];

  function goTo(next: number) {
    setIndex((next + FEATURED_MATCHES.length) % FEATURED_MATCHES.length);
    setVote(null);
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-card-border bg-surface shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between border-b border-card-border px-4 py-2.5">
        <span className="text-sm font-semibold text-navy-900">
          {match.competition} <span className="text-muted-500">•</span>{" "}
          {match.round}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous featured match"
            className="rounded p-1 text-muted-600 hover:bg-cream-100 hover:text-navy-900"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next featured match"
            className="rounded p-1 text-muted-600 hover:bg-cream-100 hover:text-navy-900"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 px-4 py-6">
        <TeamCrest name={match.home} />
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-bold uppercase tracking-wide text-muted-400">
            VS
          </span>
          <span className="text-sm font-semibold text-navy-900">
            {match.date}
          </span>
          <span className="text-2xs text-muted-500">{match.time}</span>
        </div>
        <TeamCrest name={match.away} />
      </div>

      <div className="border-t border-card-border px-4 py-3">
        <p className="mb-2 text-2xs font-semibold text-muted-500">
          Who will win? Cast your vote
        </p>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { key: "home", label: match.home },
              { key: "draw", label: "Draw (X)" },
              { key: "away", label: match.away },
            ] as { key: Vote; label: string }[]
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setVote(key)}
              className={`truncate rounded-md px-2 py-2 text-sm font-semibold transition-colors ${
                vote === key
                  ? "bg-brand-500 text-white"
                  : "bg-navy-900 text-white hover:bg-navy-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-card-border px-4 py-3">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-2xs font-semibold text-muted-500">
              <th className="pb-2 text-left font-semibold">Bookmaker</th>
              <th className="pb-2 text-right font-semibold">1</th>
              <th className="pb-2 text-right font-semibold">X</th>
              <th className="pb-2 text-right font-semibold">2</th>
            </tr>
          </thead>
          <tbody>
            {match.odds.map((row) => (
              <tr key={row.bookmaker} className="border-t border-card-border">
                <td className="py-1.5 font-medium text-navy-900">
                  {row.bookmaker}
                </td>
                <td className="py-1.5 text-right font-bold tabular-nums text-live-600">
                  {row.home.toFixed(2)}
                </td>
                <td className="py-1.5 text-right font-bold tabular-nums text-live-600">
                  {row.draw.toFixed(2)}
                </td>
                <td className="py-1.5 text-right font-bold tabular-nums text-live-600">
                  {row.away.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
