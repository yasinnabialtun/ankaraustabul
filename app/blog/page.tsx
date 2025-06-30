'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Calendar, Clock, User, Tag, ArrowRight, 
  Search, Filter, Eye, Heart, Share2,
  BookOpen, TrendingUp, Lightbulb, Tool,
  Home, Shield, Star, Users, Award
} from 'lucide-react'

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    'Tümü', 'Ev Tadilatı', 'Bakım İpuçları', 'Usta Seçimi', 
    'Güvenlik', 'Tasarruf', 'Teknoloji', 'Haberler'
  ]

  const blogPosts = [
    {
      id: 1,
      title: 'Ankara\'da Ev Tadilatı Yaparken Dikkat Edilmesi Gerekenler',
      excerpt: 'Ev tadilatı yaparken hangi adımları takip etmeli, hangi ustaları tercih etmeli ve bütçenizi nasıl planlamalısınız?',
      content: 'Ev tadilatı, hem zaman hem de para açısından büyük bir yatırımdır. Ankara\'da yaşayanlar için ev tadilatı yaparken dikkat edilmesi gereken önemli noktalar var...',
      author: 'Ahmet Yılmaz',
      authorAvatar: 'AY',
      date: '2024-01-15',
      readTime: '8 dk',
      category: 'Ev Tadilatı',
      tags: ['Tadilat', 'Ev', 'Ankara', 'Usta'],
      image: '/api/placeholder/400/250',
      views: 1247,
      likes: 89,
      featured: true
    },
    {
      id: 2,
      title: 'Elektrik Arızalarında Yapılması Gerekenler ve Güvenlik Önlemleri',
      excerpt: 'Elektrik arızaları durumunda nasıl davranmalı, hangi güvenlik önlemlerini almalı ve ne zaman profesyonel yardım istemelisiniz?',
      content: 'Elektrik arızaları, ev güvenliği açısından kritik öneme sahiptir. Bu yazıda elektrik arızalarında yapılması gerekenleri ve güvenlik önlemlerini detaylı olarak ele alacağız...',
      author: 'Mehmet Elektrik Ustası',
      authorAvatar: 'ME',
      date: '2024-01-12',
      readTime: '6 dk',
      category: 'Bakım İpuçları',
      tags: ['Elektrik', 'Güvenlik', 'Arıza', 'Bakım'],
      image: '/api/placeholder/400/250',
      views: 892,
      likes: 67,
      featured: false
    },
    {
      id: 3,
      title: 'Güvenilir Usta Seçerken Nelere Dikkat Etmelisiniz?',
      excerpt: 'Ankara\'da güvenilir usta bulurken hangi kriterleri değerlendirmeli ve nasıl doğru karar verebilirsiniz?',
      content: 'Güvenilir usta seçimi, ev işlerinizin kalitesini ve güvenliğini doğrudan etkiler. Bu rehberde size en uygun ustayı nasıl seçeceğinizi anlatıyoruz...',
      author: 'Fatma Kaya',
      authorAvatar: 'FK',
      date: '2024-01-10',
      readTime: '10 dk',
      category: 'Usta Seçimi',
      tags: ['Usta Seçimi', 'Güvenlik', 'Kalite', 'Referans'],
      image: '/api/placeholder/400/250',
      views: 1567,
      likes: 123,
      featured: true
    },
    {
      id: 4,
      title: 'Su Tesisatı Problemlerinde Erken Müdahalenin Önemi',
      excerpt: 'Su tesisatı problemlerinde erken müdahale nasıl büyük hasarları önler ve maliyetleri düşürür?',
      content: 'Su tesisatı problemleri, erken müdahale edilmediğinde büyük hasarlara ve yüksek maliyetlere yol açabilir. Bu yazıda erken müdahalenin önemini vurguluyoruz...',
      author: 'Ali Tesisat Ustası',
      authorAvatar: 'AT',
      date: '2024-01-08',
      readTime: '7 dk',
      category: 'Bakım İpuçları',
      tags: ['Su Tesisatı', 'Bakım', 'Erken Müdahale', 'Tasarruf'],
      image: '/api/placeholder/400/250',
      views: 734,
      likes: 45,
      featured: false
    },
    {
      id: 5,
      title: 'Ankara\'da Ev Güvenlik Sistemleri: Hangi Sistemi Seçmelisiniz?',
      excerpt: 'Ankara\'da ev güvenlik sistemleri seçerken dikkat edilmesi gereken kriterler ve öneriler.',
      content: 'Ev güvenliği, özellikle büyük şehirlerde kritik öneme sahiptir. Ankara\'da yaşayanlar için uygun güvenlik sistemi seçimi hakkında detaylı bilgi...',
      author: 'Güvenlik Uzmanı',
      authorAvatar: 'GU',
      date: '2024-01-05',
      readTime: '9 dk',
      category: 'Güvenlik',
      tags: ['Güvenlik', 'Sistem', 'Ankara', 'Ev'],
      image: '/api/placeholder/400/250',
      views: 1023,
      likes: 78,
      featured: false
    },
    {
      id: 6,
      title: 'Enerji Tasarrufu İçin Ev Bakım İpuçları',
      excerpt: 'Enerji faturalarınızı düşürmek için uygulayabileceğiniz pratik ev bakım ipuçları.',
      content: 'Enerji tasarrufu hem çevre hem de bütçe açısından önemlidir. Bu yazıda evinizde uygulayabileceğiniz enerji tasarrufu yöntemlerini paylaşıyoruz...',
      author: 'Enerji Uzmanı',
      authorAvatar: 'EU',
      date: '2024-01-03',
      readTime: '5 dk',
      category: 'Tasarruf',
      tags: ['Enerji', 'Tasarruf', 'Bakım', 'Fatura'],
      image: '/api/placeholder/400/250',
      views: 567,
      likes: 34,
      featured: false
    },
    {
      id: 7,
      title: 'Akıllı Ev Teknolojileri ve Usta Hizmetleri',
      excerpt: 'Akıllı ev teknolojilerinin yaygınlaşması ile usta hizmetlerinde yaşanan değişimler.',
      content: 'Teknoloji geliştikçe ev sistemleri de akıllanıyor. Bu değişim usta hizmetlerini nasıl etkiliyor? Akıllı ev teknolojileri hakkında detaylı bilgi...',
      author: 'Teknoloji Uzmanı',
      authorAvatar: 'TU',
      date: '2024-01-01',
      readTime: '8 dk',
      category: 'Teknoloji',
      tags: ['Teknoloji', 'Akıllı Ev', 'Usta', 'Sistem'],
      image: '/api/placeholder/400/250',
      views: 445,
      likes: 29,
      featured: false
    },
    {
      id: 8,
      title: 'Ankara Usta Bul Platformu: 2024 Yılı Hedefleri',
      excerpt: 'Ankara Usta Bul platformunun 2024 yılında gerçekleştirmeyi planladığı yenilikler ve hedefler.',
      content: 'Ankara Usta Bul olarak 2024 yılında platformumuzu daha da geliştirmeyi ve kullanıcılarımıza daha iyi hizmet vermeyi hedefliyoruz...',
      author: 'Ankara Usta Bul',
      authorAvatar: 'AU',
      date: '2023-12-30',
      readTime: '4 dk',
      category: 'Haberler',
      tags: ['Platform', 'Hedefler', '2024', 'Yenilikler'],
      image: '/api/placeholder/400/250',
      views: 2341,
      likes: 156,
      featured: true
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'Tümü' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-orange-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Ankara Usta Bul <span className="text-orange-300">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Ev bakımı, tadilat, usta seçimi ve daha fazlası hakkında uzman tavsiyeleri
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Blog yazılarında ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-0 focus:ring-2 focus:ring-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Categories Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === 'Tümü' && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Öne Çıkan Yazılar
              </span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-orange-400 relative">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-white text-sm">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {post.authorAvatar}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{post.author}</span>
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                      >
                        <span>Devamını Oku</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {selectedCategory === 'Tümü' ? 'Tüm Yazılar' : `${selectedCategory} Yazıları`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="h-40 bg-gradient-to-br from-gray-400 to-gray-600 relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center space-x-2 text-white text-xs">
                    <Eye className="w-3 h-3" />
                    <span>{post.views}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{post.likes}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {post.authorAvatar}
                      </div>
                      <span className="text-xs font-medium text-gray-700">{post.author}</span>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-300"
                    >
                      <span>Oku</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-3xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Blog Güncellemelerini Kaçırmayın</h3>
            <p className="text-blue-100 mb-6">
              En son blog yazılarımızı ve ev bakım ipuçlarını e-posta ile alın.
            </p>
            <div className="max-w-md mx-auto flex space-x-3">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:ring-2 focus:ring-white/20"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300">
                Abone Ol
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default BlogPage 