"use client";

import { CircleDot, Flame, Goal, Target, Timer, Zap } from "lucide-react";
import type { ComponentType } from "react";
import type { SportTabKey } from "@/types/sport-tab";

const SPORTS: { key: SportTabKey; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { key: "trending", label: "Trending", icon: Flame },
  { key: "football", label: "Football", icon: Goal },
  { key: "cricket", label: "Cricket", icon: Target },
  { key: "basketball", label: "Basketball", icon: CircleDot },
  { key: "tennis", label: "Tennis", icon: Timer },
  { key: "baseball", label: "Baseball", icon: Zap },
];

interface SportTabsProps {
  active: SportTabKey;
  onChange: (sport: SportTabKey) => void;
}

export function SportTabs({ active, onChange }: SportTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto border-b border-card-border bg-surface px-6 py-2.5">
      {SPORTS.map(({ key, label, icon: Icon }) => {
        const isActive = key === active;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium ${
              isActive
                ? "bg-navy-900 text-white"
                : "text-navy-700 hover:bg-cream-100"
            }`}
          >
            <Icon
              className={`h-4 w-4 ${isActive ? "text-brand-400" : "text-brand-500"}`}
            />
            {label}
          </button>
        );
      })}
    </div>
  );
}
