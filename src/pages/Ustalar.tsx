import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Shield, 
  Heart, 
  TrendingUp,
  Star,
  Clock,
  Award,
  CheckCircle,
  ArrowRight,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { ustaService } from '../services/ustaService';
import type { Usta } from '../types';
import { CATEGORIES, DISTRICTS } from '../data/constants';
import analyticsService from '../services/analyticsService';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Badge as MuiBadge,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
} from '@mui/material';
import CardComponent from '../components/ui/Card';
import BadgeComponent from '../components/ui/Badge';
import ButtonComponent from '../components/ui/Button';
import SectionComponent from '../components/ui/Section';
import InputComponent from '../components/ui/Input';

function Ustalar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [ustalar, setUstalar] = useState<Usta[]>([]);
  const [filteredUstalar, setFilteredUstalar] = useState<Usta[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  useEffect(() => {
    analyticsService.trackPageView('ustalar');
    loadUstalar();
  }, []);

  useEffect(() => {
    filterUstalar();
  }, [ustalar, searchTerm, selectedCategory, selectedDistrict, sortBy]);

  const loadUstalar = async () => {
    try {
      setLoading(true);
      const data = await ustaService.getAllUstalar();
      setUstalar(data);
      setFilteredUstalar(data);
    } catch (error) {
      console.error('Ustalar yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterUstalar = () => {
    let filtered = [...ustalar];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(usta =>
        usta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usta.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usta.district.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(usta => usta.category === selectedCategory);
    }

    // District filter
    if (selectedDistrict) {
      filtered = filtered.filter(usta => usta.district === selectedDistrict);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'price':
          return a.price - b.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredUstalar(filtered);
  };

  const toggleFavorite = (ustaId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(ustaId)) {
      newFavorites.delete(ustaId);
    } else {
      newFavorites.add(ustaId);
    }
    setFavorites(newFavorites);
  };

  const handleUstaClick = (usta: Usta) => {
    navigate(`/usta/${usta.id}`);
  };

  const handleCall = (usta: Usta) => {
    window.open(`tel:${usta.phone}`);
    analyticsService.trackSimpleEvent('usta_call');
  };

  const handleWhatsApp = (usta: Usta) => {
    const message = `Merhaba ${usta.name}, hizmetiniz hakkında bilgi almak istiyorum.`;
    const whatsappUrl = `https://wa.me/${usta.phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl);
    analyticsService.trackSimpleEvent('usta_whatsapp');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedDistrict('');
    setSortBy('rating');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? '#fbbf24' : '#e5e7eb'}
        color={i < rating ? '#fbbf24' : '#e5e7eb'}
      />
    ));
  };

  return (
    <>
      <SEO 
        title="Ankara Ustalar - Güvenilir Usta Arama"
        description="Ankara'da elektrik, su tesisatı, temizlik, mobilya montajı ve tadilat hizmetleri için güvenilir ustalar."
        keywords="ankara usta, elektrik ustası, su tesisatı, temizlik, mobilya montajı, tadilat"
      />
      
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)' }}>
        {/* Hero Section */}
        <SectionComponent
          background="gradient"
          padding="xl"
          animated
          sx={{
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              opacity: 0.1,
              zIndex: 0,
            },
          }}
        >
          <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <BadgeComponent
                  variant="glassmorphism"
                  size="lg"
                  icon={<User />}
                  sx={{ mb: 3 }}
                >
                  Ankara Ustaları
                </BadgeComponent>
                
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    lineHeight: 1.2,
                    color: 'white',
                  }}
                >
                  Ankara'da
                  <Box
                    component="span"
                    sx={{
                      display: 'block',
                      background: 'linear-gradient(135deg, #93c5fd 0%, #22d3ee 50%, #93c5fd 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Güvenilir Ustalar
                  </Box>
                  Bulun
                </Typography>
                
                <Typography
                  variant="h5"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    maxWidth: '800px',
                    mx: 'auto',
                    mb: 4,
                    lineHeight: 1.6,
                    fontWeight: 400,
                  }}
                >
                  Elektrik, su tesisatı, temizlik, mobilya montajı ve tadilat hizmetleri için 
                  profesyonel ve güvenilir ustalarla tanışın.
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
                  <ButtonComponent
                    variant="white"
                    size="large"
                    icon={<Search />}
                    onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
                    glow
                  >
                    Usta Ara
                  </ButtonComponent>
                  <ButtonComponent
                    variant="glassmorphism"
                    size="large"
                    icon={<TrendingUp />}
                    onClick={() => navigate('/kategoriler')}
                  >
                    Kategoriler
                  </ButtonComponent>
                </Box>
              </motion.div>
            </Box>
          </Container>
        </SectionComponent>

        {/* Search & Filter Section */}
        <SectionComponent
          id="search-section"
          background="white"
          padding="lg"
          container
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Usta Ara
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  maxWidth: '600px',
                  mx: 'auto',
                }}
              >
                İhtiyacınıza uygun ustayı bulun ve hemen iletişime geçin
              </Typography>
            </Box>

            {/* Search Bar */}
            <Box sx={{ mb: 4 }}>
              <InputComponent
                fullWidth
                placeholder="Usta adı, kategori veya semt ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search />}
                size="large"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    fontSize: '1.1rem',
                    py: 1,
                  },
                }}
              />
            </Box>

            {/* Filters */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 4 }}>
              <FormControl fullWidth sx={{ minWidth: 200 }}>
                <InputLabel>Kategori</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Kategori"
                >
                  <MenuItem value="">Tüm Kategoriler</MenuItem>
                  {CATEGORIES.map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ minWidth: 200 }}>
                <InputLabel>Semt</InputLabel>
                <Select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  label="Semt"
                >
                  <MenuItem value="">Tüm Semtler</MenuItem>
                  {DISTRICTS.map((district) => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ minWidth: 200 }}>
                <InputLabel>Sıralama</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sıralama"
                >
                  <MenuItem value="rating">Puana Göre</MenuItem>
                  <MenuItem value="experience">Deneyime Göre</MenuItem>
                  <MenuItem value="price">Fiyata Göre</MenuItem>
                  <MenuItem value="name">İsme Göre</MenuItem>
                </Select>
              </FormControl>

              <ButtonComponent
                variant="outlined"
                onClick={clearFilters}
                icon={<X />}
                sx={{ minWidth: 'fit-content' }}
              >
                Temizle
              </ButtonComponent>

              {isMobile && (
                <ButtonComponent
                  variant="contained"
                  onClick={() => setFilterDrawerOpen(true)}
                  icon={<SlidersHorizontal />}
                >
                  Filtreler
                </ButtonComponent>
              )}
            </Box>

            {/* Results Count */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {filteredUstalar.length} usta bulundu
              </Typography>
            </Box>
          </motion.div>
        </SectionComponent>

        {/* Ustalar Grid */}
        <SectionComponent
          background="gray"
          padding="lg"
          container
        >
          {loading ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                Ustalar yükleniyor...
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredUstalar.map((usta, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={usta.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CardComponent
                      hover
                      glassmorphism
                      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={usta.image || '/images/default-usta.jpg'}
                          alt={usta.name}
                          sx={{ objectFit: 'cover' }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            display: 'flex',
                            gap: 1,
                          }}
                        >
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(usta.id);
                            }}
                            sx={{
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              backdropFilter: 'blur(10px)',
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                              },
                            }}
                          >
                            <Heart
                              size={20}
                              fill={favorites.has(usta.id) ? '#ef4444' : 'none'}
                              color={favorites.has(usta.id) ? '#ef4444' : '#6b7280'}
                            />
                          </IconButton>
                        </Box>
                      </Box>

                      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar
                            src={usta.avatar}
                            sx={{ width: 48, height: 48, mr: 2 }}
                          >
                            {usta.name.charAt(0)}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {usta.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {usta.category}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box sx={{ display: 'flex', mr: 1 }}>
                            {renderStars(usta.rating)}
                          </Box>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {usta.rating} ({usta.reviewCount} değerlendirme)
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                          <Chip
                            icon={<MapPin size={16} />}
                            label={usta.district}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            icon={<Clock size={16} />}
                            label={`${usta.experience} yıl`}
                            size="small"
                            variant="outlined"
                          />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                            ₺{usta.price}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1 }}>
                            / saat
                          </Typography>
                        </Box>

                        <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
                          <ButtonComponent
                            variant="contained"
                            fullWidth
                            onClick={() => handleUstaClick(usta)}
                            icon={<ArrowRight />}
                            iconPosition="right"
                          >
                            Detaylar
                          </ButtonComponent>
                          <IconButton
                            onClick={() => handleCall(usta)}
                            sx={{
                              backgroundColor: 'success.main',
                              color: 'white',
                              '&:hover': {
                                backgroundColor: 'success.dark',
                              },
                            }}
                          >
                            <Phone size={20} />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </CardComponent>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}

          {!loading && filteredUstalar.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                Arama kriterlerinize uygun usta bulunamadı
              </Typography>
              <ButtonComponent
                variant="outlined"
                onClick={clearFilters}
              >
                Filtreleri Temizle
              </ButtonComponent>
            </Box>
          )}
        </SectionComponent>

        {/* Mobile Filter Drawer */}
        <Drawer
          anchor="right"
          open={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: 320,
              p: 3,
            },
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Filtreler
            </Typography>
            <Divider />
          </Box>

          <List>
            <ListItem>
              <FormControl fullWidth>
                <InputLabel>Kategori</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Kategori"
                >
                  <MenuItem value="">Tüm Kategoriler</MenuItem>
                  {CATEGORIES.map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>

            <ListItem>
              <FormControl fullWidth>
                <InputLabel>Semt</InputLabel>
                <Select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  label="Semt"
                >
                  <MenuItem value="">Tüm Semtler</MenuItem>
                  {DISTRICTS.map((district) => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>

            <ListItem>
              <FormControl fullWidth>
                <InputLabel>Sıralama</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sıralama"
                >
                  <MenuItem value="rating">Puana Göre</MenuItem>
                  <MenuItem value="experience">Deneyime Göre</MenuItem>
                  <MenuItem value="price">Fiyata Göre</MenuItem>
                  <MenuItem value="name">İsme Göre</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
          </List>

          <Box sx={{ mt: 'auto', pt: 2 }}>
            <ButtonComponent
              variant="contained"
              fullWidth
              onClick={() => setFilterDrawerOpen(false)}
            >
              Filtreleri Uygula
            </ButtonComponent>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

export default Ustalar;