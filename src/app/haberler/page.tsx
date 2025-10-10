'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ExternalLink, Filter, MapPin } from 'lucide-react'
import newsService, { NewsArticle } from '@/services/newsService'
import { useSEO } from '@/hooks/useSEO'
import { StructuredData } from '@/components/seo'

export default function HaberlerPage() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  // SEO optimizasyonu
  useSEO({
    title: 'Ankara Haberleri | Güncel Ankara Haberleri ve Gelişmeleri',
    description: 'Ankara\'dan güncel haberler, gelişmeler ve olaylar. Çankaya, Keçiören, Mamak ve diğer ilçelerden son dakika haberleri. Ankara usta haberleri.',
    keywords: ['ankara haberleri', 'ankara güncel haberler', 'çankaya haberleri', 'keçiören haberleri', 'mamak haberleri', 'ankara usta haberleri'],
    type: 'website'
  })

  useEffect(() => {
    loadNews()
    
    // Her 5 dakikada bir haberleri yenile
    const interval = setInterval(() => {
      loadNews()
    }, 300000) // 5 dakika

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Haberler otomatik olarak yüklendiğinde filteredNews'i güncelle
    setNews(news)
  }, [news])

  const loadNews = async () => {
    try {
      setLoading(true)
      const newsData = await newsService.getLatestNews(50)
      setNews(newsData)
      console.log('Haberler yenilendi:', newsData.length, 'haber yüklendi')
    } catch (error) {
      console.error('Error loading news:', error)
    } finally {
      setLoading(false)
    }
  }


  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'elektrik': 'bg-yellow-100 text-yellow-800',
      'tesisat': 'bg-blue-100 text-blue-800',
      'temizlik': 'bg-green-100 text-green-800',
      'mobilya': 'bg-brown-100 text-brown-800',
      'klima': 'bg-cyan-100 text-cyan-800',
      'inşaat': 'bg-orange-100 text-orange-800',
      'bahçe': 'bg-emerald-100 text-emerald-800',
      'boya': 'bg-purple-100 text-purple-800',
      'genel': 'bg-gray-100 text-gray-800'
    }
    return colors[category] || colors['genel']
  }

  return (
    <>
      <StructuredData
        type="website"
        data={{
          name: "Ankara Haberleri",
          description: "Ankara'dan güncel haberler, gelişmeler ve olaylar. Çankaya, Keçiören, Mamak ve diğer ilçelerden son dakika haberleri.",
          url: "https://ankaraustabul.com/haberler"
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Ankara Haberleri
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ankara'dan güncel haberler, gelişmeler ve olaylar. 
              Çankaya, Keçiören, Mamak ve diğer ilçelerden son dakika haberleri.
            </p>
          </motion.div>


          {/* Loading */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Haberler yükleniyor...</p>
            </div>
          )}

          {/* News Slider */}
          {!loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden"
            >
              <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
              {news.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  {article.imageUrl && (
                    <div className="h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Category */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                      {article.district && (
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {article.district}
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(article.publishedAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.source}
                      </div>
                    </div>

                    {/* Tags */}
                    {article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More */}
                    <a
                      href={article.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Devamını Oku
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </motion.article>
              ))}
              </div>
            </motion.div>
          )}

          {/* No Results */}
          {!loading && news.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Haber Bulunamadı
              </h3>
              <p className="text-gray-600">
                Şu anda Ankara haberleri yükleniyor. Lütfen biraz bekleyin.
              </p>
            </div>
          )}

          {/* Refresh Button */}
          <div className="text-center mt-8">
            <motion.button
              onClick={loadNews}
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:shadow-none"
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Yenileniyor...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Haberleri Yenile</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </>
  )
}
