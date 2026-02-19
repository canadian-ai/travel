"use client"

import Link from "next/link"
import { Plane, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Canadian Travel Deals Home">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Plane className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold leading-tight tracking-tight text-foreground">
              Travel Deals
            </span>
            <span className="text-[11px] font-medium leading-none text-muted-foreground">
              canadian-ai.ca
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            All Deals
          </Link>
          <Link
            href="#cities"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Cities
          </Link>
          <Link
            href="#about"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            About
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button size="sm" variant="default" asChild>
            <Link href="#deals">Browse Deals</Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-card md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3" aria-label="Mobile navigation">
            <Link
              href="/"
              className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Deals
            </Link>
            <Link
              href="#cities"
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cities
            </Link>
            <Link
              href="#about"
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="mt-2 border-t border-border pt-3">
              <Button size="sm" className="w-full" asChild>
                <Link href="#deals" onClick={() => setMobileMenuOpen(false)}>
                  Browse Deals
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
