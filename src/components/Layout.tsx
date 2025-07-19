import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import PerformanceDashboard from './PerformanceDashboard';
import BackToTop from './BackToTop';
import NotificationBar from './NotificationBar';
import { ToastManager } from './Toast';
import { usePerformance } from '../hooks/usePerformance';
import { useEffect } from 'react';

function Layout() {
  const { measurePageLoad } = usePerformance();

  useEffect(() => {
    // Measure page load performance
    measurePageLoad();
  }, [measurePageLoad]);

  return (
    <ToastManager>
      <div className="min-h-screen bg-gray-50">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Ana içeriğe geç
        </a>
        
        <Navigation />
        
        {/* Notification Bar */}
        <NotificationBar />
        
        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
        
        {/* Performance Dashboard */}
        {process.env.NODE_ENV === 'development' && <PerformanceDashboard />}
        
        {/* Back to Top Button */}
        <BackToTop />
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ankara Usta Bul</h3>
              <p className="text-gray-300 mb-4">
                Ankara'da güvenilir usta arama platformu. Evinizdeki her iş için profesyonel çözümler.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                  </svg>
                </a>
              </div>
            </div>
            

            
            <div>
              <h4 className="text-lg font-semibold mb-4">Kategoriler</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/kategori/elektrik" className="hover:text-white transition-colors">Elektrik</a></li>
                <li><a href="/kategori/su-tesisati" className="hover:text-white transition-colors">Su Tesisatı</a></li>
                <li><a href="/kategori/boya" className="hover:text-white transition-colors">Boya</a></li>
                <li><a href="/kategori/temizlik" className="hover:text-white transition-colors">Temizlik</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-gray-300">
                <li>📞 +90 312 123 45 67</li>
                <li>📧 info@ankaraustabul.com</li>
                <li>📍 Ankara, Türkiye</li>
                <li>🕒 7/24 Hizmet</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Ankara Usta Bul. Tüm hakları saklıdır.</p>
            <div className="mt-4 space-x-4">
              <a href="/gizlilik" className="hover:text-white transition-colors">Gizlilik Politikası</a>
              <a href="/kullanim-kosullari" className="hover:text-white transition-colors">Kullanım Koşulları</a>
              <a href="/cerez-politikasi" className="hover:text-white transition-colors">Çerez Politikası</a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </ToastManager>
  );
}

export default Layout; 