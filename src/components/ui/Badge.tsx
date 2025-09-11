import React from 'react';
import { Box, Chip, ChipProps } from '@mui/material';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'white' | 'gradient' | 'glassmorphism';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  clickable?: boolean;
  onClick?: () => void;
  rounded?: boolean;
  glow?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  clickable = false,
  onClick,
  rounded = false,
  glow = false,
}) => {
  const getBadgeStyles = () => {
    const baseStyles = {
      borderRadius: rounded ? 3 : 2,
      fontWeight: 600,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: clickable ? 'pointer' : 'default',
      '&:hover': clickable ? {
        transform: 'translateY(-2px)',
        boxShadow: glow ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
      } : {},
    };

    switch (variant) {
      case 'gradient':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          color: 'white',
          border: 'none',
          '&:hover': {
            ...baseStyles['&:hover'],
            background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
          },
        };
      case 'glassmorphism':
        return {
          ...baseStyles,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: '#1e293b',
          textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
          '&:hover': {
            ...baseStyles['&:hover'],
            background: 'rgba(255, 255, 255, 1)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
          },
        };
      case 'primary':
        return {
          ...baseStyles,
          background: 'primary.main',
          color: 'white',
          '&:hover': {
            ...baseStyles['&:hover'],
            background: 'primary.dark',
          },
        };
      case 'secondary':
        return {
          ...baseStyles,
          background: 'grey.100',
          color: 'grey.800',
          border: '1px solid grey.300',
          '&:hover': {
            ...baseStyles['&:hover'],
            background: 'grey.200',
          },
        };
      case 'success':
        return {
          ...baseStyles,
          background: 'success.main',
          color: 'white',
          '&:hover': {
            ...baseStyles['&:hover'],
            background: 'success.dark',
          },
        };
      case 'warning':
        return {
          ...baseStyles,
          background: 'warning.main',
          color: 'white',
          '&:hover': {
            ...baseStyles['&:hover'],
            background: 'warning.dark',
          },
        };
      case 'error':
        return {
          ...baseStyles,
          background: 'error.main',
          color: 'white',
          '&:hover': {
            ...baseStyles['&:hover'],
            background: 'error.dark',
          },
        };
      case 'info':
        return {
          ...baseStyles,
          background: 'info.main',
          color: 'white',
          '&:hover': {
            ...baseStyles['&:hover'],
            background: 'info.dark',
          },
        };
      case 'white':
        return {
          ...baseStyles,
          background: 'white',
          color: 'text.primary',
          border: '1px solid grey.300',
          '&:hover': {
            ...baseStyles['&:hover'],
            background: 'grey.50',
          },
        };
      default:
        return baseStyles;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          px: 1.5,
          py: 0.5,
          fontSize: '0.75rem',
          minHeight: 20,
        };
      case 'md':
        return {
          px: 2,
          py: 0.75,
          fontSize: '0.875rem',
          minHeight: 24,
        };
      case 'lg':
        return {
          px: 2.5,
          py: 1,
          fontSize: '1rem',
          minHeight: 28,
        };
      default:
        return {
          px: 2,
          py: 0.75,
          fontSize: '0.875rem',
          minHeight: 24,
        };
    }
  };

  const BadgeComponent = clickable ? motion(Box) : Box;

  return (
    <BadgeComponent
      component="span"
      onClick={onClick}
      whileHover={clickable ? { scale: 1.05 } : undefined}
      whileTap={clickable ? { scale: 0.95 } : undefined}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: icon ? 0.5 : 0,
        ...getBadgeStyles(),
        ...getSizeStyles(),
        className,
      }}
    >
      {icon && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {icon}
        </Box>
      )}
      {children}
    </BadgeComponent>
  );
};

export default Badge;
