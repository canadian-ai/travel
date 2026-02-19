import { Plane, MapPin, Building2, RefreshCw } from "lucide-react"
import { FEED_SOURCES, PROVINCES } from "@/lib/feed-sources"

export function StatsBar({ dealCount }: { dealCount: number }) {
  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4 py-3 lg:gap-10 lg:px-8">
        <div className="flex items-center gap-2 text-sm">
          <Plane className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">{dealCount}</span>
          <span className="text-muted-foreground">Active Deals</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-accent" />
          <span className="font-semibold text-foreground">{FEED_SOURCES.length}</span>
          <span className="text-muted-foreground">Cities</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-foreground">{PROVINCES.length}</span>
          <span className="text-muted-foreground">Provinces</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <RefreshCw className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Updated every 15 min</span>
        </div>
      </div>
    </div>
  )
}
