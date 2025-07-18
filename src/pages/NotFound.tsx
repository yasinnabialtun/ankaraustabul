import { Link } from 'react-router-dom';
import { Home, Search, ArrowRight, MapPin, Users, FileText } from 'lucide-react';

function NotFound() {
  const popularPages = [
    { name: 'Ana Sayfa', path: '/', icon: Home, description: 'Sitenin ana sayfası' },
    { name: 'Kategoriler', path: '/kategoriler', icon: MapPin, description: 'Hizmet kategorileri' },
    { name: 'Ustalar', path: '/ustalar', icon: Users, description: 'Usta listesi' },
    { name: 'Blog', path: '/blog', icon: FileText, description: 'Blog yazıları' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Animation */}
          <div className="mb-8">
            <div className="text-9xl font-bold text-gray-200 mb-4 animate-pulse">
              404
            </div>
            <div className="text-6xl mb-4 animate-bounce">😕</div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-lg p-12 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Sayfa <span className="text-red-500">Bulunamadı</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
              <br />
              Aşağıdaki popüler sayfalardan birini ziyaret edebilirsiniz.
            </p>

            {/* Search Suggestion */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-blue-800">Aradığınızı bulamadınız mı?</h3>
              </div>
              <p className="text-blue-700 mb-4">
                Belki de aradığınız sayfa farklı bir isimle kayıtlıdır. 
                Ana sayfadaki arama kutusunu kullanarak aradığınız hizmeti bulabilirsiniz.
              </p>
              <Link
                to="/"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Search className="w-4 h-4 mr-2" />
                Ana Sayfaya Git
              </Link>
            </div>

            {/* Popular Pages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularPages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="group bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-blue-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <page.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {page.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {page.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Yardıma mı ihtiyacınız var?</h2>
            <p className="text-green-100 mb-6">
              Aradığınız sayfayı bulamadıysanız, bizimle iletişime geçebilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/ustalar"
                className="bg-white text-green-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
              >
                Usta Bul
              </Link>
              <Link
                to="/kategoriler"
                className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-400 transition-colors font-semibold"
              >
                Kategorileri İncele
              </Link>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound; 