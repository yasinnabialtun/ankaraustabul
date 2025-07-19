import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UstaCard from '../components/UstaCard';
import { ustaService } from '../services/ustaService';
import { UstaData, FeaturedUsta } from '../types';
import { 
  Search, 
  MapPin, 
  Star, 
  TrendingUp,
  Users,
  Crown,
  Shield,
  Zap,
  MessageCircle,
  Calendar,
  Award
} from 'lucide-react';

function Home() {
  const [featuredUstalar, setFeaturedUstalar] = useState<FeaturedUsta[]>([]);
  const [allUstalar, setAllUstalar] = useState<UstaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    loadUstalar();
  }, []);

  const loadUstalar = async () => {
    try {
      setLoading(true);
      const [featured, all] = await Promise.all([
        ustaService.getFeaturedUstalar(6),
        ustaService.getApprovedUstalar()
      ]);
      setFeaturedUstalar(featured);
      setAllUstalar(all);
    } catch (error) {
      console.error('Ustalar yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = (usta: UstaData) => {
    window.location.href = `tel:${usta.phone}`;
  };

  const handleWhatsApp = (usta: UstaData) => {
    if (usta.whatsappEnabled && usta.whatsappNumber) {
      const message = `Merhaba ${usta.name}, hizmetleriniz hakkında bilgi almak istiyorum.`;
      const whatsappUrl = `https://wa.me/${usta.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleViewProfile = (usta: UstaData) => {
    // Navigate to usta detail page
    window.location.href = `/usta/${usta.id}`;
  };

  const filteredUstalar = allUstalar.filter(usta => {
    const matchesSearch = usta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usta.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usta.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || usta.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(allUstalar.map(u => u.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Ankara'da Güvenilir Usta Bulun
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Evinizdeki her iş için profesyonel ustalar
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Ne tür bir usta arıyorsunuz?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Ustalar Section */}
      {featuredUstalar.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                ⭐ Öne Çıkan Ustalar
              </h2>
              <p className="text-gray-600">
                En kaliteli hizmet veren ustalarımız
              </p>
            </div>
            <Link
              to="/ustalar"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tümünü Gör
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredUstalar.map((usta) => (
              <UstaCard
                key={usta.id}
                usta={usta}
                isFeatured={true}
                onContact={handleContact}
                onWhatsApp={handleWhatsApp}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>
        </div>
      )}

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Popüler Kategoriler
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.slice(0, 12).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedCategory === category
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium">{category}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* All Ustalar Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Tüm Ustalar
            </h2>
            <p className="text-gray-600">
              {filteredUstalar.length} usta bulundu
            </p>
          </div>
          
          {/* Filter Controls */}
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tüm Kategoriler</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {filteredUstalar.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Usta Bulunamadı
            </h3>
            <p className="text-gray-500">
              Arama kriterlerinize uygun usta bulunamadı.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUstalar.map((usta) => (
              <UstaCard
                key={usta.id}
                usta={usta}
                onContact={handleContact}
                onWhatsApp={handleWhatsApp}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Neden Ankara Usta Bul?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Güvenilir Ustalar
              </h3>
              <p className="text-gray-600">
                Tüm ustalarımız doğrulanmış ve güvenilir profesyonellerdir.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hızlı İletişim
              </h3>
              <p className="text-gray-600">
                WhatsApp ile anında iletişim kurun ve hızlı yanıt alın.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Kaliteli Hizmet
              </h3>
              <p className="text-gray-600">
                Müşteri değerlendirmeleri ile en iyi ustaları seçin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 