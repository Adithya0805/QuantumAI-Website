"use client"

import { useRef, useState, useEffect } from 'react'

interface LazySectionProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function LazySection({ children, fallback }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '200px' } // Start loading 200px before visible
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  )
}
