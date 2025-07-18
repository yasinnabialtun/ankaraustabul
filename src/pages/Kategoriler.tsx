import { useState } from 'react';
import KategoriCard from '../components/KategoriCard';
import { kategoriler } from '../data';
import { Search, Grid, List, Star, Users, Clock } from 'lucide-react';

function Kategoriler() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredKategoriler = kategoriler.filter(kategori =>
    kategori.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kategori.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUstalar = kategoriler.reduce((total, kategori) => total + kategori.ustalar.length, 0);
  const avgRating = kategoriler.reduce((total, kategori) => {
    const kategoriAvg = kategori.ustalar.reduce((sum, usta) => sum + usta.rating, 0) / kategori.ustalar.length || 0;
    return total + kategoriAvg;
  }, 0) / kategoriler.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hizmet <span className="text-yellow-300">Kategorileri</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            İhtiyacınız olan her türlü hizmet için uzman ustalarımız hazır.
            <br />Güvenilir ve deneyimli ustalar ile tanışın.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Kategori ara... (örn: elektrik, su tesisatı, temizlik...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center">
              <Users className="w-6 h-6 mr-2" />
              <span className="text-lg">{kategoriler.length} Kategori</span>
            </div>
            <div className="flex items-center">
              <Star className="w-6 h-6 mr-2" />
              <span className="text-lg">{totalUstalar}+ Usta</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              <span className="text-lg">{avgRating.toFixed(1)} Ortalama Puan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-2xl font-bold text-gray-800">
                {filteredKategoriler.length} Kategori Bulundu
              </h2>
              <p className="text-gray-600">
                {searchTerm ? `"${searchTerm}" için arama sonuçları` : 'Tüm kategoriler'}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-l-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-r-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          {filteredKategoriler.length > 0 ? (
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredKategoriler.map((kategori) => (
                <KategoriCard key={kategori.id} kategori={kategori} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Sonuç Bulunamadı</h3>
              <p className="text-gray-600 mb-8">
                "{searchTerm}" için kategori bulunamadı. Farklı bir arama terimi deneyin.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Tüm Kategorileri Göster
              </button>
            </div>
          )}

          {/* Popular Categories */}
          {!searchTerm && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
                En Popüler Kategoriler
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {kategoriler
                  .sort((a, b) => b.ustalar.length - a.ustalar.length)
                  .slice(0, 3)
                  .map((kategori) => (
                    <div key={kategori.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <div className="text-4xl mb-4">{kategori.icon}</div>
                      <h4 className="text-xl font-semibold mb-2 text-gray-800">{kategori.name}</h4>
                      <p className="text-gray-600 mb-4">{kategori.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{kategori.ustalar.length} usta</span>
                        <span className="text-sm text-blue-600 font-semibold">Popüler</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Kategoriler; 