"use client"

import { FEED_SOURCES, PROVINCES } from "@/lib/feed-sources"

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
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        Filter by City
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCityChange(null)}
          className={`border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors duration-150 ${
            selectedCity === null
              ? "border-foreground bg-foreground text-card"
              : "border-border bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground"
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
                className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors duration-150 ${
                  selectedCity === source.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                <span className="font-bold">{source.airportCode}</span>
                <span className="hidden sm:inline">{source.city}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
