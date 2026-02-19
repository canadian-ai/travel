"use client"

import { FEED_SOURCES, PROVINCES } from "@/lib/feed-sources"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface CityFilterProps {
  selectedCity: string | null
  onCityChange: (city: string | null) => void
}

export function CityFilter({ selectedCity, onCityChange }: CityFilterProps) {
  const grouped = PROVINCES.map((province) => ({
    province,
    cities: FEED_SOURCES.filter((s) => s.province === province),
  }))

  return (
    <section id="cities" className="scroll-mt-20">
      <div className="mb-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Filter by City</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCityChange(null)}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${
            selectedCity === null
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
        >
          All Cities
        </button>

        {grouped.map(({ province, cities }) => (
          <div key={province} className="contents">
            {cities.map((source) => (
              <button
                key={source.id}
                onClick={() => onCityChange(source.id === selectedCity ? null : source.id)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${
                  selectedCity === source.id
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                <Badge variant="outline" className="h-5 px-1.5 text-[10px] font-bold">
                  {source.airportCode}
                </Badge>
                {source.city}
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
