/**
 * Mock upstream datasets shaped like three real-world sports data providers.
 * Field names and nesting are deliberately inconsistent between them — that
 * mismatch is the whole point, since the normalization layer built on top of
 * this has to reconcile it.
 */

// ---------------------------------------------------------------------------
// Provider 1 — API-Sports style ("response" envelope, goals/status object)
// ---------------------------------------------------------------------------

export interface ApiSportsFixture {
  fixture_id: number;
  sport: "football" | "hockey";
  date: string;
  league: { id: number; name: string; country: string };
  teams: {
    home: { name: string };
    away: { name: string };
  };
  goals: { home: number | null; away: number | null };
  status: { short: string; elapsed: number | null };
}

export interface ApiSportsResponse {
  response: ApiSportsFixture[];
}

const PROVIDER_1_RAW: ApiSportsResponse = {
  response: [
    // UEFA Champions League
    {
      fixture_id: 1001,
      sport: "football",
      date: "2026-09-22T19:00:00Z",
      league: { id: 2, name: "UEFA Champions League", country: "Europe" },
      teams: { home: { name: "Liverpool" }, away: { name: "Atl. Madrid" } },
      goals: { home: 2, away: 1 },
      status: { short: "FT", elapsed: 90 },
    },
    {
      fixture_id: 1002,
      sport: "football",
      date: "2026-09-23T18:45:00Z",
      league: { id: 2, name: "UEFA Champions League", country: "Europe" },
      teams: { home: { name: "PSG" }, away: { name: "Slovan Bratislava" } },
      goals: { home: 3, away: 1 },
      status: { short: "2H", elapsed: 78 },
    },
    {
      fixture_id: 1003,
      sport: "football",
      date: "2026-09-23T20:45:00Z",
      league: { id: 2, name: "UEFA Champions League", country: "Europe" },
      teams: { home: { name: "Napoli" }, away: { name: "Arsenal" } },
      goals: { home: null, away: null },
      status: { short: "NS", elapsed: null },
    },
    {
      fixture_id: 1004,
      sport: "football",
      date: "2026-09-22T19:00:00Z",
      league: { id: 2, name: "UEFA Champions League", country: "Europe" },
      teams: { home: { name: "Sporting CP" }, away: { name: "Galatasaray" } },
      goals: { home: 3, away: 1 },
      status: { short: "FT", elapsed: 90 },
    },
    // Premier League
    {
      fixture_id: 1005,
      sport: "football",
      date: "2026-09-23T18:00:00Z",
      league: { id: 39, name: "Premier League", country: "England" },
      teams: { home: { name: "Arsenal" }, away: { name: "Chelsea" } },
      goals: { home: 2, away: 1 },
      status: { short: "2H", elapsed: 67 },
    },
    {
      fixture_id: 1006,
      sport: "football",
      date: "2026-09-23T18:00:00Z",
      league: { id: 39, name: "Premier League", country: "England" },
      teams: { home: { name: "Man City" }, away: { name: "Everton" } },
      goals: { home: 2, away: 0 },
      status: { short: "2H", elapsed: 78 },
    },
    {
      fixture_id: 1007,
      sport: "football",
      date: "2026-09-23T18:30:00Z",
      league: { id: 39, name: "Premier League", country: "England" },
      teams: { home: { name: "Wolves" }, away: { name: "Chelsea" } },
      goals: { home: 1, away: 1 },
      status: { short: "1H", elapsed: 43 },
    },
    {
      fixture_id: 1008,
      sport: "football",
      date: "2026-09-23T18:00:00Z",
      league: { id: 39, name: "Premier League", country: "England" },
      teams: { home: { name: "Brighton" }, away: { name: "Man United" } },
      goals: { home: null, away: null },
      status: { short: "NS", elapsed: null },
    },
    // La Liga
    {
      fixture_id: 1009,
      sport: "football",
      date: "2026-09-24T03:00:00Z",
      league: { id: 140, name: "La Liga", country: "Spain" },
      teams: { home: { name: "Real Madrid" }, away: { name: "Getafe" } },
      goals: { home: null, away: null },
      status: { short: "NS", elapsed: null },
    },
    {
      fixture_id: 1010,
      sport: "football",
      date: "2026-09-24T05:15:00Z",
      league: { id: 140, name: "La Liga", country: "Spain" },
      teams: { home: { name: "Barcelona" }, away: { name: "Valencia" } },
      goals: { home: null, away: null },
      status: { short: "NS", elapsed: null },
    },
    // NHL
    {
      fixture_id: 2001,
      sport: "hockey",
      date: "2026-09-23T23:00:00Z",
      league: { id: 57, name: "NHL", country: "USA" },
      teams: { home: { name: "Toronto Maple Leafs" }, away: { name: "Boston Bruins" } },
      goals: { home: 3, away: 3 },
      status: { short: "OT", elapsed: 62 },
    },
  ],
};

// ---------------------------------------------------------------------------
// Provider 2 — Sportmonks style ("data" envelope, participants array + meta)
// ---------------------------------------------------------------------------

export interface SportmonksParticipant {
  name: string;
  meta: { location: "home" | "away" };
}

export interface SportmonksFixture {
  id: string;
  sport: "basketball" | "cricket";
  league: { name: string; country: string };
  participants: SportmonksParticipant[];
  scores: { home_score: number | null; away_score: number | null };
  state: { short_name: string; minute: number | null; period: string | null };
  starting_at: string;
}

export interface SportmonksResponse {
  data: SportmonksFixture[];
}

