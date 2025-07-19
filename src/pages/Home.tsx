import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Star, MapPin, Clock, ArrowRight, CheckCircle, Users, Award, Shield, Search, Phone, Mail, ArrowDown, Filter } from 'lucide-react';
import { ustalar, kategoriler, blogPosts } from '../data';
import { useSEO } from '../hooks/useSEO';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: 'Ankara Usta Bul - Güvenilir Usta Arama Platformu',
    description: 'Ankara\'da güvenilir ve kaliteli usta hizmetleri. Elektrik, su tesisatı, temizlik, mobilya ve daha fazlası için uzman ustalar.',
    keywords: 'ankara usta, elektrik ustası, su tesisatı, temizlik, mobilya, güvenilir usta',
    type: 'website'
  });

  const featuredUstalar = ustalar.slice(0, 6);
  const recentBlogPosts = blogPosts.slice(0, 3);



  // Location suggestions
  const locationSuggestions = [
    'Çankaya',
    'Keçiören',
    'Yenimahalle',
    'Mamak',
    'Etimesgut',
    'Sincan',
    'Polatlı',
    'Gölbaşı'
  ];



  const handleSearch = () => {
    // Show success toast
    if ((window as any).showToast) {
      const searchText = selectedCategory || selectedLocation || 'usta';
      (window as any).showToast({
        type: 'success',
        title: 'Arama başlatıldı',
        message: `${selectedCategory ? selectedCategory + ' ' : ''}${selectedLocation ? selectedLocation + ' ' : ''}ustalar aranıyor...`
      });
    }
    
    // Navigate to search results
    const searchParams = new URLSearchParams();
    if (selectedCategory) searchParams.set('category', selectedCategory);
    if (selectedLocation) searchParams.set('location', selectedLocation);
    
    window.location.href = `/ustalar?${searchParams.toString()}`;
  };



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Ankara'da Güvenilir Usta Bulun
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed animate-fade-in-delay">
              Evinizdeki her iş için profesyonel ustalar. 
              Elektrik, su tesisatı, temizlik, mobilya ve daha fazlası.
            </p>
            
            {/* Enhanced Search Bar - Only Dropdowns */}
            <div className="max-w-4xl mx-auto animate-fade-in-delay-2" ref={searchRef}>
              <div className="relative">
                {/* Search Options Container */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                    {/* Service Category Filter */}
                    <div className="relative flex-1 min-w-0">
                      <label className="block text-white text-sm font-medium mb-2">
                        Hizmet Kategorisi
                      </label>
                      <div className="relative">
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full appearance-none bg-white text-gray-900 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg shadow-sm transition-all duration-300 hover:shadow-md"
                        >
                          <option value="">Hizmet seçiniz</option>
                          {kategoriler.map(kategori => (
                            <option key={kategori.id} value={kategori.name} className="text-gray-900">
                              {kategori.icon} {kategori.name}
                            </option>
                          ))}
                        </select>
                        <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Location Filter */}
                    <div className="relative flex-1 min-w-0">
                      <label className="block text-white text-sm font-medium mb-2">
                        İlçe Seçimi
                      </label>
                      <div className="relative">
                        <select
                          value={selectedLocation}
                          onChange={(e) => setSelectedLocation(e.target.value)}
                          className="w-full appearance-none bg-white text-gray-900 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg shadow-sm transition-all duration-300 hover:shadow-md"
                        >
                          <option value="">İlçe seçiniz</option>
                          {locationSuggestions.map(location => (
                            <option key={location} value={location} className="text-gray-900">
                              📍 {location}
                            </option>
                          ))}
                        </select>
                        <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Search Button */}
                    <div className="flex-shrink-0">
                      <label className="block text-white text-sm font-medium mb-2">
                        &nbsp;
                      </label>
                      <button 
                        onClick={() => handleSearch()}
                        disabled={!selectedCategory && !selectedLocation}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 font-semibold text-lg shadow-lg hover:shadow-xl"
                      >
                        <Search className="w-5 h-5 inline mr-2" />
                        Usta Ara
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Category Buttons */}
                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  {kategoriler.slice(0, 6).map(kategori => (
                    <button
                      key={kategori.id}
                      onClick={() => {
                        setSelectedCategory(kategori.name);
                        handleSearch();
                      }}
                      className="bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg px-4 py-2 hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                    >
                      <span className="text-lg">{kategori.icon}</span>
                      <span className="font-medium">{kategori.name}</span>
                    </button>
                  ))}
                </div>

                {/* Search Tips */}
                <div className="mt-4 text-center">
                  <p className="text-blue-100 text-sm">
                    💡 İpucu: Hizmet kategorisi ve ilçe seçerek size en uygun ustaları bulabilirsiniz
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fade-in-delay-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200 mb-2">{ustalar.length}+</div>
                <div className="text-blue-100">Güvenilir Usta</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200 mb-2">1000+</div>
                <div className="text-blue-100">Tamamlanan İş</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200 mb-2">4.8</div>
                <div className="text-blue-100">Ortalama Puan</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white" />
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-gray-50" aria-labelledby="kategoriler-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="kategoriler-heading" className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Hizmet Kategorileri
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              İhtiyacınız olan hizmeti seçin ve güvenilir ustalarımızla tanışın
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {kategoriler.slice(0, 8).map((kategori, index) => (
              <Link
                key={kategori.id}
                to={`/kategori/${kategori.id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
                aria-label={`${kategori.name} kategorisi`}
              >
                <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
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
                  
                  <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                    <span className="font-semibold text-sm">Ustaları Gör</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/kategoriler"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              aria-label="Tüm kategorileri görüntüle"
            >
              Tüm Kategorileri Gör
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Ustalar */}
      <section className="py-20 bg-white" aria-labelledby="ustalar-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="ustalar-heading" className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Öne Çıkan Ustalar
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              En çok tercih edilen ve yüksek puanlı ustalarımız
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredUstalar.map((usta, index) => (
              <Link
                key={usta.id}
                to={`/usta/${usta.id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
                aria-label={`${usta.name} usta profili`}
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={usta.image}
                    alt={usta.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {usta.rating}
                  </div>
                  {usta.verified && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Doğrulanmış
                    </div>
                  )}
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
          
          <div className="text-center mt-12">
            <Link
              to="/ustalar"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              aria-label="Tüm ustaları görüntüle"
            >
              Tüm Ustaları Gör
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50" aria-labelledby="ozellikler-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="ozellikler-heading" className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Neden Ankara Usta Bul?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Güvenilir, kaliteli ve hızlı hizmet için doğru adres
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Güvenilir Ustalar</h3>
              <p className="text-gray-600">Tüm ustalarımız doğrulanmış ve referanslıdır</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Kaliteli Hizmet</h3>
              <p className="text-gray-600">Profesyonel işçilik ve kaliteli malzeme garantisi</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-200 transition-colors">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Uygun Fiyat</h3>
              <p className="text-gray-600">Rekabetçi fiyatlar ve şeffaf ücretlendirme</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">7/24 Destek</h3>
              <p className="text-gray-600">Acil durumlar için 7/24 müşteri desteği</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-20 bg-white" aria-labelledby="blog-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="blog-heading" className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Son Blog Yazıları
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ev bakımı ve usta tavsiyeleri hakkında güncel bilgiler
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentBlogPosts.map((post, index) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
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
          
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Tüm Blog Yazıları
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Hemen Usta Bulun
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Ankara'da güvenilir ustalar ile tanışın. Hızlı, kaliteli ve uygun fiyatlı hizmet için hemen iletişime geçin.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/ustalar"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-lg flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                aria-label="Usta ara"
              >
                <Search className="w-5 h-5 mr-2" />
                Usta Ara
              </Link>
              <Link
                to="/usta-ekle"
                className="bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-400 transition-all duration-300 font-semibold text-lg flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                aria-label="Usta kayıt sayfasına git"
              >
                <Users className="w-5 h-5 mr-2" />
                Usta Ol
              </Link>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="w-6 h-6" />
                <span>+90 312 123 4567</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-6 h-6" />
                <span>info@ankaraustabul.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="w-6 h-6" />
                <span>Ankara, Türkiye</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 