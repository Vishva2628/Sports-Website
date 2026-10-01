export interface TopScorer {
  id: number;
  name: string;
  team: string;
  position: string;
  goals: number;
  assists: number;
  rating: number | null;
}
