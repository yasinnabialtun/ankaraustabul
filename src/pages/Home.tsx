import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Clock, Users, ArrowRight, CreditCard } from 'lucide-react';
import { kategoriler, ustalar } from '../data';

function Home() {
  const featuredUstalar = ustalar.slice(0, 6);
  const featuredKategoriler = kategoriler.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Ankara'da Güvenilir Usta Bul
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Evinizdeki her iş için profesyonel ustalar. Hızlı, güvenilir ve kaliteli hizmet.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/ustalar"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors font-semibold text-lg flex items-center justify-center"
              >
                <Search className="w-5 h-5 mr-2" />
                Usta Ara
              </Link>
              <Link
                to="/usta-ekle"
                className="bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-400 transition-colors font-semibold text-lg flex items-center justify-center"
              >
                <Users className="w-5 h-5 mr-2" />
                Usta Ekle
              </Link>
              <Link
                to="/test-payment"
                className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-500 transition-colors font-semibold text-lg flex items-center justify-center"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Ödeme Testi
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <Users className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                <h3 className="text-xl font-semibold mb-2">500+ Usta</h3>
                <p className="text-blue-100">Kayıtlı profesyonel</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <Star className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-xl font-semibold mb-2">4.8/5 Puan</h3>
                <p className="text-blue-100">Müşteri memnuniyeti</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <Clock className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                <h3 className="text-xl font-semibold mb-2">24 Saat</h3>
                <p className="text-blue-100">Hızlı hizmet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Hizmet Kategorileri
            </h2>
            <p className="text-gray-600 text-lg">
              İhtiyacınız olan her türlü hizmet için uzman ustalar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredKategoriler.map((kategori) => (
                              <Link
                  key={kategori.id}
                  to={`/kategori/${kategori.id}`}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 text-center group"
                >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">{kategori.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{kategori.name}</h3>
                <p className="text-gray-600 text-sm">{kategori.description}</p>
                <div className="mt-4 flex items-center justify-center text-blue-600 group-hover:text-blue-700">
                  <span className="text-sm font-semibold">Detayları Gör</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/kategoriler"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold inline-flex items-center"
            >
              Tüm Kategorileri Gör
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Ustalar */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Öne Çıkan Ustalar
            </h2>
            <p className="text-gray-600 text-lg">
              En çok tercih edilen ve yüksek puanlı ustalarımız
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredUstalar.map((usta) => (
              <Link
                key={usta.id}
                to={`/usta/${usta.id}`}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative">
                  <div className="text-6xl">👷</div>
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {usta.rating}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{usta.name}</h3>
                  <p className="text-gray-600 mb-4">{usta.category}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {usta.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {usta.experience} yıl
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-blue-600">{usta.hourlyRate} ₺/saat</span>
                    <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                      <span className="text-sm font-semibold">Detayları Gör</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/ustalar"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold inline-flex items-center"
            >
              Tüm Ustaları Gör
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Hemen Usta Bul ve İşini Halledir
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Binlerce güvenilir usta arasından seçim yap, hızlı ve kaliteli hizmet al.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ustalar"
              className="bg-white text-green-600 px-8 py-4 rounded-xl hover:bg-green-50 transition-colors font-semibold text-lg"
            >
              Usta Ara
            </Link>
            <Link
              to="/usta-ekle"
              className="bg-green-500 text-white px-8 py-4 rounded-xl hover:bg-green-400 transition-colors font-semibold text-lg"
            >
              Usta Ekle
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 