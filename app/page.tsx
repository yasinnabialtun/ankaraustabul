'use client'

import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SearchBar from '@/components/SearchBar'
import CategoryGrid from '@/components/CategoryGrid'
import FeaturedProviders from '@/components/FeaturedProviders'
import StatsSection from '@/components/StatsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import CTASection from '@/components/CTASection'
import TrustIndicators from '@/components/TrustIndicators'
import WorkGallery from '@/components/WorkGallery'
import WhatsAppForm from '@/components/WhatsAppForm'
import { getPopularCategories } from '@/data/categories'
import { getPopularDistricts } from '@/data/districts'
import { getFeaturedProviders } from '@/data/providers'
import { getFeaturedWorkExamples } from '@/data/workExamples'

// Lazy load components for better performance
const LazyImageGallery = lazy(() => import('@/components/ImageGallery'))

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  const popularCategories = getPopularCategories()
  const popularDistricts = getPopularDistricts()
  const featuredProviders = getFeaturedProviders()
  const featuredWorks = getFeaturedWorkExamples()

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section - Eye-tracking optimized */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-accent-400/20 rounded-full animate-float animation-delay-1000"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-white/10 rounded-full animate-float animation-delay-2000"></div>
          <div className="absolute bottom-20 right-10 w-20 h-20 bg-accent-300/15 rounded-full animate-float animation-delay-3000"></div>
        </div>

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-mesh-gradient opacity-20"></div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial="initial"
            animate={heroInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            {/* Main headline - Eye-tracking optimized */}
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Ankara'da
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-yellow-300 to-accent-400 animate-gradient">
                Usta Bul
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-100"
            >
              Güvenilir, kaliteli ve hızlı hizmet için doğru ustayı bulun. 
              <span className="block mt-2 text-accent-200 font-medium">
                Binlerce memnun müşteri, yüzlerce uzman usta.
              </span>
            </motion.p>
            
            {/* Search bar - Primary CTA */}
            <motion.div variants={fadeInUp} className="mb-8">
              <SearchBar />
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-200"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                <span>2,500+ Doğrulanmış Usta</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                <span>%99 Müşteri Memnuniyeti</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                <span>7/24 Destek</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Trust Indicators Section */}
      <TrustIndicators />

      {/* Categories Section - Eye-tracking optimized */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Hangi Hizmete İhtiyacınız Var?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ankara'nın en iyi ustaları ile evinizdeki her işi profesyonelce halledin
            </p>
          </motion.div>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          }>
            <CategoryGrid />
          </Suspense>
        </div>
      </section>

      {/* Featured Work Examples */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Öne Çıkan İşler
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Ustalarımızın kaliteli işlerinden örnekler
            </p>
          </motion.div>
          
          <Suspense fallback={<div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>}>
            <WorkGallery 
              works={featuredWorks}
              title=""
              showFilters={true}
            />
          </Suspense>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Öne Çıkan Ustalar
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              En yüksek puanlı ve en çok tercih edilen ustalarımız
            </p>
          </motion.div>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          }>
            <FeaturedProviders />
          </Suspense>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Package Info Section - Eye-tracking optimized */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Hizmet Verenler İçin Paketler
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              İlanınızı yayınlamak ve daha fazla müşteriye ulaşmak için size özel paketlerimiz. 
              <span className="block mt-2 text-primary-600 font-medium">
                Yayınlanan ilanlar reklamlarımızda döner, işinizi büyütün.
              </span>
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {/* Standart Paket */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 text-center border-2 border-gray-200 hover:border-primary-300 hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Standart Paket</h3>
              <div className="text-5xl font-bold text-primary-600 mb-6">Ücretsiz</div>
              <ul className="space-y-4 text-gray-700 mb-8 text-left">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-3"></span>
                  İlanınız 7 gün yayında kalır
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-3"></span>
                  Standart aramalarda görünür
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-3"></span>
                  Temel profil özellikleri
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-3"></span>
                  Müşteri değerlendirmeleri
                </li>
              </ul>
              <a 
                href="/firma-ekle" 
                className="inline-block w-full py-4 px-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-lg font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Ücretsiz Başla
              </a>
            </motion.div>
            
            {/* Premium Paket - Featured */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-3xl p-8 text-center border-2 border-primary-300 relative hover:shadow-2xl transition-all duration-500 transform scale-105"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                EN POPÜLER
              </div>
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔥</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Paket</h3>
              <div className="text-5xl font-bold text-primary-600 mb-6">299 TL</div>
              <ul className="space-y-4 text-gray-700 mb-8 text-left">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-3"></span>
                  İlanınız 30 gün yayında kalır
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-3"></span>
                  Kategori üstü öne çıkar
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-3"></span>
                  Ana sayfa reklamları
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-3"></span>
                  Öncelikli destek
                </li>
              </ul>
              <a 
                href="/firma-ekle" 
                className="inline-block w-full py-4 px-6 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-lg font-semibold rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Premium Seç
              </a>
            </motion.div>
            
            {/* Reklamlı Paket */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 text-center border-2 border-gray-200 hover:border-primary-300 hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Reklamlı Paket</h3>
              <div className="text-5xl font-bold text-primary-600 mb-6">499 TL</div>
              <ul className="space-y-4 text-gray-700 mb-8 text-left">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-3"></span>
                  İlanınız 60 gün yayında kalır
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-3"></span>
                  Tüm reklam alanlarında öne çıkar
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-3"></span>
                  Sosyal medya reklamları
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-3"></span>
                  VIP destek hattı
                </li>
              </ul>
              <a 
                href="/firma-ekle" 
                className="inline-block w-full py-4 px-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-lg font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Reklamlı Seç
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Form Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Hızlı Usta Talebi
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Formu doldurun, WhatsApp üzerinden direkt iletişime geçin. 
              <span className="block mt-2 text-primary-600 font-medium">
                Ustalarımız en kısa sürede size dönüş yapacaktır.
              </span>
            </p>
          </motion.div>
          
          <WhatsAppForm />
        </div>
      </section>
    </div>
  )
} 