'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Zap, Crown, Shield, Clock, Users } from 'lucide-react'
import { shopierProductService } from '@/services/shopierProductService'

interface PackageSelectorProps {
  onPackageSelect: (packageId: string, price: number) => void
  selectedPackage?: string
}

export default function PackageSelector({ onPackageSelect, selectedPackage }: PackageSelectorProps) {
  const [selected, setSelected] = useState(selectedPackage || 'temel-usta')

  const packages = [
    {
      id: 'temel-usta',
      name: 'Temel Usta Kaydı',
      price: 99,
      originalPrice: 149,
      description: 'Standart konumda görünme',
      features: [
        'Temel usta profili',
        'İletişim bilgileri',
        'Hizmet kategorileri',
        'Müşteri yorumları',
        '1 yıl geçerlilik'
      ],
      icon: Users,
      color: 'blue',
      popular: false
    },
    {
      id: 'premium-usta',
      name: 'Öne Çıkan Usta Kaydı',
      price: 299,
      originalPrice: 399,
      description: 'Öne çıkan konumda görünme',
      features: [
        'Premium usta profili',
        'Öne çıkan konumda görünme',
        'Gelişmiş arama filtreleri',
        'Öncelikli destek',
        'Detaylı istatistikler',
        '2 yıl geçerlilik',
        'Sınırsız güncelleme'
      ],
      icon: Crown,
      color: 'purple',
      popular: true
    }
  ]

  const handleSelect = (packageId: string, price: number) => {
    setSelected(packageId)
    onPackageSelect(packageId, price)
  }

  const getColorClasses = (color: string, isSelected: boolean) => {
    const baseClasses = 'border-2 rounded-2xl p-6 transition-all duration-300 cursor-pointer'
    
    if (isSelected) {
      switch (color) {
        case 'blue':
          return `${baseClasses} border-blue-500 bg-blue-50 shadow-lg`
        case 'purple':
          return `${baseClasses} border-purple-500 bg-purple-50 shadow-lg`
        default:
          return `${baseClasses} border-gray-500 bg-gray-50 shadow-lg`
      }
    } else {
      return `${baseClasses} border-gray-200 bg-white hover:border-gray-300 hover:shadow-md`
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Paket Seçimi</h2>
        <p className="text-gray-600">İhtiyacınıza uygun paketi seçin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg, index) => {
          const Icon = pkg.icon
          const isSelected = selected === pkg.id
          
          return (
            <motion.div
              key={pkg.id}
              className={getColorClasses(pkg.color, isSelected)}
              onClick={() => handleSelect(pkg.id, pkg.price)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Öne Çıkan
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isSelected 
                    ? (pkg.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100')
                    : 'bg-gray-100'
                }`}>
                  <Icon className={`w-8 h-8 ${
                    isSelected 
                      ? (pkg.color === 'blue' ? 'text-blue-600' : 'text-purple-600')
                      : 'text-gray-600'
                  }`} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-gray-600 text-sm">{pkg.description}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">₺{pkg.price}</span>
                  <span className="text-lg text-gray-500 line-through">₺{pkg.originalPrice}</span>
                </div>
                <div className="text-sm text-green-600 font-semibold">
                  %{Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)} İndirim
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {pkg.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (index * 0.1) + (featureIndex * 0.05) }}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      isSelected 
                        ? (pkg.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500')
                        : 'bg-gray-400'
                    }`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Select Button */}
              <motion.button
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  isSelected
                    ? (pkg.color === 'blue' 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'bg-purple-600 text-white shadow-lg')
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSelected ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Check className="w-4 h-4" />
                    <span>Seçildi</span>
                  </div>
                ) : (
                  'Seç'
                )}
              </motion.button>
            </motion.div>
          )
        })}
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Güvenli Ödeme</h4>
            <p className="text-sm text-blue-700">
              Tüm ödemeler Shopier güvenli ödeme sistemi ile işlenir. 
              Kart bilgileriniz saklanmaz ve 256-bit SSL şifreleme ile korunur.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
