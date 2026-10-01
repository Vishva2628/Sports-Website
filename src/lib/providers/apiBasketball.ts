import "server-only";
import type { LiveMatch } from "@/types/match";

const BASE_URL = "https://v1.basketball.api-sports.io";

interface ApiBasketballGame {
  id: number;
  date: string;
  status: { short: string; long: string };
  league: { name: string };
  teams: {
    home: { name: string };
    away: { name: string };
  };
  scores: {
    home: { total: number | null };
    away: { total: number | null };
  };
}

interface ApiBasketballResponse {
  response: ApiBasketballGame[];
  errors: Record<string, string> | unknown[];
}

const LIVE_STATUSES = new Set(["Q1", "Q2", "Q3", "Q4", "OT", "HT", "BT"]);
const FINISHED_STATUSES = new Set(["FT", "AOT", "AWD", "WO"]);

function deriveStatus(short: string): LiveMatch["status"] {
  if (LIVE_STATUSES.has(short)) return "live";
  if (FINISHED_STATUSES.has(short)) return "finished";
  if (short === "NS") return "upcoming";
  return "finished";
}

export async function fetchBasketballLive(): Promise<LiveMatch[]> {
  const apiKey = process.env.API_SPORTS_KEY;
  if (!apiKey) {
    throw new Error("Missing API_SPORTS_KEY environment variable");
  }

  // API-Basketball requires at least one filter param — unlike football it
  // does not support `live=all`, so we pull the full day and derive status.
  const today = new Date().toISOString().slice(0, 10);
  const res = await fetch(`${BASE_URL}/games?date=${today}`, {
    headers: { "x-apisports-key": apiKey },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API-Basketball request failed with status ${res.status}`);
  }

  const payload = (await res.json()) as ApiBasketballResponse;
  const hasErrors = Array.isArray(payload.errors)
    ? payload.errors.length > 0
    : Object.keys(payload.errors ?? {}).length > 0;
  if (hasErrors) {
    throw new Error(`API-Basketball returned an error: ${JSON.stringify(payload.errors)}`);
  }

  return payload.response.map((game): LiveMatch => {
    const status = deriveStatus(game.status.short);
    return {
      id: `basketball-${game.id}`,
      sport: "basketball",
      status,
      league: game.league.name,
      homeTeam: game.teams.home.name,
      awayTeam: game.teams.away.name,
      homeScore: game.scores.home.total,
      awayScore: game.scores.away.total,
      minute: status === "live" ? game.status.short : null,
      startTime: game.date,
      sourceProvider: "api-basketball",
    };
  });
}
