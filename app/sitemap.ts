import type { MetadataRoute } from "next"
import { FEED_SOURCES } from "@/lib/feed-sources"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://travel.canadian-ai.ca"

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
  ]

  for (const source of FEED_SOURCES) {
    routes.push({
      url: `${baseUrl}?city=${source.id}`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.8,
    })
  }

  return routes
}
