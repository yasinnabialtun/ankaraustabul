import React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  rounded?: boolean
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  rounded = true
}) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-muted',
        rounded && 'rounded-md',
        className
      )}
      style={{
        width: width || '100%',
        height: height || '1rem'
      }}
    />
  )
}

export default Skeleton