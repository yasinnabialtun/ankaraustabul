import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Plus, ArrowRight } from 'lucide-react';

function Home() {
  const categories = [
    { id: 'elektrik', name: 'Elektrik', icon: '⚡', count: 45 },
    { id: 'su-tesisati', name: 'Su Tesisatı', icon: '🚰', count: 32 },
    { id: 'temizlik', name: 'Temizlik', icon: '🧹', count: 28 },
    { id: 'mobilya', name: 'Mobilya', icon: '🪑', count: 23 },
    { id: 'boya-badana', name: 'Boya & Badana', icon: '🎨', count: 19 },
    { id: 'insaat-tadilat', name: 'İnşaat & Tadilat', icon: '🏗️', count: 15 },
  ];

  const featuredUstalar = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      category: 'Elektrik',
      location: 'Çankaya, Ankara',
      rating: 4.8,
      experience: '8 yıl',
      hourlyRate: '150 TL',
      image: '/api/placeholder/100/100'
    },
    {
      id: '2',
      name: 'Mehmet Demir',
      category: 'Su Tesisatı',
      location: 'Keçiören, Ankara',
      rating: 4.9,
      experience: '12 yıl',
      hourlyRate: '180 TL',
      image: '/api/placeholder/100/100'
    },
    {
      id: '3',
      name: 'Ali Kaya',
      category: 'Temizlik',
      location: 'Mamak, Ankara',
      rating: 4.7,
      experience: '5 yıl',
      hourlyRate: '120 TL',
      image: '/api/placeholder/100/100'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Ankara'da Güvenilir Usta Bulun
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Elektrik, su tesisatı, temizlik ve daha fazlası için profesyonel ustalar
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Hangi hizmeti arıyorsunuz?"
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Ara
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Kayıtlı Usta</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Tamamlanan İş</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">4.8</div>
              <div className="text-gray-600">Ortalama Puan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popüler Kategoriler
            </h2>
            <p className="text-gray-600">
              İhtiyacınız olan hizmeti seçin
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/kategoriler/${category.id}`}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} usta</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Ustalar */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Öne Çıkan Ustalar
              </h2>
              <p className="text-gray-600">
                En çok tercih edilen ustalarımız
              </p>
            </div>
            <Link
              to="/ustalar"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>Tümünü Gör</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredUstalar.map((usta) => (
              <div key={usta.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-semibold">
                      {usta.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{usta.name}</h3>
                    <p className="text-sm text-gray-600">{usta.category}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{usta.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{usta.rating} ({usta.experience} deneyim)</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Saatlik: {usta.hourlyRate}
                  </div>
                </div>
                
                <Link
                  to={`/usta/${usta.id}`}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block"
                >
                  Detayları Gör
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Usta mısınız? Hemen Kayıt Olun
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Müşterilerinizle buluşun ve işinizi büyütün
          </p>
          <Link
            to="/usta-ekle"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Usta Olarak Kayıt Ol</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home; 