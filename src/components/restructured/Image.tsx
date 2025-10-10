import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
}

const CustomImage: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  ...props
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('object-cover', className)}
      priority={priority}
      fill={fill}
      sizes={sizes}
      {...props}
    />
  )
}

export default CustomImage