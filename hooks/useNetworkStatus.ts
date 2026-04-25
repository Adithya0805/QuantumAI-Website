import { useEffect, useState } from 'react'

export function useNetworkStatus() {
  const [quality, setQuality] = useState<'4g' | '3g' | 'slow'>('4g')

  useEffect(() => {
    const navigator4G = (navigator as any).connection ||
                       (navigator as any).mozConnection ||
                       (navigator as any).webkitConnection

    if (!navigator4G) return

    const updateQuality = () => {
      const effectiveType = navigator4G.effectiveType
      if (effectiveType === '4g') setQuality('4g')
      else if (effectiveType === '3g') setQuality('3g')
      else setQuality('slow')
    }

    updateQuality()
    navigator4G.addEventListener('change', updateQuality)
    return () => navigator4G.removeEventListener('change', updateQuality)
  }, [])

  return quality
}
