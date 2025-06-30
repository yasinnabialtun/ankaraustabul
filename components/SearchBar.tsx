'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Filter, ArrowRight, Sparkles, Clock, Star, X } from 'lucide-react'
import Link from 'next/link'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const districts = [
    'Tüm İlçeler',
    'Çankaya',
    'Keçiören',
    'Mamak',
    'Yenimahalle',
    'Etimesgut',
    'Sincan',
    'Altındağ',
    'Pursaklar',
    'Gölbaşı',
    'Polatlı',
    'Beypazarı',
    'Nallıhan',
    'Kızılcahamam',
    'Ayaş',
    'Şereflikoçhisar',
    'Kazan',
    'Akyurt',
    'Elmadağ',
    'Çubuk',
    'Haymana',
    'Bala',
    'Kalecik',
    'Evren'
  ]

  const categories = [
    'Tüm Kategoriler',
    'Elektrik',
    'Su Tesisatı',
    'Temizlik',
    'Nakliye',
    'Bakım Onarım',
    'Güvenlik',
    'Bahçe Bakımı',
    'Klima',
    'Asansör',
    'Kombi',
    'Cam Balkon',
    'Kaporta Boya',
    'Bilgisayar',
    'Telefon',
    'Mutfak',
    'Banyo',
    'Çatı',
    'Parke',
    'Demirci',
    'Marangoz',
    'Seramik',
    'Boya'
  ]

  const popularSearches = [
    'Elektrik ustası Çankaya',
    'Su tesisatı Keçiören',
    'Temizlik hizmeti Yenimahalle',
    'Nakliye firması Etimesgut',
    'Klima servisi Mamak',
    'Bakım onarım Sincan'
  ]

  const searchSuggestions = [
    'Elektrik ustası',
    'Su tesisatı ustası',
    'Temizlik hizmeti',
    'Nakliye firması',
    'Klima servisi',
    'Bakım onarım',
    'Güvenlik sistemi',
    'Bahçe bakımı',
    'Asansör servisi',
    'Kombi servisi'
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.append('q', searchTerm)
    if (selectedDistrict && selectedDistrict !== 'Tüm İlçeler') params.append('district', selectedDistrict)
    if (selectedCategory && selectedCategory !== 'Tüm Kategoriler') params.append('category', selectedCategory)
    
    const searchUrl = `/kategoriler?${params.toString()}`
    window.location.href = searchUrl
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
    setShowSuggestions(false)
    searchInputRef.current?.focus()
  }

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 6)

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto">
      {/* Search Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-6 lg:p-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="lg:col-span-2 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Ne tür bir hizmet arıyorsunuz? (örn: elektrik ustası, temizlik)"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => {
                  setFocusedField('search')
                  setShowSuggestions(true)
                }}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-12 py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 placeholder-gray-400"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setShowSuggestions(false)
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && (searchTerm || focusedField === 'search') && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 max-h-64 overflow-y-auto"
                >
                  {filteredSuggestions.length > 0 ? (
                    filteredSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-4 py-3 hover:bg-primary-50 transition-colors duration-200 flex items-center space-x-3"
                      >
                        <Search className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{suggestion}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-center">
                      Sonuç bulunamadı
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* District Select */}
          <div className="relative">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                onFocus={() => setFocusedField('district')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-4 py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 appearance-none cursor-pointer"
              >
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Select */}
          <div className="relative">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                onFocus={() => setFocusedField('category')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-4 py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 appearance-none cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-lg font-semibold rounded-2xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Search className="w-5 h-5" />
            <span>Usta Ara</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Popular Searches */}
        <div className="mt-8">
          <p className="text-gray-600 text-center mb-4 font-medium">Popüler Aramalar:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularSearches.map((search, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm(search)
                  setShowSuggestions(false)
                }}
                className="bg-gray-100 hover:bg-primary-100 hover:text-primary-700 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-gray-200 hover:border-primary-300"
              >
                {search}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-4 text-center border border-primary-200"
          >
            <div className="text-2xl font-bold text-primary-600">2,500+</div>
            <div className="text-sm text-primary-700 font-medium">Kayıtlı Usta</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-success-50 to-success-100 rounded-2xl p-4 text-center border border-success-200"
          >
            <div className="text-2xl font-bold text-success-600">25</div>
            <div className="text-sm text-success-700 font-medium">İlçe</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-warning-50 to-warning-100 rounded-2xl p-4 text-center border border-warning-200"
          >
            <div className="text-2xl font-bold text-warning-600">4.8/5</div>
            <div className="text-sm text-warning-700 font-medium">Ortalama Puan</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-4 text-center border border-accent-200"
          >
            <div className="text-2xl font-bold text-accent-600">30dk</div>
            <div className="text-sm text-accent-700 font-medium">Ortalama Yanıt</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default SearchBar 