"use client"

import { useEffect } from "react"

export function ConversionTracker() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(['config', 'AW-1032605975'])
    window.dataLayer.push(['event', 'conversion', {
      send_to: 'AW-1032605975/lpzRCJHd-LccEJeisewD'
    }])
  }, [])

  return null
}