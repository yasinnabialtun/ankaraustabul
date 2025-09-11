import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Search as SearchIcon,
  Star as StarIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Shield as ShieldIcon,
  AccessTime as ClockIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Handshake as HandshakeIcon,
  EmojiEvents as AwardIcon,
} from '@mui/icons-material';

import { CATEGORIES } from '../data/constants';
import { 
  heroVariants, 
  heroTextVariants, 
  heroImageVariants, 
  staggerContainer, 
  staggerItem,
  cardVariants,
  buttonVariants,
  floatVariants,
  pulseVariants
} from '../components/animations';

const Home: React.FC = () => {
  const features = [
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: '1000+ Kayıtlı Usta',
      description: 'Ankara\'nın en geniş usta ağı',
    },
    {
      icon: <ShieldIcon sx={{ fontSize: 40 }} />,
      title: 'Güvenli Hizmet',
      description: 'Doğrulanmış ve güvenilir ustalar',
    },
    {
      icon: <ClockIcon sx={{ fontSize: 40 }} />,
      title: '7/24 Destek',
      description: 'Her zaman yanınızdayız',
    },
    {
      icon: <StarIcon sx={{ fontSize: 40 }} />,
      title: '4.8 Ortalama Puan',
      description: 'Müşteri memnuniyeti odaklı',
    },
  ];

  const stats = [
    { number: '1000+', label: 'Kayıtlı Usta', icon: <PeopleIcon /> },
    { number: '5000+', label: 'Tamamlanan İş', icon: <WorkIcon /> },
    { number: '98%', label: 'Müşteri Memnuniyeti', icon: <StarIcon /> },
    { number: '24/7', label: 'Destek', icon: <ClockIcon /> },
  ];

  const benefits = [
    'Anında fiyat teklifi alın',
    'Güvenilir ve doğrulanmış ustalar',
    '7/24 müşteri desteği',
    'Garantili hizmet kalitesi',
    'Ücretsiz keşif hizmeti',
    'Sigortalı çalışma',
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        component={motion.div}
        variants={heroVariants}
        initial="initial"
        animate="animate"
        sx={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
            pointerEvents: 'none',
          },
        }}
      >
        {/* Floating Elements */}
        <motion.div
          variants={floatVariants}
          animate="animate"
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: 100,
            height: 100,
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            zIndex: 1,
          }}
        />
        <motion.div
          variants={floatVariants}
          animate="animate"
          style={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: 150,
            height: 150,
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '50%',
            filter: 'blur(50px)',
            zIndex: 1,
          }}
        />
        <motion.div
          variants={pulseVariants}
          animate="animate"
          style={{
            position: 'absolute',
            bottom: '30%',
            left: '20%',
            width: 80,
            height: 80,
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(30px)',
            zIndex: 1,
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div
                  variants={heroTextVariants}
                  initial="initial"
                  animate="animate"
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 800,
                      mb: 3,
                      fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                      lineHeight: 1.1,
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    Ankara'nın En İyi{' '}
                    <Box
                      component="span"
                      sx={{
                        background: 'linear-gradient(45deg, #ffffff, #e3f2fd)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: 'none',
                      }}
                    >
                      Ustaları
                    </Box>
                  </Typography>
                  
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 4,
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontWeight: 400,
                      lineHeight: 1.5,
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    Elektrik, su tesisatı, temizlik ve daha fazlası için güvenilir ustalarla tanışın.
                    Hızlı, kaliteli ve uygun fiyatlı hizmet.
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        component={Link}
                        to="/ustalar"
                        variant="contained"
                        size="large"
                        startIcon={<SearchIcon />}
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          color: '#3b82f6',
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          borderRadius: 3,
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Usta Ara
                      </Button>
                    </motion.div>
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        component={Link}
                        to="/usta-ekle"
                        variant="outlined"
                        size="large"
                        startIcon={<PeopleIcon />}
                        sx={{
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                          color: 'white',
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          borderRadius: 3,
                          backdropFilter: 'blur(10px)',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            borderColor: 'white',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Usta Ol
                      </Button>
                    </motion.div>
                  </Box>

                  {/* Stats */}
                  <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    <Grid container spacing={3}>
                      {stats.slice(0, 3).map((stat, index) => (
                        <Grid item xs={4} key={index}>
                          <motion.div variants={staggerItem}>
                            <Box sx={{ textAlign: 'center' }}>
                              <Typography
                                variant="h4"
                                sx={{
                                  fontWeight: 800,
                                  color: 'white',
                                  mb: 0.5,
                                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                                }}
                              >
                                {stat.number}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: 'rgba(255, 255, 255, 0.8)',
                                  fontSize: '0.875rem',
                                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                                }}
                              >
                                {stat.label}
                              </Typography>
                            </Box>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </motion.div>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={6}>
                <motion.div
                  variants={heroImageVariants}
                  initial="initial"
                  animate="animate"
                >
                  <Box
                    sx={{
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 4,
                        zIndex: -1,
                        backdropFilter: 'blur(10px)',
                      },
                    }}
                  >
                    <motion.div
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <Card
                        sx={{
                          borderRadius: 4,
                          overflow: 'hidden',
                          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="400"
                          image="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop&crop=center"
                          alt="Usta çalışırken"
                          sx={{ objectFit: 'cover' }}
                        />
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
                              sx={{ width: 50, height: 50, mr: 2 }}
                            />
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                Ahmet Usta
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#475569' }}>
                                Elektrik Ustası • 4.9 ⭐
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body2" sx={{ color: '#475569', mb: 2 }}>
                            "Ankara'da 15 yıldır elektrik işleri yapıyorum. Müşteri memnuniyeti benim için her şeyden önce gelir."
                          </Typography>
                          <Chip
                            label="Güvenilir Usta"
                            color="primary"
                            size="small"
                            icon={<ShieldIcon />}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'grey.50' }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: '#1e293b',
                }}
              >
                Neden Bizi Seçmelisiniz?
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: '#475569',
                  maxWidth: 600,
                  mx: 'auto',
                }}
              >
                Ankara'nın en güvenilir usta platformu ile tanışın
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div variants={staggerItem}>
                    <Card
                      sx={{
                        p: 4,
                        textAlign: 'center',
                        height: '100%',
                        borderRadius: 3,
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                          color: 'white',
                          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          color: '#1e293b',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#475569',
                          lineHeight: 1.6,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Categories Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: '#1e293b',
                }}
              >
                Hizmet Kategorileri
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: '#475569',
                  maxWidth: 600,
                  mx: 'auto',
                }}
              >
                İhtiyacınız olan tüm hizmetler tek platformda
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Grid container spacing={3}>
              {CATEGORIES.map((category, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
                  <motion.div variants={staggerItem}>
                    <Card
                      component={Link}
                      to={`/kategori/${category.id}`}
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        textDecoration: 'none',
                        borderRadius: 3,
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2,
                          color: 'white',
                        }}
                      >
                        {category.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          color: '#1e293b',
                        }}
                      >
                        {category.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#475569',
                          fontSize: '0.875rem',
                        }}
                      >
                        {category.description}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'grey.50' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: '#1e293b',
                  }}
                >
                  Avantajlarımız
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#475569',
                    mb: 4,
                    lineHeight: 1.6,
                  }}
                >
                  Neden Ankara Usta Bul'u tercih etmelisiniz?
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {benefits.map((benefit, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckCircleIcon
                        sx={{
                          color: '#10b981',
                          mr: 2,
                          fontSize: 24,
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          color: '#334155',
                          fontWeight: 500,
                        }}
                      >
                        {benefit}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <AwardIcon
                      sx={{
                        fontSize: 60,
                        color: '#3b82f6',
                        mb: 2,
                      }}
                    />
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: '#1e293b',
                      }}
                    >
                      Güvenilir Platform
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#475569',
                        lineHeight: 1.6,
                      }}
                    >
                      Tüm ustalarımız özenle seçilir ve doğrulanır. 
                      Müşteri memnuniyeti garantisi ile hizmet veriyoruz.
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      component={Link}
                      to="/ustalar"
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: 600,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                        },
                      }}
                    >
                      Hemen Başla
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact CTA Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card
              sx={{
                borderRadius: 4,
                p: { xs: 4, md: 6 },
                textAlign: 'center',
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                color: 'white',
                boxShadow: '0 20px 40px rgba(25, 118, 210, 0.3)',
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: 'white',
                }}
              >
                Hemen İletişime Geçin
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.6,
                }}
              >
                Sorularınız için bize ulaşın. Size en kısa sürede dönüş yapacağız.
              </Typography>

              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <PhoneIcon sx={{ mr: 1, fontSize: 24 }} />
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      +90 312 123 45 67
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <EmailIcon sx={{ mr: 1, fontSize: 24 }} />
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      info@ankaraustabul.com
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <LocationIcon sx={{ mr: 1, fontSize: 24 }} />
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      Ankara, Türkiye
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4 }}>
                <Button
                  component={Link}
                  to="/iletisim"
                  variant="contained"
                  size="large"
                  startIcon={<TrendingUpIcon />}
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'grey.100',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  İletişime Geç
                </Button>
              </Box>
            </Card>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
