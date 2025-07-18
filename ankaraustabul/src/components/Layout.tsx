import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import NotificationBar from './NotificationBar';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <NotificationBar />
      <main>
        <Outlet />
      </main>
      <footer className="bg-primary-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 gradient-text">AnkaraUstaBul</h3>
              <p className="text-gray-300">
                Ankara'da güvenilir usta bulmanın en kolay yolu. 
                Kaliteli hizmet, uygun fiyat, garantili işçilik.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/" className="hover:text-white transition-colors">Ana Sayfa</a></li>
                <li><a href="/kategoriler" className="hover:text-white transition-colors">Kategoriler</a></li>
                <li><a href="/ustalar" className="hover:text-white transition-colors">Ustalar</a></li>
                <li><a href="/usta-ekle" className="hover:text-white transition-colors">Usta Ol</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Popüler Hizmetler</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/kategori/elektrikci" className="hover:text-white transition-colors">Elektrikçi</a></li>
                <li><a href="/kategori/tesisatci" className="hover:text-white transition-colors">Tesisatçı</a></li>
                <li><a href="/kategori/boyaci" className="hover:text-white transition-colors">Boyacı</a></li>
                <li><a href="/kategori/klima-servisi" className="hover:text-white transition-colors">Klima Servisi</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">İletişim</h4>
              <div className="space-y-2 text-gray-300">
                <p>📞 0312 123 45 67</p>
                <p>📧 info@ankaraustabul.com</p>
                <p>📍 Ankara, Türkiye</p>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="hover:text-white transition-colors">Facebook</a>
                  <a href="#" className="hover:text-white transition-colors">Instagram</a>
                  <a href="#" className="hover:text-white transition-colors">Twitter</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 AnkaraUstaBul. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;