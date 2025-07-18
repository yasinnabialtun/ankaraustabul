import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Tag, ArrowRight, Clock, Eye } from 'lucide-react';
import { blogYazilari, blogKategorileri } from '../data';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'popularity' | 'title'>('date');

  // Filtreleme ve sıralama
  const filteredBlogs = blogYazilari
    .filter(blog => {
      const matchesSearch = blog.baslik.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.ozet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.etiketler.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = !selectedCategory || blog.kategori === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.tarih).getTime() - new Date(a.tarih).getTime();
        case 'popularity':
          return b.goruntulenme - a.goruntulenme;
        case 'title':
          return a.baslik.localeCompare(b.baslik, 'tr');
        default:
          return 0;
      }
    });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ankara <span className="gradient-text">Usta Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ev ve işyeri bakımı, onarım ve hizmetler hakkında uzman tavsiyeleri, 
            ipuçları ve güncel bilgiler
          </p>
        </div>

        {/* Arama ve Filtreler */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Arama */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Blog yazısı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Kategori Filtresi */}
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                <option value="">Tüm Kategoriler</option>
                {blogKategorileri.map((kategori) => (
                  <option key={kategori.id} value={kategori.ad}>
                    {kategori.ad}
                  </option>
                ))}
              </select>
            </div>

            {/* Sıralama */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'popularity' | 'title')}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                <option value="date">Tarihe Göre</option>
                <option value="popularity">Popülerliğe Göre</option>
                <option value="title">Alfabetik Sıra</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sonuç Sayısı */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold">{filteredBlogs.length}</span> blog yazısı bulundu
          </p>
        </div>

        {/* Blog Yazıları Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article key={blog.id} className="business-card hover-lift overflow-hidden">
                {/* Blog Resmi */}
                <div className="aspect-video overflow-hidden">
                  <img
                    src={blog.resim}
                    alt={blog.baslik}
                    className="w-full h-full object-cover image-hover"
                  />
                </div>

                {/* Blog İçeriği */}
                <div className="p-6">
                  {/* Kategori */}
                  <div className="mb-3">
                    <span className="badge badge-primary">{blog.kategori}</span>
                  </div>

                  {/* Başlık */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    <Link to={`/blog/${blog.slug}`} className="hover:text-primary-600 transition-colors">
                      {blog.baslik}
                    </Link>
                  </h2>

                  {/* Özet */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.ozet}
                  </p>

                  {/* Meta Bilgiler */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{formatDate(blog.tarih)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye size={16} />
                        <span>{blog.goruntulenme.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{blog.okumaSuresi} dk</span>
                    </div>
                  </div>

                  {/* Etiketler */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.etiketler.slice(0, 3).map((etiket, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {etiket}
                      </span>
                    ))}
                    {blog.etiketler.length > 3 && (
                      <span className="text-xs text-gray-400">+{blog.etiketler.length - 3}</span>
                    )}
                  </div>

                  {/* Devamını Oku */}
                  <Link 
                    to={`/blog/${blog.slug}`}
                    className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    <span>Devamını Oku</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Blog Yazısı Bulunamadı
            </h3>
            <p className="text-gray-600 mb-6">
              Aradığınız kriterlere uygun blog yazısı bulunamadı. 
              Lütfen farklı arama terimleri deneyin.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSortBy('date');
              }}
              className="btn-primary"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}

        {/* Popüler Kategoriler */}
        <section className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Popüler <span className="gradient-text">Blog Kategorileri</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {blogKategorileri.map((kategori) => (
              <Link
                key={kategori.id}
                to={`/blog?kategori=${kategori.ad}`}
                onClick={() => setSelectedCategory(kategori.ad)}
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Tag className="text-primary-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{kategori.ad}</h3>
                <p className="text-sm text-gray-600">{kategori.yaziSayisi} yazı</p>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO İçeriği */}
        <section className="mt-16 bg-gray-900 text-white rounded-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Ankara'da <span className="text-yellow-300">Usta Bulma</span> Rehberi
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Ev ve işyeri bakımı, onarım ve hizmetler hakkında kapsamlı bilgiler, 
              uzman tavsiyeleri ve güncel ipuçları
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-2">100+</div>
              <div className="text-gray-300">Uzman Makale</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-2">15</div>
              <div className="text-gray-300">Hizmet Kategorisi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-2">50K+</div>
              <div className="text-gray-300">Aylık Okuyucu</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog; 