'use client'

import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Search, Mail, Lock, User, Phone, MapPin } from 'lucide-react'

interface ModernInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: 'search' | 'mail' | 'lock' | 'user' | 'phone' | 'map' | React.ReactNode
  variant?: 'default' | 'glass' | 'gradient'
  animated?: boolean
  showPasswordToggle?: boolean
}

const ModernInput = forwardRef<HTMLInputElement, ModernInputProps>(({
  label,
  error,
  icon,
  variant = 'default',
  animated = true,
  showPasswordToggle = false,
  type = 'text',
  className = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  
  const inputType = showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password') 
    : type

  const baseClasses = 'w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variantClasses = {
    default: 'bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500',
    glass: 'bg-white/10 backdrop-blur-md border-white/20 text-white placeholder-white/70 focus:border-white/40 focus:ring-white/50',
    gradient: 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 focus:border-blue-500 focus:ring-blue-500'
  }
  
  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
  
  const iconClasses = icon ? 'pl-12' : ''
  
  const getIcon = () => {
    if (typeof icon === 'string') {
      const iconMap = {
        search: <Search className="w-5 h-5" />,
        mail: <Mail className="w-5 h-5" />,
        lock: <Lock className="w-5 h-5" />,
        user: <User className="w-5 h-5" />,
        phone: <Phone className="w-5 h-5" />,
        map: <MapPin className="w-5 h-5" />
      }
      return iconMap[icon as keyof typeof iconMap]
    }
    return icon
  }

  const animationProps = animated ? {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {}

  return (
    <motion.div className="w-full" {...animationProps}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {getIcon()}
          </div>
        )}
        
        {/* Input */}
        <input
          ref={ref}
          type={inputType}
          className={`${baseClasses} ${variantClasses[variant]} ${errorClasses} ${iconClasses} ${className}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {/* Password toggle */}
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
        
        {/* Focus indicator */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-blue-500 pointer-events-none"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>
      
      {/* Error message */}
      {error && (
        <motion.p
          className="mt-2 text-sm text-red-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
})

ModernInput.displayName = 'ModernInput'

export default ModernInput