import { useEffect, useState, useRef } from 'react'

interface QualitySettings {
  starCount: number
  particleDensity: number
  effectsEnabled: boolean
  shadowsEnabled: boolean
  postprocessingEnabled: boolean
  fps: number
}

export function useAdaptiveQuality() {
  const [quality, setQuality] = useState<QualitySettings>({
    starCount: 5000,
    particleDensity: 1.0,
    effectsEnabled: true,
    shadowsEnabled: true,
    postprocessingEnabled: true,
    fps: 60,
  })

  const fpsRef = useRef(0)
  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(performance.now())

  useEffect(() => {
    const checkPerformance = () => {
      const now = performance.now()
      const delta = now - lastTimeRef.current

      if (delta >= 1000) {
        fpsRef.current = frameCountRef.current
        setQuality(prev => {
          // Auto-reduce quality if FPS drops below 45
          if (fpsRef.current < 45) {
            return {
              ...prev,
              starCount: Math.max(500, prev.starCount * 0.75),
              particleDensity: Math.max(0.3, prev.particleDensity * 0.8),
              shadowsEnabled: false,
              postprocessingEnabled: false,
              fps: fpsRef.current
            }
          }
          // Recover quality if FPS is good
          else if (fpsRef.current > 55 && prev.starCount < 5000) {
            return {
              ...prev,
              starCount: Math.min(5000, prev.starCount * 1.1),
              particleDensity: Math.min(1.0, prev.particleDensity * 1.05),
              shadowsEnabled: true,
              postprocessingEnabled: true,
              fps: fpsRef.current
            }
          }
          return { ...prev, fps: fpsRef.current }
        })
        frameCountRef.current = 0
        lastTimeRef.current = now
      }
    }

    const interval = setInterval(checkPerformance, 100)
    return () => clearInterval(interval)
  }, [])

  return {
    ...quality,
    recordFrame: () => frameCountRef.current++,
  }
}
