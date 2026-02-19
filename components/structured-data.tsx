import type { FeedEntry } from "@/lib/feed-parser"

export function WebsiteStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Canadian Travel Deals",
    alternateName: "Travel Deals - canadian-ai.ca",
    url: "https://travel.canadian-ai.ca",
    description:
      "Aggregated flight deals from 13+ Canadian cities. Find the best travel deals from trusted sources, updated every 15 minutes.",
    publisher: {
      "@type": "Organization",
      name: "Canadian AI",
      url: "https://canadian-ai.ca",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://travel.canadian-ai.ca?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function DealsStructuredData({ entries }: { entries: FeedEntry[] }) {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Canadian Flight Deals",
    description: "Latest flight deals from Canadian cities",
    numberOfItems: entries.length,
    itemListElement: entries.slice(0, 30).map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        name: entry.title,
        description: entry.summary,
        url: entry.link,
        offeredBy: {
          "@type": "Organization",
          name: entry.source.name,
          url: entry.source.url,
        },
        areaServed: {
          "@type": "City",
          name: entry.source.city,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: entry.source.province,
          },
        },
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
    />
  )
}

export function BreadcrumbStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://travel.canadian-ai.ca",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Travel Deals",
        item: "https://travel.canadian-ai.ca/#deals",
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
