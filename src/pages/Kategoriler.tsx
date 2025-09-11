import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Users, Star, Clock, TrendingUp, Sparkles, CheckCircle } from 'lucide-react';
import { CATEGORIES } from '../data/constants';
import analyticsService from '../services/analyticsService';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import Input from '../components/ui/Input';

interface CategoryStats {
  totalUstalar: number;
  avgRating: number;
  avgResponseTime: string;
  popularDistricts: string[];
}

function Kategoriler() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryStats, setCategoryStats] = useState<Record<string, CategoryStats>>({});

  useEffect(() => {
    analyticsService.trackPageView('kategoriler');
    loadCategoryStats();
  }, []);

  const loadCategoryStats = () => {
    // Mock data - gerçek uygulamada API'den gelecek
    const mockStats: Record<string, CategoryStats> = {
      'Elektrik': {
        totalUstalar: 45,
        avgRating: 4.8,
        avgResponseTime: '2 saat',
        popularDistricts: ['Çankaya', 'Keçiören', 'Mamak']
      },
      'Su Tesisatı': {
        totalUstalar: 38,
        avgRating: 4.7,
        avgResponseTime: '3 saat',
        popularDistricts: ['Çankaya', 'Yenimahalle', 'Etimesgut']
      },
      'Temizlik': {
        totalUstalar: 52,
        avgRating: 4.6,
        avgResponseTime: '1 saat',
        popularDistricts: ['Çankaya', 'Keçiören', 'Mamak']
      },
      'Mobilya': {
        totalUstalar: 28,
        avgRating: 4.9,
        avgResponseTime: '4 saat',
        popularDistricts: ['Çankaya', 'Yenimahalle', 'Etimesgut']
      },
      'Tadilat': {
        totalUstalar: 35,
        avgRating: 4.7,
        avgResponseTime: '6 saat',
        popularDistricts: ['Çankaya', 'Keçiören', 'Mamak']
      },
      'Klima': {
        totalUstalar: 22,
        avgRating: 4.8,
        avgResponseTime: '3 saat',
        popularDistricts: ['Çankaya', 'Yenimahalle', 'Etimesgut']
      },
      'Bahçe & Peyzaj': {
        totalUstalar: 18,
        avgRating: 4.5,
        avgResponseTime: '8 saat',
        popularDistricts: ['Çankaya', 'Yenimahalle', 'Etimesgut']
      },
      'Boya & Badana': {
        totalUstalar: 31,
        avgRating: 4.6,
        avgResponseTime: '5 saat',
        popularDistricts: ['Çankaya', 'Keçiören', 'Mamak']
      }
    };
    setCategoryStats(mockStats);
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/kategoriler/${categoryId}`);
  };

  const filteredCategories = CATEGORIES.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Hizmet Kategorileri',
    'description': 'Ankara\'da sunulan tüm hizmet kategorileri',
    'numberOfItems': CATEGORIES.length,
    'itemListElement': CATEGORIES.map((category, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Service',
        'name': category.name,
        'description': category.description,
        'provider': {
          '@type': 'Organization',
          'name': 'Ankara Usta Bul'
        }
      }
    }))
  };

  const benefits = [
    "Profesyonel ustalar",
    "Hızlı hizmet",
    "Güvenilir fiyatlar",
    "Kalite garantisi",
    "7/24 destek",
    "Sigortalı hizmet"
  ];

  return (
    <>
      <SEO 
        title="Hizmet Kategorileri - Ankara Usta Bul"
        description="Ankara'da elektrik, su tesisatı, temizlik, mobilya, tadilat ve diğer tüm hizmet kategorileri için güvenilir ustalar bulun."
        keywords="ankara usta kategorileri, elektrik, su tesisatı, temizlik, mobilya, tadilat"
        structured={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <Section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="white" className="mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Tüm Hizmet Kategorileri
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Hizmet Kategorileri
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                Ankara'da ihtiyacınız olan tüm hizmetler için profesyonel ustalarla tanışın
              </p>
              
              {/* Benefits */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center text-blue-100 text-sm md:text-base"
                  >
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400 mr-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Search Section */}
        <div className="relative -mt-8 max-w-4xl mx-auto px-4 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="bg-white p-8 shadow-2xl border-0">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Kategori ara... (örn: elektrik, temizlik, mobilya)"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  className="pl-12 text-lg"
                  size="lg"
                />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <Section className="py-20">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              {filteredCategories.length} Kategori
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              İhtiyacınız Olan Tüm Hizmetler
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Profesyonel ustalar ile evinizdeki tüm ihtiyaçlarınız için çözüm sunuyoruz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCategories.map((category, index) => {
              const stats = categoryStats[category.name];
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card 
                    className="text-center h-full cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden group"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-5xl text-white mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2">
                      {category.description}
                    </p>

                    {/* Stats */}
                    {stats && (
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-center text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{stats.totalUstalar} Usta</span>
                        </div>
                        <div className="flex items-center justify-center text-sm text-gray-500">
                          <Star className="w-4 h-4 mr-2 text-yellow-500" />
                          <span>{stats.avgRating} Ortalama Puan</span>
                        </div>
                        <div className="flex items-center justify-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{stats.avgResponseTime} Yanıt</span>
                        </div>
                      </div>
                    )}

                    {/* Popular Districts */}
                    {stats && stats.popularDistricts.length > 0 && (
                      <div className="mb-6">
                        <p className="text-xs text-gray-500 mb-2">Popüler İlçeler</p>
                        <div className="flex flex-wrap justify-center gap-1">
                          {stats.popularDistricts.slice(0, 3).map((district, idx) => (
                            <Badge key={idx} variant="secondary" size="sm">
                              {district}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-center text-blue-600 font-semibold group">
                      <span className="text-sm">Detayları Gör</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {filteredCategories.length === 0 && (
            <Card className="text-center py-16 border-0 bg-white">
              <div className="text-gray-400 mb-6">
                <Search className="w-20 h-20 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Kategori Bulunamadı
              </h3>
              <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                Arama kriterlerinize uygun kategori bulunamadı. Farklı terimler deneyebilirsiniz.
              </p>
              <Button
                onClick={() => setSearchQuery('')}
                variant="outline"
                size="lg"
              >
                Aramayı Temizle
              </Button>
            </Card>
          )}
        </Section>

        {/* CTA Section */}
        <Section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 text-white relative overflow-hidden">
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Hemen Usta Bulun
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
                Ankara'da güvenilir usta arama platformu ile ihtiyacınız olan tüm hizmetler için 
                <span className="font-semibold text-white"> profesyonel ustalarla</span> tanışın.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  onClick={() => navigate('/ustalar')}
                  size="xl"
                  icon={<Search className="w-6 h-6" />}
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl"
                >
                  Usta Ara
                </Button>
                <Button
                  onClick={() => navigate('/usta-ekle')}
                  variant="outline"
                  size="xl"
                  icon={<Users className="w-6 h-6" />}
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Usta Ol
                </Button>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
    </>
  );
}

export default Kategoriler;