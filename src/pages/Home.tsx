import { Link } from 'react-router-dom';
import { Search, Star, MapPin, Phone } from 'lucide-react';
import { ustalar, kategoriler, blogPosts } from '../data';

function Home() {
  const featuredUstalar = ustalar.slice(0, 6);
  const featuredKategoriler = kategoriler.slice(0, 4);
  const featuredBlogPosts = blogPosts.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Ankara'da Güvenilir Usta Bul
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ev ve işyeri ihtiyaçlarınız için güvenilir, deneyimli ustalar ile tanışın.
            Hızlı, kaliteli ve uygun fiyatlı hizmet garantisi.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Ne tür bir usta arıyorsunuz?"
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kategoriler Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Hizmet Kategorileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredKategoriler.map((kategori) => (
              <Link
                key={kategori.id}
                to={`/kategori/${kategori.id}`}
                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{kategori.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{kategori.name}</h3>
                <p className="text-gray-600 text-sm">{kategori.description}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/kategoriler"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tüm Kategorileri Gör
            </Link>
          </div>
        </div>
      </section>

      {/* Öne Çıkan Ustalar Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Öne Çıkan Ustalar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredUstalar.map((usta) => (
              <div key={usta.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="text-4xl text-gray-400">👷</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{usta.name}</h3>
                  <p className="text-gray-600 mb-3">{usta.description}</p>
                  
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm">{usta.rating} ({usta.experience} yıl deneyim)</span>
                  </div>
                  
                  <div className="flex items-center mb-3 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{usta.location}</span>
                  </div>
                  
                  <div className="flex items-center mb-4 text-sm text-gray-500">
                    <Phone className="w-4 h-4 mr-1" />
                    <span>{usta.phone}</span>
                  </div>
                  
                  <Link
                    to={`/usta/${usta.id}`}
                    className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Detayları Gör
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/ustalar"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tüm Ustaları Gör
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBlogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="text-4xl text-gray-400">📝</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{post.author}</span>
                    <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Devamını Oku
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/blog"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tüm Blog Yazılarını Gör
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Usta mısınız?</h2>
          <p className="text-xl mb-8">
            Sitemize katılın ve müşterilerinizle buluşun.
          </p>
          <Link
            to="/usta-ekle"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Usta Olarak Kayıt Ol
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home; 