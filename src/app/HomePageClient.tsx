'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight, Star, Users, Award, Clock, Zap, Droplets, Sparkles, Home, Hammer, Snowflake } from 'lucide-react'
import { motion } from 'framer-motion'
import CategoryCards from '@/components/ui/CategoryCards'
import { useSEO } from '@/hooks/useSEO'
import { NewsWidget } from '@/components/news'

export default function HomePageClient() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  // SEO optimization - "ankara usta" focused
  useSEO({
    title: 'Ankara Usta | En İyi Ustalar ve Hizmet Sağlayıcıları 2025',
    description: "Ankara usta arama platformu. Elektrik, su tesisatı, temizlik, mobilya, tadilat ve daha fazlası için güvenilir ankara usta bulun. 500+ kayıtlı usta, 25 ilçe, 7/24 hizmet.",
    keywords: [
      'ankara usta',
      'ankara ustalar',
      'ankara elektrik ustası',
      'ankara su tesisatı ustası',
      'ankara temizlik',
      'ankara mobilya ustası',
      'ankara tadilat ustası',
      'ankara klima servisi',
      'ankara boya badana',
      'ankara bahçe peyzaj',
      'ankara inşaat tadilat',
      'usta ara ankara',
      'güvenilir usta ankara',
      'profesyonel usta ankara',
      'ankara usta bul',
      'ankara usta arama',
      'ankara usta tavsiye'
    ],
    type: 'website'
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/ustalar?search=${encodeURIComponent(searchTerm)}`)
    } else {
      router.push('/ustalar')
    }
  }

  const handleUstaClick = (ustaId: string) => {
    router.push(`/usta/${ustaId}`)
  }

  const handleCategoryClick = (category: string) => {
    router.push(`/ustalar?category=${category}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
            }}
          />
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-indigo-600/30 animate-gradient-shift" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="block">Ankara Usta</span>
              <motion.span 
                className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                En İyi Ustalar ve Hizmet Sağlayıcıları
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Ankara usta arama platformu. Elektrik, su tesisatı, temizlik, mobilya, tadilat ve daha fazlası için güvenilir ankara usta bulun. 500+ kayıtlı usta, 25 ilçe, 7/24 hizmet.
            </motion.p>

            {/* Enhanced Search Section */}
            <motion.div 
              className="max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Hangi hizmeti arıyorsunuz? (örn: elektrikçi, tesisatçı, temizlik)"
                    className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-0 shadow-2xl focus:ring-4 focus:ring-blue-500/50 focus:outline-none bg-white/95 backdrop-blur-sm"
                  />
                  <motion.button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ara
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.button 
                className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2"
                onClick={() => router.push('/ustalar')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5" />
                <span>Usta Ara</span>
              </motion.button>
              
              <motion.button 
                className="border-2 border-white text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2"
                onClick={() => router.push('/usta-ekle')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="w-5 h-5" />
                <span>Usta Ol</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Hizmet Kategorileri
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ankara'da ihtiyacınız olan tüm hizmetler için profesyonel ustalar
            </p>
          </motion.div>

          <CategoryCards onCategoryClick={handleCategoryClick} />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nasıl Çalışır?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              3 basit adımda ihtiyacınız olan ustayı bulun
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '1',
                icon: Search,
                title: 'Arama Yapın',
                description: 'İhtiyacınız olan hizmeti arayın veya kategori seçin'
              },
              {
                step: '2',
                icon: Star,
                title: 'Usta Seçin',
                description: 'Profilleri inceleyin, yorumları okuyun ve en uygun ustayı seçin'
              },
              {
                step: '3',
                icon: Clock,
                title: 'Randevu Alın',
                description: 'Usta ile iletişime geçin ve randevunuzu planlayın'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Rakamlarla Ankara Usta Bul
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ankara'da en güvenilir usta arama platformu
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '500+', label: 'Kayıtlı Usta', color: 'text-blue-600', icon: Users },
              { number: '10K+', label: 'Mutlu Müşteri', color: 'text-green-600', icon: Star },
              { number: '25', label: 'Ankara İlçesi', color: 'text-purple-600', icon: Award },
              { number: '7/24', label: 'Destek', color: 'text-orange-600', icon: Clock }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md mb-4 group-hover:bg-white/20 transition-all duration-300">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-200 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hemen Başlayın
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Ankara'da ihtiyacınız olan ustayı bulun veya usta olarak kayıt olun
            </p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.button 
                className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2"
                onClick={() => router.push('/ustalar')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5" />
                <span>Usta Ara</span>
              </motion.button>
              
              <motion.button 
                className="border-2 border-white text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2"
                onClick={() => router.push('/usta-ekle')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="w-5 h-5" />
                <span>Usta Ol</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ankara'dan Haberler
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ankara'dan güncel haberler, gelişmeler ve usta sektöründen son dakika haberleri
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <NewsWidget limit={6} />
          </div>
        </div>
      </section>
    </div>
  )
}