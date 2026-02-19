import { NextRequest, NextResponse } from "next/server"
import { FEED_SOURCES, getSourcesByProvince, getSourceById } from "@/lib/feed-sources"
import { fetchAllFeeds, fetchFeed } from "@/lib/feed-parser"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get("city")
  const province = searchParams.get("province")

  try {
    let entries

    if (city) {
      const source = getSourceById(city)
      if (!source) {
        return NextResponse.json({ error: "City not found" }, { status: 404 })
      }
      entries = await fetchFeed(source)
    } else if (province) {
      const sources = getSourcesByProvince(province)
      if (sources.length === 0) {
        return NextResponse.json({ error: "Province not found" }, { status: 404 })
      }
      entries = await fetchAllFeeds(sources)
    } else {
      entries = await fetchAllFeeds(FEED_SOURCES)
    }

    return NextResponse.json(
      { entries, count: entries.length, lastUpdated: new Date().toISOString() },
      {
        headers: {
          "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
        },
      }
    )
  } catch (error) {
    console.error("Feed API error:", error)
    return NextResponse.json({ error: "Failed to fetch feeds" }, { status: 500 })
  }
}
