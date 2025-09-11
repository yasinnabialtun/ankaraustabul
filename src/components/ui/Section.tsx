import React from 'react';
import { Box, BoxProps, Container } from '@mui/material';
import { motion } from 'framer-motion';

interface SectionProps extends Omit<BoxProps, 'component' | 'maxWidth'> {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'white' | 'gray' | 'blue' | 'gradient' | 'glassmorphism' | 'dark';
  container?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  glassmorphism?: boolean;
  gradient?: boolean;
}

const Section: React.FC<SectionProps> = ({
  children,
  className,
  padding = 'md',
  background = 'white',
  container = false,
  maxWidth = 'lg',
  animated = false,
  glassmorphism = false,
  gradient = false,
  ...props
}) => {
  const paddingMap = {
    none: 0,
    sm: 2,
    md: 4,
    lg: 6,
    xl: 8
  };

  const backgroundMap = {
    white: 'background.paper',
    gray: 'grey.50',
    blue: 'primary.50',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    glassmorphism: 'rgba(255, 255, 255, 0.95)',
    dark: 'grey.900'
  };

  const getBackgroundStyles = () => {
    if (glassmorphism) {
      return {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        position: 'relative' as const,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
          zIndex: 0,
          pointerEvents: 'none',
        },
        // Glassmorphism arka planlarda yazı rengini koyu yap
        '& .MuiTypography-root': {
          color: '#1e293b !important',
          textShadow: '0 1px 2px rgba(255, 255, 255, 0.8) !important',
        },
        '& .MuiTypography-h1, & .MuiTypography-h2, & .MuiTypography-h3, & .MuiTypography-h4, & .MuiTypography-h5, & .MuiTypography-h6': {
          color: '#1e293b !important',
          textShadow: '0 1px 3px rgba(255, 255, 255, 0.9) !important',
        },
        '& .MuiTypography-body1, & .MuiTypography-body2': {
          color: '#475569 !important',
          textShadow: '0 1px 2px rgba(255, 255, 255, 0.6) !important',
        },
        // Tüm HTML elementleri için koyu renk
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          color: '#1e293b !important',
          textShadow: '0 1px 3px rgba(255, 255, 255, 0.9) !important',
        },
        '& p, & span, & div': {
          color: '#475569 !important',
          textShadow: '0 1px 2px rgba(255, 255, 255, 0.6) !important',
        },
      };
    }

    if (gradient) {
      return {
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
        color: 'white',
        position: 'relative' as const,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
          zIndex: 0,
          pointerEvents: 'none',
        },
        // Gradient arka planlarda yazı rengini beyaz yap
        '& .MuiTypography-root': {
          color: '#ffffff !important',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.3) !important',
        },
        '& .MuiTypography-h1, & .MuiTypography-h2, & .MuiTypography-h3, & .MuiTypography-h4, & .MuiTypography-h5, & .MuiTypography-h6': {
          color: '#ffffff !important',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.3) !important',
        },
        '& .MuiTypography-body1, & .MuiTypography-body2': {
          color: '#ffffff !important',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2) !important',
        },
        // Tüm HTML elementleri için beyaz renk
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          color: '#ffffff !important',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.3) !important',
        },
        '& p, & span, & div': {
          color: '#ffffff !important',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2) !important',
        },
      };
    }

    return {
      backgroundColor: backgroundMap[background],
      ...(background === 'gradient' && {
        background: backgroundMap.gradient,
        color: 'white',
      }),
      // Varsayılan koyu yazı renkleri
      '& .MuiTypography-root': {
        color: '#1e293b !important',
      },
      '& .MuiTypography-h1, & .MuiTypography-h2, & .MuiTypography-h3, & .MuiTypography-h4, & .MuiTypography-h5, & .MuiTypography-h6': {
        color: '#1e293b !important',
      },
      '& .MuiTypography-body1, & .MuiTypography-body2': {
        color: '#334155 !important',
      },
      // Tüm HTML elementleri için koyu renk
      '& h1, & h2, & h3, & h4, & h5, & h6': {
        color: '#1e293b !important',
      },
      '& p, & span, & div': {
        color: '#334155 !important',
      },
    };
  };

  const SectionComponent = animated ? motion(Box) : Box;

  return (
    <SectionComponent
      component="section"
      className={`${className || ''} ${glassmorphism ? 'glassmorphism' : ''} ${gradient ? 'gradient-bg' : ''}`}
      sx={{
        py: paddingMap[padding],
        position: 'relative',
        overflow: 'hidden',
        ...getBackgroundStyles(),
        ...props.sx,
      }}
      {...(animated && {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
        viewport: { once: true, margin: '-100px' },
      })}
      {...props}
    >
      {container ? (
        <Container maxWidth={maxWidth} sx={{ position: 'relative', zIndex: 1 }}>
          {children}
        </Container>
      ) : (
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {children}
        </Box>
      )}
    </SectionComponent>
  );
};

export default Section;
