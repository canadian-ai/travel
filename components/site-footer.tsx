import { Plane } from "lucide-react"
import Link from "next/link"
import { FEED_SOURCES } from "@/lib/feed-sources"

export function SiteFooter() {
  return (
    <footer id="about" className="border-t border-border bg-navy text-navy-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center bg-primary">
                <Plane className="h-4 w-4 text-primary-foreground" strokeWidth={1.5} />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-xl font-bold leading-none tracking-[-0.02em] text-navy-foreground">
                  Travel
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
                  Deals
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-navy-foreground/70">
              Your one-stop hub for the best Canadian flight deals. We aggregate deals 
              from trusted sources across {FEED_SOURCES.length} cities, updated every 15 minutes. 
              All deals are attributed to their original providers.
            </p>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-navy-foreground/50">
              Deal Sources
            </p>
            <ul className="grid grid-cols-2 gap-1.5">
              {FEED_SOURCES.map((source) => (
                <li key={source.id}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-navy-foreground/60 transition-colors duration-150 hover:text-primary"
                  >
                    {source.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-navy-foreground/50">
              About This Site
            </p>
            <p className="text-sm leading-relaxed text-navy-foreground/60">
              A deal aggregation service. We do not create or modify deal content. 
              All deals remain the property of their original sources and are displayed 
              with full attribution.
            </p>
            <div className="mt-6">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-navy-foreground/50">
                Navigation
              </p>
              <ul className="flex flex-col gap-1.5">
                <li>
                  <Link href="/" className="text-sm text-navy-foreground/60 transition-colors duration-150 hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <a href="#deals" className="text-sm text-navy-foreground/60 transition-colors duration-150 hover:text-primary">
                    All Deals
                  </a>
                </li>
                <li>
                  <a href="#cities" className="text-sm text-navy-foreground/60 transition-colors duration-150 hover:text-primary">
                    Filter by City
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-navy-foreground/10 pt-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-xs text-navy-foreground/50">
              {new Date().getFullYear()} Travel Deals by{" "}
              <a
                href="https://canadian-ai.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                canadian-ai.ca
              </a>
              . All deal content belongs to its respective source. This site is an aggregator 
              and provides attribution to all original providers.
            </p>
            <p className="text-xs text-navy-foreground/50">
              Open source under MIT License.{" "}
              <a
                href="https://github.com/canadian-ai/travel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View on GitHub
              </a>
              {" • "}
              <a
                href="https://github.com/canadian-ai/travel/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                License
              </a>
              {" • "}
              <a
                href="https://github.com/canadian-ai/travel/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Report Issues
              </a>
            </p>
            <p className="text-xs text-navy-foreground/40">
              Pull requests are not accepted. Fork the repository to make modifications.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
