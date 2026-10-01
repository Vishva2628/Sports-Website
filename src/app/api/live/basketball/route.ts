import { NextResponse } from "next/server";
import { fetchBasketballLive } from "@/lib/providers/apiBasketball";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const matches = await fetchBasketballLive();
    return NextResponse.json({ matches });
  } catch (error) {
    console.error("[api/live/basketball]", error);
    return NextResponse.json(
      { matches: [], error: "Unable to load live basketball data right now." },
      { status: 502 },
    );
  }
}
