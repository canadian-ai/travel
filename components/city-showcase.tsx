import { FEED_SOURCES } from "@/lib/feed-sources"
import type { FeedEntry } from "@/lib/feed-parser"
import { Plane, ExternalLink } from "lucide-react"
import Link from "next/link"

interface CityShowcaseProps {
  entries: FeedEntry[]
}

export function CityShowcase({ entries }: CityShowcaseProps) {
  const cityCounts = FEED_SOURCES.map((source) => ({
    ...source,
    count: entries.filter((e) => e.source.id === source.id).length,
  })).sort((a, b) => b.count - a.count)

  return (
    <section className="border-t border-border bg-secondary/30 py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Deals From Across Canada
          </h2>
          <p className="mt-2 text-muted-foreground">
            Aggregated from trusted local deal sources, updated automatically
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cityCounts.map((source) => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {source.airportCode}
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">{source.city}</p>
                  <p className="text-xs text-muted-foreground">{source.province}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {source.count > 0 && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    {source.count}
                  </span>
                )}
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          All deals are sourced from their respective providers and credited accordingly. 
          Click any city to visit the original source.
        </p>
      </div>
    </section>
  )
}
