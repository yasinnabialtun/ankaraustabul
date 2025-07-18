import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import UstaCard from '../components/UstaCard';
import { kategoriler } from '../data';
import { ArrowLeft, Search, Star, Users, MapPin, SortAsc, SortDesc } from 'lucide-react';

function KategoriDetay() {
  const { kategori } = useParams();
  const kategoriData = kategoriler.find(k => k.id === kategori);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'name'>('rating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  if (!kategoriData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Kategori bulunamadı</h1>
          <p className="text-gray-600 mb-8">Aradığınız kategori sistemde kayıtlı değil.</p>
          <Link
            to="/kategoriler"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Tüm Kategorileri Gör
          </Link>
        </div>
      </div>
    );
  }

  const filteredUstalar = kategoriData.ustalar
    .filter(usta => 
      usta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usta.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usta.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'experience':
          comparison = a.experience - b.experience;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const avgRating = kategoriData.ustalar.reduce((sum, usta) => sum + usta.rating, 0) / kategoriData.ustalar.length;
  const totalExperience = kategoriData.ustalar.reduce((sum, usta) => sum + usta.experience, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link to="/kategoriler" className="inline-flex items-center text-white hover:text-yellow-300 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kategorilere Dön
          </Link>
          
          <div className="text-center">
            <div className="text-8xl mb-6">{kategoriData.icon}</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {kategoriData.name} <span className="text-yellow-300">Ustaları</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              {kategoriData.description}
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex items-center">
                <Users className="w-6 h-6 mr-2" />
                <span className="text-lg">{kategoriData.ustalar.length} Usta</span>
              </div>
              <div className="flex items-center">
                <Star className="w-6 h-6 mr-2" />
                <span className="text-lg">{avgRating.toFixed(1)} Ortalama Puan</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-6 h-6 mr-2" />
                <span className="text-lg">{totalExperience} Yıl Deneyim</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ustalar Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div className="flex-1 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Usta ara... (isim, açıklama, konum...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'rating' | 'experience' | 'name')}
                    className="bg-transparent px-3 py-2 text-sm focus:outline-none"
                  >
                    <option value="rating">Puana Göre</option>
                    <option value="experience">Deneyime Göre</option>
                    <option value="name">İsme Göre</option>
                  </select>
                </div>
                
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  title={sortOrder === 'asc' ? 'Azalan' : 'Artan'}
                >
                  {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {filteredUstalar.length} Usta Bulundu
              </h2>
              <p className="text-gray-600">
                {searchTerm ? `"${searchTerm}" için arama sonuçları` : 'Tüm ustalar'}
              </p>
            </div>
            
            <div className="text-sm text-gray-500">
              {kategoriData.ustalar.length} toplam usta
            </div>
          </div>

          {/* Ustalar Grid */}
          {filteredUstalar.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUstalar.map((usta) => (
                <UstaCard key={usta.id} usta={usta} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Sonuç Bulunamadı</h3>
              <p className="text-gray-600 mb-8">
                {searchTerm 
                  ? `"${searchTerm}" için usta bulunamadı. Farklı bir arama terimi deneyin.`
                  : 'Bu kategoride henüz usta bulunmuyor.'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Tüm Ustaları Göster
                </button>
              )}
            </div>
          )}

          {/* Category Info */}
          {!searchTerm && (
            <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                {kategoriData.name} Hakkında
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-800">Hizmet Alanları</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {kategoriData.name} kategorisinde uzmanlaşmış ustalarımız, 
                    {kategoriData.description.toLowerCase()} konusunda profesyonel hizmet sunmaktadır. 
                    Deneyimli ve güvenilir ustalarımız ile kaliteli hizmet garantisi.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-800">Neden Biz?</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      Deneyimli ve uzman ustalar
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      Güvenilir ve kaliteli hizmet
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      Uygun fiyat garantisi
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      7/24 müşteri desteği
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default KategoriDetay; 