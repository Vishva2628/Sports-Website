export type Sport =
  | "football"
  | "cricket"
  | "basketball"
  | "tennis"
  | "hockey"
  | "baseball";

export interface LiveMatch {
  id: string;
  sport: Sport;
  status: "live" | "upcoming" | "finished";
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  minute: string | null;
  startTime: string;
  sourceProvider: string;
}
