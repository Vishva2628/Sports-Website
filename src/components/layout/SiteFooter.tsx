import type { SVGProps } from "react";

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.44 3.58 14.32 3.58c-2.34 0-3.94 1.43-3.94 4.05V9.9H7.66V13h2.72v8h3.12Z" />
    </svg>
  );
}

function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 3H21.6l-5.8 6.6L22.6 21h-5.35l-4.19-5.48L8.25 21H5.55l6.2-7.08L5.4 3h5.48l3.79 5.01L18.9 3Zm-.94 16.17h1.5L7.11 4.74H5.5l12.46 14.43Z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.5a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.5a2.5 2.5 0 0 0 1.8-1.8c.4-1.5.4-4.7.4-4.7ZM10 15V9l5.2 3-5.2 3Z" />
    </svg>
  );
}

const QUICK_LINKS = [
  "Live Scores",
  "Fixtures",
  "Results",
  "Transfer News",
  "Stats Center",
];

const LEGAL_LINKS = [
  "Privacy Policy",
  "Terms of Service",
  "Cookie Settings",
  "Editorial Standards",
  "Contact Us",
];

const SOCIAL_ICONS = [FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon];

export function SiteFooter() {
  return (
    <footer className="bg-brand-500 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-display text-lg font-bold uppercase tracking-wide">
            SportLive
          </span>
          <p className="mt-3 max-w-xs text-sm text-white/85">
            SportLive is the next-generation digital hub for absolute fan
            engagement. Get ultra-fast match analytics, live telemetry
            streams, and deep team analysis instantly.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            {QUICK_LINKS.map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-white">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">
            Legal
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            {LEGAL_LINKS.map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-white">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">
            Follow Us
          </h3>
          <div className="mt-3 flex gap-3">
            {SOCIAL_ICONS.map((Icon, i) => (
              <span
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 px-6 py-4 text-center text-2xs text-white/80">
        © 2026 SportLive. All rights reserved. Privacy Policy · Terms of
        Service
      </div>
    </footer>
  );
}
