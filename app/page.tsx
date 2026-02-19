import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { StatsBar } from "@/components/stats-bar"
import { DealGrid } from "@/components/deal-grid"
import { CityShowcase } from "@/components/city-showcase"
import { SiteFooter } from "@/components/site-footer"
import {
  WebsiteStructuredData,
  DealsStructuredData,
  BreadcrumbStructuredData,
} from "@/components/structured-data"
import { FEED_SOURCES } from "@/lib/feed-sources"
import { fetchAllFeeds } from "@/lib/feed-parser"

export default async function Home() {
  const entries = await fetchAllFeeds(FEED_SOURCES)

  return (
    <>
      <WebsiteStructuredData />
      <DealsStructuredData entries={entries} />
      <BreadcrumbStructuredData />

      <SiteHeader />

      <main>
        <HeroSection dealCount={entries.length} />
        <StatsBar dealCount={entries.length} />

        <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Latest Travel Deals
            </h2>
            <p className="mt-1 text-muted-foreground">
              Real-time deals aggregated from trusted Canadian travel sources
            </p>
          </div>

          <DealGrid initialEntries={entries} />
        </section>

        <CityShowcase entries={entries} />
      </main>

      <SiteFooter />
    </>
  )
}
