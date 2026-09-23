import { ChevronRight } from "lucide-react";

export function CompareLinks() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {["Compare players", "Compare teams"].map((label) => (
        <a
          key={label}
          href="#"
          className="flex flex-1 items-center justify-between rounded-[var(--radius-card)] border border-card-border bg-surface px-4 py-3 text-sm font-semibold text-navy-900 shadow-[var(--shadow-card)] hover:bg-cream-50"
        >
          {label}
          <ChevronRight className="h-4 w-4 text-muted-500" />
        </a>
      ))}
    </div>
  );
}
