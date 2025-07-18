import { Link } from 'react-router-dom';
import { Search, Star, MapPin, Phone, ArrowRight, Users, Clock, Shield } from 'lucide-react';
import { ustalar, kategoriler, blogPosts } from '../data';

function Home() {
  const featuredUstalar = ustalar.slice(0, 6);
  const featuredKategoriler = kategoriler.slice(0, 4);
  const featuredBlogPosts = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-white opacity-5 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Ankara'da <span className="text-yellow-300">Güvenilir</span> Usta Bul
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Ev ve işyeri ihtiyaçlarınız için güvenilir, deneyimli ustalar ile tanışın.
            <br />Hızlı, kaliteli ve uygun fiyatlı hizmet garantisi.
          </p>
          
          <div className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Ne tür bir usta arıyorsunuz? (örn: elektrik, su tesisatı...)"
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Ara
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center">
              <Users className="w-6 h-6 mr-2" />
              <span className="text-lg">100+ Usta</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              <span className="text-lg">7/24 Hizmet</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              <span className="text-lg">Güvenli Ödeme</span>
            </div>
          </div>
        </div>
      </section>

      {/* Kategoriler Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Hizmet Kategorileri</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              İhtiyacınız olan her türlü hizmet için uzman ustalarımız hazır
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredKategoriler.map((kategori) => (
              <Link
                key={kategori.id}
                to={`/kategori/${kategori.id}`}
                className="group bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{kategori.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">{kategori.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{kategori.description}</p>
                <div className="flex items-center justify-center text-blue-600 font-semibold">
                  <span>{kategori.ustalar.length} usta</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/kategoriler"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Tüm Kategorileri Gör
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Öne Çıkan Ustalar Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Öne Çıkan Ustalar</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              En deneyimli ve güvenilir ustalarımızla tanışın
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredUstalar.map((usta) => (
              <div key={usta.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="h-56 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl text-blue-600 group-hover:scale-110 transition-transform duration-300">👷</div>
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                    {usta.rating} ⭐
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">{usta.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{usta.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-2" />
                      <span>{usta.rating} puan • {usta.experience} yıl deneyim</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{usta.location}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{usta.phone}</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/usta/${usta.id}`}
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Detayları Gör
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/ustalar"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Tüm Ustaları Gör
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Blog & Rehber</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ev bakımı ve tadilat konusunda faydalı bilgiler
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBlogPosts.map((post) => (
              <article key={post.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="h-56 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl text-green-600 group-hover:scale-110 transition-transform duration-300">📝</div>
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Blog
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{post.content}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                    <span className="font-semibold">{post.author}</span>
                    <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="block w-full bg-green-600 text-white text-center py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold"
                  >
                    Devamını Oku
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-colors text-lg font-semibold"
            >
              Tüm Blog Yazılarını Gör
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Usta mısınız?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Sitemize katılın ve müşterilerinizle buluşun. 
            <br />Binlerce potansiyel müşteri sizi bekliyor!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/usta-ekle"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              Usta Olarak Kayıt Ol
            </Link>
            <Link
              to="/ustalar"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg"
            >
              Usta Bul
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 