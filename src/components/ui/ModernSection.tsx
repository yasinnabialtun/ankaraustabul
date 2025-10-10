'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ModernSectionProps {
  children: ReactNode
  className?: string
  background?: 'white' | 'gray' | 'gradient' | 'glass'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  id?: string
}

const ModernSection: React.FC<ModernSectionProps> = ({
  children,
  className = '',
  background = 'white',
  padding = 'lg',
  id
}) => {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30',
    glass: 'bg-white/80 backdrop-blur-md'
  }

  const paddingClasses = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-20',
    xl: 'py-24'
  }

  const sectionClasses = `
    ${backgroundClasses[background]}
    ${paddingClasses[padding]}
    ${className}
  `.trim()

  return (
    <motion.section
      id={id}
      className={sectionClasses}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </motion.section>
  )
}

export default ModernSection
