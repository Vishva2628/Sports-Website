import "server-only";
import type { LiveMatch } from "@/types/match";

const BASE_URL = "https://api.cricapi.com/v1";

interface CricApiScoreEntry {
  r: number;
  w: number;
  o: number;
  inning: string;
}

interface CricApiMatch {
  id: string;
  name: string;
  matchType: string;
  dateTimeGMT: string;
  teams: string[];
  score?: CricApiScoreEntry[];
  matchStarted: boolean;
  matchEnded: boolean;
}

interface CricApiResponse {
  status: string;
  data: CricApiMatch[];
}

/** "India vs West Indies, 2nd ODI, ... 2026" -> "2nd ODI, ... 2026" */
function extractLeague(name: string, matchType: string): string {
  const parts = name.split(",");
  return parts.length > 1 ? parts.slice(1).join(",").trim() : matchType.toUpperCase();
}

function findInningScore(score: CricApiScoreEntry[] | undefined, teamName: string | undefined): number | null {
  if (!score || !teamName) return null;
  const entry = [...score].reverse().find((s) => s.inning.startsWith(teamName));
  return entry ? entry.r : null;
}

export async function fetchCricketLive(): Promise<LiveMatch[]> {
  const apiKey = process.env.CRICAPI_KEY;
  if (!apiKey) {
    throw new Error("Missing CRICAPI_KEY environment variable");
  }

  const res = await fetch(`${BASE_URL}/currentMatches?apikey=${apiKey}&offset=0`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`CricAPI request failed with status ${res.status}`);
  }

  const payload = (await res.json()) as CricApiResponse;
  if (payload.status !== "success") {
    throw new Error(`CricAPI returned a non-success status: ${payload.status}`);
  }

  return payload.data.map((match): LiveMatch => {
    const status: LiveMatch["status"] = match.matchEnded
      ? "finished"
      : match.matchStarted
        ? "live"
        : "upcoming";

    const [home, away] = match.teams ?? [];
    const lastEntry = match.score?.[match.score.length - 1];

    return {
      id: `cricket-${match.id}`,
      sport: "cricket",
      status,
      league: extractLeague(match.name, match.matchType),
      homeTeam: home ?? "TBD",
      awayTeam: away ?? "TBD",
      homeScore: findInningScore(match.score, home),
      awayScore: findInningScore(match.score, away),
      minute: status === "live" && lastEntry ? `${lastEntry.o} ov` : null,
      startTime: match.dateTimeGMT.endsWith("Z") ? match.dateTimeGMT : `${match.dateTimeGMT}Z`,
      sourceProvider: "cricapi",
    };
  });
}
