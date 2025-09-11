import { forwardRef, InputHTMLAttributes, ReactNode, useState, useId } from 'react';
import { AlertCircle, CheckCircle, Info, LucideIcon, Eye, EyeOff } from 'lucide-react';

interface ModernInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'floating';
  rightElement?: ReactNode;
  leftElement?: ReactNode;
  showPasswordToggle?: boolean;
  required?: boolean;
  fullWidth?: boolean;
}

const ModernInput = forwardRef<HTMLInputElement, ModernInputProps>(({
  label,
  error,
  success,
  helper,
  icon: Icon,
  iconPosition = 'left',
  size = 'md',
  variant = 'default',
  rightElement,
  leftElement,
  className = '',
  id,
  type = 'text',
  showPasswordToggle = false,
  required = false,
  fullWidth = true,
  disabled = false,
  placeholder,
  ...props
}, ref) => {
  // Generate unique ID for input accessibility
  const uniqueId = useId();
  const inputId = id || `input-${uniqueId}`;
  const helperId = `helper-${inputId}`;
  const errorId = `error-${inputId}`;
  const successId = `success-${inputId}`;

  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const actualType = type === 'password' && showPassword ? 'text' : type;

  // Base styling
  const baseClasses = 'w-full transition-all duration-200 focus:outline-none';
  
  // Size variations
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  // Variant styling
  const variantClasses = {
    default: 'border border-gray-300 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
    filled: 'border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
    floating: 'border border-gray-300 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 pt-6 pb-2',
  };

  // Icon sizes
  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  // State-based styling (error, success, disabled)
  const getStateClasses = () => {
    if (disabled) {
      return 'bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed';
    }
    if (error) {
      return 'border-red-500 focus:border-red-500 focus:ring-red-500/20';
    }
    if (success) {
      return 'border-green-500 focus:border-green-500 focus:ring-green-500/20';
    }
    return '';
  };

  // Combine all classes
  const inputClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${getStateClasses()} ${className}`;
  const iconSize = iconSizeClasses[size];

  // Handle padding for icons and elements
  const hasLeftIcon = (Icon && iconPosition === 'left') || leftElement;
  const hasRightIcon = (Icon && iconPosition === 'right') || rightElement || (type === 'password' && showPasswordToggle);

  const paddingClasses = `
    ${hasLeftIcon ? (size === 'sm' ? 'pl-10' : size === 'md' ? 'pl-12' : 'pl-14') : ''}
    ${hasRightIcon ? (size === 'sm' ? 'pr-10' : size === 'md' ? 'pr-12' : 'pr-14') : ''}
  `;

  // Container width class
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={`space-y-1.5 ${widthClass}`}>
      {/* Label - Not showing for floating variant */}
      {label && variant !== 'floating' && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon/Element */}
        {Icon && iconPosition === 'left' && (
          <div 
            className={`absolute left-0 top-0 h-full flex items-center ${size === 'sm' ? 'pl-3' : size === 'md' ? 'pl-4' : 'pl-5'}`}
            aria-hidden="true"
          >
            <Icon className={`${iconSize} ${error ? 'text-red-500' : 'text-gray-400'}`} />
          </div>
        )}

        {leftElement && (
          <div 
            className={`absolute left-0 top-0 h-full flex items-center ${size === 'sm' ? 'pl-3' : size === 'md' ? 'pl-4' : 'pl-5'}`}
            aria-hidden="true"
          >
            {leftElement}
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          id={inputId}
          type={actualType}
          className={`${inputClasses} ${paddingClasses}`}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : success ? successId : helper ? helperId : undefined
          }
          disabled={disabled}
          required={required}
          {...props}
        />

        {/* Floating Label */}
        {label && variant === 'floating' && (
          <label 
            htmlFor={inputId}
            className="absolute left-4 top-2 text-xs font-medium text-gray-500 pointer-events-none"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Password Toggle */}
        {type === 'password' && showPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={`absolute right-0 top-0 h-full flex items-center ${size === 'sm' ? 'pr-3' : size === 'md' ? 'pr-4' : 'pr-5'}`}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? 
              <EyeOff className={`${iconSize} text-gray-400 hover:text-gray-600`} /> : 
              <Eye className={`${iconSize} text-gray-400 hover:text-gray-600`} />
            }
          </button>
        )}

        {/* Right Icon/Element - Not showing if password toggle is active */}
        {Icon && iconPosition === 'right' && !showPasswordToggle && (
          <div 
            className={`absolute right-0 top-0 h-full flex items-center ${size === 'sm' ? 'pr-3' : size === 'md' ? 'pr-4' : 'pr-5'}`}
            aria-hidden="true"
          >
            <Icon className={`${iconSize} ${error ? 'text-red-500' : 'text-gray-400'}`} />
          </div>
        )}

        {rightElement && !showPasswordToggle && (
          <div 
            className={`absolute right-0 top-0 h-full flex items-center ${size === 'sm' ? 'pr-3' : size === 'md' ? 'pr-4' : 'pr-5'}`}
          >
            {rightElement}
          </div>
        )}
      </div>

      {/* Helper/Error/Success Text */}
      <div className="min-h-[1.25rem]">
        {error && (
          <p id={errorId} className="text-sm text-red-600 flex items-center gap-1.5" role="alert">
            <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
            {error}
          </p>
        )}
        
        {success && !error && (
          <p id={successId} className="text-sm text-green-600 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
            {success}
          </p>
        )}
        
        {helper && !error && !success && (
          <p id={helperId} className="text-sm text-gray-500 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" aria-hidden="true" />
            {helper}
          </p>
        )}
      </div>
    </div>
  );
});

ModernInput.displayName = 'ModernInput';

export default ModernInput;
