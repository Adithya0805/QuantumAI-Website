"use client"

import { useEffect, useState } from 'react'

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fcp: 0,
    lcp: 0,
  })

  useEffect(() => {
    // First Contentful Paint
    const paintEntries = performance.getEntriesByType('paint')
    paintEntries.forEach(entry => {
      if (entry.name === 'first-contentful-paint') {
        setMetrics(prev => ({ ...prev, fcp: Math.round(entry.startTime) }))
      }
    })

    // Largest Contentful Paint
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1] as any
      setMetrics(prev => ({ ...prev, lcp: Math.round(lastEntry.renderTime || lastEntry.loadTime || 0) }))
    })
    
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (e) {
      console.warn('LCP observer not supported')
    }

    return () => observer.disconnect()
  }, [])

  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className="fixed top-24 right-4 p-3 bg-black/80 text-cyan-400 text-[10px] font-mono border border-cyan-400/30 rounded backdrop-blur-sm z-[100]">
      <div className="uppercase tracking-widest mb-1 opacity-50">Vitals</div>
      <div>FCP: {metrics.fcp}ms</div>
      <div>LCP: {metrics.lcp}ms</div>
    </div>
  )
}
