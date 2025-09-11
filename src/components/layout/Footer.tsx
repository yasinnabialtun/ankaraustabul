import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  Avatar,
  Divider,
  IconButton,
} from '@mui/material';
import {
  WhatsApp as WhatsAppIcon,
  Telegram as TelegramIcon,
  Star as StarIcon,
  Verified as VerifiedIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: <WhatsAppIcon />, href: 'https://wa.me/903121234567', color: '#25D366', label: 'WhatsApp' },
    { icon: <TelegramIcon />, href: 'https://t.me/ankaraustabul', color: '#0088cc', label: 'Telegram' },
  ];

  const quickLinks = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Ustalar', href: '/ustalar' },
    { name: 'Kategoriler', href: '/kategoriler' },
    { name: 'Blog', href: '/blog' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'İletişim', href: '/iletisim' },
  ];

  const services = [
    { name: 'Elektrik', href: '/kategoriler/elektrik' },
    { name: 'Su Tesisatı', href: '/kategoriler/su-tesisati' },
    { name: 'Temizlik', href: '/kategoriler/temizlik' },
    { name: 'Boya Badana', href: '/kategoriler/boya-badana' },
    { name: 'İnşaat Tadilat', href: '/kategoriler/insaat-tadilat' },
    { name: 'Klima Havalandırma', href: '/kategoriler/klima-havalandirma' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
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
          background: 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Grid container spacing={4}>
            {/* Company Info */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    sx={{
                      bgcolor: 'rgba(59, 130, 246, 0.2)',
                      width: 56,
                      height: 56,
                      mr: 2,
                      border: '2px solid rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    <VerifiedIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'white', textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
                      Ankara Usta Bul
                    </Typography>
                    <Chip
                      label="Güvenilir Platform"
                      size="small"
                      icon={<SecurityIcon />}
                      sx={{
                        backgroundColor: 'rgba(34, 197, 94, 0.2)',
                        color: '#22c55e',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        fontWeight: 600,
                        mt: 1,
                      }}
                    />
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 3, lineHeight: 1.7, textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                  Ankara'nın en güvenilir usta arama platformu. Binlerce doğrulanmış usta ile hızlı, kaliteli ve uygun fiyatlı hizmet alın.
                </Typography>
              </Box>

              {/* Contact Info */}
              <Box sx={{ space: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2, backdropFilter: 'blur(10px)' }}>
                  <Avatar sx={{ bgcolor: 'rgba(59, 130, 246, 0.2)', width: 40, height: 40, mr: 2 }}>
                    <StarIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600, textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                      +90 312 123 45 67
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                      7/24 Destek
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2, backdropFilter: 'blur(10px)' }}>
                  <Avatar sx={{ bgcolor: 'rgba(34, 197, 94, 0.2)', width: 40, height: 40, mr: 2 }}>
                    <VerifiedIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600, textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                      info@ankaraustabul.com
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                      E-posta Desteği
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 3, textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
                Hızlı Linkler
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ width: 50, height: 3, background: 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)', borderRadius: 2, mb: 2 }} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: 'white',
                          transform: 'translateX(8px)',
                          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                        },
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      {link.name}
                    </Typography>
                  </Link>
                ))}
              </Box>
            </Grid>

            {/* Services */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 3, textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
                Hizmet Kategorileri
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ width: 50, height: 3, background: 'linear-gradient(90deg, #8b5cf6 0%, #7c3aed 100%)', borderRadius: 2, mb: 2 }} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {services.map((service) => (
                  <Link
                    key={service.name}
                    to={service.href}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: 'white',
                          transform: 'translateX(8px)',
                          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                        },
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      {service.name}
                    </Typography>
                  </Link>
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* Newsletter & Social */}
          <Box sx={{ mt: 6, p: 4, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 3, backdropFilter: 'blur(10px)' }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 2, textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
                  Bültenimize Katılın
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3, textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                  En güncel usta hizmetleri ve kampanyalardan haberdar olun.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
                    },
                  }}
                >
                  Abone Ol
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, gap: 2 }}>
                  {socialLinks.map((social) => (
                    <IconButton
                      key={social.label}
                      component="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        width: 56,
                        height: 56,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: social.color,
                          borderColor: social.color,
                          transform: 'translateY(-4px) scale(1.1)',
                          boxShadow: `0 8px 25px ${social.color}40`,
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      {/* Bottom Section */}
      <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Container maxWidth="xl">
          <Box sx={{ py: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: { xs: 'center', md: 'left' }, textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
              © 2024 Ankara Usta Bul. Tüm hakları saklıdır.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                label="SSL Güvenli"
                size="small"
                icon={<SecurityIcon />}
                sx={{
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  color: '#22c55e',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  fontWeight: 500,
                }}
              />
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                Güvenli Ödeme
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
