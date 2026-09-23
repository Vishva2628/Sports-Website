"use client";

import { ChevronDown, Star } from "lucide-react";
import { useState } from "react";

type MatchStatus = "live" | "finished" | "upcoming";

interface Match {
  id: string;
  home: string;
  away: string;
  homeScore: number | null;
  awayScore: number | null;
  status: MatchStatus;
  time: string;
}

interface CompetitionGroup {
  id: string;
  league: string;
  country: string;
  code: string;
  matches: Match[];
}

const GROUPS: CompetitionGroup[] = [
  {
    id: "ucl",
    league: "UEFA Champions League",
    country: "Europe",
    code: "EUR",
    matches: [
      { id: "ucl-1", home: "Liverpool", away: "Atl. Madrid", homeScore: 2, awayScore: 1, status: "finished", time: "FT" },
      { id: "ucl-2", home: "PSG", away: "Slovan Bratislava", homeScore: 3, awayScore: 1, status: "live", time: "78'" },
      { id: "ucl-3", home: "Napoli", away: "Arsenal", homeScore: null, awayScore: null, status: "upcoming", time: "20:45" },
    ],
  },
  {
    id: "epl",
    league: "Premier League",
    country: "England",
    code: "ENG",
    matches: [
      { id: "epl-1", home: "Man City", away: "Everton", homeScore: 2, awayScore: 0, status: "live", time: "78'" },
      { id: "epl-2", home: "Wolves", away: "Chelsea", homeScore: 1, awayScore: 1, status: "live", time: "1H" },
      { id: "epl-3", home: "Brighton", away: "Man United", homeScore: null, awayScore: null, status: "upcoming", time: "18:00" },
    ],
  },
  {
    id: "laliga",
    league: "La Liga",
    country: "Spain",
    code: "ESP",
    matches: [
      { id: "laliga-1", home: "Real Madrid", away: "Getafe", homeScore: null, awayScore: null, status: "upcoming", time: "03:00" },
      { id: "laliga-2", home: "Barcelona", away: "Valencia", homeScore: null, awayScore: null, status: "upcoming", time: "05:15" },
    ],
  },
  {
    id: "ipl",
    league: "IPL Cricket",
    country: "India",
    code: "IND",
    matches: [
      { id: "ipl-1", home: "Mumbai Indians", away: "Chennai Super Kings", homeScore: null, awayScore: null, status: "upcoming", time: "20:00" },
      { id: "ipl-2", home: "Royal Challengers", away: "Kolkata Knight Riders", homeScore: 156, awayScore: 142, status: "live", time: "18.4 ov" },
    ],
  },
  {
    id: "nba",
    league: "NBA",
    country: "USA",
    code: "USA",
    matches: [
      { id: "nba-1", home: "Boston Celtics", away: "LA Lakers", homeScore: null, awayScore: null, status: "upcoming", time: "08:30" },
      { id: "nba-2", home: "Golden State Warriors", away: "Miami Heat", homeScore: 102, awayScore: 98, status: "finished", time: "Final" },
    ],
  },
];

const STATUS_STYLES: Record<MatchStatus, string> = {
  live: "font-bold text-live-600",
  finished: "font-semibold uppercase text-muted-400",
  upcoming: "font-medium text-muted-600",
};

function CompetitionGroupCard({ group }: { group: CompetitionGroup }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="border-b border-card-border last:border-b-0">
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-navy-100 text-[10px] font-bold text-navy-600">
          {group.code}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-navy-900">
            {group.league}
          </span>
          <span className="block text-2xs text-muted-500">{group.country}</span>
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
            <div
              key={match.id}
              className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-cream-50"
            >
              <span
                className={`w-11 shrink-0 text-2xs tabular-nums ${STATUS_STYLES[match.status]}`}
              >
                {match.time}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm text-navy-900">
                    {match.home}
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-navy-900">
                    {match.homeScore ?? ""}
                  </span>
                </span>
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm text-navy-900">
                    {match.away}
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-navy-900">
                    {match.awayScore ?? ""}
                  </span>
                </span>
              </span>

              <Star className="h-3.5 w-3.5 shrink-0 text-muted-400 hover:text-brand-500" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function LiveAndToday() {
  return (
    <div className="rounded-[var(--radius-card)] border border-card-border bg-surface shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between px-3 py-2.5">
        <h2 className="text-sm font-bold text-navy-900">Live &amp; Today</h2>
        <a href="#" className="text-2xs font-semibold text-brand-500">
          View All
        </a>
      </div>
      <div className="border-t border-card-border">
        {GROUPS.map((group) => (
          <CompetitionGroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}
