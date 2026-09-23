interface Performer {
  rank: number;
  name: string;
  position: string;
  team: string;
  rating: number;
}

const PERFORMERS: Performer[] = [
  { rank: 1, name: "Bukayo Saka", position: "Forward", team: "Arsenal", rating: 9.8 },
  { rank: 2, name: "Erling Haaland", position: "Forward", team: "Man City", rating: 9.5 },
  { rank: 3, name: "Cole Palmer", position: "Midfielder", team: "Chelsea", rating: 8.9 },
  { rank: 4, name: "Martin Ødegaard", position: "Midfielder", team: "Arsenal", rating: 7.6 },
  { rank: 5, name: "Declan Rice", position: "Midfielder", team: "Arsenal", rating: 7.2 },
];

function ratingStyle(rating: number) {
  return rating >= 8.5
    ? "bg-live-50 text-live-600"
    : "bg-amber-400/20 text-amber-500";
}

export function TopPerformances() {
  return (
    <div className="rounded-[var(--radius-card)] border border-card-border bg-surface shadow-[var(--shadow-card)]">
      <div className="px-4 py-2.5">
        <h2 className="text-sm font-bold text-navy-900">Top Performances</h2>
      </div>
      <div className="border-t border-card-border">
        {PERFORMERS.map((p) => {
          const initials = p.name
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

          return (
            <div
              key={p.rank}
              className="flex items-center gap-3 px-4 py-2 hover:bg-cream-50"
            >
              <span className="w-4 shrink-0 text-2xs font-bold text-muted-500">
                {p.rank}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-100 text-2xs font-bold text-navy-600">
                {initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-navy-900">
                  {p.name}
                </span>
                <span className="block text-2xs text-muted-500">
                  {p.position} • {p.team}
                </span>
              </span>
              <span
                className={`shrink-0 rounded px-2 py-0.5 text-2xs font-bold tabular-nums ${ratingStyle(
                  p.rating,
                )}`}
              >
                {p.rating.toFixed(1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
