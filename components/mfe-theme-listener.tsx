"use client"

import { useEffect } from "react"

const MESSAGE_TYPE = "CAI_THEME"

function isCAIResolvedTheme(value: unknown): value is "light" | "dark" {
  return value === "light" || value === "dark"
}

/**
 * Applies the CAI Runtime theme directive from the host shell
 * (canada-ai, docs/design/0006-cai-runtime-theme-contract.md, issue #206).
 * Provider-free: toggles the `.dark` class the design tokens are keyed on.
 * Complements MfeTheme (same-origin parent CSS-variable inheritance) with a
 * cross-origin channel. Only active when embedded.
 */
export function MfeThemeListener() {
  useEffect(() => {
    if (typeof window === "undefined" || window === window.parent) return

    const applyTheme = (theme: "light" | "dark") => {
      document.documentElement.classList.toggle("dark", theme === "dark")
      document.documentElement.style.colorScheme = theme
      try {
        localStorage.setItem("theme", theme)
      } catch {
        // ignore storage errors (e.g. blocked third-party storage)
      }
    }

    const onMessage = (event: MessageEvent) => {
      const data = event.data as { type?: string; theme?: unknown } | null
      if (!data || data.type !== MESSAGE_TYPE) return
      if (!isCAIResolvedTheme(data.theme)) return
      applyTheme(data.theme)
    }

    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  return null
}
