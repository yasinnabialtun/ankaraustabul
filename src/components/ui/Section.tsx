import React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'default' | 'muted' | 'gradient' | 'glass'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

const Section: React.FC<SectionProps> = ({
  children,
  className,
  id,
  background = 'default',
  padding = 'lg'
}) => {
  const backgroundClasses = {
    default: 'bg-background',
    muted: 'bg-muted',
    gradient: 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800',
    glass: 'bg-white/10 backdrop-blur-md'
  }

  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20'
  }

  return (
    <section
      id={id}
      className={cn(
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  )
}

export default Section