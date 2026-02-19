import { FEED_SOURCES } from "@/lib/feed-sources"
import { fetchAllFeeds } from "@/lib/feed-parser"

export async function GET() {
  const entries = await fetchAllFeeds(FEED_SOURCES)

  const items = entries
    .slice(0, 50)
    .map(
      (entry) => `
    <item>
      <title><![CDATA[${entry.title}]]></title>
      <link>${escapeXml(entry.link)}</link>
      <description><![CDATA[${entry.summary}]]></description>
      <pubDate>${new Date(entry.published || entry.updated).toUTCString()}</pubDate>
      <guid isPermaLink="true">${escapeXml(entry.link)}</guid>
      <source url="${escapeXml(entry.source.url)}">${escapeXml(entry.source.name)}</source>
      <category>${escapeXml(entry.source.city)}, ${escapeXml(entry.source.province)}</category>
    </item>`
    )
    .join("")

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Canadian Travel Deals</title>
    <link>https://travel.canadian-ai.ca</link>
    <description>Aggregated flight deals from 13+ Canadian cities, updated every 15 minutes.</description>
    <language>en-ca</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://travel.canadian-ai.ca/feed.xml" rel="self" type="application/rss+xml"/>
    <ttl>15</ttl>
    ${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
    },
  })
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}
