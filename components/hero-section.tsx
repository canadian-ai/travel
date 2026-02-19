import { Plane, MapPin, TrendingDown } from "lucide-react"

export function HeroSection({ dealCount }: { dealCount: number }) {
  return (
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-navy/70" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
              <TrendingDown className="h-3.5 w-3.5" />
              Live Deals
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
              <MapPin className="h-3.5 w-3.5" />
              13 Canadian Cities
            </span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-navy-foreground md:text-5xl lg:text-6xl">
            Canadian Travel Deals,{" "}
            <span className="text-primary">All in One Place</span>
          </h1>

          <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-navy-foreground/80 md:text-xl">
            We aggregate the best flight deals from trusted sources across Canada. 
            Updated every 15 minutes with {dealCount > 0 ? `${dealCount}+` : "the latest"} deals from 
            coast to coast.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#deals"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              <Plane className="h-4 w-4" />
              Browse All Deals
            </a>
            <a
              href="#cities"
              className="inline-flex items-center gap-2 rounded-lg border border-navy-foreground/20 bg-navy-foreground/10 px-6 py-3 text-sm font-semibold text-navy-foreground transition-all hover:bg-navy-foreground/20"
            >
              <MapPin className="h-4 w-4" />
              Filter by City
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
