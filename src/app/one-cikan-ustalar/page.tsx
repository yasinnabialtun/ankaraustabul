'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Star, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Award,
  Users,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react'
import { businesses } from '@/data/businesses'
import { businessSectors } from '@/data/sectors'

export default function FeaturedCraftsmenPage() {
  const [selectedSector, setSelectedSector] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('rating')

  const filteredBusinesses = businesses
    .filter(business => {
      const matchesSector = !selectedSector || business.sectorSlug === selectedSector
      const matchesDistrict = !selectedDistrict || business.districtSlug === selectedDistrict
      const matchesSearch = !searchTerm || 
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      return matchesSector && matchesDistrict && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'experience':
          return b.experience - a.experience
        case 'reviewCount':
          return b.reviewCount - a.reviewCount
        default:
          return 0
      }
    })

  const districts = Array.from(new Set(businesses.map(b => b.district)))

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>
        <div className="absolute inset-0 hero-pattern"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-4 text-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center"
          >
            <Award className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Öne Çıkan</span>
            <br />
            <span className="text-white">Ustalar</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Ankara'nın en kaliteli, en güvenilir ve en çok tercih edilen ustaları ile tanışın
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="card p-6 text-center"
            >
              <Star className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold text-white mb-2">4.8+</div>
              <div className="text-gray-400">Ortalama Puan</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="card p-6 text-center"
            >
              <Users className="w-8 h-8 mx-auto mb-3 text-blue-400" />
              <div className="text-2xl font-bold text-white mb-2">{businesses.length}+</div>
              <div className="text-gray-400">Kayıtlı Usta</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="card p-6 text-center"
            >
              <Shield className="w-8 h-8 mx-auto mb-3 text-green-400" />
              <div className="text-2xl font-bold text-white mb-2">%100</div>
              <div className="text-gray-400">Güvenilir</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Filters Section */}
      <section className="py-12 section-bg">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="card p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    <Search className="w-4 h-4 inline mr-2" />
                    Arama
                  </label>
                  <input
                    type="text"
                    placeholder="Usta veya hizmet ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    <Filter className="w-4 h-4 inline mr-2" />
                    Kategori
                  </label>
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Tüm Kategoriler</option>
                    {businessSectors.map(sector => (
                      <option key={sector.id} value={sector.slug}>
                        {sector.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    İlçe
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Tüm İlçeler</option>
                    {districts.map(district => (
                      <option key={district} value={district.toLowerCase().replace(/\s+/g, '-')}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    <TrendingUp className="w-4 h-4 inline mr-2" />
                    Sıralama
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-field"
                  >
                    <option value="rating">Puana Göre</option>
                    <option value="experience">Deneyime Göre</option>
                    <option value="reviewCount">Yorum Sayısına Göre</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{filteredBusinesses.length} usta bulundu</span>
                <button 
                  onClick={() => {
                    setSelectedSector('')
                    setSelectedDistrict('')
                    setSearchTerm('')
                    setSortBy('rating')
                  }}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Filtreleri Temizle
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Businesses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {filteredBusinesses.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Zap className="w-16 h-16 mx-auto mb-4 text-gray-500" />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">Usta Bulunamadı</h3>
              <p className="text-gray-500">Arama kriterlerinize uygun usta bulunamadı. Filtreleri değiştirmeyi deneyin.</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBusinesses.map((business, index) => (
                <motion.div
                  key={business.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="card p-6 relative overflow-hidden group"
                >
                  {business.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Öne Çıkan
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1 group-hover:text-blue-400 transition-colors">
                        {business.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">{business.sector}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-sm">
                          <Star className="w-4 h-4 mr-1" />
                          {business.rating}
                        </div>
                        <span className="text-gray-500 text-sm">
                          ({business.reviewCount} yorum)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4 line-clamp-3">{business.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      {business.district}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Phone className="w-4 h-4 mr-2" />
                      {business.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      {business.workingHours}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {business.services.slice(0, 3).map((service, idx) => (
                      <span key={idx} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">
                        {service}
                      </span>
                    ))}
                    {business.services.length > 3 && (
                      <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded-full text-xs">
                        +{business.services.length - 3} daha
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 mr-1 text-green-400" />
                      {business.experience} yıl deneyim
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-sm px-3 py-2">
                        Detay
                      </button>
                      <button className="btn-primary text-sm px-3 py-2">
                        Ara
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 section-bg">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-primary">Usta mısınız?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              İşletmenizi ekleyin ve daha fazla müşteriye ulaşın. Ücretsiz kayıt ile başlayın!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-gradient text-lg px-8 py-4">
                Hemen Kayıt Ol
              </button>
              <button className="btn-outline text-lg px-8 py-4">
                Daha Fazla Bilgi
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 