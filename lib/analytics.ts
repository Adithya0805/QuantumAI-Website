export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window === 'undefined') return

  try {
    // Send to custom endpoint for detailed analytics
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        timestamp: new Date().toISOString(),
        properties,
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
    }).catch(() => {}) // Silently fail
  } catch (error) {
    console.error('Analytics error:', error)
  }
}

export const trackPerformance = (metric: string, value: number) => {
  trackEvent('performance_metric', { metric, value })
}

export const trackError = (error: Error, context: string) => {
  trackEvent('error', {
    message: error.message,
    stack: error.stack,
    context,
  })
}
