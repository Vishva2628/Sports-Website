import { Bell, Flame, Search, Star } from "lucide-react";

const NAV_LINKS = [
  "Home",
  "Live Scores",
  "Schedule",
  "Leagues",
  "Teams",
  "Players",
  "News",
];

export function SiteHeader() {
  return (
    <header className="flex items-center gap-8 bg-brand-500 px-6 py-3">
      <div className="flex shrink-0 items-center gap-1.5">
        <Flame className="h-6 w-6 fill-navy-900 text-navy-900" />
        <span className="font-display text-xl font-bold uppercase tracking-wide text-navy-900">
          SportLive
        </span>
      </div>

      <nav className="hidden items-center gap-6 lg:flex">
        {NAV_LINKS.map((link, i) => (
          <a
            key={link}
            href="#"
            className={`text-sm font-medium ${
              i === 0
                ? "font-semibold text-navy-900"
                : "text-white/80 hover:text-white"
            }`}
          >
            {link}
          </a>
        ))}
      </nav>

      <div className="ml-auto flex shrink-0 items-center gap-4">
        <Search className="h-[18px] w-[18px] text-navy-900/90 hover:text-white" />
        <Star className="h-[18px] w-[18px] text-navy-900/90 hover:text-white" />
        <Bell className="h-[18px] w-[18px] text-navy-900/90 hover:text-white" />
        <button className="rounded-full bg-navy-900 px-5 py-2 text-sm font-semibold text-white">
          Login
        </button>
      </div>
    </header>
  );
}
