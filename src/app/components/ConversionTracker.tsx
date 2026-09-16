// components/ConversionTracker.tsx
"use client"

import { useEffect } from "react"

export function ConversionTracker() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(['event', 'conversion', {
      send_to: 'AW-1032605975/5JXzCNuquPkcEJeisewD'
    }])
  }, [])

  return null
}