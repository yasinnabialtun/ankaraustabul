import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, Star, MapPin, Clock, Users, Phone, CreditCard, SortAsc, SortDesc, ArrowLeft } from 'lucide-react';
import { kategoriler } from '../data';

function KategoriDetay() {
  const { id } = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'hourlyRate' | 'reviews'>('rating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const kategori = kategoriler.find(k => k.id === id);
  
  if (!kategori) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Kategori Bulunamadı</h1>
          <p className="text-gray-600 mb-8">Aradığınız kategori mevcut değil.</p>
          <Link
            to="/kategoriler"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Kategorilere Dön
          </Link>
        </div>
      </div>
    );
  }

  // Filter and sort ustalar
  const filteredUstalar = kategori.ustalar.filter(usta => {
    const matchesSearch = usta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usta.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || usta.location.includes(selectedLocation);
    return matchesSearch && matchesLocation;
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

  // Get unique locations
  const locations = [...new Set(kategori.ustalar.map(u => u.location))];

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSortBy('rating');
    setSortOrder('desc');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Link
                to="/kategoriler"
                className="flex items-center text-blue-100 hover:text-white transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kategorilere Dön
              </Link>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-6 animate-bounce-in">{kategori.icon}</div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                {kategori.name}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed animate-fade-in-delay">
                {kategori.description}
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto animate-fade-in-delay-2">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <input
                    type="text"
                    placeholder={`${kategori.name} ustası ara...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tüm Lokasyonlar</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
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
                >
                  Puan
                  {sortBy === 'rating' && (sortOrder === 'asc' ? <SortAsc className="w-3 h-3 ml-1 inline" /> : <SortDesc className="w-3 h-3 ml-1 inline" />)}
                </button>
                <button
                  onClick={() => handleSort('experience')}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    sortBy === 'experience' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Deneyim
                  {sortBy === 'experience' && (sortOrder === 'asc' ? <SortAsc className="w-3 h-3 ml-1 inline" /> : <SortDesc className="w-3 h-3 ml-1 inline" />)}
                </button>
                <button
                  onClick={() => handleSort('hourlyRate')}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    sortBy === 'hourlyRate' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {filteredUstalar.length} Usta Bulundu
              </h2>
              <p className="text-gray-600">
                {searchTerm && `"${searchTerm}" için arama sonuçları`}
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
              >
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedUstalar.map((usta, index) => (
                  <div
                    key={usta.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
                      <div className="text-6xl group-hover:scale-110 transition-transform duration-300">👷</div>
                      <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        {usta.rating}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        {usta.category}
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
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
                      
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-2xl font-bold text-blue-600">{usta.hourlyRate} ₺/saat</span>
                        <Link
                          to={`/usta/${usta.id}`}
                          className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors"
                        >
                          <span className="font-semibold">Detayları Gör</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                      
                      <div className="flex gap-2">
                        <a
                          href={`tel:${usta.phone}`}
                          className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold text-center flex items-center justify-center"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Ara
                        </a>
                        <Link
                          to={`/payment/${usta.id}`}
                          className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-center flex items-center justify-center"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Öde
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Önceki
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{kategori.ustalar.length}</h3>
              <p className="text-gray-600">Toplam Usta</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {(kategori.ustalar.reduce((acc, usta) => acc + usta.rating, 0) / kategori.ustalar.length).toFixed(1)}
              </h3>
              <p className="text-gray-600">Ortalama Puan</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {Math.round(kategori.ustalar.reduce((acc, usta) => acc + usta.experience, 0) / kategori.ustalar.length)}
              </h3>
              <p className="text-gray-600">Ortalama Deneyim (Yıl)</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {new Set(kategori.ustalar.map(u => u.location)).size}
              </h3>
              <p className="text-gray-600">Hizmet Bölgesi</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {kategori.name} Ustası mısınız?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Sitemize katılın ve müşterilerinizle buluşun. 
            Binlerce potansiyel müşteri sizi bekliyor!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/usta-ekle"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Usta Olarak Kayıt Ol
            </Link>
            <Link
              to="/kategoriler"
              className="bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-400 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Diğer Kategorileri Gör
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default KategoriDetay; 