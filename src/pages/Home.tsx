import { kategoriler, ustalar } from '../data';
import { Star, MapPin, Phone } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Ankara'da Güvenilir Usta Bulun
          </h1>
          <p className="text-xl mb-8">
            Evinizdeki her türlü iş için güvenilir ve deneyimli ustalar
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Hemen Usta Bul
          </button>
        </div>
      </div>

      {/* Kategoriler */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Hizmet Kategorileri</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {kategoriler.map((kategori) => (
            <div key={kategori.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{kategori.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{kategori.name}</h3>
              <p className="text-gray-600 mb-4">{kategori.description}</p>
              <p className="text-sm text-gray-500">{kategori.ustalar.length} usta</p>
            </div>
          ))}
        </div>
      </div>

      {/* Öne Çıkan Ustalar */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Öne Çıkan Ustalar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ustalar.slice(0, 3).map((usta) => (
            <div key={usta.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                  {usta.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">{usta.name}</h3>
                  <p className="text-gray-600">{usta.category}</p>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm">{usta.rating}</span>
                <span className="ml-2 text-sm text-gray-500">({usta.experience} yıl deneyim)</span>
              </div>
              <div className="flex items-center mb-4 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {usta.location}
              </div>
              <p className="text-gray-600 mb-4">{usta.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-1" />
                  {usta.phone}
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Ara
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home; 