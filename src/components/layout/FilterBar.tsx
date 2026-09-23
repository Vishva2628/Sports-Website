import { ChevronLeft, ChevronRight } from "lucide-react";

const STATUS_FILTERS = ["All", "Live", "Finished", "Upcoming"];
const DAYS = ["Yesterday", "Today", "Tomorrow"];

export function FilterBar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-card-border bg-cream-100 px-6 py-2.5">
      <div className="flex items-center gap-2">
        {STATUS_FILTERS.map((label, i) => (
          <button
            key={label}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-sm font-medium ${
              i === 0
                ? "bg-navy-900 text-white"
                : "text-muted-600 hover:text-navy-900"
            }`}
          >
            {label === "Live" && (
              <span className="h-1.5 w-1.5 rounded-full bg-live-500" />
            )}
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1 text-sm">
        <button className="p-1 text-muted-600 hover:text-navy-900">
          <ChevronLeft className="h-4 w-4" />
        </button>
        {DAYS.map((day, i) => (
          <button
            key={day}
            className={`rounded-md px-3 py-1 font-medium ${
              i === 1
                ? "bg-surface text-navy-900 shadow-[var(--shadow-card)]"
                : "text-muted-600 hover:text-navy-900"
            }`}
          >
            {day}
          </button>
        ))}
        <button className="p-1 text-muted-600 hover:text-navy-900">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
