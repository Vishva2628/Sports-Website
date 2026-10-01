"use client";

import { ChevronDown, Star } from "lucide-react";
import { useState } from "react";
import type { LiveMatch } from "@/types/match";

const STATUS_STYLES: Record<LiveMatch["status"], string> = {
  live: "font-bold text-live-600",
  finished: "font-semibold uppercase text-muted-400",
  upcoming: "font-medium text-muted-600",
};

interface LeagueGroup {
  league: string;
  sourceProvider: string;
  matches: LiveMatch[];
}

function groupByLeague(matches: LiveMatch[]): LeagueGroup[] {
  const order: string[] = [];
  const byLeague = new Map<string, LiveMatch[]>();

  for (const match of matches) {
    if (!byLeague.has(match.league)) {
      byLeague.set(match.league, []);
      order.push(match.league);
    }
    byLeague.get(match.league)!.push(match);
  }

  return order.map((league) => ({
    league,
    sourceProvider: byLeague.get(league)![0].sourceProvider,
    matches: byLeague.get(league)!,
  }));
}

function leagueCode(league: string): string {
  const letters = league.match(/[A-Za-z]/g)?.join("") ?? "";
  return (letters.slice(0, 3) || "—").toUpperCase();
}

function formatKickoff(startTime: string): string {
  const date = new Date(startTime);
  if (Number.isNaN(date.getTime())) return "NA";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

interface MatchRowProps {
  match: LiveMatch;
  selected: boolean;
  onSelect: (id: string) => void;
}

function MatchRow({ match, selected, onSelect }: MatchRowProps) {
  const timeLabel =
    match.status === "live"
      ? (match.minute ?? "NA")
      : match.status === "finished"
        ? "FT"
        : formatKickoff(match.startTime);

  return (
    <button
      onClick={() => onSelect(match.id)}
      className={`flex w-full items-center gap-2.5 px-3 py-1.5 text-left hover:bg-cream-50 ${
        selected ? "bg-brand-50" : ""
      }`}
    >
      <span className={`w-11 shrink-0 text-2xs tabular-nums ${STATUS_STYLES[match.status]}`}>
        {timeLabel}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="truncate text-sm text-navy-900">{match.homeTeam}</span>
          <span className="text-sm font-semibold tabular-nums text-navy-900">
            {match.homeScore ?? "NA"}
          </span>
        </span>
        <span className="flex items-center justify-between gap-2">
          <span className="truncate text-sm text-navy-900">{match.awayTeam}</span>
          <span className="text-sm font-semibold tabular-nums text-navy-900">
            {match.awayScore ?? "NA"}
          </span>
        </span>
      </span>

      <Star
        onClick={(e) => e.stopPropagation()}
        className="h-3.5 w-3.5 shrink-0 text-muted-400 hover:text-brand-500"
      />
    </button>
  );
}

interface GroupCardProps {
  group: LeagueGroup;
  selectedMatchId: string | null;
  onSelectMatch: (id: string) => void;
}

function GroupCard({ group, selectedMatchId, onSelectMatch }: GroupCardProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="border-b border-card-border last:border-b-0">
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-navy-100 text-[10px] font-bold text-navy-600">
          {leagueCode(group.league)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-navy-900">
            {group.league}
          </span>
          <span className="block text-2xs text-muted-500">{group.sourceProvider}</span>
        </span>
        <span className="shrink-0 rounded-full bg-cream-200 px-1.5 py-0.5 text-2xs font-semibold text-muted-600">
          {group.matches.length}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-500 transition-transform ${
            collapsed ? "-rotate-90" : ""
          }`}
        />
      </button>

      {!collapsed && (
        <div className="pb-1.5">
          {group.matches.map((match) => (
            <MatchRow
              key={match.id}
              match={match}
              selected={match.id === selectedMatchId}
              onSelect={onSelectMatch}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface LiveAndTodayProps {
  matches: LiveMatch[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  selectedMatchId: string | null;
  onSelectMatch: (id: string) => void;
}

export function LiveAndToday({
  matches,
  loading,
  error,
  refetch,
  selectedMatchId,
  onSelectMatch,
}: LiveAndTodayProps) {
  return (
    <div className="rounded-[var(--radius-card)] border border-card-border bg-surface shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between px-3 py-2.5">
        <h2 className="text-sm font-bold text-navy-900">Live &amp; Today</h2>
        <a href="#" className="text-2xs font-semibold text-brand-500">
          View All
        </a>
      </div>

      {loading ? (
        <div className="border-t border-card-border px-3 py-6 text-center text-sm text-muted-500">
          Loading matches…
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-2 border-t border-card-border px-3 py-6 text-center">
          <p className="text-sm text-muted-600">{error}</p>
          <button
            onClick={refetch}
            className="rounded-full bg-navy-900 px-3 py-1 text-2xs font-semibold text-white"
          >
            Retry
          </button>
        </div>
      ) : matches.length === 0 ? (
        <div className="border-t border-card-border px-3 py-6 text-center text-sm text-muted-500">
          No matches found.
        </div>
      ) : (
        <div className="border-t border-card-border">
          {groupByLeague(matches).map((group) => (
            <GroupCard
              key={group.league}
              group={group}
              selectedMatchId={selectedMatchId}
              onSelectMatch={onSelectMatch}
            />
          ))}
        </div>
      )}
    </div>
  );
}
