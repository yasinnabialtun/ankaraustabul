import React from 'react'
import { Button as ShadcnButton } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonVariant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  hoverEffect?: boolean
  className?: string
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  buttonVariant = 'primary',
  hoverEffect = true,
  className,
  children,
  ...props
}) => {
  const variantMap = {
    primary: 'default',
    secondary: 'secondary',
    outline: 'outline',
    ghost: 'ghost',
    danger: 'destructive',
    success: 'default'
  } as const

  return (
    <ShadcnButton
      variant={variantMap[buttonVariant]}
      className={cn(
        hoverEffect && 'hover:scale-105 transition-transform duration-200',
        className
      )}
      {...props}
    >
      {children}
    </ShadcnButton>
  )
}

export default Button