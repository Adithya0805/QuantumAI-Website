import { useEffect, useState } from 'react'

export function useSystemTheme() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    setIsDark(darkModeQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches)
    }

    darkModeQuery.addEventListener('change', handleChange)
    return () => darkModeQuery.removeEventListener('change', handleChange)
  }, [])

  return isDark
}
