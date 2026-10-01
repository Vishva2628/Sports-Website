import { ArrowRight } from "lucide-react";

interface Transfer {
  id: string;
  player: string;
  from: string;
  to: string;
  fee: string;
}

const TRANSFERS: Transfer[] = [
  { id: "t1", player: "Kylian Mbappé", from: "PSG", to: "RMA", fee: "€180M" },
  { id: "t2", player: "Julian Alvarez", from: "MCI", to: "ATM", fee: "€95M" },
  { id: "t3", player: "Douglas Luiz", from: "AVL", to: "JUV", fee: "€50M" },
  { id: "t4", player: "Dominic Solanke", from: "BOU", to: "TOT", fee: "€64M" },
  { id: "t5", player: "João Neves", from: "SLB", to: "PSG", fee: "€70M" },
];

function ClubBadge({ code }: { code: string }) {
  return (
    <span className="rounded bg-cream-200 px-1.5 py-0.5 text-2xs font-semibold text-muted-600">
      {code}
    </span>
  );
}

export function HighlightedTransfers() {
  return (
    <div className="rounded-[var(--radius-card)] border border-card-border bg-surface shadow-[var(--shadow-card)]">
      <div className="px-4 py-2.5">
        <h2 className="text-sm font-bold text-navy-900">
          Highlighted Transfers
        </h2>
        <p className="text-2xs text-muted-500">
          Preview data — transfer data isn&apos;t available from api-football,
          api-basketball, or cricapi.
        </p>
      </div>
      <div className="border-t border-card-border">
        {TRANSFERS.map((t) => {
          const initials = t.player
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

          return (
            <div
              key={t.id}
              className="flex items-center gap-3 px-4 py-2 hover:bg-cream-50"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-100 text-2xs font-bold text-navy-600">
                {initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-navy-900">
                  {t.player}
                </span>
                <span className="mt-0.5 flex items-center gap-1.5">
                  <ClubBadge code={t.from} />
                  <ArrowRight className="h-3 w-3 shrink-0 text-muted-400" />
                  <ClubBadge code={t.to} />
                </span>
              </span>
              <span className="shrink-0 text-sm font-bold tabular-nums text-live-600">
                {t.fee}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
