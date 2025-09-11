import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './layout/Header';
import Footer from './layout/Footer';
import BottomNav from './BottomNav';
import SkipLink from './ui/SkipLink';
import { pageVariants, pageTransition } from './animations';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        position: 'relative',
        // Simplified typography styles
        '& .MuiTypography-root': {
          color: 'var(--gray-800)',
        },
        '& .MuiTypography-body1, & .MuiTypography-body2': {
          color: 'var(--gray-700)',
        },
        '& .MuiTypography-caption': {
          color: 'var(--gray-500)',
        },
        // Simplified glassmorphism styles
        '& .glassmorphism .MuiTypography-root': {
          color: 'var(--gray-800) !important',
        },
        '& .glassmorphism .MuiTypography-body1, & .glassmorphism .MuiTypography-body2': {
          color: 'var(--gray-600) !important',
        },
        // Simplified gradient styles
        '& .gradient-bg .MuiTypography-root': {
          color: '#ffffff !important',
        },
      }}
    >
      <SkipLink href="#main-content">Ana içeriğe geç</SkipLink>
      {/* Static Decorative Elements - Simplified */}
      <div
        style={{
          position: 'fixed',
          top: '10%',
          right: '10%',
          width: 100,
          height: 100,
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      
      <div
        style={{
          position: 'fixed',
          bottom: '20%',
          left: '5%',
          width: 150,
          height: 150,
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 10 }}>
        <Header />
      </Box>

      <Box
        component={motion.main}
        id="main-content"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        sx={{
          flex: 1,
          position: 'relative',
          zIndex: 5,
          pt: { xs: 8, sm: 9, md: 10 },
          pb: { xs: isMobile ? 12 : 8, sm: isMobile ? 12 : 6, md: 0 },
          px: { xs: 1, sm: 2 },
          '& > *': { 
            position: 'relative', 
            zIndex: 5,
            // Ana içerik alanında yazı renklerini garanti et
            '& .MuiTypography-root': {
              color: 'var(--gray-800)',
            },
            '& .MuiTypography-body1, & .MuiTypography-body2': {
              color: 'var(--gray-700)',
            },
            '& .MuiTypography-caption': {
              color: 'var(--gray-500)',
            },
            // Glassmorphism bileşenlerinde yazı renklerini garanti et
            '& .glassmorphism .MuiTypography-root': {
              color: 'var(--gray-800) !important',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.8) !important',
            },
            '& .glassmorphism .MuiTypography-body1, & .glassmorphism .MuiTypography-body2': {
              color: 'var(--gray-600) !important',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.6) !important',
            },
            // Gradient arka planlarda beyaz yazı
            '& .gradient-bg .MuiTypography-root': {
              color: '#ffffff !important',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.3) !important',
            },
          },
        }}
      >
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </Box>

      {isMobile && <BottomNav />}
      
      <Box sx={{ position: 'relative', zIndex: 10 }}>
        <Footer />
      </Box>

      {/* Global CSS - Simplified */}
      <style jsx global>{`
        /* Removed floating animations for cleaner look */
        
        /* Simplified glassmorphism */
        .glassmorphism {
          background: rgba(255, 255, 255, 0.9) !important;
          backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }
        
        .glassmorphism * {
          color: var(--gray-800) !important;
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-700) 100%);
        }
        
        .gradient-bg * {
          color: #ffffff !important;
        }
        
        /* Modern scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: var(--gray-100);
        }
        
        ::-webkit-scrollbar-thumb {
          background: var(--gray-300);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: var(--gray-400);
        }
        
        /* Modern selection */
        ::selection {
          background: var(--primary-200);
          color: var(--primary-900);
        }
        
        /* Modern focus visible */
        :focus-visible {
          outline: 2px solid var(--primary-500);
          outline-offset: 2px;
        }
        
        /* Modern reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Modern high contrast */
        @media (prefers-contrast: high) {
          .glassmorphism {
            background: rgba(255, 255, 255, 0.98) !important;
            border: 2px solid var(--gray-300) !important;
          }
          
          .gradient-bg {
            background: var(--primary-700) !important;
          }
          
          * {
            text-shadow: none !important;
          }
        }
      `}</style>
    </Box>
  );
};

export default Layout;