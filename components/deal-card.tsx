"use client"

import { useState } from "react"
import { ExternalLink, Clock, MapPin, Plane, ImageOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { FeedEntry } from "@/lib/feed-parser"
import { formatDistanceToNow } from "date-fns"

function getRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ""
    return formatDistanceToNow(date, { addSuffix: true })
  } catch {
    return ""
  }
}

export function DealCard({ entry }: { entry: FeedEntry }) {
  const relativeTime = getRelativeTime(entry.published || entry.updated)
  const [imgError, setImgError] = useState(false)

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg">
      {/* Deal image */}
      {entry.imageUrl && !imgError ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
          <img
            src={entry.imageUrl}
            alt={entry.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
          <div className="absolute left-3 top-3">
            <Badge className="bg-primary text-primary-foreground shadow-md">
              <Plane className="mr-1 h-3 w-3" />
              {entry.source.airportCode}
            </Badge>
          </div>
        </div>
      ) : (
        <div className="relative flex aspect-[16/9] w-full items-center justify-center bg-muted/50">
          <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
            <ImageOff className="h-8 w-8" />
            <span className="text-xs">{entry.source.city}</span>
          </div>
          <div className="absolute left-3 top-3">
            <Badge className="bg-primary text-primary-foreground shadow-md">
              <Plane className="mr-1 h-3 w-3" />
              {entry.source.airportCode}
            </Badge>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {entry.source.city}
          </span>
          {relativeTime && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {relativeTime}
            </span>
          )}
        </div>

        <h3 className="mb-2 line-clamp-2 text-base font-semibold leading-snug text-card-foreground group-hover:text-primary">
          <a
            href={entry.link}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0"
          >
            {entry.title}
          </a>
        </h3>

        {entry.summary && (
          <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {entry.summary}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <a
            href={entry.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded bg-accent/10 text-[10px] font-bold text-accent">
              {entry.source.airportCode.charAt(0)}
            </span>
            {entry.source.name}
          </a>

          <span className="flex items-center gap-1 text-xs font-medium text-primary">
            View Deal
            <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </div>
    </article>
  )
}
