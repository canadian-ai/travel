"use client"

import { useEffect } from "react"

const CSS_VARS = [
  "--background", "--foreground", "--card", "--card-foreground",
  "--popover", "--popover-foreground",
  "--primary", "--primary-foreground",
  "--secondary", "--secondary-foreground",
  "--muted", "--muted-foreground",
  "--accent", "--accent-foreground",
  "--destructive", "--destructive-foreground",
  "--border", "--input", "--ring",
  "--sidebar", "--sidebar-foreground",
  "--sidebar-primary", "--sidebar-primary-foreground",
  "--sidebar-accent", "--sidebar-accent-foreground",
  "--sidebar-border", "--sidebar-ring",
]

export function MfeTheme() {
  useEffect(() => {
    const isIframe = typeof window !== "undefined" && window !== window.parent
    if (!isIframe) return

    const root = document.documentElement
    root.setAttribute("data-mfe", "true")

    try {
      const parentStyle = window.parent.getComputedStyle(document.documentElement)
      for (const v of CSS_VARS) {
        const val = parentStyle.getPropertyValue(v).trim()
        if (val) {
          root.style.setProperty(v, val)
        }
      }
    } catch {
      // Cross-origin: can't read parent styles. Skip.
    }
  }, [])

  return null
}
