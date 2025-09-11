import React, { useState, useEffect } from 'react';
import { Fab, Zoom, Tooltip } from '@mui/material';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <Tooltip title="Yukarı Çık" placement="left" arrow>
            <Fab
              onClick={scrollToTop}
              size="large"
              sx={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(29, 78, 216, 0.9) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
                color: 'white',
                width: 56,
                height: 56,
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(29, 78, 216, 0.95) 0%, rgba(30, 64, 175, 0.95) 100%)',
                  transform: 'translateY(-4px) scale(1.05)',
                  boxShadow: '0 12px 40px rgba(59, 130, 246, 0.4)',
                },
                '&:active': {
                  transform: 'translateY(-2px) scale(1.02)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '@media (max-width: 600px)': {
                  width: 48,
                  height: 48,
                  bottom: 16,
                  right: 16,
                },
              }}
            >
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <KeyboardArrowUpIcon />
              </motion.div>
            </Fab>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop; 