const PROVIDER_2_RAW: SportmonksResponse = {
  data: [
    {
      id: "sm-501",
      sport: "basketball",
      league: { name: "NBA", country: "USA" },
      participants: [
        { name: "Boston Celtics", meta: { location: "home" } },
        { name: "LA Lakers", meta: { location: "away" } },
      ],
      scores: { home_score: 88, away_score: 82 },
      state: { short_name: "INPLAY", minute: null, period: "Q4" },
      starting_at: "2026-09-23T20:00:00Z",
    },
    {
      id: "sm-502",
      sport: "basketball",
      league: { name: "NBA", country: "USA" },
      participants: [
        { name: "Golden State Warriors", meta: { location: "home" } },
        { name: "Miami Heat", meta: { location: "away" } },
      ],
      scores: { home_score: null, away_score: null },
      state: { short_name: "NS", minute: null, period: null },
      starting_at: "2026-09-24T00:30:00Z",
    },
    {
      id: "sm-601",
      sport: "cricket",
      league: { name: "IPL", country: "India" },
      participants: [
        { name: "Mumbai Indians", meta: { location: "home" } },
        { name: "Chennai Super Kings", meta: { location: "away" } },
      ],
      scores: { home_score: 156, away_score: 142 },
      state: { short_name: "FT", minute: null, period: null },
      starting_at: "2026-09-23T14:30:00Z",
    },
  ],
};

// ---------------------------------------------------------------------------
// Provider 3 — simple JSON API style ("matches" envelope, p1/p2 + flat score)
// ---------------------------------------------------------------------------

export interface SimpleJsonMatch {
  matchId: string;
  sport: "tennis" | "football" | "baseball";
  players: { p1: string; p2: string };
  current_score: string;
  isLive: boolean;
  startTime: string;
}

export interface SimpleJsonResponse {
  matches: SimpleJsonMatch[];
}

const PROVIDER_3_RAW: SimpleJsonResponse = {
  matches: [
    {
      matchId: "m-901",
      sport: "tennis",
      players: { p1: "Novak Djokovic", p2: "Carlos Alcaraz" },
      current_score: "6-4, 3-6, 5-4",
      isLive: true,
      startTime: "2026-09-23T15:00:00Z",
    },
    {
      matchId: "m-902",
      sport: "tennis",
      players: { p1: "Iga Swiatek", p2: "Aryna Sabalenka" },
      current_score: "-",
      isLive: false,
      startTime: "2026-09-24T13:00:00Z",
    },
    {
      matchId: "m-903",
      sport: "football",
      players: { p1: "Real Madrid", p2: "Barcelona" },
      current_score: "2-2",
      isLive: false,
      startTime: "2026-09-22T19:00:00Z",
    },
    {
      matchId: "m-1001",
      sport: "baseball",
      players: { p1: "New York Yankees", p2: "Boston Red Sox" },
      current_score: "4-2",
      isLive: true,
      startTime: "2026-09-23T23:10:00Z",
    },
  ],
};

// ---------------------------------------------------------------------------
// Mock "network" layer — endpoints, artificial latency, forced failures
// ---------------------------------------------------------------------------

export const MOCK_ENDPOINTS = {
  provider1: "/api/mock/provider-1",
  provider2: "/api/mock/provider-2",
  provider3: "/api/mock/provider-3",
} as const;

export type ProviderKey = keyof typeof MOCK_ENDPOINTS;
type MockEndpoint = (typeof MOCK_ENDPOINTS)[ProviderKey];

const ENDPOINT_TO_PROVIDER: Record<MockEndpoint, ProviderKey> = {
  [MOCK_ENDPOINTS.provider1]: "provider1",
  [MOCK_ENDPOINTS.provider2]: "provider2",
  [MOCK_ENDPOINTS.provider3]: "provider3",
};

const providerFailureState: Record<ProviderKey, boolean> = {
  provider1: false,
  provider2: false,
  provider3: false,
};

/** Force (or clear) a simulated outage for one provider, for failover testing. */
export function setProviderFailure(provider: ProviderKey, shouldFail: boolean): void {
  providerFailureState[provider] = shouldFail;
}

export function resetProviderFailures(): void {
  for (const key of Object.keys(providerFailureState) as ProviderKey[]) {
    providerFailureState[key] = false;
  }
}

export class MockProviderError extends Error {
  constructor(public readonly provider: ProviderKey, endpoint: string) {
    super(`Mock API request to ${endpoint} failed (simulated outage for ${provider})`);
    this.name = "MockProviderError";
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Simulated network jitter, roughly 250-650ms, so callers see realistic latency. */
function simulatedLatency(): number {
  return 250 + Math.random() * 400;
}

export function fetchLocalMockApi(
  endpoint: typeof MOCK_ENDPOINTS.provider1,
): Promise<ApiSportsResponse>;
export function fetchLocalMockApi(
  endpoint: typeof MOCK_ENDPOINTS.provider2,
): Promise<SportmonksResponse>;
export function fetchLocalMockApi(
  endpoint: typeof MOCK_ENDPOINTS.provider3,
): Promise<SimpleJsonResponse>;
export async function fetchLocalMockApi(
  endpoint: MockEndpoint,
): Promise<ApiSportsResponse | SportmonksResponse | SimpleJsonResponse> {
  const provider = ENDPOINT_TO_PROVIDER[endpoint];
  await delay(simulatedLatency());

  if (providerFailureState[provider]) {
    throw new MockProviderError(provider, endpoint);
  }

  switch (provider) {
    case "provider1":
      return PROVIDER_1_RAW;
    case "provider2":
      return PROVIDER_2_RAW;
    case "provider3":
      return PROVIDER_3_RAW;
  }
}
