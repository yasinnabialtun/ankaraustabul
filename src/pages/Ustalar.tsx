import { useState } from 'react';
import UstaCard from '../components/UstaCard';
import { ustalar, kategoriler } from '../data';
import { Search, Grid, List, Star, Users, MapPin, Clock, SortAsc, SortDesc } from 'lucide-react';

function Ustalar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'name'>('rating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredUstalar = ustalar
    .filter(usta => {
      const matchesSearch = 
        usta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usta.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usta.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usta.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === '' || usta.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
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

  const totalPages = Math.ceil(filteredUstalar.length / itemsPerPage);
  const paginatedUstalar = filteredUstalar.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const avgRating = ustalar.reduce((sum, usta) => sum + usta.rating, 0) / ustalar.length;
  const totalExperience = ustalar.reduce((sum, usta) => sum + usta.experience, 0);
  const uniqueLocations = new Set(ustalar.map(usta => usta.location)).size;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Tüm <span className="text-yellow-300">Ustalar</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Ankara'nın en güvenilir ve deneyimli ustaları ile tanışın.
            <br />Kaliteli hizmet ve uygun fiyat garantisi.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Usta ara... (isim, kategori, konum, hizmet...)"
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
              <span className="text-lg">{ustalar.length} Usta</span>
            </div>
            <div className="flex items-center">
              <Star className="w-6 h-6 mr-2" />
              <span className="text-lg">{avgRating.toFixed(1)} Ortalama Puan</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-6 h-6 mr-2" />
              <span className="text-lg">{uniqueLocations} Bölge</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              <span className="text-lg">{totalExperience} Yıl Deneyim</span>
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
                    placeholder="Usta ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tüm Kategoriler</option>
                  {kategoriler.map((kategori) => (
                    <option key={kategori.id} value={kategori.name}>
                      {kategori.name}
                    </option>
                  ))}
                </select>
                
                {/* Sort */}
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
                
                {/* View Mode */}
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
          </div>

          {/* Results Info */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {filteredUstalar.length} Usta Bulundu
              </h2>
              <p className="text-gray-600">
                {searchTerm || selectedCategory ? 'Filtrelenmiş sonuçlar' : 'Tüm ustalar'}
              </p>
            </div>
            
            <div className="text-sm text-gray-500">
              Sayfa {currentPage} / {totalPages}
            </div>
          </div>

          {/* Ustalar Grid */}
          {paginatedUstalar.length > 0 ? (
            <>
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {paginatedUstalar.map((usta) => (
                  <UstaCard key={usta.id} usta={usta} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Önceki
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sonraki
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Sonuç Bulunamadı</h3>
              <p className="text-gray-600 mb-8">
                Arama kriterlerinize uygun usta bulunamadı. Farklı filtreler deneyin.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setCurrentPage(1);
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Tüm Ustaları Göster
              </button>
            </div>
          )}

          {/* Top Ustalar */}
          {!searchTerm && !selectedCategory && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
                En Yüksek Puanlı Ustalar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ustalar
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 3)
                  .map((usta) => (
                    <div key={usta.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl mr-4">
                          👷
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800">{usta.name}</h4>
                          <p className="text-sm text-gray-600">{usta.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-semibold">{usta.rating} puan</span>
                        </div>
                        <span className="text-sm text-blue-600 font-semibold">En İyi</span>
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

export default Ustalar; 