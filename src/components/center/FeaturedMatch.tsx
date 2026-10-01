"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { LiveMatch } from "@/types/match";

type Vote = "home" | "draw" | "away";

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function TeamCrest({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-100 text-lg font-bold text-navy-600">
        {initialsOf(name)}
      </div>
      <span className="text-sm font-semibold text-navy-900">{name}</span>
    </div>
  );
}

function formatDate(startTime: string): string {
  const date = new Date(startTime);
  if (Number.isNaN(date.getTime())) return "Date NA";
  return date.toLocaleDateString(undefined, { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
}

function formatTime(startTime: string): string {
  const date = new Date(startTime);
  if (Number.isNaN(date.getTime())) return "NA";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

interface FeaturedMatchProps {
  matches: LiveMatch[];
  selectedMatchId: string | null;
  onSelectMatch: (id: string) => void;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function FeaturedMatch({
  matches,
  selectedMatchId,
  onSelectMatch,
  loading,
  error,
  refetch,
}: FeaturedMatchProps) {
  const [vote, setVote] = useState<{ matchId: string; choice: Vote } | null>(null);

  if (loading) {
    return (
      <div className="rounded-[var(--radius-card)] border border-card-border bg-surface p-6 text-center text-sm text-muted-500 shadow-[var(--shadow-card)]">
        Loading featured match…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-card-border bg-surface p-6 text-center shadow-[var(--shadow-card)]">
        <p className="text-sm text-muted-600">{error}</p>
        <button
          onClick={refetch}
          className="rounded-full bg-navy-900 px-3 py-1 text-2xs font-semibold text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  const currentIndex = matches.findIndex((m) => m.id === selectedMatchId);
  const match = currentIndex >= 0 ? matches[currentIndex] : matches[0];

  if (!match) {
    return (
      <div className="rounded-[var(--radius-card)] border border-card-border bg-surface p-6 text-center text-sm text-muted-500 shadow-[var(--shadow-card)]">
        No featured match available for this sport right now.
      </div>
    );
  }

  const index = currentIndex >= 0 ? currentIndex : 0;

  function goTo(nextIndex: number) {
    const wrapped = (nextIndex + matches.length) % matches.length;
    onSelectMatch(matches[wrapped].id);
  }

  const hasScore = match.homeScore !== null || match.awayScore !== null;
  const selectedVote = vote?.matchId === match.id ? vote.choice : null;

  return (
    <div className="rounded-[var(--radius-card)] border border-card-border bg-surface shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between border-b border-card-border px-4 py-2.5">
        <span className="text-sm font-semibold text-navy-900">{match.league}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous featured match"
            disabled={matches.length < 2}
            className="rounded p-1 text-muted-600 hover:bg-cream-100 hover:text-navy-900 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next featured match"
            disabled={matches.length < 2}
            className="rounded p-1 text-muted-600 hover:bg-cream-100 hover:text-navy-900 disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 px-4 py-6">
        <TeamCrest name={match.homeTeam} />
        <div className="flex flex-col items-center gap-1">
          {hasScore ? (
            <span className="text-2xl font-bold tabular-nums text-navy-900">
              {match.homeScore ?? "NA"} : {match.awayScore ?? "NA"}
            </span>
          ) : (
            <span className="text-xs font-bold uppercase tracking-wide text-muted-400">VS</span>
          )}
          <span className="text-sm font-semibold text-navy-900">{formatDate(match.startTime)}</span>
          <span className="text-2xs text-muted-500">
            {match.status === "live"
              ? `LIVE${match.minute ? ` · ${match.minute}` : ""}`
              : match.status === "finished"
                ? "Full time"
                : formatTime(match.startTime)}
          </span>
        </div>
        <TeamCrest name={match.awayTeam} />
      </div>

      <div className="border-t border-card-border px-4 py-3">
        <p className="mb-2 text-2xs font-semibold text-muted-500">
          Who will win? Cast your vote
        </p>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { key: "home", label: match.homeTeam },
              { key: "draw", label: "Draw (X)" },
              { key: "away", label: match.awayTeam },
            ] as { key: Vote; label: string }[]
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setVote({ matchId: match.id, choice: key })}
              className={`truncate rounded-md px-2 py-2 text-sm font-semibold transition-colors ${
                selectedVote === key
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
        <p className="text-2xs font-semibold text-muted-500">Betting Odds</p>
        <p className="mt-1.5 text-sm text-muted-500">
          Odds aren&apos;t available — {match.sourceProvider} doesn&apos;t provide betting
          data on the current plan.
        </p>
      </div>
    </div>
  );
}
