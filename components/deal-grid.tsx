"use client"

import { useState, useMemo } from "react"
import { DealCard } from "@/components/deal-card"
import { CityFilter } from "@/components/city-filter"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
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
            <span className="text-sm text-muted-foreground">
              {filteredEntries.length} deal{filteredEntries.length !== 1 ? "s" : ""} found
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="gap-1.5"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16">
          <Inbox className="mb-3 h-10 w-10 text-muted-foreground/50" />
          <p className="text-base font-medium text-foreground">No deals found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {searchQuery
              ? "Try adjusting your search terms"
              : "Try selecting a different city or check back later"}
          </p>
          {(searchQuery || selectedCity) && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSearchQuery("")
                setSelectedCity(null)
              }}
            >
              Clear Filters
            </Button>
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
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((prev) => prev + DEALS_PER_PAGE)}
                className="gap-2"
              >
                <ChevronDown className="h-4 w-4" />
                Load More Deals ({filteredEntries.length - visibleCount} remaining)
              </Button>
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
