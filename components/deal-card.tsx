"use client"

import { useState } from "react"
import { ExternalLink, Clock, MapPin, ImageOff } from "lucide-react"
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
    <article className="group relative flex flex-col overflow-hidden border border-border bg-card transition-colors duration-150 hover:border-foreground/30 hover:bg-secondary/30">
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
          <div className="absolute inset-0 bg-gradient-to-t from-card/50 via-transparent to-transparent" />
          {/* Airport badge — UI Label style */}
          <div className="absolute left-0 top-3">
            <span className="bg-primary px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-primary-foreground">
              {entry.source.airportCode}
            </span>
          </div>
        </div>
      ) : (
        <div className="relative flex aspect-[16/9] w-full items-center justify-center bg-muted">
          <div className="flex flex-col items-center gap-2 text-muted-foreground/30">
            <ImageOff className="h-8 w-8" strokeWidth={1.5} />
            <span className="text-xs">{entry.source.city}</span>
          </div>
          <div className="absolute left-0 top-3">
            <span className="bg-primary px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-primary-foreground">
              {entry.source.airportCode}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        {/* Meta row */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            <MapPin className="h-3 w-3" strokeWidth={1.5} />
            {entry.source.city}
          </span>
          {relativeTime && (
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Clock className="h-3 w-3" strokeWidth={1.5} />
              {relativeTime}
            </span>
          )}
        </div>

        {/* Title — Playfair Display serif */}
        <h3 className="mb-2 line-clamp-2 font-serif text-[1.05rem] font-bold leading-snug tracking-[-0.01em] text-card-foreground group-hover:text-primary">
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
            className="relative z-10 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-150 hover:text-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="flex h-5 w-5 items-center justify-center bg-secondary text-[10px] font-bold text-foreground">
              {entry.source.airportCode.charAt(0)}
            </span>
            {entry.source.name}
          </a>

          <span className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.08em] text-primary">
            View Deal
            <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </article>
  )
}
