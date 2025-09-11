import React, { forwardRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Eye, EyeOff, Info } from 'lucide-react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'textarea';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  success?: string;
  helper?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    custom?: (value: string) => string | null;
  };
  showPasswordToggle?: boolean;
  className?: string;
  rows?: number;
}

const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  success,
  helper,
  required = false,
  disabled = false,
  icon: Icon,
  validation,
  showPasswordToggle = false,
  className = '',
  rows = 3,
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const actualType = type === 'password' && showPassword ? 'text' : type;

  useEffect(() => {
    if (validation && value) {
      setIsValidating(true);
      const timeoutId = setTimeout(() => {
        const error = validateField(value);
        setValidationError(error);
        setIsValidating(false);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [value, validation]);

  const validateField = (value: string): string | null => {
    if (!validation) return null;

    if (validation.minLength && value.length < validation.minLength) {
      return `En az ${validation.minLength} karakter olmalıdır`;
    }

    if (validation.maxLength && value.length > validation.maxLength) {
      return `En fazla ${validation.maxLength} karakter olabilir`;
    }

    if (validation.pattern && !validation.pattern.test(value)) {
      return 'Geçersiz format';
    }

    if (validation.custom) {
      return validation.custom(value);
    }

    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const finalError = error || validationError;
  const hasError = !!finalError;
  const hasSuccess = !!success && !hasError;

  const getStateClasses = () => {
    if (disabled) {
      return 'bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed';
    }
    if (hasError) {
      return 'border-red-500 focus:border-red-500 focus:ring-red-500/20';
    }
    if (hasSuccess) {
      return 'border-green-500 focus:border-green-500 focus:ring-green-500/20';
    }
    if (isFocused) {
      return 'border-blue-500 focus:border-blue-500 focus:ring-blue-500/20';
    }
    return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20';
  };

  const baseClasses = 'w-full transition-all duration-200 focus:outline-none rounded-xl border bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2';

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      <label 
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>

      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}

        {/* Input/Textarea */}
        {type === 'textarea' ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={rows}
            className={`${baseClasses} ${getStateClasses()} ${Icon ? 'pl-10' : ''} resize-none`}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${name}-error` : 
              hasSuccess ? `${name}-success` : 
              helper ? `${name}-helper` : undefined
            }
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={name}
            name={name}
            type={actualType}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={`${baseClasses} ${getStateClasses()} ${Icon ? 'pl-10' : ''} ${showPasswordToggle ? 'pr-10' : ''}`}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${name}-error` : 
              hasSuccess ? `${name}-success` : 
              helper ? `${name}-helper` : undefined
            }
          />
        )}

        {/* Password Toggle */}
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}

        {/* Validation Indicator */}
        <AnimatePresence>
          {isValidating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Helper/Error/Success Messages */}
      <AnimatePresence>
        {(finalError || success || helper) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="min-h-[1.25rem]"
          >
            {finalError && (
              <p id={`${name}-error`} className="text-sm text-red-600 flex items-center gap-1.5" role="alert">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                {finalError}
              </p>
            )}
            
            {success && !finalError && (
              <p id={`${name}-success`} className="text-sm text-green-600 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                {success}
              </p>
            )}
            
            {helper && !finalError && !success && (
              <p id={`${name}-helper`} className="text-sm text-gray-500 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                {helper}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;
