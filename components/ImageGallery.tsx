'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Camera, Download, Share2, Heart } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  title?: string
  description?: string
  showActions?: boolean
}

const ImageGallery = ({ images, title, description, showActions = true }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const fallbackImages = {
    hero: '/api/placeholder/1200/600',
    category: '/api/placeholder/400/300',
    provider: '/api/placeholder/400/250',
    blog: '/api/placeholder/400/250',
    work: '/api/placeholder/400/300'
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = fallbackImages.category
  }

  return (
    <div className="space-y-4">
      {title && (
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          {description && (
            <p className="text-gray-600">{description}</p>
          )}
        </div>
      )}

      {/* Main Image */}
      <div className="relative group">
        <div className="aspect-video bg-gradient-to-br from-blue-400 to-orange-400 rounded-2xl overflow-hidden">
          <Image
            src={images[selectedImage] || fallbackImages.hero}
            alt={`${title || 'Görsel'} ${selectedImage + 1}`}
            width={800}
            height={450}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={handleImageError}
          />
        </div>

        {/* Image Actions */}
        {showActions && (
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700'
              } hover:scale-110 transition-all duration-300`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 rounded-full bg-white/90 text-gray-700 hover:scale-110 transition-all duration-300">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full bg-white/90 text-gray-700 hover:scale-110 transition-all duration-300">
              <Download className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                selectedImage === index
                  ? 'border-blue-500 scale-105'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={image || fallbackImages.category}
                alt={`Thumbnail ${index + 1}`}
                width={200}
                height={150}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery 