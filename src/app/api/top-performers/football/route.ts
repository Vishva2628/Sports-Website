import { NextResponse } from "next/server";
import { fetchFootballTopScorers } from "@/lib/providers/apiFootball";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const players = await fetchFootballTopScorers();
    return NextResponse.json({ players });
  } catch (error) {
    console.error("[api/top-performers/football]", error);
    return NextResponse.json(
      { players: [], error: "Unable to load top performers right now." },
      { status: 502 },
    );
  }
}
