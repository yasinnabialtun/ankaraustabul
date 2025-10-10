'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ExternalLink, TrendingUp } from 'lucide-react'
import { NewsArticle } from '@/services/newsService'

interface NewsWidgetProps {
  limit?: number
  showTitle?: boolean
  className?: string
}

export default function NewsWidget({ 
  limit = 5, 
  showTitle = true, 
  className = '' 
}: NewsWidgetProps) {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/news')
        if (!response.ok) throw new Error('Failed to fetch news')
        const data = await response.json()
        setNews(data.news.slice(0, limit))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch news')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [limit])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('tr-TR', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  if (loading) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
        {showTitle && (
          <div className="flex items-center mb-6">
            <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Ankara Haberleri</h2>
          </div>
        )}
        <div className="space-y-4">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
        {showTitle && (
          <div className="flex items-center mb-6">
            <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Ankara Haberleri</h2>
          </div>
        )}
        <div className="text-center py-8">
          <p className="text-gray-500">Haberler yüklenirken bir hata oluştu</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      {showTitle && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Ankara Haberleri</h2>
          </div>
          <a
            href="/haberler"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Tümünü Gör
          </a>
        </div>
      )}

      {/* Horizontal Slider */}
      <div className="relative">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
          {news.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4">
                {/* Image */}
                {article.imageUrl && (
                  <div className="mb-3">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-40 rounded-lg object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-3 mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(article.publishedAt)}
                    </div>
                    <a
                      href={article.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-xs"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {news.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Henüz haber bulunmuyor</p>
        </div>
      )}
    </div>
  )
}
