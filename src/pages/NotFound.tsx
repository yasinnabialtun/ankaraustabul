import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, Users, MapPin, Phone } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Animation */}
          <div className="mb-12 animate-bounce">
            <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
            <div className="text-6xl mb-8">😕</div>
          </div>

          {/* Main Content */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 animate-fade-in">
              Sayfa Bulunamadı
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed animate-fade-in-delay">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
              Ana sayfaya dönebilir veya aşağıdaki linkleri kullanabilirsiniz.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-delay-2">
            <Link
              to="/"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Ana Sayfaya Dön
            </Link>
            <Link
              to="/ustalar"
              className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Usta Ara
            </Link>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-600 text-white px-8 py-4 rounded-xl hover:bg-gray-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Geri Dön
            </button>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 animate-fade-in-delay-3">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Popüler Sayfalar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/ustalar"
                className="group bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Users className="w-8 h-8 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  Ustalar
                </h3>
                <p className="text-gray-600 text-sm">
                  Güvenilir ustalarımızla tanışın
                </p>
              </Link>

              <Link
                to="/kategoriler"
                className="group bg-gray-50 rounded-xl p-6 hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <MapPin className="w-8 h-8 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                  Kategoriler
                </h3>
                <p className="text-gray-600 text-sm">
                  Hizmet kategorilerini keşfedin
                </p>
              </Link>

              <Link
                to="/blog"
                className="group bg-gray-50 rounded-xl p-6 hover:bg-purple-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Phone className="w-8 h-8 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                  Blog
                </h3>
                <p className="text-gray-600 text-sm">
                  Faydalı bilgiler ve ipuçları
                </p>
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 animate-fade-in-delay-4">
            <h2 className="text-2xl font-bold mb-4">
              Yardıma mı ihtiyacınız var?
            </h2>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Aradığınız sayfayı bulamadıysanız, aşağıdaki yolları deneyebilirsiniz:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">URL'yi Kontrol Edin</h3>
                <p className="text-blue-100 text-sm">
                  Tarayıcınızın adres çubuğundaki URL'nin doğru yazıldığından emin olun.
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Ana Sayfaya Gidin</h3>
                <p className="text-blue-100 text-sm">
                  Ana sayfadan istediğiniz bölüme kolayca ulaşabilirsiniz.
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Arama Yapın</h3>
                <p className="text-blue-100 text-sm">
                  Üst menüdeki arama kutusunu kullanarak istediğiniz içeriği bulabilirsiniz.
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">İletişime Geçin</h3>
                <p className="text-blue-100 text-sm">
                  Sorununuz devam ederse bizimle iletişime geçebilirsiniz.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-center animate-fade-in-delay-5">
            <p className="text-gray-600 mb-4">
              Sorununuz devam ederse bizimle iletişime geçin:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-gray-600">
              <div className="flex items-center justify-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+90 312 123 45 67</span>
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Ankara, Türkiye</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound; 