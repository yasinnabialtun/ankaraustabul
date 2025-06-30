'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star, Eye, Calendar } from 'lucide-react'

interface WorkItem {
  id: string
  title: string
  description: string
  category: string
  beforeImage: string
  afterImage: string
  date: string
  rating: number
  views: number
  location: string
}

interface WorkGalleryProps {
  works: WorkItem[]
  title?: string
  showFilters?: boolean
}

const WorkGallery = ({ works, title = "Örnek İşler", showFilters = true }: WorkGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null)

  const categories = ['Tümü', 'Elektrik', 'Su Tesisatı', 'Temizlik', 'Nakliye', 'Bakım Onarım', 'Güvenlik']

  const filteredWorks = works.filter(work => 
    selectedCategory === 'Tümü' || work.category === selectedCategory
  )

  const fallbackImage = '/api/placeholder/400/300'

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = fallbackImage
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ustalarımızın gerçekleştirdiği örnek işler ve başarı hikayeleri. 
          Kaliteli hizmetin somut kanıtları.
        </p>
      </div>

      {/* Category Filters */}
      {showFilters && (
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
      )}

      {/* Work Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWorks.map((work, index) => (
          <div
            key={work.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
            onClick={() => setSelectedWork(work)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Before/After Images */}
            <div className="relative h-48 bg-gradient-to-br from-gray-400 to-gray-600">
              <div className="absolute inset-0 flex">
                {/* Before Image */}
                <div className="w-1/2 relative">
                  <Image
                    src={work.beforeImage || fallbackImage}
                    alt={`${work.title} - Öncesi`}
                    fill
                    className="object-cover"
                    onError={handleImageError}
                  />
                  <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                    ÖNCESİ
                  </div>
                </div>
                {/* After Image */}
                <div className="w-1/2 relative">
                  <Image
                    src={work.afterImage || fallbackImage}
                    alt={`${work.title} - Sonrası`}
                    fill
                    className="object-cover"
                    onError={handleImageError}
                  />
                  <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    SONRASI
                  </div>
                </div>
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {work.category}
                </span>
              </div>

              {/* Stats */}
              <div className="absolute top-4 right-4 flex items-center space-x-2 text-white text-sm">
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{work.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{work.rating}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-300">
                {work.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {work.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(work.date).toLocaleDateString('tr-TR')}</span>
                </div>
                <span className="text-blue-600 font-medium">{work.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Selected Work */}
      {selectedWork && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{selectedWork.title}</h3>
                <button
                  onClick={() => setSelectedWork(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Before/After Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Öncesi</h4>
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={selectedWork.beforeImage || fallbackImage}
                      alt={`${selectedWork.title} - Öncesi`}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Sonrası</h4>
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={selectedWork.afterImage || fallbackImage}
                      alt={`${selectedWork.title} - Sonrası`}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">{selectedWork.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-gray-600">Kategori</div>
                    <div className="font-semibold text-gray-900">{selectedWork.category}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-gray-600">Tarih</div>
                    <div className="font-semibold text-gray-900">
                      {new Date(selectedWork.date).toLocaleDateString('tr-TR')}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-gray-600">Puan</div>
                    <div className="font-semibold text-gray-900">{selectedWork.rating}/5</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-gray-600">Görüntülenme</div>
                    <div className="font-semibold text-gray-900">{selectedWork.views}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkGallery 