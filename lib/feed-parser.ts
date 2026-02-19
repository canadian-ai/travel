import { type FeedSource } from "./feed-sources"

export interface FeedEntry {
  id: string
  title: string
  link: string
  summary: string
  published: string
  updated: string
  source: FeedSource
  imageUrl?: string
}

function extractTextContent(xmlString: string, tagName: string): string {
  const patterns = [
    new RegExp(`<${tagName}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tagName}>`, "i"),
    new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, "i"),
  ]
  for (const pattern of patterns) {
    const match = xmlString.match(pattern)
    if (match) return match[1].trim()
  }
  return ""
}

function extractAttribute(xmlString: string, tagName: string, attrName: string): string {
  const pattern = new RegExp(`<${tagName}[^>]*${attrName}="([^"]*)"`, "i")
  const match = xmlString.match(pattern)
  return match ? match[1] : ""
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#xD;/g, "\r")
    .replace(/&#xA;/g, "\n")
    .replace(/&nbsp;/g, " ")
}

function extractImageFromContent(content: string): string | undefined {
  // First try on the raw content (already decoded)
  let imgMatch = content.match(/<img[^>]+src="([^"]+)"/i)
  if (imgMatch) return imgMatch[1]

  // Decode HTML entities and try again (for Atom feeds with encoded HTML content)
  const decoded = decodeHtmlEntities(content)
  imgMatch = decoded.match(/<img[^>]+src="([^"]+)"/i)
  if (imgMatch) return imgMatch[1]

  // Try media:content
  const mediaMatch = content.match(/<media:content[^>]+url="([^"]+)"/i)
  if (mediaMatch) return mediaMatch[1]

  // Try enclosure
  const enclosureMatch = content.match(/<enclosure[^>]+url="([^"]+)"/i)
  if (enclosureMatch) return enclosureMatch[1]

  return undefined
}

function stripHtml(html: string): string {
  // First decode HTML entities so we can properly strip tags
  let text = decodeHtmlEntities(html)
  
  // Remove all HTML tags
  text = text.replace(/<[^>]*>/g, " ")
  
  // Clean up whitespace
  text = text.replace(/\s+/g, " ").trim()
  
  return text
}

function parseAtomEntry(entryXml: string, source: FeedSource): FeedEntry | null {
  try {
    const id = extractTextContent(entryXml, "id") || `${source.id}-${Date.now()}-${Math.random()}`
    const title = stripHtml(extractTextContent(entryXml, "title"))
    if (!title) return null

    const link =
      extractAttribute(entryXml, 'link[^>]*rel="alternate"', "href") ||
      extractAttribute(entryXml, "link", "href") ||
      ""

    const contentRaw =
      extractTextContent(entryXml, "content") ||
      extractTextContent(entryXml, "summary") ||
      ""

    const summary = stripHtml(contentRaw).slice(0, 300)
    const imageUrl = extractImageFromContent(contentRaw)

    const published = extractTextContent(entryXml, "published") || extractTextContent(entryXml, "updated") || ""
    const updated = extractTextContent(entryXml, "updated") || published

    return {
      id,
      title,
      link,
      summary,
      published,
      updated,
      source,
      imageUrl,
    }
  } catch {
    return null
  }
}

function parseRssItem(itemXml: string, source: FeedSource): FeedEntry | null {
  try {
    const title = stripHtml(extractTextContent(itemXml, "title"))
    if (!title) return null

    const link = extractTextContent(itemXml, "link")
    const id = extractTextContent(itemXml, "guid") || link || `${source.id}-${Date.now()}-${Math.random()}`

    const descriptionRaw = extractTextContent(itemXml, "description") || extractTextContent(itemXml, "content:encoded") || ""
    const summary = stripHtml(descriptionRaw).slice(0, 300)
    const imageUrl = extractImageFromContent(descriptionRaw)

    const pubDate = extractTextContent(itemXml, "pubDate") || ""

    return {
      id,
      title,
      link,
      summary,
      published: pubDate,
      updated: pubDate,
      source,
      imageUrl,
    }
  } catch {
    return null
  }
}

export async function fetchFeed(source: FeedSource): Promise<FeedEntry[]> {
  try {
    const response = await fetch(source.feedUrl, {
      next: { revalidate: 900 },
      headers: {
        "User-Agent": "CanadianTravelDeals/1.0 (travel.canadian-ai.ca)",
        Accept: "application/atom+xml, application/rss+xml, application/xml, text/xml",
      },
    })

    if (!response.ok) {
      console.error(`Failed to fetch feed from ${source.name}: ${response.status}`)
      return []
    }

    const xml = await response.text()

    if (xml.includes("<feed")) {
      const entries: FeedEntry[] = []
      const entryRegex = /<entry[\s>]([\s\S]*?)<\/entry>/gi
      let match
      while ((match = entryRegex.exec(xml)) !== null) {
        const entry = parseAtomEntry(match[0], source)
        if (entry) entries.push(entry)
      }
      return entries
    }

    if (xml.includes("<rss") || xml.includes("<channel")) {
      const items: FeedEntry[] = []
      const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi
      let match
      while ((match = itemRegex.exec(xml)) !== null) {
        const item = parseRssItem(match[0], source)
        if (item) items.push(item)
      }
      return items
    }

    return []
  } catch (error) {
    console.error(`Error fetching feed from ${source.name}:`, error)
    return []
  }
}

export async function fetchAllFeeds(sources: FeedSource[]): Promise<FeedEntry[]> {
  const results = await Promise.allSettled(sources.map((source) => fetchFeed(source)))

  const allEntries: FeedEntry[] = []
  for (const result of results) {
    if (result.status === "fulfilled") {
      allEntries.push(...result.value)
    }
  }

  allEntries.sort((a, b) => {
    const dateA = new Date(a.published || a.updated || 0).getTime()
    const dateB = new Date(b.published || b.updated || 0).getTime()
    return dateB - dateA
  })

  return allEntries
}
