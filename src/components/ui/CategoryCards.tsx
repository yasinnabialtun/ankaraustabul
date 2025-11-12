'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Droplets, 
  Sparkles, 
  Home, 
  Hammer, 
  Snowflake,
  ArrowRight,
  Star,
  Users,
  Clock
} from 'lucide-react'

interface CategoryCardProps {
  name: string
  icon: string
  color: string
  category: string
  description: string
  ustaCount: number
  averagePrice: string
  responseTime: string
  rating: number
  popularServices: string[]
}

interface CategoryCardsProps {
  onCategoryClick?: (category: string) => void
}

const categories: CategoryCardProps[] = [
  {
    name: "Elektrik",
    icon: "Zap",
    color: "from-yellow-400 to-orange-500",
    category: "elektrik",
    description: "Elektrik tesisatı, aydınlatma, priz montajı ve elektrik arızaları",
    ustaCount: 45,
    averagePrice: "₺150/saat",
    responseTime: "2 saat",
    rating: 4.8,
    popularServices: ["Elektrik Tesisatı", "Aydınlatma", "Priz Montajı", "Elektrik Arıza"]
  },
  {
    name: "Su Tesisatı",
    icon: "Droplets",
    color: "from-blue-400 to-cyan-500",
    category: "su-tesisati",
    description: "Su tesisatı, kanal açma, tesisat tamiri ve su kaçağı giderme",
    ustaCount: 38,
    averagePrice: "₺180/saat",
    responseTime: "1.5 saat",
    rating: 4.7,
    popularServices: ["Su Tesisatı", "Kanal Açma", "Tesisat Tamiri", "Su Kaçağı"]
  },
  {
    name: "Temizlik",
    icon: "Sparkles",
    color: "from-green-400 to-emerald-500",
    category: "temizlik",
    description: "Ev temizliği, ofis temizliği, derinlemesine temizlik hizmetleri",
    ustaCount: 52,
    averagePrice: "₺120/saat",
    responseTime: "1 saat",
    rating: 4.9,
    popularServices: ["Ev Temizliği", "Ofis Temizliği", "Derinlemesine Temizlik", "Halı Yıkama"]
  },
  {
    name: "Mobilya",
    icon: "Home",
    color: "from-purple-400 to-pink-500",
    category: "mobilya",
    description: "Mobilya montajı, tamiri, dolap montajı ve mobilya taşıma",
    ustaCount: 25,
    averagePrice: "₺140/saat",
    responseTime: "2.5 saat",
    rating: 4.6,
    popularServices: ["Mobilya Montajı", "Mobilya Tamiri", "Dolap Montajı", "Mobilya Taşıma"]
  },
  {
    name: "Tadilat",
    icon: "Hammer",
    color: "from-red-400 to-rose-500",
    category: "tadilat",
    description: "Ev ve işyeri tadilat, onarım işleri, banyo ve mutfak tadilatı",
    ustaCount: 35,
    averagePrice: "₺200/saat",
    responseTime: "3 saat",
    rating: 4.5,
    popularServices: ["Banyo Tadilat", "Mutfak Tadilat", "Oda Tadilat", "Dış Cephe"]
  },
  {
    name: "Klima",
    icon: "Snowflake",
    color: "from-cyan-400 to-blue-500",
    category: "klima",
    description: "Klima montaj, bakım, servis ve klima temizlik hizmetleri",
    ustaCount: 33,
    averagePrice: "₺160/saat",
    responseTime: "2 saat",
    rating: 4.7,
    popularServices: ["Klima Montaj", "Klima Bakım", "Klima Tamir", "Klima Temizlik"]
  }
]

export default function CategoryCards({ onCategoryClick }: CategoryCardsProps) {
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const handleCategoryClick = (category: string) => {
    if (onCategoryClick) {
      onCategoryClick(category)
    } else {
      router.push(`/ustalar?category=${category}`)
    }
  }

  const iconMap = {
    'Zap': Zap,
    'Droplets': Droplets,
    'Sparkles': Sparkles,
    'Home': Home,
    'Hammer': Hammer,
    'Snowflake': Snowflake
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Usta Kategorileri
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            İhtiyacınıza uygun usta kategorisini seçin ve profesyonel usta bulun. Elektrik usta, su tesisatı usta, temizlik usta ve daha fazlası.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap]
            const isHovered = hoveredCard === category.category
            
            return (
              <motion.div
                key={index}
                className="group cursor-pointer"
                onClick={() => handleCategoryClick(category.category)}
                onMouseEnter={() => setHoveredCard(category.category)}
                onMouseLeave={() => setHoveredCard(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Icon Container */}
                  <div className="relative p-8">
                    <motion.div 
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 transform transition-transform duration-500`}
                      animate={isHovered ? { scale: 1.1, rotate: 6 } : { scale: 1, rotate: 0 }}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    {/* Category Info */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                      
                      {/* Enhanced Stats */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2 bg-blue-50 rounded-lg p-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-700 font-medium">
                            {category.ustaCount} Usta
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 bg-yellow-50 rounded-lg p-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-700 font-medium">
                            {category.rating} Puan
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 bg-green-50 rounded-lg p-2">
                          <Clock className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700 font-medium">
                            {category.responseTime}
                          </span>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-sm font-bold text-gray-900">
                            {category.averagePrice}
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced Popular Services */}
                      <div className="pt-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">
                          Popüler Hizmetler:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {category.popularServices.slice(0, 3).map((service, serviceIndex) => (
                            <motion.span
                              key={serviceIndex}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
                              whileHover={{ scale: 1.05 }}
                            >
                              {service}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Action Button */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <motion.div 
                        className={`flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r ${category.color} text-white transform transition-all duration-300`}
                        animate={isHovered ? { scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" } : { scale: 1, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
                      >
                        <span className="font-semibold">Ustaları Gör</span>
                        <motion.div
                          animate={isHovered ? { x: 4 } : { x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* Enhanced Bottom CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-8 text-lg">
            Aradığınız hizmeti bulamadınız mı?
          </p>
          <motion.button
            onClick={() => router.push('/ustalar')}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Tüm Ustaları Gör</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
