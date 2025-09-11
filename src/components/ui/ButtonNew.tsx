import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import type { ButtonProps } from '../../types';

const buttonVariants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700',
  secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-gray-600 hover:border-gray-700',
  outline: 'bg-transparent hover:bg-blue-50 text-blue-600 border-blue-600 hover:border-blue-700',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent',
  danger: 'bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700',
  success: 'bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700',
};

const sizeVariants = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  loadingText,
  onClick,
  className,
  type = 'button',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  rounded = false,
  shadow = false,
  ...rest
}: ButtonProps) {
  const baseClasses = clsx(
    'inline-flex items-center justify-center font-medium transition-all duration-200',
    'border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    rounded ? 'rounded-full' : 'rounded-md',
    shadow && 'shadow-sm hover:shadow-md',
    fullWidth && 'w-full',
    buttonVariants[variant],
    sizeVariants[size],
    className
  );

  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      className={baseClasses}
      disabled={isDisabled}
      onClick={onClick}
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      {...rest}
    >
      {loading && (
        <Loader2 className={clsx(
          'animate-spin',
          size === 'xs' ? 'h-3 w-3' : size === 'sm' ? 'h-4 w-4' : 'h-5 w-5',
          (children || loadingText) && 'mr-2'
        )} />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className={clsx(
          size === 'xs' ? 'h-3 w-3' : size === 'sm' ? 'h-4 w-4' : 'h-5 w-5',
          children && 'mr-2'
        )}>
          {icon}
        </span>
      )}
      
      {loading ? (loadingText || children) : children}
      
      {!loading && icon && iconPosition === 'right' && (
        <span className={clsx(
          size === 'xs' ? 'h-3 w-3' : size === 'sm' ? 'h-4 w-4' : 'h-5 w-5',
          children && 'ml-2'
        )}>
          {icon}
        </span>
      )}
    </motion.button>
  );
}

export default Button;
