"use client"

import { useState, useEffect } from 'react'
import { Activity, Zap } from 'lucide-react'

export function PerformanceDashboard() {
  const [metrics, setMetrics] = useState({
    fps: 60,
    memory: 0,
  })

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let rafId: number

    const measurePerformance = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime >= lastTime + 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: frameCount,
        }))
        frameCount = 0
        lastTime = currentTime
      }

      // Check memory if available
      if ('memory' in performance) {
        const mem = (performance as any).memory
        setMetrics(prev => ({
          ...prev,
          memory: Math.round((mem.usedJSHeapSize / mem.jsHeapSizeLimit) * 100),
        }))
      }

      rafId = requestAnimationFrame(measurePerformance)
    }

    rafId = requestAnimationFrame(measurePerformance)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div className="fixed bottom-4 left-4 p-4 rounded-xl bg-black/70 border border-cyan-500/30 backdrop-blur-md z-50 hidden md:block group hover:bg-black/90 transition-all cursor-default">
      <div className="space-y-2 text-[10px] font-mono tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-cyan-400" />
          <span className="text-cyan-400">FPS: {metrics.fps}</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-3 h-3 text-yellow-400" />
          <span className="text-yellow-400">Mem: {metrics.memory}%</span>
        </div>
      </div>
    </div>
  )
}
