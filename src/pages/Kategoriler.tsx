import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, Users, Star, MapPin } from 'lucide-react';
import { kategoriler } from '../data';

function Kategoriler() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredKategoriler = kategoriler.filter(kategori => {
    const matchesSearch = kategori.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kategori.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || kategori.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = [...new Set(kategoriler.map(k => k.name))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Hizmet Kategorileri
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed animate-fade-in-delay">
              İhtiyacınız olan her türlü hizmet için uzman ustalarımız hazır. 
              Güvenilir, deneyimli ve kaliteli hizmet garantisi.
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto animate-fade-in-delay-2">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Kategori ara... (örn: elektrik, temizlik)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg shadow-lg"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedCategory === '' 
                      ? 'bg-white text-blue-600 font-semibold' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  Tümü
                </button>
                {uniqueCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      selectedCategory === category 
                        ? 'bg-white text-blue-600 font-semibold' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredKategoriler.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Sonuç Bulunamadı</h3>
              <p className="text-gray-600 mb-8">
                Aradığınız kriterlere uygun kategori bulunamadı. 
                Farklı arama terimleri deneyebilir veya filtreleri temizleyebilirsiniz.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  {filteredKategoriler.length} Kategori Bulundu
                </h2>
                <div className="flex items-center text-gray-600">
                  <Filter className="w-4 h-4 mr-2" />
                  <span>Filtrelenmiş Sonuçlar</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredKategoriler.map((kategori, index) => (
                  <Link
                    key={kategori.id}
                    to={`/kategori/${kategori.id}`}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
                      {kategori.image && (
                        <img
                          src={kategori.image}
                          alt={kategori.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                      <div className="absolute top-3 right-3 text-3xl">{kategori.icon}</div>
                      <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {kategori.ustalar.length} Usta
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                        {kategori.name}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                        {kategori.description}
                      </p>
                      
                      {kategori.popularServices && (
                        <div className="mb-4">
                          <h4 className="text-xs font-medium text-gray-700 mb-2">Popüler Hizmetler:</h4>
                          <div className="flex flex-wrap gap-1">
                            {kategori.popularServices.slice(0, 2).map((service, idx) => (
                              <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                {service}
                              </span>
                            ))}
                            {kategori.popularServices.length > 2 && (
                              <span className="text-xs text-gray-500">+{kategori.popularServices.length - 2} daha</span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-semibold text-sm">
                          {kategori.ustalar.length} usta mevcut
                        </span>
                        <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                          <span className="font-semibold text-sm">Detayları Gör</span>
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {kategoriler.reduce((acc, kategori) => acc + kategori.ustalar.length, 0)}
              </h3>
              <p className="text-gray-600">Toplam Usta</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{kategoriler.length}</h3>
              <p className="text-gray-600">Hizmet Kategorisi</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">25+</h3>
              <p className="text-gray-600">Hizmet Bölgesi</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Usta mı Arıyorsunuz?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            İhtiyacınız olan hizmeti bulamadınız mı? 
            Doğrudan ustalarımızla iletişime geçebilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ustalar"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Tüm Ustaları Gör
            </Link>
            <Link
              to="/usta-ekle"
              className="bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-400 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Usta Ekle
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Kategoriler; 