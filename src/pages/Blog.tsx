import { Calendar, Clock, User } from 'lucide-react';

function Blog() {
  const blogPosts = [
    {
      id: '1',
      title: 'Ev Temizliği İpuçları: Profesyonel Ustaların Önerileri',
      excerpt: 'Ev temizliğinde dikkat edilmesi gereken noktalar ve profesyonel ustaların önerileri...',
      author: 'Ankara Usta Bul',
      date: '2025-01-15',
      readTime: '5 dk',
      category: 'Temizlik',
      image: '/api/placeholder/400/250'
    },
    {
      id: '2',
      title: 'Elektrik Tesisatı Güvenliği: Dikkat Edilmesi Gerekenler',
      excerpt: 'Elektrik tesisatı güvenliği konusunda uzman ustalarımızın önemli tavsiyeleri...',
      author: 'Ankara Usta Bul',
      date: '2025-01-12',
      readTime: '7 dk',
      category: 'Elektrik',
      image: '/api/placeholder/400/250'
    },
    {
      id: '3',
      title: 'Su Tesisatı Problemleri ve Çözümleri',
      excerpt: 'Sık karşılaşılan su tesisatı problemleri ve bunların çözüm yöntemleri...',
      author: 'Ankara Usta Bul',
      date: '2025-01-10',
      readTime: '6 dk',
      category: 'Su Tesisatı',
      image: '/api/placeholder/400/250'
    },
    {
      id: '4',
      title: 'Mobilya Montajında Dikkat Edilmesi Gerekenler',
      excerpt: 'Mobilya montajı sırasında dikkat edilmesi gereken önemli noktalar...',
      author: 'Ankara Usta Bul',
      date: '2025-01-08',
      readTime: '4 dk',
      category: 'Mobilya',
      image: '/api/placeholder/400/250'
    },
    {
      id: '5',
      title: 'Boya Seçimi ve Uygulama Teknikleri',
      excerpt: 'Doğru boya seçimi ve profesyonel uygulama teknikleri hakkında detaylı bilgi...',
      author: 'Ankara Usta Bul',
      date: '2025-01-05',
      readTime: '8 dk',
      category: 'Boya & Badana',
      image: '/api/placeholder/400/250'
    },
    {
      id: '6',
      title: 'Tadilat Projelerinde Planlama ve Bütçe',
      excerpt: 'Tadilat projelerinde başarılı sonuçlar için planlama ve bütçe yönetimi...',
      author: 'Ankara Usta Bul',
      date: '2025-01-03',
      readTime: '10 dk',
      category: 'İnşaat & Tadilat',
      image: '/api/placeholder/400/250'
    },
  ];

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Blog & Makaleler
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ustalarımızdan profesyonel ipuçları, ev bakım rehberleri ve sektör haberleri
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Blog Görseli</span>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {post.category}
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Devamını Oku →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Güncel Kalın
            </h2>
            <p className="text-gray-600 mb-6">
              En son blog yazılarımızı ve ustalarımızdan gelen ipuçlarını e-posta ile alın.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Abone Ol
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog; 