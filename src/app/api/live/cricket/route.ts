import { NextResponse } from "next/server";
import { fetchCricketLive } from "@/lib/providers/cricApi";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const matches = await fetchCricketLive();
    return NextResponse.json({ matches });
  } catch (error) {
    console.error("[api/live/cricket]", error);
    return NextResponse.json(
      { matches: [], error: "Unable to load live cricket data right now." },
      { status: 502 },
    );
  }
}
