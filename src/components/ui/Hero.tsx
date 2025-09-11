import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './index';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  background?: 'gradient' | 'image' | 'video';
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: boolean;
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  background = 'gradient',
  backgroundImage,
  backgroundVideo,
  overlay = false,
  align = 'center',
  size = 'lg',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'min-h-[60vh] py-16',
    md: 'min-h-[70vh] py-20',
    lg: 'min-h-[80vh] py-24',
    xl: 'min-h-screen py-32',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const backgroundClasses = {
    gradient: 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800',
    image: 'bg-cover bg-center bg-no-repeat',
    video: 'relative overflow-hidden',
  };

  const containerClasses = [
    'relative flex items-center justify-center',
    sizeClasses[size],
    backgroundClasses[background],
    className,
  ].join(' ');

  const contentClasses = [
    'relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
    alignClasses[align],
  ].join(' ');

  const backgroundStyle = background === 'image' && backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className={containerClasses}
      style={backgroundStyle}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Video */}
      {background === 'video' && backgroundVideo && (
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-black/50" />
      )}

      {/* Content */}
      <div className={contentClasses}>
        {subtitle && (
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium mb-6"
          >
            {subtitle}
          </motion.div>
        )}

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        )}

        {(primaryAction || secondaryAction) && (
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start"
          >
            {primaryAction && (
              <Button
                size="large"
                onClick={primaryAction.onClick}
                icon={primaryAction.icon}
              >
                {primaryAction.label}
              </Button>
            )}

            {secondaryAction && (
              <Button
                variant="outlined"
                size="large"
                onClick={secondaryAction.onClick}
                icon={secondaryAction.icon}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: 'primary.main'
                  }
                }}
              >
                {secondaryAction.label}
              </Button>
            )}
          </motion.div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" />
      </div>
    </motion.section>
  );
};

export { Hero };
export default Hero;
