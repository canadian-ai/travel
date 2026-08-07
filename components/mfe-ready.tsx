"use client"
import { useEffect } from "react"
export function MfeReady() {
  useEffect(() => {
    if (typeof window === "undefined" || window === window.parent) return
    window.parent.postMessage({ type: "CAI_MFE_READY", appId: "travel" }, "*")
  }, [])
  return null
}
