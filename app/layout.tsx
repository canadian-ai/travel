import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

const siteUrl = "https://travel.canadian-ai.ca"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Canadian Travel Deals | Best Flight Deals from 13+ Cities",
    template: "%s | Canadian Travel Deals",
  },
  description:
    "Find the best Canadian flight deals aggregated from 13+ cities including Toronto, Vancouver, Montreal, Calgary, and more. Updated every 15 minutes with deals from trusted sources.",
  keywords: [
    "Canadian travel deals",
    "cheap flights Canada",
    "flight deals Toronto",
    "flight deals Vancouver",
    "flight deals Montreal",
    "flight deals Calgary",
    "YYZ deals",
    "YVR deals",
    "YUL deals",
    "YYC deals",
    "Canadian flight deals",
    "cheap flights from Canada",
    "travel deals Canada",
    "discount flights Canada",
    "best flight deals Canada",
    "last minute flights Canada",
    "error fares Canada",
  ],
  authors: [{ name: "Canadian AI", url: "https://canadian-ai.ca" }],
  creator: "Canadian AI",
  publisher: "Canadian AI",
  generator: "Next.js",
  applicationName: "Canadian Travel Deals",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    siteName: "Canadian Travel Deals",
    title: "Canadian Travel Deals | Best Flight Deals from 13+ Cities",
    description:
      "Find the best Canadian flight deals aggregated from 13+ cities. Updated every 15 minutes with deals from Toronto, Vancouver, Montreal, Calgary and more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Canadian Travel Deals - Best flight deals from 13+ Canadian cities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Canadian Travel Deals | Best Flight Deals from 13+ Cities",
    description:
      "Find the best Canadian flight deals from 13+ cities. Updated every 15 minutes.",
    images: ["/og-image.jpg"],
    creator: "@canadianai",
  },
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "Canadian Travel Deals RSS Feed" },
      ],
    },
  },
  category: "travel",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
