import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Ankara Usta Bul
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Ana Sayfa
            </Link>
            <Link to="/kategoriler" className="text-gray-700 hover:text-blue-600 transition-colors">
              Kategoriler
            </Link>
            <Link to="/ustalar" className="text-gray-700 hover:text-blue-600 transition-colors">
              Ustalar
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <Link to="/usta-ekle" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Usta Ekle
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Ana Sayfa
              </Link>
              <Link to="/kategoriler" className="text-gray-700 hover:text-blue-600 transition-colors">
                Kategoriler
              </Link>
              <Link to="/ustalar" className="text-gray-700 hover:text-blue-600 transition-colors">
                Ustalar
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">
                Blog
              </Link>
              <Link to="/usta-ekle" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Usta Ekle
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation; 