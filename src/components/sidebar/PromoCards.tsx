import { TrendingUp } from "lucide-react";

export function PromoCards() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[var(--radius-card)] bg-navy-900 p-4 text-white">
        <div className="flex items-center gap-1.5 text-2xs font-bold uppercase tracking-wide text-brand-400">
          <TrendingUp className="h-3.5 w-3.5" />
          SportLive Analyst
        </div>
        <h3 className="mt-2 text-lg font-bold leading-snug">
          Every hardcourt match. Fully analysed.
        </h3>
        <p className="mt-2 text-sm text-white/70">
          Get comprehensive match reports, predictive AI models, and
          real-time head-to-head simulations.
        </p>
        <button className="mt-4 w-full rounded-full bg-brand-500 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-600">
          Start Winning
        </button>
      </div>

      <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br from-navy-700 via-navy-900 to-navy-950 p-4 text-white">
        <span className="inline-block rounded bg-brand-500/20 px-2 py-0.5 text-2xs font-bold uppercase tracking-wide text-brand-400">
          Promoted
        </span>
        <h3 className="mt-3 text-lg font-bold uppercase leading-snug">
          Place bets on the Champions League
        </h3>
        <p className="mt-2 text-sm text-white/70">
          Enjoy premier odds, interactive live props, and instant payouts on
          all European match days.
        </p>
        <button className="mt-4 w-full rounded-full bg-brand-500 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-600">
          Bet Now
        </button>
      </div>
    </div>
  );
}
