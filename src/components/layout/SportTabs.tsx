import { CircleDot, Flame, Goal, Target, Timer, Zap } from "lucide-react";
import type { ComponentType } from "react";

const SPORTS: { label: string; icon: ComponentType<{ className?: string }> }[] = [
  { label: "Trending", icon: Flame },
  { label: "Football", icon: Goal },
  { label: "Cricket", icon: Target },
  { label: "Basketball", icon: CircleDot },
  { label: "Tennis", icon: Timer },
  { label: "Baseball", icon: Zap },
];

export function SportTabs() {
  return (
    <div className="flex items-center gap-2 overflow-x-auto border-b border-card-border bg-surface px-6 py-2.5">
      {SPORTS.map(({ label, icon: Icon }, i) => (
        <button
          key={label}
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium ${
            i === 0
              ? "bg-navy-900 text-white"
              : "text-navy-700 hover:bg-cream-100"
          }`}
        >
          <Icon
            className={`h-4 w-4 ${i === 0 ? "text-brand-400" : "text-brand-500"}`}
          />
          {label}
        </button>
      ))}
    </div>
  );
}
