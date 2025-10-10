'use client'

import { useEffect } from 'react'
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals'

interface WebVitalsProps {
  onVitals?: (metric: any) => void
}

export default function WebVitals({ onVitals }: WebVitalsProps) {
  useEffect(() => {
    const sendToAnalytics = (metric: any) => {
      // Send to Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        })
      }

      // Send to custom analytics
      if (onVitals) {
        onVitals(metric)
      }

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Web Vital:', metric)
      }
    }

    // Measure Core Web Vitals
    onCLS(sendToAnalytics)
    onFID(sendToAnalytics)
    onFCP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onTTFB(sendToAnalytics)
  }, [onVitals])

  return null
}

// Web Vitals thresholds
export const WEB_VITALS_THRESHOLDS = {
  LCP: 2500, // Good: < 2.5s, Needs Improvement: 2.5s - 4s, Poor: > 4s
  FID: 100, // Good: < 100ms, Needs Improvement: 100ms - 300ms, Poor: > 300ms
  CLS: 0.1, // Good: < 0.1, Needs Improvement: 0.1 - 0.25, Poor: > 0.25
  FCP: 1800, // Good: < 1.8s, Needs Improvement: 1.8s - 3s, Poor: > 3s
  TTFB: 800, // Good: < 800ms, Needs Improvement: 800ms - 1.8s, Poor: > 1.8s
}

// Performance score calculator
export function calculatePerformanceScore(vitals: any) {
  let score = 100
  
  // LCP scoring
  if (vitals.LCP > WEB_VITALS_THRESHOLDS.LCP) {
    score -= 25
  }
  
  // FID scoring
  if (vitals.FID > WEB_VITALS_THRESHOLDS.FID) {
    score -= 25
  }
  
  // CLS scoring
  if (vitals.CLS > WEB_VITALS_THRESHOLDS.CLS) {
    score -= 25
  }
  
  // FCP scoring
  if (vitals.FCP > WEB_VITALS_THRESHOLDS.FCP) {
    score -= 15
  }
  
  // TTFB scoring
  if (vitals.TTFB > WEB_VITALS_THRESHOLDS.TTFB) {
    score -= 10
  }
  
  return Math.max(0, score)
}
