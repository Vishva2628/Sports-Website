const TICKER_ITEMS = Array.from({ length: 10 }, (_, i) => i);

export function TickerBar() {
  return (
    <div className="w-full overflow-hidden border-b border-card-border bg-cream-50">
      <div className="flex w-max items-center gap-6 overflow-x-auto px-4 py-1.5 text-2xs text-muted-600">
        {TICKER_ITEMS.map((i) => (
          <div key={i} className="flex shrink-0 items-center gap-2">
            <span className="h-4 w-4 shrink-0 rounded-full bg-navy-100" />
            <span className="font-medium tabular-nums">22:18</span>
            <span className="h-4 w-4 shrink-0 rounded-full bg-navy-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
