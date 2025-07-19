import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, ArrowRight, Star, MapPin, Clock, Users, Phone, SortAsc, SortDesc } from 'lucide-react';
import { ustalar } from '../data';
import { useSEO } from '../hooks/useSEO';

function Ustalar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'hourlyRate' | 'reviews'>('rating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // SEO hook'u kullan
  useSEO({
    title: 'Ankara Ustalar - Güvenilir Usta Arama ve Bulma',
    description: 'Ankara\'da deneyimli, kaliteli ve güvenilir ustalar bulun. Elektrik, su tesisatı, boya, temizlik ve daha fazlası için uzman ustalar ile tanışın.',
    keywords: 'ankara ustalar, elektrik ustası ankara, su tesisatı ustası, boya ustası, temizlik ustası, ev tamiratı ankara, güvenilir usta ankara',
    type: 'website'
  });

  // Filter and sort ustalar
  const filteredUstalar = ustalar.filter(usta => {
    const matchesSearch = usta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usta.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usta.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || usta.category === selectedCategory;
    const matchesLocation = !selectedLocation || usta.location.includes(selectedLocation);
    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Sort ustalar
  const sortedUstalar = [...filteredUstalar].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedUstalar.length / itemsPerPage);
  const paginatedUstalar = sortedUstalar.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get unique values for filters
  const categories = [...new Set(ustalar.map(u => u.category))];
  const locations = [...new Set(ustalar.map(u => u.location))];

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedLocation) params.set('location', selectedLocation);
    if (searchTerm) params.set('q', searchTerm);
    setSearchParams(params);
  }, [selectedCategory, selectedLocation, searchTerm, setSearchParams]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLocation('');
    setSortBy('rating');
    setSortOrder('desc');
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Güvenilir Ustalar
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed animate-fade-in-delay">
              Deneyimli, kaliteli ve güvenilir ustalarımızla tanışın. 
              Evinizdeki her iş için profesyonel çözümler.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto animate-fade-in-delay-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Usta ara... (örn: elektrik, Ahmet, Çankaya)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg shadow-lg"
                  aria-label="Usta arama"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-white border-b" aria-labelledby="filters-heading">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Kategori seçimi"
              >
                <option value="">Tüm Kategoriler</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Lokasyon seçimi"
              >
                <option value="">Tüm Lokasyonlar</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                aria-label="Filtreleri temizle"
              >
                Filtreleri Temizle
              </button>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Sırala:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSort('rating')}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    sortBy === 'rating' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label="Puana göre sırala"
                >
                  Puan
                  {sortBy === 'rating' && (sortOrder === 'asc' ? <SortAsc className="w-3 h-3 ml-1 inline" /> : <SortDesc className="w-3 h-3 ml-1 inline" />)}
                </button>
                <button
                  onClick={() => handleSort('experience')}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    sortBy === 'experience' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label="Deneyime göre sırala"
                >
                  Deneyim
                  {sortBy === 'experience' && (sortOrder === 'asc' ? <SortAsc className="w-3 h-3 ml-1 inline" /> : <SortDesc className="w-3 h-3 ml-1 inline" />)}
                </button>
                <button
                  onClick={() => handleSort('hourlyRate')}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    sortBy === 'hourlyRate' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label="Fiyata göre sırala"
                >
                  Fiyat
                  {sortBy === 'hourlyRate' && (sortOrder === 'asc' ? <SortAsc className="w-3 h-3 ml-1 inline" /> : <SortDesc className="w-3 h-3 ml-1 inline" />)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16" aria-labelledby="results-heading">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h2 id="results-heading" className="text-2xl font-bold text-gray-800 mb-2">
                {filteredUstalar.length} Usta Bulundu
              </h2>
              <p className="text-gray-600">
                {searchTerm && `"${searchTerm}" için arama sonuçları`}
                {selectedCategory && `Kategori: ${selectedCategory}`}
                {selectedLocation && `Lokasyon: ${selectedLocation}`}
              </p>
            </div>
            <div className="flex items-center text-gray-600 mt-4 sm:mt-0">
              <Filter className="w-4 h-4 mr-2" />
              <span>Filtrelenmiş Sonuçlar</span>
            </div>
          </div>

          {/* Ustalar Grid */}
          {paginatedUstalar.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Sonuç Bulunamadı</h3>
              <p className="text-gray-600 mb-8">
                Aradığınız kriterlere uygun usta bulunamadı. 
                Farklı arama terimleri deneyebilir veya filtreleri temizleyebilirsiniz.
              </p>
              <button
                onClick={clearFilters}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                aria-label="Filtreleri temizle ve tüm ustaları göster"
              >
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedUstalar.map((usta, index) => (
                  <Link
                    key={usta.id}
                    to={`/usta/${usta.id}`}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                    aria-label={`${usta.name} usta profili`}
                  >
                    <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
                      <img
                        src={usta.image}
                        alt={usta.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                      <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {usta.rating}
                      </div>
                      {usta.verified && (
                        <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                          ✓ Doğrulanmış
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                        {usta.category}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                        {usta.name}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                        {usta.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-6">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{usta.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-2 text-yellow-400" />
                          <span>{usta.rating}/5</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{usta.experience} yıl</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{usta.reviews} değerlendirme</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">{usta.hourlyRate} ₺/saat</span>
                        <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                          <span className="font-semibold">Detayları Gör</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Önceki sayfa"
                    >
                      Önceki
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg border ${
                          currentPage === page
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        aria-label={`Sayfa ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Sonraki sayfa"
                    >
                      Sonraki
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{ustalar.length}</h3>
              <p className="text-gray-600">Toplam Usta</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {(ustalar.reduce((acc, usta) => acc + usta.rating, 0) / ustalar.length).toFixed(1)}
              </h3>
              <p className="text-gray-600">Ortalama Puan</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {Math.round(ustalar.reduce((acc, usta) => acc + usta.experience, 0) / ustalar.length)}
              </h3>
              <p className="text-gray-600">Ortalama Deneyim (Yıl)</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {new Set(ustalar.map(u => u.location)).size}
              </h3>
              <p className="text-gray-600">Hizmet Bölgesi</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Usta mı Arıyorsunuz?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ankara'da güvenilir ustalar ile tanışın. Hızlı, kaliteli ve uygun fiyatlı hizmet için hemen iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/usta-ekle"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-lg flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              aria-label="Usta kayıt sayfasına git"
            >
              <Users className="w-5 h-5 mr-2" />
              Usta Ol
            </Link>
            <Link
              to="/contact"
              className="bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-400 transition-all duration-300 font-semibold text-lg flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              aria-label="İletişim sayfasına git"
            >
              <Phone className="w-5 h-5 mr-2" />
              İletişim
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ustalar; 