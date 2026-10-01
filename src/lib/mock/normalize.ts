import type { LiveMatch } from "@/types/match";
import {
  MOCK_ENDPOINTS,
  fetchLocalMockApi,
  type ApiSportsFixture,
  type ApiSportsResponse,
  type SportmonksFixture,
  type SportmonksResponse,
  type SimpleJsonMatch,
  type SimpleJsonResponse,
} from "./raw-data";

// ---------------------------------------------------------------------------
// Provider 1 — API-Sports style
// ---------------------------------------------------------------------------

const P1_LIVE = new Set(["1H", "2H", "OT", "HT"]);
const P1_FINISHED = new Set(["FT"]);

function p1Status(short: string): LiveMatch["status"] {
  if (P1_LIVE.has(short)) return "live";
  if (P1_FINISHED.has(short)) return "finished";
  if (short === "NS") return "upcoming";
  return "finished";
}

function normalizeFixture(fixture: ApiSportsFixture): LiveMatch {
  const status = p1Status(fixture.status.short);
  return {
    id: `mock-p1-${fixture.fixture_id}`,
    sport: fixture.sport,
    status,
    league: fixture.league.name,
    homeTeam: fixture.teams.home.name,
    awayTeam: fixture.teams.away.name,
    homeScore: fixture.goals.home,
    awayScore: fixture.goals.away,
    minute:
      status === "live" && fixture.status.elapsed != null
        ? `${fixture.status.elapsed}'`
        : null,
    startTime: fixture.date,
    sourceProvider: "mock-api-sports",
  };
}

export function normalizeApiSports(payload: ApiSportsResponse): LiveMatch[] {
  return payload.response.map(normalizeFixture);
}

// ---------------------------------------------------------------------------
// Provider 2 — Sportmonks style
// ---------------------------------------------------------------------------

function p2Status(shortName: string): LiveMatch["status"] {
  if (shortName === "INPLAY") return "live";
  if (shortName === "FT") return "finished";
  if (shortName === "NS") return "upcoming";
  return "finished";
}

function normalizeSportmonksFixture(fixture: SportmonksFixture): LiveMatch {
  const status = p2Status(fixture.state.short_name);
  const home = fixture.participants.find((p) => p.meta.location === "home");
  const away = fixture.participants.find((p) => p.meta.location === "away");

  return {
    id: `mock-p2-${fixture.id}`,
    sport: fixture.sport,
    status,
    league: fixture.league.name,
    homeTeam: home?.name ?? "TBD",
    awayTeam: away?.name ?? "TBD",
    homeScore: fixture.scores.home_score,
    awayScore: fixture.scores.away_score,
    minute:
      status === "live"
        ? (fixture.state.period ?? (fixture.state.minute != null ? `${fixture.state.minute}'` : null))
        : null,
    startTime: fixture.starting_at,
    sourceProvider: "mock-sportmonks",
  };
}

export function normalizeSportmonks(payload: SportmonksResponse): LiveMatch[] {
  return payload.data.map(normalizeSportmonksFixture);
}

// ---------------------------------------------------------------------------
// Provider 3 — simple JSON API style
// ---------------------------------------------------------------------------

/** "6-4, 3-6, 5-4" -> [6, 4] (first set only — the type only carries one score pair). */
function parseScore(scoreText: string): [number | null, number | null] {
  const firstSegment = scoreText.split(",")[0]?.trim();
  const match = firstSegment?.match(/^(\d+)\s*-\s*(\d+)$/);
  if (!match) return [null, null];
  return [Number(match[1]), Number(match[2])];
}

function normalizeSimpleJsonMatch(match: SimpleJsonMatch): LiveMatch {
  const [homeScore, awayScore] = parseScore(match.current_score);
  const status: LiveMatch["status"] = match.isLive
    ? "live"
    : homeScore === null && awayScore === null
      ? "upcoming"
      : "finished";

  return {
    id: `mock-p3-${match.matchId}`,
    sport: match.sport,
    status,
    league: match.sport === "tennis" ? "ATP / WTA Tour" : match.sport === "baseball" ? "MLB" : "Friendly",
    homeTeam: match.players.p1,
    awayTeam: match.players.p2,
    homeScore,
    awayScore,
    minute: status === "live" ? "LIVE" : null,
    startTime: match.startTime,
    sourceProvider: "mock-simple-json",
  };
}

export function normalizeSimpleJson(payload: SimpleJsonResponse): LiveMatch[] {
  return payload.matches.map(normalizeSimpleJsonMatch);
}

// ---------------------------------------------------------------------------
// Combined fetch — all three mock providers, resilient to a forced failure
// ---------------------------------------------------------------------------

export async function fetchAllMockMatches(): Promise<LiveMatch[]> {
  const results = await Promise.allSettled([
    fetchLocalMockApi(MOCK_ENDPOINTS.provider1).then(normalizeApiSports),
    fetchLocalMockApi(MOCK_ENDPOINTS.provider2).then(normalizeSportmonks),
    fetchLocalMockApi(MOCK_ENDPOINTS.provider3).then(normalizeSimpleJson),
  ]);

  const matches: LiveMatch[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      matches.push(...result.value);
    } else {
      console.warn("[mock provider failed]", result.reason);
    }
  }
  return matches;
}
