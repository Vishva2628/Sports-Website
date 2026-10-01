export type SportTabKey =
  | "trending"
  | "football"
  | "cricket"
  | "basketball"
  | "tennis"
  | "baseball";

/** Sports with a real, wired-up upstream provider (see src/lib/providers). */
export type RemoteSport = "football" | "cricket" | "basketball";

export function isRemoteSport(sport: SportTabKey): sport is RemoteSport {
  return sport === "football" || sport === "cricket" || sport === "basketball";
}
