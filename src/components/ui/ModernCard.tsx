'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ModernCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  gradient?: boolean
  glass?: boolean
  animated?: boolean
  delay?: number
  onClick?: () => void
}

export default function ModernCard({
  children,
  className = '',
  hover = true,
  glow = false,
  gradient = false,
  glass = false,
  animated = true,
  delay = 0,
  onClick
}: ModernCardProps) {
  const baseClasses = 'relative overflow-hidden rounded-2xl transition-all duration-300'
  
  const styleClasses = [
    glass && 'bg-white/10 backdrop-blur-md border border-white/20',
    gradient && 'bg-gradient-to-br from-blue-50 to-indigo-100',
    !glass && !gradient && 'bg-white shadow-lg',
    glow && 'shadow-xl shadow-blue-500/25',
    hover && 'hover:shadow-2xl hover:scale-105',
    onClick && 'cursor-pointer'
  ].filter(Boolean).join(' ')

  const animationProps = animated ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay }
  } : {}

  return (
    <motion.div
      className={`${baseClasses} ${styleClasses} ${className}`}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      {...animationProps}
    >
      {/* Glass effect overlay */}
      {glass && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      )}
      
      {/* Gradient overlay */}
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 pointer-events-none" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Hover effect */}
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 hover:from-blue-500/5 hover:to-indigo-500/5 transition-all duration-300 pointer-events-none" />
      )}
    </motion.div>
  )
}