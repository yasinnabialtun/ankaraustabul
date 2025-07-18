import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="container mx-auto px-4 text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary-200 mb-4">404</div>
          <div className="w-32 h-32 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-6">
            <Search className="text-primary-600" size={48} />
          </div>
        </div>

        {/* Error Message */}
        <div className="max-w-md mx-auto mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Sayfa Bulunamadı
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
            Lütfen URL'yi kontrol edin veya ana sayfaya dönün.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link 
            to="/" 
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Home size={20} />
            <span>Ana Sayfaya Dön</span>
          </Link>
          
          <Link 
            to="/ustalar" 
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <Search size={20} />
            <span>Usta Ara</span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="max-w-lg mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Popüler Sayfalar
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Link 
              to="/kategoriler" 
              className="text-primary-600 hover:text-primary-700 transition-colors"
            >
              Hizmet Kategorileri
            </Link>
            <Link 
              to="/ustalar" 
              className="text-primary-600 hover:text-primary-700 transition-colors"
            >
              Tüm Ustalar
            </Link>
            <Link 
              to="/usta-ekle" 
              className="text-primary-600 hover:text-primary-700 transition-colors"
            >
              Usta Ol
            </Link>
            <Link 
              to="/kategori/elektrikci" 
              className="text-primary-600 hover:text-primary-700 transition-colors"
            >
              Elektrikçi Ustaları
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Sorun devam ederse{' '}
            <a 
              href="tel:03121234567" 
              className="text-primary-600 hover:text-primary-700 underline"
            >
              0312 123 45 67
            </a>
            {' '}numarasından bize ulaşabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;