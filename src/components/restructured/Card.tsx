import React from 'react'
import { Card as ShadcnCard, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface CardProps {
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  className?: string
  children?: React.ReactNode
  variant?: 'default' | 'glass' | 'neumorphism' | 'gradient'
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  imageAlt = 'Card image',
  className,
  children,
  variant = 'default'
}) => {
  return (
    <ShadcnCard variant={variant} className={cn('overflow-hidden', className)}>
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      
      {children && <CardContent>{children}</CardContent>}
    </ShadcnCard>
  )
}

export default Card