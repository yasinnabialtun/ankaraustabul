import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Chip,
  Avatar,
  Badge,
  Fade,
  Slide,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  Category as CategoryIcon,
  Article as ArticleIcon,
  ContactSupport as ContactIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Close as CloseIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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

  const drawer = (
    <Box sx={{ 
      width: { xs: '100vw', sm: 320 }, 
      height: '100vh',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        zIndex: 0,
      }
    }}>
      <Box sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 3, 
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                width: 48,
                height: 48,
                mr: 2,
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <PeopleIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
                Ankara Usta Bul
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.9)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                Güvenilir Usta Platformu
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ color: 'white', border: '1px solid rgba(255, 255, 255, 0.3)' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        {/* Navigation */}
        <Box sx={{ flex: 1, overflow: 'auto', py: 2 }}>
          <List>
            {navigationItems.map((item, index) => (
              <ListItem
                key={item.path}
                component={Link}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  mx: 2,
                  mb: 1,
                  borderRadius: 2,
                  color: isActive(item.path) ? 'white' : 'rgba(255, 255, 255, 0.9)',
                  backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  backdropFilter: isActive(item.path) ? 'blur(10px)' : 'none',
                  border: isActive(item.path) ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent',
                  transition: 'all 0.3s ease',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    transform: 'translateX(8px)',
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  color: 'inherit',
                  minWidth: 40,
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive(item.path) ? 600 : 400,
                    fontSize: '1rem',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Contact Info */}
        <Box sx={{ 
          p: 3, 
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)'
        }}>
          <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.95)', mb: 2, fontWeight: 600, textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
            İletişim Bilgileri
          </Typography>
          <Box sx={{ space: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneIcon sx={{ fontSize: 18, mr: 2, color: 'rgba(255, 255, 255, 0.9)' }} />
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                +90 312 123 45 67
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ fontSize: 18, mr: 2, color: 'rgba(255, 255, 255, 0.9)' }} />
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                info@ankaraustabul.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationIcon sx={{ fontSize: 18, mr: 2, color: 'rgba(255, 255, 255, 0.9)' }} />
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                Ankara, Türkiye
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: scrolled 
            ? 'rgba(255, 255, 255, 0.98)' 
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ 
            px: { xs: 1, sm: 2 },
            py: { xs: 1, sm: 1.5 },
            minHeight: { xs: 64, sm: 72 }
          }}>
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                mr: { xs: 2, md: 4 },
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            >
              <Avatar
                sx={{
                  bgcolor: scrolled ? 'primary.main' : 'rgba(255, 255, 255, 0.2)',
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                  mr: 2,
                  border: scrolled ? 'none' : '2px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                }}
              >
                <PeopleIcon />
              </Avatar>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: scrolled ? '#1e293b' : 'white',
                  display: { xs: 'none', sm: 'block' },
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  textShadow: scrolled ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.3)',
                }}
              >
                Ankara Usta Bul
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      color: scrolled ? '#1e293b' : 'white',
                      mx: 1,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      textShadow: scrolled ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.2)',
                      '&:hover': {
                        backgroundColor: scrolled 
                          ? 'rgba(59, 130, 246, 0.1)' 
                          : 'rgba(255, 255, 255, 0.15)',
                        transform: 'translateY(-2px)',
                      },
                      ...(isActive(item.path) && {
                        backgroundColor: scrolled 
                          ? 'rgba(59, 130, 246, 0.15)' 
                          : 'rgba(255, 255, 255, 0.2)',
                        fontWeight: 600,
                        backdropFilter: 'blur(10px)',
                      }),
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Desktop Actions */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                  onClick={() => setSearchOpen(!searchOpen)}
                  sx={{
                    color: scrolled ? '#1e293b' : 'white',
                    backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  <SearchIcon />
                </IconButton>
                
                <Badge badgeContent={3} color="error">
                  <IconButton
                    sx={{
                      color: scrolled ? '#1e293b' : 'white',
                      backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                      },
                    }}
                  >
                    <NotificationsIcon />
                  </IconButton>
                </Badge>

                <Chip
                  icon={<PhoneIcon />}
                  label="+90 312 123 45 67"
                  size="small"
                  sx={{
                    backgroundColor: scrolled ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                    color: scrolled ? '#3b82f6' : 'white',
                    border: scrolled ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid rgba(255, 255, 255, 0.3)',
                    textShadow: scrolled ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.2)',
                    '& .MuiChip-icon': {
                      color: 'inherit',
                    },
                    '&:hover': {
                      backgroundColor: scrolled ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                />
                
                <Button
                  component={Link}
                  to="/usta-ekle"
                  variant="contained"
                  size="small"
                  sx={{
                    background: scrolled 
                      ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)',
                    color: scrolled ? 'white' : '#3b82f6',
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    boxShadow: scrolled 
                      ? '0 4px 12px rgba(59, 130, 246, 0.3)'
                      : '0 4px 12px rgba(0, 0, 0, 0.1)',
                    textShadow: scrolled ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 'none',
                    '&:hover': {
                      background: scrolled 
                        ? 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: scrolled 
                        ? '0 6px 20px rgba(59, 130, 246, 0.4)'
                        : '0 6px 20px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  Usta Ekle
                </Button>
              </Box>
            )}

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                ml: 'auto',
                color: scrolled ? '#1e293b' : 'white',
                display: { md: 'none' },
                backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)',
                border: scrolled ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: { xs: '100vw', sm: 320 },
            border: 'none',
            background: 'transparent',
          },
        }}
      >
        <Slide direction="left" in={mobileOpen} mountOnEnter unmountOnExit>
          <Box>{drawer}</Box>
        </Slide>
      </Drawer>

      {/* Toolbar spacer */}
      <Toolbar />
    </>
  );
};

export default Header;
