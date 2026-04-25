import { useNetworkStatus } from './useNetworkStatus'

export function useBandwidthAware() {
  const networkQuality = useNetworkStatus()

  return {
    shouldLoadHDImages: networkQuality === '4g',
    shouldAutoplayVideo: networkQuality === '4g',
    shouldUseWebP: networkQuality !== 'slow',
    particleDensity: {
      '4g': 1.0,
      '3g': 0.6,
      'slow': 0.2,
    }[networkQuality] || 1.0,
  }
}
