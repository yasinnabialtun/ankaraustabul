'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePerformance } from '@/hooks/usePerformance'
import { Activity, Zap, Clock, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

interface PerformanceMonitorProps {
  showDetails?: boolean
  autoHide?: boolean
  hideDelay?: number
}

export default function PerformanceMonitor({ 
  showDetails = false, 
  autoHide = true, 
  hideDelay = 5000 
}: PerformanceMonitorProps) {
  const { metrics, isSupported, getPerformanceScore, getPerformanceGrade, logPerformanceMetrics } = usePerformance()
  const [isVisible, setIsVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (autoHide && metrics) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, hideDelay)

      return () => clearTimeout(timer)
    }
  }, [metrics, autoHide, hideDelay])

  useEffect(() => {
    if (metrics) {
      logPerformanceMetrics()
    }
  }, [metrics, logPerformanceMetrics])

  if (!isSupported || !metrics || !isVisible) {
    return null
  }

  const score = getPerformanceScore()
  const grade = getPerformanceGrade()

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100'
    if (score >= 80) return 'text-blue-600 bg-blue-100'
    if (score >= 70) return 'text-yellow-600 bg-yellow-100'
    if (score >= 60) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="w-4 h-4" />
    if (score >= 70) return <TrendingUp className="w-4 h-4" />
    return <AlertTriangle className="w-4 h-4" />
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div 
          className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Performance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getScoreColor(score)}`}>
                {getScoreIcon(score)}
                <span>{score}/100</span>
              </div>
              <div className="text-xs text-gray-500 font-mono">{grade}</div>
            </div>
          </div>
        </div>

        {/* Details */}
        {isExpanded && showDetails && (
          <motion.div
            className="border-t border-gray-200 px-4 py-3 space-y-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <Zap className="w-3 h-3 text-blue-500" />
                <span className="text-gray-600">FCP:</span>
                <span className="font-mono">{Math.round(metrics.firstContentfulPaint)}ms</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-gray-600">LCP:</span>
                <span className="font-mono">{Math.round(metrics.largestContentfulPaint)}ms</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-3 h-3 text-yellow-500" />
                <span className="text-gray-600">FID:</span>
                <span className="font-mono">{Math.round(metrics.firstInputDelay)}ms</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Activity className="w-3 h-3 text-purple-500" />
                <span className="text-gray-600">CLS:</span>
                <span className="font-mono">{metrics.cumulativeLayoutShift.toFixed(3)}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Load Time:</span>
                <span className="font-mono">{metrics.loadTime}ms</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">TTI:</span>
                <span className="font-mono">{metrics.timeToInteractive}ms</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}
