"use client"
import { useEffect } from "react"
export function MfeReady() {
  useEffect(() => {
    window.parent.postMessage({ type: "CAI_MFE_READY", appId: "travel", loadAttemptId: new URLSearchParams(window.location.search).get("_retry") || "" }, "*")
  }, [])
  return null
}
