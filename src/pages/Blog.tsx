import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Mail } from 'lucide-react';
import { blogPosts } from '../data';
import { useSEO } from '../hooks/useSEO';

function Blog() {
  useSEO({
    title: 'Blog - Ankara Usta Bul',
    description: 'Ankara\'da usta hizmetleri hakkında güncel bilgiler, tavsiyeler ve uzman görüşleri.',
    keywords: 'ankara usta blog, usta tavsiyeleri, ev bakımı, usta hizmetleri',
    type: 'website'
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ankara Usta Bul Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Usta hizmetleri, ev bakımı ve uzman tavsiyeleri
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Blog yazılarında ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg shadow-lg"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-white text-blue-600 shadow-lg'
                      : 'bg-blue-500 text-white hover:bg-blue-400'
                  }`}
                >
                  {category === 'all' ? 'Tümü' : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Category Blogs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Kategori Rehberleri
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Her kategori için detaylı rehberler ve uzman tavsiyeleri
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              to="/blog/ankara-genel"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                Ankara Genel Rehberi
              </h3>
              <p className="text-gray-600 mb-4">
                Ankara'da güvenilir usta bulmanın püf noktaları ve genel rehber
              </p>
              <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                <span className="font-semibold">Oku</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/blog/ankara-ilceler"
              className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                Ankara İlçeleri Rehberi
              </h3>
              <p className="text-gray-600 mb-4">
                Her ilçenin kendine özgü ihtiyaçları ve uzman ustaları
              </p>
              <div className="flex items-center text-green-600 group-hover:text-green-700 transition-colors">
                <span className="font-semibold">Oku</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/blog/ankara-mevsimsel"
              className="group bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">🌤️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                Mevsimsel Rehber
              </h3>
              <p className="text-gray-600 mb-4">
                Her mevsimin kendine özgü usta hizmetleri ve bakım ihtiyaçları
              </p>
              <div className="flex items-center text-orange-600 group-hover:text-orange-700 transition-colors">
                <span className="font-semibold">Oku</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/blog/elektrik"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                Elektrik Rehberi
              </h3>
              <p className="text-gray-600 mb-4">
                Ankara'da elektrik ustası bulmanın püf noktaları ve güvenlik tavsiyeleri
              </p>
              <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                <span className="font-semibold">Oku</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/blog/su-tesisati"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">💧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                Su Tesisatı Rehberi
              </h3>
              <p className="text-gray-600 mb-4">
                Su kaçağı tespiti, tesisat tamiri ve kanalizasyon sorunları
              </p>
              <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                <span className="font-semibold">Oku</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/blog/temizlik"
              className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                Temizlik Rehberi
              </h3>
              <p className="text-gray-600 mb-4">
                Profesyonel temizlik hizmetleri ve ev temizliği ipuçları
              </p>
              <div className="flex items-center text-green-600 group-hover:text-green-700 transition-colors">
                <span className="font-semibold">Oku</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Son Blog Yazıları
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Güncel usta tavsiyeleri ve ev bakımı rehberleri
            </p>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Aradığınız kriterlere uygun blog yazısı bulunamadı.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                        {post.category}
                      </span>
                      <span className="ml-auto">{post.readTime} dk okuma</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.content}
                    </p>
                    
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <span>Devamını Oku</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Blog Güncellemelerini Kaçırmayın
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Yeni blog yazılarından haberdar olmak için e-posta listemize katılın
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center">
                <Mail className="w-4 h-4 mr-2" />
                Abone Ol
              </button>
            </div>
            
            <p className="text-sm text-blue-200 mt-4">
              Spam göndermiyoruz. Sadece önemli güncellemeler için e-posta alacaksınız.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog; 