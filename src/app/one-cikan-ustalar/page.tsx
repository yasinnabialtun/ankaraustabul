'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Phone, MessageCircle, MapPin, Clock, Award, Crown, TrendingUp, Users, CheckCircle } from 'lucide-react'

interface FeaturedUsta {
  id: string
  name: string
  category: string
  rating: number
  reviews: number
  location: string
  experience: string
  price: string
  description: string
  phone: string
  isAvailable: boolean
  responseTime: string
  isPremium: boolean
  isVerified: boolean
  monthlyBookings: number
  completionRate: number
  specialties: string[]
}

export default function OneCikanUstalarPage() {
  const [featuredUstalar, setFeaturedUstalar] = useState<FeaturedUsta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - gerçek uygulamada API'den gelecek
    const mockData: FeaturedUsta[] = [
      {
        id: "1",
        name: "Ahmet Yılmaz",
        category: "elektrik",
        rating: 4.9,
        reviews: 127,
        location: "Çankaya",
        experience: "15 yıl",
        price: "₺150/saat",
        description: "Profesyonel elektrik hizmetleri sunan deneyimli ustayım. Ev ve işyeri elektrik kurulumları, arıza giderme ve bakım hizmetleri veriyorum.",
        phone: "+90 532 123 45 67",
        isAvailable: true,
        responseTime: "1 saat",
        isPremium: true,
        isVerified: true,
        monthlyBookings: 45,
        completionRate: 98,
        specialties: ["Elektrik Tesisatı", "Aydınlatma", "Priz Montajı"]
      },
      {
        id: "2",
        name: "Mehmet Kaya",
        category: "su-tesisati",
        rating: 4.8,
        reviews: 98,
        location: "Keçiören",
        experience: "12 yıl",
        price: "₺120/saat",
        description: "Su tesisatı kurulumu, tamiri ve bakım hizmetleri konusunda uzmanım. Hızlı ve güvenilir hizmet sunuyorum.",
        phone: "+90 532 234 56 78",
        isAvailable: true,
        responseTime: "2 saat",
        isPremium: true,
        isVerified: true,
        monthlyBookings: 38,
        completionRate: 96,
        specialties: ["Su Tesisatı", "Kanal Açma", "Tesisat Tamiri"]
      },
      {
        id: "3",
        name: "Ayşe Demir",
        category: "temizlik",
        rating: 4.9,
        reviews: 156,
        location: "Yenimahalle",
        experience: "8 yıl",
        price: "₺80/saat",
        description: "Ev ve ofis temizliği, derinlemesine temizlik hizmetleri sunuyorum. Müşteri memnuniyeti önceliğimdir.",
        phone: "+90 532 345 67 89",
        isAvailable: false,
        responseTime: "3 saat",
        isPremium: false,
        isVerified: true,
        monthlyBookings: 52,
        completionRate: 99,
        specialties: ["Ev Temizliği", "Ofis Temizliği", "Derinlemesine Temizlik"]
      },
      {
        id: "4",
        name: "Ali Özkan",
        category: "mobilya",
        rating: 4.7,
        reviews: 89,
        location: "Mamak",
        experience: "20 yıl",
        price: "₺200/saat",
        description: "Mobilya montajı, tamiri ve özel tasarım hizmetleri veriyorum. Kaliteli işçilik ve zamanında teslimat garantisi.",
        phone: "+90 532 456 78 90",
        isAvailable: true,
        responseTime: "1 saat",
        isPremium: true,
        isVerified: true,
        monthlyBookings: 28,
        completionRate: 97,
        specialties: ["Mobilya Montajı", "Mobilya Tamiri", "Dolap Montajı"]
      },
      {
        id: "5",
        name: "Fatma Şahin",
        category: "tadilat",
        rating: 4.8,
        reviews: 112,
        location: "Sincan",
        experience: "10 yıl",
        price: "₺180/saat",
        description: "Ev tadilatı, boya badana ve dekorasyon hizmetleri sunuyorum. Modern teknikler ve kaliteli malzemeler kullanıyorum.",
        phone: "+90 532 567 89 01",
        isAvailable: true,
        responseTime: "2 saat",
        isPremium: false,
        isVerified: true,
        monthlyBookings: 35,
        completionRate: 95,
        specialties: ["Banyo Tadilat", "Mutfak Tadilat", "Oda Tadilat"]
      },
      {
        id: "6",
        name: "Mustafa Çelik",
        category: "klima",
        rating: 4.9,
        reviews: 134,
        location: "Etimesgut",
        experience: "18 yıl",
        price: "₺160/saat",
        description: "Klima kurulumu, bakımı ve tamiri hizmetleri veriyorum. Tüm marka klimalar için uzman hizmet.",
        phone: "+90 532 678 90 12",
        isAvailable: true,
        responseTime: "1 saat",
        isPremium: true,
        isVerified: true,
        monthlyBookings: 42,
        completionRate: 98,
        specialties: ["Klima Montaj", "Klima Bakım", "Klima Tamir"]
      }
    ]

    setTimeout(() => {
      setFeaturedUstalar(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  const handleCall = (phone: string, e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(`tel:${phone}`)
  }

  const handleMessage = (ustaId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const usta = featuredUstalar.find(u => u.id === ustaId)
    const message = `Merhaba ${usta?.name}, hizmetleriniz hakkında bilgi almak istiyorum.`
    window.open(`https://wa.me/905321234567?text=${encodeURIComponent(message)}`)
  }

  const getCategoryName = (category: string) => {
    const categories: { [key: string]: string } = {
      'elektrik': 'Elektrik',
      'su-tesisati': 'Su Tesisatı',
      'temizlik': 'Temizlik',
      'mobilya': 'Mobilya',
      'tadilat': 'Tadilat',
      'klima': 'Klima'
    }
    return categories[category] || category
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Öne çıkan ustalar yükleniyor...</p>
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
            <div className="flex items-center justify-center mb-4">
              <Crown className="w-8 h-8 text-yellow-500 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Öne Çıkan Ustalar</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              En iyi değerlendirilen, güvenilir ve profesyonel ustalarımızla tanışın
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">4.8+</div>
            <div className="text-sm text-gray-600">Ortalama Puan</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">98%</div>
            <div className="text-sm text-gray-600">Tamamlanma Oranı</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">500+</div>
            <div className="text-sm text-gray-600">Mutlu Müşteri</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">24/7</div>
            <div className="text-sm text-gray-600">Destek</div>
          </div>
        </motion.div>

        {/* Featured Ustalar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredUstalar.map((usta, index) => (
            <motion.div
              key={usta.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                {/* Premium Badge */}
                {usta.isPremium && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </div>
                  </div>
                )}

                {/* Verified Badge */}
                {usta.isVerified && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-green-500 text-white p-1 rounded-full">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  </div>
                )}

                <div className="relative p-8">
                  {/* Header */}
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      {usta.name.charAt(0)}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{usta.name}</h3>
                      <p className="text-blue-600 font-medium">{getCategoryName(usta.category)}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        {usta.location}
                      </div>
                    </div>
                  </div>

                  {/* Rating and Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(usta.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{usta.rating}</span>
                      <span className="text-sm text-gray-500">({usta.reviews})</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      usta.isAvailable 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {usta.isAvailable ? 'Müsait' : 'Meşgul'}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{usta.description}</p>

                  {/* Specialties */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {usta.specialties.slice(0, 2).map((specialty, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {specialty}
                        </span>
                      ))}
                      {usta.specialties.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{usta.specialties.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="text-xs text-gray-500 mb-1">Aylık İş</div>
                      <div className="font-semibold text-gray-900">{usta.monthlyBookings}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="text-xs text-gray-500 mb-1">Başarı Oranı</div>
                      <div className="font-semibold text-green-600">{usta.completionRate}%</div>
                    </div>
                  </div>

                  {/* Price and Response Time */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-lg font-bold text-green-600">{usta.price}</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {usta.responseTime} yanıt
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button 
                      className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                      onClick={(e) => handleCall(usta.phone, e)}
                    >
                      <Phone className="w-4 h-4" />
                      <span>Ara</span>
                    </button>
                    <button 
                      className="px-4 py-3 border border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                      onClick={(e) => handleMessage(usta.id, e)}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button 
                      className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors"
                      onClick={() => window.location.href = `/usta/${usta.id}`}
                    >
                      Detay
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Siz de Usta Olmak İster misiniz?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Platformumuza katılın ve binlerce müşteriye ulaşın. Profesyonel hizmet verin, gelirinizi artırın.
            </p>
            <button 
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              onClick={() => window.location.href = '/usta-ekle'}
            >
              Hemen Başvur
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}