import { useMotionValue } from 'framer-motion'
import { useEffect, useRef } from 'react'

export function useOptimizedAnimation(targetValue: number, duration: number = 0.5) {
  const motionValue = useMotionValue(0)
  const rafRef = useRef<number>()
  const startTimeRef = useRef<number>()

  useEffect(() => {
    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / (duration * 1000), 1)

      // Use easeInOutCubic
      const easeProgress = progress < 0.5
        ? 4 * progress ** 3
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      motionValue.set(easeProgress * targetValue)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [targetValue, duration, motionValue])

  return motionValue
}
