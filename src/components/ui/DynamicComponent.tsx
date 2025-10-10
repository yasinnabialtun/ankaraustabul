'use client'

import React, { Suspense, ComponentType, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface DynamicComponentProps {
  component: () => Promise<{ default: ComponentType<any> }>
  fallback?: ReactNode
  className?: string
  delay?: number
}

export default function DynamicComponent({ 
  component, 
  fallback,
  className = '',
  delay = 0
}: DynamicComponentProps) {
  const LazyComponent = React.lazy(component)

  const DefaultFallback = () => (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-sm text-gray-600">Yükleniyor...</p>
      </div>
    </motion.div>
  )

  return (
    <Suspense fallback={fallback || <DefaultFallback />}>
      <LazyComponent />
    </Suspense>
  )
}

// Pre-built dynamic components for common use cases
export const DynamicModal = ({ component, ...props }: Omit<DynamicComponentProps, 'component'> & { component: () => Promise<{ default: ComponentType<any> }> }) => (
  <DynamicComponent
    component={component}
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    {...props}
  />
)

export const DynamicPage = ({ component, ...props }: Omit<DynamicComponentProps, 'component'> & { component: () => Promise<{ default: ComponentType<any> }> }) => (
  <DynamicComponent
    component={component}
    className="min-h-screen"
    {...props}
  />
)

export const DynamicSection = ({ component, ...props }: Omit<DynamicComponentProps, 'component'> & { component: () => Promise<{ default: ComponentType<any> }> }) => (
  <DynamicComponent
    component={component}
    className="w-full"
    {...props}
  />
)
