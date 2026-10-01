import { NextResponse } from "next/server";
import { fetchFootballLive } from "@/lib/providers/apiFootball";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const matches = await fetchFootballLive();
    return NextResponse.json({ matches });
  } catch (error) {
    console.error("[api/live/football]", error);
    return NextResponse.json(
      { matches: [], error: "Unable to load live football data right now." },
      { status: 502 },
    );
  }
}
