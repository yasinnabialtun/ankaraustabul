'use client'

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  loadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  firstInputDelay: number
  cumulativeLayoutShift: number
  timeToInteractive: number
}

export const usePerformance = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if Performance Observer is supported
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      setIsSupported(false)
      return
    }

    setIsSupported(true)

    const performanceMetrics: Partial<PerformanceMetrics> = {}

    // Get basic load time
    if (performance.timing) {
      performanceMetrics.loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
    }

    // Observe Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              performanceMetrics.firstContentfulPaint = entry.startTime
            }
            break
          
          case 'largest-contentful-paint':
            performanceMetrics.largestContentfulPaint = entry.startTime
            break
          
          case 'first-input':
            performanceMetrics.firstInputDelay = (entry as any).processingStart - entry.startTime
            break
          
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              performanceMetrics.cumulativeLayoutShift = 
                (performanceMetrics.cumulativeLayoutShift || 0) + (entry as any).value
            }
            break
        }
      }
    })

    // Observe different entry types
    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] })
    } catch (e) {
      // Fallback for browsers that don't support all entry types
      try {
        observer.observe({ entryTypes: ['paint'] })
      } catch (e2) {
        console.warn('Performance Observer not supported')
      }
    }

    // Calculate Time to Interactive (approximation)
    const calculateTTI = () => {
      const navigationStart = performance.timing.navigationStart
      const loadEventEnd = performance.timing.loadEventEnd
      const domContentLoadedEventEnd = performance.timing.domContentLoadedEventEnd
      
      // Simple TTI calculation
      performanceMetrics.timeToInteractive = loadEventEnd - navigationStart
    }

    // Wait for page to be fully loaded
    if (document.readyState === 'complete') {
      calculateTTI()
      setMetrics(performanceMetrics as PerformanceMetrics)
    } else {
      window.addEventListener('load', () => {
        calculateTTI()
        setMetrics(performanceMetrics as PerformanceMetrics)
      })
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const getPerformanceScore = (): number => {
    if (!metrics) return 0

    let score = 100

    // FCP scoring (0-100)
    if (metrics.firstContentfulPaint > 3000) score -= 30
    else if (metrics.firstContentfulPaint > 2000) score -= 20
    else if (metrics.firstContentfulPaint > 1500) score -= 10

    // LCP scoring (0-100)
    if (metrics.largestContentfulPaint > 4000) score -= 30
    else if (metrics.largestContentfulPaint > 2500) score -= 20
    else if (metrics.largestContentfulPaint > 2000) score -= 10

    // FID scoring (0-100)
    if (metrics.firstInputDelay > 300) score -= 20
    else if (metrics.firstInputDelay > 100) score -= 10

    // CLS scoring (0-100)
    if (metrics.cumulativeLayoutShift > 0.25) score -= 20
    else if (metrics.cumulativeLayoutShift > 0.1) score -= 10

    return Math.max(0, score)
  }

  const getPerformanceGrade = (): string => {
    const score = getPerformanceScore()
    if (score >= 90) return 'A'
    if (score >= 80) return 'B'
    if (score >= 70) return 'C'
    if (score >= 60) return 'D'
    return 'F'
  }

  const logPerformanceMetrics = () => {
    if (!metrics) return

    console.group('🚀 Performance Metrics')
    console.log('Load Time:', `${metrics.loadTime}ms`)
    console.log('First Contentful Paint:', `${metrics.firstContentfulPaint}ms`)
    console.log('Largest Contentful Paint:', `${metrics.largestContentfulPaint}ms`)
    console.log('First Input Delay:', `${metrics.firstInputDelay}ms`)
    console.log('Cumulative Layout Shift:', metrics.cumulativeLayoutShift)
    console.log('Time to Interactive:', `${metrics.timeToInteractive}ms`)
    console.log('Performance Score:', `${getPerformanceScore()}/100 (${getPerformanceGrade()})`)
    console.groupEnd()
  }

  return {
    metrics,
    isSupported,
    getPerformanceScore,
    getPerformanceGrade,
    logPerformanceMetrics
  }
}
