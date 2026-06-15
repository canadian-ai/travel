"use client"

import Link from "next/link"
import { Plane, Menu, X } from "lucide-react"
import { useState } from "react"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Wordmark — Playfair Display for "Travel", Inter caps for "DEALS" */}
        <Link href="/" className="flex items-center gap-2" aria-label="Canadian Travel Deals Home">
          <div className="flex h-8 w-8 items-center justify-center bg-primary">
            <Plane className="h-4 w-4 text-primary-foreground" strokeWidth={1.5} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-xl font-bold leading-none tracking-[-0.02em] text-foreground">
              Travel
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
              Deals
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
          <Link
            href="/"
            className="px-3 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-secondary"
          >
            All Deals
          </Link>
          <Link
            href="#cities"
            className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground"
          >
            Cities
          </Link>
          <Link
            href="#about"
            className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground"
          >
            About
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="#deals"
            className="bg-foreground px-4 py-2 text-sm font-medium text-card transition-colors duration-150 hover:bg-primary"
          >
            Browse Deals
          </Link>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:bg-secondary md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-card md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2" aria-label="Mobile navigation">
            <Link
              href="/"
              className="px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Deals
            </Link>
            <Link
              href="#cities"
              className="px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cities
            </Link>
            <Link
              href="#about"
              className="px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="mt-2 border-t border-border pt-3 pb-2">
              <Link
                href="#deals"
                className="block bg-foreground px-4 py-2.5 text-center text-sm font-medium text-card"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Deals
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
