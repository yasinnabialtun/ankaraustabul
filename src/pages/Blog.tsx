import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data';
import { Search, Calendar, User, ArrowRight, Grid, List, Clock } from 'lucide-react';

function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = ['Tümü', 'Tadilat', 'Elektrik', 'Su Tesisatı', 'Temizlik', 'Boya', 'İnşaat'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Tümü' || 
      post.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      post.content.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Blog & <span className="text-yellow-300">Rehber</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Ev bakımı ve tadilat konusunda faydalı bilgiler, ipuçları ve rehberler.
            <br />Uzman ustalarımızdan profesyonel öneriler.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Blog yazısı ara... (tadilat, elektrik, temizlik...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-300 text-lg"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center">
              <Calendar className="w-6 h-6 mr-2" />
              <span className="text-lg">{blogPosts.length} Yazı</span>
            </div>
            <div className="flex items-center">
              <User className="w-6 h-6 mr-2" />
              <span className="text-lg">Uzman Yazarlar</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              <span className="text-lg">Güncel İçerik</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
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
                    placeholder="Blog yazısı ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Tüm Kategoriler</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                
                {/* View Mode */}
                <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-l-lg transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-green-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-r-lg transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-green-600 text-white' 
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
                {filteredPosts.length} Yazı Bulundu
              </h2>
              <p className="text-gray-600">
                {searchTerm || selectedCategory ? 'Filtrelenmiş sonuçlar' : 'Tüm blog yazıları'}
              </p>
            </div>
            
            <div className="text-sm text-gray-500">
              Sayfa {currentPage} / {totalPages}
            </div>
          </div>

          {/* Blog Posts Grid */}
          {paginatedPosts.length > 0 ? (
            <>
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {paginatedPosts.map((post) => (
                  <article key={post.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                    <div className="h-56 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative overflow-hidden">
                      <div className="text-6xl text-green-600 group-hover:scale-110 transition-transform duration-300">📝</div>
                      <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Blog
                      </div>
                      <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                        {getReadingTime(post.content)} dk
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                        {post.content}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                        <span className="font-semibold flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.date).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="block w-full bg-green-600 text-white text-center py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold group-hover:bg-green-700"
                      >
                        Devamını Oku
                        <ArrowRight className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
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
                            ? 'bg-green-600 text-white'
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
                Arama kriterlerinize uygun blog yazısı bulunamadı. Farklı filtreler deneyin.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setCurrentPage(1);
                }}
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
              >
                Tüm Yazıları Göster
              </button>
            </div>
          )}

          {/* Featured Posts */}
          {!searchTerm && !selectedCategory && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
                Öne Çıkan Yazılar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="text-4xl mb-4">📝</div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">{post.title}</h4>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{getReadingTime(post.content)} dk okuma</span>
                      <span className="text-sm text-green-600 font-semibold">Öne Çıkan</span>
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

export default Blog; 