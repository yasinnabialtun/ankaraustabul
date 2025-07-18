import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Ankara Usta Bul
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Ana Sayfa
            </Link>
            <Link 
              to="/kategoriler" 
              className={`transition-colors duration-200 ${
                isActive('/kategoriler') 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Kategoriler
            </Link>
            <Link 
              to="/ustalar" 
              className={`transition-colors duration-200 ${
                isActive('/ustalar') 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Ustalar
            </Link>
            <Link 
              to="/blog" 
              className={`transition-colors duration-200 ${
                isActive('/blog') 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Blog
            </Link>
            <Link 
              to="/usta-ekle" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Usta Ekle
            </Link>
            <a 
              href="tel:+905321234567" 
              className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              <Phone className="w-4 h-4 mr-2" />
              Ara
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/') 
                    ? 'bg-blue-100 text-blue-600 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link 
                to="/kategoriler" 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/kategoriler') 
                    ? 'bg-blue-100 text-blue-600 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Kategoriler
              </Link>
              <Link 
                to="/ustalar" 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/ustalar') 
                    ? 'bg-blue-100 text-blue-600 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Ustalar
              </Link>
              <Link 
                to="/blog" 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/blog') 
                    ? 'bg-blue-100 text-blue-600 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/usta-ekle" 
                className="mx-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center"
                onClick={() => setIsOpen(false)}
              >
                Usta Ekle
              </Link>
              <a 
                href="tel:+905321234567" 
                className="mx-4 flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                onClick={() => setIsOpen(false)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Hemen Ara
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation; 