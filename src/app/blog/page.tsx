'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, User, Clock, ArrowRight, Search, Filter, Tag } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
  image: string
  featured: boolean
}

export default function BlogPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)
  
  const handlePostClick = (postId: string) => {
    // Blog detay sayfasına yönlendir (eğer varsa)
    // Şimdilik sadece console'a yazdırıyoruz
    router.push(`/blog/${postId}`)
  }

  useEffect(() => {
    // Mock data - gerçek uygulamada API'den gelecek
    const mockPosts: BlogPost[] = [
      {
        id: "1",
        title: "Ev Tadilatında Dikkat Edilmesi Gerekenler",
        excerpt: "Ev tadilatı yaparken dikkat edilmesi gereken önemli noktalar ve profesyonel tavsiyeler.",
        content: "Ev tadilatı yaparken...",
        author: "Ahmet Yılmaz",
        date: "2024-01-15",
        readTime: "5 dk",
        category: "Tadilat",
        tags: ["ev tadilatı", "renovasyon", "ipuçları"],
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true
      },
      {
        id: "2",
        title: "Elektrik Tesisatı Güvenlik Önlemleri",
        excerpt: "Elektrik tesisatında güvenlik için alınması gereken önlemler ve dikkat edilmesi gerekenler.",
        content: "Elektrik güvenliği...",
        author: "Mehmet Kaya",
        date: "2024-01-12",
        readTime: "7 dk",
        category: "Elektrik",
        tags: ["elektrik", "güvenlik", "tesisat"],
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: false
      },
      {
        id: "3",
        title: "Su Tesisatı Bakımı ve Korunması",
        excerpt: "Su tesisatınızın uzun ömürlü olması için düzenli bakım ve koruma yöntemleri.",
        content: "Su tesisatı bakımı...",
        author: "Ayşe Demir",
        date: "2024-01-10",
        readTime: "6 dk",
        category: "Su Tesisatı",
        tags: ["su tesisatı", "bakım", "koruma"],
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: false
      },
      {
        id: "4",
        title: "Klima Bakımı ve Enerji Tasarrufu",
        excerpt: "Klima bakımı yaparak enerji tasarrufu sağlama yöntemleri ve düzenli bakım programı.",
        content: "Klima bakımı...",
        author: "Mustafa Çelik",
        date: "2024-01-08",
        readTime: "4 dk",
        category: "Klima",
        tags: ["klima", "bakım", "enerji tasarrufu"],
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true
      },
      {
        id: "5",
        title: "Mobilya Montajında Profesyonel İpuçları",
        excerpt: "Mobilya montajında dikkat edilmesi gereken noktalar ve profesyonel montaj teknikleri.",
        content: "Mobilya montajı...",
        author: "Ali Özkan",
        date: "2024-01-05",
        readTime: "8 dk",
        category: "Mobilya",
        tags: ["mobilya", "montaj", "ipuçları"],
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: false
      },
      {
        id: "6",
        title: "Temizlik Hizmetlerinde Kalite Standartları",
        excerpt: "Profesyonel temizlik hizmetlerinde kalite standartları ve müşteri memnuniyeti.",
        content: "Temizlik kalitesi...",
        author: "Fatma Şahin",
        date: "2024-01-03",
        readTime: "5 dk",
        category: "Temizlik",
        tags: ["temizlik", "kalite", "standartlar"],
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: false
      }
    ]

    setTimeout(() => {
      setPosts(mockPosts)
      setFilteredPosts(mockPosts)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    setFilteredPosts(filtered)
  }, [searchTerm, selectedCategory, posts])

  const categories = ['Tümü', 'Tadilat', 'Elektrik', 'Su Tesisatı', 'Klima', 'Mobilya', 'Temizlik']
  const featuredPosts = posts.filter(post => post.featured)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Blog yazıları yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ustalarımızdan profesyonel ipuçları, rehberler ve sektör haberleri
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Blog yazılarında ara..."
                className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-12 pl-10 pr-8 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category === 'Tümü' ? '' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Öne Çıkan Yazılar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePostClick(post.id)}
                >
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Öne Çıkan
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString('tr-TR')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePostClick(post.id)
                        }}
                        className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <span className="mr-1">Devamını Oku</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tüm Yazılar</h2>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Yazı bulunamadı</h3>
              <p className="text-gray-500">Arama kriterlerinizi değiştirerek tekrar deneyin</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePostClick(post.id)}
                >
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePostClick(post.id)
                        }}
                        className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <span className="mr-1">Oku</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Blog Güncellemelerini Kaçırmayın</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Yeni blog yazılarımızdan haberdar olmak için e-posta listemize katılın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 h-12 px-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Abone Ol
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

