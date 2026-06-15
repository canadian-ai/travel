import { Plane, MapPin } from "lucide-react"

export function HeroSection({ dealCount }: { dealCount: number }) {
  return (
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-navy/80" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          {/* UI Label — Inter, uppercase, tracked */}
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
            Canadian Travel Deals
          </p>

          {/* Display heading — Playfair Display */}
          <h1 className="text-balance font-serif text-4xl font-bold tracking-[-0.02em] text-navy-foreground md:text-5xl lg:text-6xl">
            Find Your Next{" "}
            <span className="text-primary">Adventure.</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-navy-foreground/70">
            Real-time flight deals from {dealCount > 0 ? `${dealCount}+` : "hundreds of"} listings 
            across 13 Canadian cities. Every deal attributed to its original source.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#deals"
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90"
            >
              <Plane className="h-4 w-4" strokeWidth={1.5} />
              Browse All Deals
            </a>
            <a
              href="#cities"
              className="inline-flex items-center gap-2 border border-navy-foreground/30 px-6 py-3 text-sm font-medium text-navy-foreground transition-colors duration-150 hover:border-navy-foreground/60 hover:bg-navy-foreground/10"
            >
              <MapPin className="h-4 w-4" strokeWidth={1.5} />
              Filter by City
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
