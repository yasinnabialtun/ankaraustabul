import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Phone, MapPin } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Ana Sayfa' },
    { path: '/kategoriler', label: 'Kategoriler' },
    { path: '/ustalar', label: 'Ustalar' },
    { path: '/blog', label: 'Blog' },
    { path: '/usta-ekle', label: 'Usta Ekle' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary-800 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone size={14} />
                <span>0312 123 45 67</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span>Ankara Geneli Hizmet</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>7/24 Acil Servis Hizmeti</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-800 rounded-lg flex items-center justify-center">
              <Search className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">AnkaraUstaBul</h1>
              <p className="text-xs text-gray-500">Güvenilir Usta Bulma Platformu</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-primary-800 border-b-2 border-primary-800'
                    : 'text-gray-700 hover:text-primary-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/ustalar" className="btn-primary">
              Usta Bul
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-primary-800'
                      : 'text-gray-700 hover:text-primary-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/ustalar"
                className="btn-primary inline-block text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Usta Bul
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;