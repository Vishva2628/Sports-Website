import "server-only";
import type { LiveMatch } from "@/types/match";
import type { TopScorer } from "@/types/player";

const BASE_URL = "https://v3.football.api-sports.io";

interface ApiFootballFixture {
  fixture: {
    id: number;
    date: string;
    status: { short: string; elapsed: number | null };
  };
  league: { name: string };
  teams: {
    home: { name: string };
    away: { name: string };
  };
  goals: { home: number | null; away: number | null };
}

interface ApiFootballResponse {
  response: ApiFootballFixture[];
  errors: Record<string, string> | unknown[];
}

// Codes per API-Football v3 docs — fields outside this set (xG, heatmaps,
// market value, etc.) are Paid Add-on / Sofascore-only per the schema
// reference and are intentionally not requested or mapped here.
const LIVE_STATUSES = new Set(["1H", "2H", "ET", "P", "LIVE", "HT", "BT"]);
const FINISHED_STATUSES = new Set(["FT", "AET", "PEN", "AWD", "WO"]);

function deriveStatus(short: string): LiveMatch["status"] {
  if (LIVE_STATUSES.has(short)) return "live";
  if (FINISHED_STATUSES.has(short)) return "finished";
  if (short === "NS" || short === "TBD") return "upcoming";
  return "finished";
}

export async function fetchFootballLive(): Promise<LiveMatch[]> {
  const apiKey = process.env.API_SPORTS_KEY;
  if (!apiKey) {
    throw new Error("Missing API_SPORTS_KEY environment variable");
  }

  const today = new Date().toISOString().slice(0, 10);
  const res = await fetch(`${BASE_URL}/fixtures?date=${today}`, {
    headers: { "x-apisports-key": apiKey },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API-Football request failed with status ${res.status}`);
  }

  const payload = (await res.json()) as ApiFootballResponse;
  const hasErrors = Array.isArray(payload.errors)
    ? payload.errors.length > 0
    : Object.keys(payload.errors ?? {}).length > 0;
  if (hasErrors) {
    throw new Error(`API-Football returned an error: ${JSON.stringify(payload.errors)}`);
  }

  return payload.response.map((fixture): LiveMatch => {
    const status = deriveStatus(fixture.fixture.status.short);
    return {
      id: `football-${fixture.fixture.id}`,
      sport: "football",
      status,
      league: fixture.league.name,
      homeTeam: fixture.teams.home.name,
      awayTeam: fixture.teams.away.name,
      homeScore: fixture.goals.home,
      awayScore: fixture.goals.away,
      minute:
        status === "live" && fixture.fixture.status.elapsed != null
          ? `${fixture.fixture.status.elapsed}'`
          : null,
      startTime: fixture.fixture.date,
      sourceProvider: "api-football",
    };
  });
}

// ---------------------------------------------------------------------------
// Top scorers — used for the "Top Performances" section
// ---------------------------------------------------------------------------

const TOPSCORERS_LEAGUE = 39; // Premier League
// API-Sports' free plan only allows seasons 2022-2024, not the current one —
// confirmed by hitting the endpoint directly. This is the most recent season
// available on this plan, not a "live" current-season leaderboard.
const TOPSCORERS_SEASON = 2024;

interface ApiFootballTopScorerEntry {
  player: { id: number; name: string };
  statistics: Array<{
    team: { name: string };
    games: { position: string | null; rating: string | null };
    goals: { total: number | null; assists: number | null };
  }>;
}

interface ApiFootballTopScorersResponse {
  response: ApiFootballTopScorerEntry[];
  errors: Record<string, string> | unknown[];
}

export async function fetchFootballTopScorers(): Promise<TopScorer[]> {
  const apiKey = process.env.API_SPORTS_KEY;
  if (!apiKey) {
    throw new Error("Missing API_SPORTS_KEY environment variable");
  }

  const res = await fetch(
    `${BASE_URL}/players/topscorers?league=${TOPSCORERS_LEAGUE}&season=${TOPSCORERS_SEASON}`,
    {
      headers: { "x-apisports-key": apiKey },
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error(`API-Football topscorers request failed with status ${res.status}`);
  }

  const payload = (await res.json()) as ApiFootballTopScorersResponse;
  const hasErrors = Array.isArray(payload.errors)
    ? payload.errors.length > 0
    : Object.keys(payload.errors ?? {}).length > 0;
  if (hasErrors) {
    throw new Error(`API-Football topscorers returned an error: ${JSON.stringify(payload.errors)}`);
  }

  return payload.response.slice(0, 5).map((entry): TopScorer => {
    const stats = entry.statistics[0];
    return {
      id: entry.player.id,
      name: entry.player.name,
      team: stats?.team.name ?? "NA",
      position: stats?.games.position ?? "NA",
      goals: stats?.goals.total ?? 0,
      assists: stats?.goals.assists ?? 0,
      rating: stats?.games.rating ? Number(stats.games.rating) : null,
    };
  });
}
