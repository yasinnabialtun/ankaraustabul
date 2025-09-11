import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Star, Phone, MessageCircle, CheckCircle, Users, Clock, Award, TrendingUp, Filter, Heart } from 'lucide-react';
import { ustaService } from '../services/ustaService';
import type { Usta } from '../types';
import { CATEGORIES, DISTRICTS } from '../data/constants';
import analyticsService from '../services/analyticsService';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import Input from '../components/ui/Input';

function KategoriDetay() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ustalar, setUstalar] = useState<Usta[]>([]);
  const [filteredUstalar, setFilteredUstalar] = useState<Usta[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const category = CATEGORIES.find(cat => cat.id === id);

  useEffect(() => {
    analyticsService.trackPageView('kategori-detay');
    loadUstalar();
  }, [id]);

  useEffect(() => {
    filterUstalar();
  }, [ustalar, searchTerm, selectedDistrict, sortBy]);

  const loadUstalar = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await ustaService.getUstalarByCategory(id);
      setUstalar(data);
      setFilteredUstalar(data);
    } catch (error) {
      console.error('Kategori ustaları yüklenirken hata:', error);
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
        usta.district.toLowerCase().includes(searchTerm.toLowerCase())
      );
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
    const message = `Merhaba ${usta.name}, ${category?.name} hizmetiniz hakkında bilgi almak istiyorum.`;
    const whatsappUrl = `https://wa.me/${usta.phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl);
    analyticsService.trackSimpleEvent('usta_whatsapp');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDistrict('');
    setSortBy('rating');
  };

  const structuredData = category ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': `${category.name} Hizmeti`,
    'description': category.description,
    'provider': {
      '@type': 'Organization',
      'name': 'Ankara Usta Bul'
    },
    'areaServed': {
      '@type': 'City',
      'name': 'Ankara'
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': `${category.name} Ustaları`,
      'itemListElement': ustalar.map(usta => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Person',
          'name': usta.name,
          'jobTitle': usta.category
        }
      }))
    }
  } : undefined;

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-6">
            <Award className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Kategori Bulunamadı</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Aradığınız kategori bulunamadı veya kaldırılmış olabilir.
          </p>
          <Button
            onClick={() => navigate('/kategoriler')}
            icon={<ArrowLeft className="w-5 h-5" />}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            Kategorilere Dön
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${category.name} Ustaları - Ankara Usta Bul`}
        description={`Ankara'da ${category.name.toLowerCase()} hizmeti için güvenilir ustalar. ${category.description}`}
        keywords={`ankara ${category.name.toLowerCase()}, ${category.name.toLowerCase()} ustası, ${category.name.toLowerCase()} hizmeti`}
        structured={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        {/* Hero Section */}
        <Section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <Badge variant="white" className="mb-6">
                <Award className="w-4 h-4 mr-2" />
                {category.name} Ustaları
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Ankara'da
                <span className="block bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                  {category.name} Ustaları
                </span>
                Bulun
              </h1>
              
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                {category.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
                  size="lg"
                  icon={<Search className="w-5 h-5" />}
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl"
                >
                  Usta Ara
                </Button>
                <Button
                  onClick={() => navigate('/kategoriler')}
                  variant="outline"
                  size="lg"
                  icon={<ArrowLeft className="w-5 h-5" />}
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Kategoriler
                </Button>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Stats Section */}
        <Section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center border-0 bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                      <Users className="w-8 h-8" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{ustalar.length}</div>
                    <div className="text-gray-600 font-medium">Toplam Usta</div>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center border-0 bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                      <Star className="w-8 h-8" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">4.8</div>
                    <div className="text-gray-600 font-medium">Ortalama Puan</div>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center border-0 bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                      <Clock className="w-8 h-8" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">2 Saat</div>
                    <div className="text-gray-600 font-medium">Ortalama Süre</div>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center border-0 bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">%98</div>
                    <div className="text-gray-600 font-medium">Memnuniyet</div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Search & Filter Section */}
        <Section id="search-section" className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {category.name} Ustaları Ara
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  İhtiyacınıza en uygun {category.name.toLowerCase()} ustasını bulmak için arama yapın ve filtreleri kullanın
                </p>
              </div>
              
              <Card className="border-0 bg-white shadow-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Search Input */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Arama
                    </label>
                    <Input
                      type="text"
                      placeholder="Usta adı veya semt ara..."
                      value={searchTerm}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                      icon={<Search className="w-5 h-5" />}
                      size="lg"
                    />
                  </div>
                  
                  {/* District Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Semt
                    </label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Tüm Semtler</option>
                      {DISTRICTS.map((district) => (
                        <option key={district.id} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700">Sırala:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="rating">Puana Göre</option>
                      <option value="experience">Deneyime Göre</option>
                      <option value="price">Fiyata Göre</option>
                      <option value="name">İsme Göre</option>
                    </select>
                  </div>
                  
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    size="sm"
                    icon={<Filter className="w-4 h-4" />}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Filtreleri Temizle
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </Section>

        {/* Results Section */}
        <Section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {category.name} Ustaları
                </h2>
                <p className="text-lg text-gray-600">
                  {filteredUstalar.length} usta bulundu
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-4 mt-4 sm:mt-0"
              >
                <Badge variant="primary" className="text-sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Tüm Ustalar Doğrulanmış
                </Badge>
              </motion.div>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="border-0 bg-white shadow-xl animate-pulse">
                    <div className="p-6">
                      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : filteredUstalar.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                  <Search className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Usta Bulunamadı</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Bu kategoride arama kriterlerinize uygun usta bulunamadı. Lütfen farklı kriterler deneyin.
                </p>
                <Button
                  onClick={clearFilters}
                  icon={<Filter className="w-5 h-5" />}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  Filtreleri Temizle
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredUstalar.map((usta, index) => (
                  <motion.div
                    key={usta.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="border-0 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                      <div className="relative">
                        <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                          <Users className="w-20 h-20" />
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Badge variant="white" className="shadow-lg">
                            {usta.rating} ★
                          </Badge>
                          <Button
                            onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                              e?.stopPropagation();
                              toggleFavorite(Number(usta.id));
                            }}
                            variant="white"
                            size="sm"
                            icon={<Heart className={`w-4 h-4 ${favorites.has(Number(usta.id)) ? 'fill-red-500 text-red-500' : ''}`} />}
                            className="w-10 h-10 p-0"
                          >
                            Favori
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors cursor-pointer"
                            onClick={() => handleUstaClick(usta)}>
                          {usta.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-gray-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{usta.district}</span>
                        </div>
                        
                        <Badge variant="primary" className="mb-4">
                          {usta.category}
                        </Badge>
                        
                        <div className="space-y-2 mb-6">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Deneyim:</span>
                            <span className="font-medium">{usta.experience} yıl</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Fiyat:</span>
                            <span className="font-medium text-green-600">₺{usta.price}/saat</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Müsaitlik:</span>
                            <span className="font-medium text-green-600">{usta.availability}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                              e?.stopPropagation();
                              handleCall(usta);
                            }}
                            variant="outline"
                            size="sm"
                            icon={<Phone className="w-4 h-4" />}
                            className="flex-1"
                          >
                            Ara
                          </Button>
                          <Button
                            onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                              e?.stopPropagation();
                              handleWhatsApp(usta);
                            }}
                            variant="outline"
                            size="sm"
                            icon={<MessageCircle className="w-4 h-4" />}
                            className="flex-1"
                          >
                            Mesaj
                          </Button>
                          <Button
                            onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                              e?.stopPropagation();
                              handleUstaClick(usta);
                            }}
                            size="sm"
                            icon={<Users className="w-4 h-4" />}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                          >
                            Detay
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </Section>

        {/* CTA Section */}
        <Section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                {category.name} Ustası Bulamadınız mı?
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                Farklı kriterlerle arama yapın veya diğer kategorilerimize göz atın
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
                  size="xl"
                  icon={<Search className="w-6 h-6" />}
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl"
                >
                  Yeniden Ara
                </Button>
                <Button
                  onClick={() => navigate('/kategoriler')}
                  variant="outline"
                  size="xl"
                  icon={<TrendingUp className="w-6 h-6" />}
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Diğer Kategoriler
                </Button>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
    </>
  );
}

export default KategoriDetay; 