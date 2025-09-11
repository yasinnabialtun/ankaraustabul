import React from 'react';
import { motion } from 'framer-motion';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
  Box,
} from '@mui/material';
import { buttonVariants, buttonGlowVariants } from '../animations';

interface ButtonProps extends Omit<MuiButtonProps, 'component'> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  glassmorphism?: boolean;
  glow?: boolean;
  pulse?: boolean;
  rounded?: boolean;
  shadow?: boolean;
  animated?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  glassmorphism = false,
  glow = false,
  pulse = false,
  rounded = false,
  shadow = false,
  animated = true,
  disabled,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          color: '#ffffff',
          border: 'none',
          '&:hover': {
            background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        };
      case 'secondary':
        return {
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          color: '#ffffff',
          border: 'none',
          '&:hover': {
            background: 'linear-gradient(135deg, #7c3aed 0%, #6b21a8 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        };
      case 'accent':
        return {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#ffffff',
          border: 'none',
          '&:hover': {
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: '#3b82f6',
          border: 'none',
          '&:hover': {
            background: 'rgba(59, 130, 246, 0.1)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        };
      case 'outline':
        return {
          background: 'transparent',
          color: '#3b82f6',
          border: '2px solid #3b82f6',
          '&:hover': {
            background: 'rgba(59, 130, 246, 0.1)',
            borderColor: '#1d4ed8',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        };
      case 'gradient':
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#ffffff',
          border: 'none',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: '8px 16px',
          fontSize: '0.875rem',
          minHeight: 36,
        };
      case 'md':
        return {
          padding: '12px 24px',
          fontSize: '1rem',
          minHeight: 44,
        };
      case 'lg':
        return {
          padding: '14px 32px',
          fontSize: '1.125rem',
          minHeight: 52,
        };
      case 'xl':
        return {
          padding: '16px 40px',
          fontSize: '1.25rem',
          minHeight: 60,
        };
      default:
        return {};
    }
  };

  const ButtonComponent = animated ? motion(MuiButton) : MuiButton;

  return (
    <ButtonComponent
      {...(animated && {
        variants: buttonVariants,
        whileHover: "hover",
        whileTap: "tap",
        initial: "initial",
      })}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      sx={{
        borderRadius: rounded ? 50 : 3,
        fontWeight: 600,
        textTransform: 'none',
        letterSpacing: '0.025em',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: shadow 
          ? '0 4px 12px rgba(0, 0, 0, 0.15)' 
          : glow 
            ? '0 4px 12px rgba(59, 130, 246, 0.15)'
            : 'none',
        backdropFilter: glassmorphism ? 'blur(10px)' : 'none',
        border: glassmorphism ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
        ...getVariantStyles(),
        ...getSizeStyles(),
        '&:focus-visible': {
          outline: '2px solid #3b82f6',
          outlineOffset: '2px',
        },
        '&:disabled': {
          opacity: 0.6,
          transform: 'none !important',
          boxShadow: 'none !important',
        },
        // Pulse animation
        ...(pulse && {
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.7)',
            },
            '50%': {
              boxShadow: '0 0 0 10px rgba(59, 130, 246, 0)',
            },
          },
        }),
        // Glow effect
        ...(glow && {
          '&:hover': {
            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
          },
        }),
      }}
      {...props}
    >
      {/* Loading Spinner */}
      {loading && (
        <CircularProgress
          size={20}
          sx={{
            color: 'inherit',
            mr: iconPosition === 'left' && icon ? 1 : 0,
            ml: iconPosition === 'right' && icon ? 1 : 0,
          }}
        />
      )}

      {/* Icon */}
      {!loading && icon && iconPosition === 'left' && (
        <Box
          component="span"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            mr: 1,
            fontSize: 'inherit',
          }}
        >
          {icon}
        </Box>
      )}

      {/* Content */}
      <Box
        component="span"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>

      {/* Icon */}
      {!loading && icon && iconPosition === 'right' && (
        <Box
          component="span"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            ml: 1,
            fontSize: 'inherit',
          }}
        >
          {icon}
        </Box>
      )}

      {/* Ripple Effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          '&:hover': {
            opacity: 1,
          },
        }}
      />
    </ButtonComponent>
  );
};

export default Button;
