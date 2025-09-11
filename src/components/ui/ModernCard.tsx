import React, { ReactNode, forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'hover' | 'glass' | 'feature' | 'stat' | 'testimonial' | 'cta';
  icon?: LucideIcon;
  title?: string;
  subtitle?: string;
  image?: string;
  onClick?: () => void;
  href?: string;
  imageAlt?: string;
  tabIndex?: number;
  animate?: boolean;
  badge?: string;
  badgeVariant?: 'primary' | 'success' | 'warning' | 'danger';
  borderHoverEffect?: boolean;
}

const ModernCard = forwardRef<HTMLDivElement, ModernCardProps>(({ 
  children, 
  className = '', 
  variant = 'default',
  icon: Icon,
  title,
  subtitle,
  image,
  onClick,
  href,
  imageAlt,
  tabIndex,
  animate = false,
  badge,
  badgeVariant = 'primary',
  borderHoverEffect = false,
  ...props
}, ref) => {
  const baseClasses = 'relative rounded-2xl transition-all duration-300 ease-out';
  
  const variantClasses = {
    default: 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg',
    hover: 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer',
    glass: 'bg-white/80 backdrop-blur-md border border-white/20 hover:bg-white/90',
    feature: 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:from-blue-100 hover:to-indigo-100',
    stat: 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg overflow-hidden',
    testimonial: 'bg-white border border-gray-200 shadow-sm hover:shadow-md',
    cta: 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border border-blue-700 hover:shadow-lg hover:shadow-blue-500/20',
  };

  const badgeClasses = {
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-red-100 text-red-800',
  };

  const isInteractive = !!onClick || !!href;
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${className} ${isInteractive ? 'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2' : ''}`;

  // Define card content
  const cardContent = (
    <>
      {/* Badge (if provided) */}
      {badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${badgeClasses[badgeVariant]}`}>
            {badge}
          </span>
        </div>
      )}

      {/* Image Header */}
      {image && (
        <div className="relative overflow-hidden rounded-t-2xl">
          <img 
            src={image} 
            alt={imageAlt || title || 'Card image'} 
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        {(Icon || title || subtitle) && (
          <div className="mb-4">
            {Icon && (
              <div className="mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-blue-600" aria-hidden="true" />
                </div>
              </div>
            )}
            
            {title && (
              <h3 className={`text-lg font-semibold ${variant === 'cta' ? 'text-white' : 'text-gray-900'} mb-1 group-hover:text-blue-700`}>
                {title}
              </h3>
            )}
            
            {subtitle && (
              <p className={`text-sm ${variant === 'cta' ? 'text-blue-100' : 'text-gray-600'}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-4">
          {children}
        </div>
      </div>

      {/* Hover Effect Overlay */}
      {variant === 'hover' && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
      
      {/* Border Hover Effect */}
      {borderHoverEffect && (
        <div className="absolute inset-0 rounded-2xl border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
    </>
  );

  // For interactive cards (with onClick or href)
  if (isInteractive) {
    if (href) {
      return (
        <a 
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={`${cardClasses} group block`}
          onClick={onClick}
          tabIndex={tabIndex}
          {...props}
        >
          {animate ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              {cardContent}
            </motion.div>
          ) : (
            cardContent
          )}
        </a>
      );
    } else {
      return (
        <button 
          ref={ref as React.Ref<HTMLButtonElement>}
          className={`${cardClasses} group block text-left w-full`}
          onClick={onClick}
          tabIndex={tabIndex}
          {...props}
        >
          {animate ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              {cardContent}
            </motion.div>
          ) : (
            cardContent
          )}
        </button>
      );
    }
  }

  // For non-interactive cards
  return (
    <div 
      ref={ref}
      className={`${cardClasses} group`}
      tabIndex={tabIndex}
      {...props}
    >
      {animate ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          {cardContent}
        </motion.div>
      ) : (
        cardContent
      )}
    </div>
  );
});

ModernCard.displayName = 'ModernCard';

export default ModernCard;
