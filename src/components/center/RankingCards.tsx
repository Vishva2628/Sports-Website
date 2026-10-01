interface RankingEntry {
  rank: number;
  code: string;
  name: string;
  points: string;
}

interface RankingList {
  title: string;
  updated: string;
  entries: RankingEntry[];
}

const RANKINGS: RankingList[] = [
  {
    title: "FIFA World Rankings",
    updated: "Updated Nov 2026",
    entries: [
      { rank: 1, code: "ARG", name: "Argentina", points: "1861.66" },
      { rank: 2, code: "FRA", name: "France", points: "1852.71" },
      { rank: 3, code: "ESP", name: "Spain", points: "1841.51" },
      { rank: 4, code: "ENG", name: "England", points: "1819.20" },
      { rank: 5, code: "BRA", name: "Brazil", points: "1798.34" },
    ],
  },
  {
    title: "UEFA Association Rankings",
    updated: "Updated Dec 2026",
    entries: [
      { rank: 1, code: "ENG", name: "England", points: "100.712" },
      { rank: 2, code: "ESP", name: "Spain", points: "95.284" },
      { rank: 3, code: "ITA", name: "Italy", points: "88.140" },
      { rank: 4, code: "GER", name: "Germany", points: "85.997" },
      { rank: 5, code: "FRA", name: "France", points: "80.512" },
    ],
  },
];

function RankingCard({ list }: { list: RankingList }) {
  return (
    <div className="flex-1 rounded-[var(--radius-card)] border border-card-border bg-surface shadow-[var(--shadow-card)]">
      <div className="px-4 py-2.5">
        <h2 className="text-sm font-bold text-navy-900">{list.title}</h2>
        <p className="text-2xs text-muted-500">{list.updated}</p>
        <p className="text-2xs text-muted-400">
          Preview data — not provided by our current API stack
        </p>
      </div>
      <div className="border-t border-card-border">
        {list.entries.map((entry) => (
          <div
            key={entry.code}
            className="flex items-center gap-3 px-4 py-1.5"
          >
            <span className="w-4 shrink-0 text-2xs font-bold text-muted-500">
              {entry.rank}
            </span>
            <span className="flex h-6 w-8 shrink-0 items-center justify-center rounded bg-navy-100 text-[10px] font-bold text-navy-600">
              {entry.code}
            </span>
            <span className="flex-1 truncate text-sm text-navy-900">
              {entry.name}
            </span>
            <span className="shrink-0 text-sm font-bold tabular-nums text-navy-900">
              {entry.points}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RankingCards() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {RANKINGS.map((list) => (
        <RankingCard key={list.title} list={list} />
      ))}
    </div>
  );
}
