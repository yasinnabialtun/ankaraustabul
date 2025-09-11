import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Category as CategoryIcon,
  Article as ArticleIcon,
  ContactSupport as ContactIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navigationItems = [
    { path: '/', label: 'Ana Sayfa', icon: <HomeIcon /> },
    { path: '/ustalar', label: 'Ustalar', icon: <PeopleIcon /> },
    { path: '/kategoriler', label: 'Kategoriler', icon: <CategoryIcon /> },
    { path: '/blog', label: 'Blog', icon: <ArticleIcon /> },
    { path: '/iletisim', label: 'İletişim', icon: <ContactIcon /> },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  if (!isMobile) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.3)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
              zIndex: -1,
            },
          }}
        >
          <BottomNavigation
            value={location.pathname}
            onChange={(event, newValue) => {
              navigate(newValue);
            }}
            sx={{
              height: 70,
              '& .MuiBottomNavigationAction-root': {
                color: '#64748b',
                minWidth: 'auto',
                padding: '6px 8px',
                '&.Mui-selected': {
                  color: '#3b82f6',
                  fontWeight: 600,
                },
                '&:hover': {
                  color: '#3b82f6',
                  backgroundColor: 'rgba(59, 130, 246, 0.05)',
                },
              },
              '& .MuiBottomNavigationAction-label': {
                fontSize: '0.75rem',
                fontWeight: 500,
                marginTop: '4px',
                '&.Mui-selected': {
                  fontSize: '0.75rem',
                  fontWeight: 600,
                },
              },
              '& .MuiSvgIcon-root': {
                fontSize: '1.5rem',
              },
            }}
          >
            {navigationItems.map((item) => (
              <BottomNavigationAction
                key={item.path}
                label={item.label}
                value={item.path}
                icon={item.icon}
                sx={{
                  '&.Mui-selected': {
                    '& .MuiBottomNavigationAction-label': {
                      color: '#3b82f6',
                      fontWeight: 600,
                    },
                    '& .MuiSvgIcon-root': {
                      color: '#3b82f6',
                    },
                  },
                }}
              />
            ))}
          </BottomNavigation>

          {/* Usta Ekle Floating Button */}
          <motion.div
            layoutId="usta-ekle-button"
            style={{
              position: 'absolute',
              top: -25,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1001,
            }}
          >
            <Fab
              color="primary"
              size="medium"
              onClick={() => navigate('/usta-ekle')}
              sx={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                width: 50,
                height: 50,
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
              }}
            >
              <AddIcon />
            </Fab>
          </motion.div>
        </Paper>
      </motion.div>
    </AnimatePresence>
  );
};

export default BottomNav;