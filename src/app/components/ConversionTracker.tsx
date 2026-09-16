"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export function ConversionTracker() {
  useEffect(() => {
    if (!window.gtag) {
      console.error("Google Ads gtag is not loaded")
      return
    }

    window.gtag("event", "conversion", {
      send_to: "AW-1032605975/RkHgCM-v3PkcEJeisewD",
    })
  }, [])

  return null
}