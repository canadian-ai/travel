"use client"
import { useEffect } from "react"
export function MfeReady() {
  useEffect(() => {
    window.parent.postMessage({ type: "CAI_MFE_READY", appId: "travel", 
  }, [])
  return null
}
