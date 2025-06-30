'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Star, Phone, MapPin, Clock, Shield, 
  Award, Users, CheckCircle, ArrowRight,
  Zap, Droplets, Sparkles, Truck, Wrench
} from 'lucide-react'

const FeaturedProviders = () => {
  const [hoveredProvider, setHoveredProvider] = useState<string | null>(null)

  const featuredProviders = [
    {
      id: 'elektrik-1',
      name: 'Ahmet Usta Elektrik',
      category: 'Elektrik',
      categoryIcon: Zap,
      district: 'Çankaya',
      rating: 4.8,
      reviewCount: 127,
      experience: '15 yıl',
      phone: '+90 532 123 45 67',
      description: '15 yıllık deneyimimle Ankara\'nın en güvenilir elektrik ustalarından biriyim. Ev, ofis, işyeri elektrik tesisatı, arıza giderme, yeni tesisat kurulumu gibi tüm elektrik işlerinizde hizmet veriyorum.',
      services: ['Elektrik tesisatı kurulumu', 'Arıza giderme ve onarım', 'Aydınlatma sistemleri'],
      priceRange: '150-500 TL',
      responseTime: '2 saat',
      verified: true,
      featured: true,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'su-tesisati-1',
      name: 'Ali Tesisat Ustası',
      category: 'Su Tesisatı',
      categoryIcon: Droplets,
      district: 'Mamak',
      rating: 4.7,
      reviewCount: 156,
      experience: '18 yıl',
      phone: '+90 534 345 67 89',
      description: '18 yıllık deneyimimle su tesisatı konusunda uzmanım. Tıkanıklık açma, su kaçağı tespiti, yeni tesisat kurulumu gibi tüm işlerinizde hizmet veriyorum.',
      services: ['Su tesisatı kurulumu', 'Tıkanıklık açma', 'Su kaçağı tespiti'],
      priceRange: '100-400 TL',
      responseTime: '1.5 saat',
      verified: true,
      featured: true,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'temizlik-1',
      name: 'Güvenilir Temizlik',
      category: 'Temizlik',
      categoryIcon: Sparkles,
      district: 'Yenimahalle',
      rating: 4.5,
      reviewCount: 234,
      experience: '8 yıl',
      phone: '+90 535 456 78 90',
      description: '8 yıllık deneyimimizle ev, ofis, işyeri temizliği konusunda profesyonel hizmet veriyoruz. Güvenilir ve kaliteli temizlik için bizi tercih edin.',
      services: ['Ev temizliği', 'Ofis temizliği', 'Halı yıkama'],
      priceRange: '80-300 TL',
      responseTime: '3 saat',
      verified: true,
      featured: false,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'nakliye-1',
      name: 'Hızlı Nakliyat',
      category: 'Nakliye',
      categoryIcon: Truck,
      district: 'Etimesgut',
      rating: 4.4,
      reviewCount: 167,
      experience: '10 yıl',
      phone: '+90 536 567 89 01',
      description: '10 yıllık deneyimimizle evden eve nakliyat, ofis taşıma, eşya taşıma hizmetleri veriyoruz. Güvenli ve hızlı taşımacılık için bizi tercih edin.',
      services: ['Evden eve nakliyat', 'Ofis taşıma', 'Eşya taşıma'],
      priceRange: '500-2000 TL',
      responseTime: '24 saat',
      verified: true,
      featured: true,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'bakim-onarim-1',
      name: 'Uzman Tamirci',
      category: 'Bakım Onarım',
      categoryIcon: Wrench,
      district: 'Altındağ',
      rating: 4.6,
      reviewCount: 198,
      experience: '20 yıl',
      phone: '+90 537 678 90 12',
      description: '20 yıllık deneyimimle genel tamirat, tadilat, boya badana gibi tüm işlerinizde hizmet veriyorum. Kaliteli ve uygun fiyatlı hizmet garantisi.',
      services: ['Genel tamirat', 'Tadilat', 'Boya badana'],
      priceRange: '200-800 TL',
      responseTime: '2 saat',
      verified: true,
      featured: false,
      color: 'from-red-400 to-pink-500'
    },
    {
      id: 'guvenlik-1',
      name: 'Güvenlik Sistemleri Ankara',
      category: 'Güvenlik',
      categoryIcon: Shield,
      district: 'Çankaya',
      rating: 4.8,
      reviewCount: 89,
      experience: '12 yıl',
      phone: '+90 538 789 01 23',
      description: '12 yıllık deneyimimizle güvenlik sistemleri kurulumu, kamera sistemleri, alarm sistemleri konusunda uzmanız. Güvenliğiniz için profesyonel çözümler.',
      services: ['Güvenlik kamera sistemi', 'Alarm sistemi kurulumu', 'Güvenlik görevlisi'],
      priceRange: '300-1500 TL',
      responseTime: '4 saat',
      verified: true,
      featured: true,
      color: 'from-purple-400 to-indigo-500'
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Öne Çıkan Ustalar
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ankara'nın en güvenilir ve deneyimli ustaları ile tanışın. Doğrulanmış profiller, gerçek müşteri yorumları ve kalite garantisi.
          </p>
        </div>

        {/* Featured Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProviders.map((provider, index) => {
            const CategoryIcon = provider.categoryIcon
            return (
              <div
                key={provider.id}
                className={`provider-card group relative overflow-hidden transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredProvider(provider.id)}
                onMouseLeave={() => setHoveredProvider(null)}
              >
                {/* Card Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${provider.color} rounded-xl flex items-center justify-center`}>
                        <CategoryIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {provider.name}
                        </h3>
                        <p className="text-sm text-gray-600">{provider.category}</p>
                      </div>
                    </div>
                    {provider.verified && (
                      <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        <Shield className="w-3 h-3" />
                        <span>Doğrulanmış</span>
                      </div>
                    )}
                  </div>

                  {/* Rating and Reviews */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(provider.rating)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{provider.rating}</span>
                      <span className="text-sm text-gray-500">({provider.reviewCount} yorum)</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Award className="w-4 h-4" />
                      <span>{provider.experience}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {provider.description}
                  </p>

                  {/* Services */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Hizmetler:</h4>
                    <div className="space-y-1">
                      {provider.services.map((service, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Fiyat Aralığı</div>
                      <div className="font-semibold text-gray-900">{provider.priceRange}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Yanıt Süresi</div>
                      <div className="font-semibold text-gray-900">{provider.responseTime}</div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{provider.district}, Ankara</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{provider.phone}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      href={`/usta/${provider.id}`}
                      className="flex-1 btn-primary flex items-center justify-center space-x-2 text-sm"
                    >
                      <span>Detayları Gör</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={`tel:${provider.phone}`}
                      className="flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-300"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${provider.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Daha Fazla Usta Keşfedin</h3>
            <p className="text-blue-100 mb-6">
              2,500+ doğrulanmış usta ve firma arasından size en uygun olanını bulun.
            </p>
            <Link
              href="/kategoriler"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              <span>Tüm Ustaları Gör</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export { FeaturedProviders }

export default FeaturedProviders; 