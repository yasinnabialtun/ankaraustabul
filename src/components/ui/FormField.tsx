'use client'

import React, { forwardRef, useState, useEffect } from 'react'
import { AlertCircle, CheckCircle, Eye, EyeOff, Info } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'textarea'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  helperText?: string
  required?: boolean
  disabled?: boolean
  autoComplete?: string
  className?: string
  variant?: 'default' | 'glass' | 'neumorphism'
  showValidation?: boolean
  validateOnChange?: boolean
  validateOnBlur?: boolean
  validationRules?: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    custom?: (value: string) => string | null
  }
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  autoComplete,
  className,
  variant = 'default',
  showValidation = true,
  validateOnChange = false,
  validateOnBlur = true,
  validationRules = {},
}, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  const validateField = (fieldValue: string): string | null => {
    if (!validationRules) return null

    if (validationRules.required && !fieldValue.trim()) {
      return `${label} gereklidir`
    }

    if (validationRules.minLength && fieldValue.length < validationRules.minLength) {
      return `${label} en az ${validationRules.minLength} karakter olmalıdır`
    }

    if (validationRules.maxLength && fieldValue.length > validationRules.maxLength) {
      return `${label} en fazla ${validationRules.maxLength} karakter olabilir`
    }

    if (validationRules.pattern && !validationRules.pattern.test(fieldValue)) {
      return `${label} geçerli bir format değil`
    }

    if (validationRules.custom) {
      return validationRules.custom(fieldValue)
    }

    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)

    if (validateOnChange) {
      const error = validateField(newValue)
      setValidationError(error)
    }
  }

  const handleBlur = () => {
    if (validateOnBlur) {
      const error = validateField(value)
      setValidationError(error)
    }
    onBlur?.()
  }

  const currentError = error || validationError
  const isValid = !currentError && value.length > 0

  const inputType = type === 'password' && showPassword ? 'text' : type

  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={name} className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      
      <div className="relative">
        <Input
          ref={ref}
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          autoComplete={autoComplete}
          variant={variant}
          error={!!currentError}
          className={cn(
            'pr-10',
            isValid && showValidation && 'border-green-500 focus:border-green-500',
            currentError && 'border-destructive focus:border-destructive'
          )}
        />
        
        {type === 'password' && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </Button>
        )}
        
        {showValidation && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isValidating ? (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : isValid ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : currentError ? (
              <AlertCircle className="w-4 h-4 text-destructive" />
            ) : null}
          </div>
        )}
      </div>
      
      {(currentError || helperText) && (
        <div className="flex items-start space-x-2">
          {currentError ? (
            <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          )}
          <p className={cn(
            'text-sm',
            currentError ? 'text-destructive' : 'text-muted-foreground'
          )}>
            {currentError || helperText}
          </p>
        </div>
      )}
    </div>
  )
})

FormField.displayName = 'FormField'

export default FormField