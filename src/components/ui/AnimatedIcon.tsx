import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedIconProps {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  background?: boolean;
  backgroundClassName?: string;
  animation?: 'pulse' | 'bounce' | 'spin' | 'float';
  className?: string;
}

const AnimatedIcon = ({
  icon,
  size = 'md',
  color = 'text-blue-600',
  background = false,
  backgroundClassName = 'bg-blue-100',
  animation = 'pulse',
  className = '',
}: AnimatedIconProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };
  
  const backgroundSizeClasses = {
    sm: 'p-1.5 rounded-md',
    md: 'p-2 rounded-lg',
    lg: 'p-3 rounded-xl',
    xl: 'p-4 rounded-2xl',
  };
  
  const animationVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop' as const,
      },
    },
    bounce: {
      y: [0, -10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'loop' as const,
      },
    },
    spin: {
      rotate: [0, 360],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'linear' as const,
      },
    },
    float: {
      y: [0, -5, 0],
      rotate: [0, 3, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: 'loop' as const,
      },
    },
  };

  return (
    <div className={`inline-flex ${className}`}>
      {background ? (
        <div className={`${backgroundSizeClasses[size]} ${backgroundClassName}`}>
          <motion.div
            animate={animationVariants[animation]}
            className={`${sizeClasses[size]} ${color}`}
          >
            {icon}
          </motion.div>
        </div>
      ) : (
        <motion.div
          animate={animationVariants[animation]}
          className={`${sizeClasses[size]} ${color}`}
        >
          {icon}
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedIcon;
