"use client"

import { useState, useMemo } from "react"
import { DealCard } from "@/components/deal-card"
import { CityFilter } from "@/components/city-filter"
import { SearchBar } from "@/components/search-bar"
import { Skeleton } from "@/components/ui/skeleton"
import { Inbox, RefreshCw, ChevronDown } from "lucide-react"
import type { FeedEntry } from "@/lib/feed-parser"

const DEALS_PER_PAGE = 12

export function DealGrid({ initialEntries }: { initialEntries: FeedEntry[] }) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleCount, setVisibleCount] = useState(DEALS_PER_PAGE)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [entries, setEntries] = useState(initialEntries)

  const filteredEntries = useMemo(() => {
    let result = entries

    if (selectedCity) {
      result = result.filter((e) => e.source.id === selectedCity)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(query) ||
          e.summary.toLowerCase().includes(query) ||
          e.source.city.toLowerCase().includes(query) ||
          e.source.province.toLowerCase().includes(query)
      )
    }

    return result
  }, [entries, selectedCity, searchQuery])

  const visibleEntries = filteredEntries.slice(0, visibleCount)
  const hasMore = visibleCount < filteredEntries.length

  async function handleRefresh() {
    setIsRefreshing(true)
    try {
      const params = new URLSearchParams()
      if (selectedCity) params.set("city", selectedCity)
      const res = await fetch(`/api/feeds?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setEntries(data.entries)
        setVisibleCount(DEALS_PER_PAGE)
      }
    } catch (error) {
      console.error("Failed to refresh feeds:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div id="deals" className="scroll-mt-20">
      <div className="mb-8 flex flex-col gap-6">
        <CityFilter selectedCity={selectedCity} onCityChange={(city) => {
          setSelectedCity(city)
          setVisibleCount(DEALS_PER_PAGE)
        }} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              {filteredEntries.length} deal{filteredEntries.length !== 1 ? "s" : ""}
            </span>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 border border-border bg-card px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-foreground transition-colors duration-150 hover:bg-secondary disabled:opacity-50"
            >
              <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} strokeWidth={1.5} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-border bg-card py-16">
          <Inbox className="mb-3 h-10 w-10 text-muted-foreground/40" strokeWidth={1.5} />
          <p className="font-serif text-lg font-bold text-foreground">No deals found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {searchQuery
              ? "Try adjusting your search terms"
              : "Try selecting a different city or check back later"}
          </p>
          {(searchQuery || selectedCity) && (
            <button
              className="mt-4 border border-border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-foreground transition-colors duration-150 hover:bg-secondary"
              onClick={() => {
                setSearchQuery("")
                setSelectedCity(null)
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleEntries.map((entry) => (
              <DealCard key={entry.id} entry={entry} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + DEALS_PER_PAGE)}
                className="flex items-center gap-2 border border-border bg-card px-6 py-3 text-[11px] font-medium uppercase tracking-[0.08em] text-foreground transition-colors duration-150 hover:bg-secondary"
              >
                <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
                Load More — {filteredEntries.length - visibleCount} remaining
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export function DealGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="mb-2 h-5 w-full" />
          <Skeleton className="mb-2 h-5 w-3/4" />
          <Skeleton className="mb-4 h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="mt-4 border-t border-border pt-3">
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}
