import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';

function NotFound() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': '404 - Sayfa Bulunamadı',
    'description': 'Aradığınız sayfa bulunamadı. Ana sayfaya dönün veya arama yapın.',
    'url': 'https://ankaraustabul.com/404'
  };

  return (
    <>
      <SEO 
        title="404 - Sayfa Bulunamadı - Ankara Usta Bul"
        description="Aradığınız sayfa bulunamadı. Ana sayfaya dönün veya arama yapın."
        keywords="404, sayfa bulunamadı, hata"
        structured={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Section className="py-20">
          <div className="max-w-4xl mx-auto text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* 404 Icon */}
              <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl">
                <span className="text-6xl font-bold">404</span>
              </div>
              
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Sayfa Bulunamadı
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Oops! Sayfa
                <span className="block bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  Bulunamadı
                </span>
              </h1>
              
              {/* Description */}
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12">
                Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
                Ana sayfaya dönün veya arama yaparak istediğiniz içeriği bulun.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button
                  onClick={() => window.history.back()}
                  size="lg"
                  icon={<ArrowLeft className="w-5 h-5" />}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl"
                >
                  Geri Dön
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  size="lg"
                  icon={<Home className="w-5 h-5" />}
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Ana Sayfa
                </Button>
              </div>
              
              {/* Quick Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link to="/ustalar" className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Usta Ara</h3>
                    <p className="text-gray-600 text-sm">
                      İhtiyacınız olan hizmet için usta bulun
                    </p>
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link to="/kategoriler" className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Home className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Kategoriler</h3>
                    <p className="text-gray-600 text-sm">
                      Hizmet kategorilerini keşfedin
                    </p>
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link to="/iletisim" className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">İletişim</h3>
                    <p className="text-gray-600 text-sm">
                      Bizimle iletişime geçin
                    </p>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
    </>
  );
}

export default NotFound; 