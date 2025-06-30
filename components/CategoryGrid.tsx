'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Zap, Droplets, Sparkles, Truck, Wrench, Shield, 
  TreePine, Snowflake, Building2, Flame, 
  Car, Monitor, Smartphone, ChefHat, Bath, 
  Home, HardDrive, Hammer, 
  Palette, ArrowRight, Star, Clock, Users
} from 'lucide-react'

const CategoryGrid = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const categories = [
    {
      id: 'elektrik',
      name: 'Elektrik',
      slug: 'elektrik',
      icon: Zap,
      description: 'Elektrik tesisatı, arıza giderme, aydınlatma sistemleri',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      stats: { providers: 245, rating: 4.6, avgPrice: '150-500 TL' }
    },
    {
      id: 'su-tesisati',
      name: 'Su Tesisatı',
      slug: 'su-tesisati',
      icon: Droplets,
      description: 'Su tesisatı kurulumu, tıkanıklık açma, su kaçağı tespiti',
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      stats: { providers: 198, rating: 4.5, avgPrice: '100-400 TL' }
    },
    {
      id: 'temizlik',
      name: 'Temizlik',
      slug: 'temizlik',
      icon: Sparkles,
      description: 'Ev, ofis temizliği, halı yıkama, cam temizliği',
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      stats: { providers: 156, rating: 4.4, avgPrice: '80-300 TL' }
    },
    {
      id: 'nakliye',
      name: 'Nakliye',
      slug: 'nakliye',
      icon: Truck,
      description: 'Evden eve nakliyat, ofis taşıma, eşya taşıma',
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      stats: { providers: 89, rating: 4.3, avgPrice: '500-2000 TL' }
    },
    {
      id: 'bakim-onarim',
      name: 'Bakım Onarım',
      slug: 'bakim-onarim',
      icon: Wrench,
      description: 'Genel tamirat, tadilat, boya badana, mobilya montajı',
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      stats: { providers: 234, rating: 4.5, avgPrice: '200-800 TL' }
    },
    {
      id: 'guvenlik',
      name: 'Güvenlik',
      slug: 'guvenlik',
      icon: Shield,
      description: 'Güvenlik sistemleri, kamera kurulumu, alarm sistemleri',
      color: 'from-purple-400 to-indigo-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      stats: { providers: 67, rating: 4.7, avgPrice: '300-1500 TL' }
    },
    {
      id: 'bahce-bakimi',
      name: 'Bahçe Bakımı',
      slug: 'bahce-bakimi',
      icon: TreePine,
      description: 'Bahçe düzenleme, çim biçme, ağaç budama, peyzaj',
      color: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      stats: { providers: 78, rating: 4.4, avgPrice: '150-600 TL' }
    },
    {
      id: 'klima',
      name: 'Klima',
      slug: 'klima',
      icon: Snowflake,
      description: 'Klima kurulumu, bakım, onarım, temizlik',
      color: 'from-cyan-400 to-blue-500',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      stats: { providers: 112, rating: 4.6, avgPrice: '200-800 TL' }
    },
    {
      id: 'asansor',
      name: 'Asansör',
      slug: 'asansor',
      icon: Building2,
      description: 'Asansör bakım, onarım, kurulum, güvenlik kontrolü',
      color: 'from-gray-400 to-slate-500',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      stats: { providers: 34, rating: 4.8, avgPrice: '500-2000 TL' }
    },
    {
      id: 'kombi',
      name: 'Kombi',
      slug: 'kombi',
      icon: Flame,
      description: 'Kombi kurulumu, bakım, onarım, servis',
      color: 'from-red-500 to-orange-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      stats: { providers: 145, rating: 4.5, avgPrice: '150-600 TL' }
    },
    {
      id: 'cam-balkon',
      name: 'Cam Balkon',
      slug: 'cam-balkon',
      icon: Car,
      description: 'Cam balkon kurulumu, onarım, sistemleri',
      color: 'from-sky-400 to-blue-500',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
      stats: { providers: 56, rating: 4.6, avgPrice: '1000-5000 TL' }
    },
    {
      id: 'kaporta-boya',
      name: 'Kaporta Boya',
      slug: 'kaporta-boya',
      icon: Car,
      description: 'Araç kaporta boya, çizik giderme, araç boya',
      color: 'from-indigo-400 to-purple-500',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      stats: { providers: 89, rating: 4.4, avgPrice: '300-1500 TL' }
    },
    {
      id: 'bilgisayar',
      name: 'Bilgisayar',
      slug: 'bilgisayar',
      icon: Monitor,
      description: 'Bilgisayar tamiri, yazılım kurulumu, ağ kurulumu',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      stats: { providers: 123, rating: 4.5, avgPrice: '100-500 TL' }
    },
    {
      id: 'telefon',
      name: 'Telefon',
      slug: 'telefon',
      icon: Smartphone,
      description: 'Telefon tamiri, ekran değişimi, yazılım kurulumu',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      stats: { providers: 167, rating: 4.3, avgPrice: '150-800 TL' }
    },
    {
      id: 'mutfak',
      name: 'Mutfak',
      slug: 'mutfak',
      icon: ChefHat,
      description: 'Mutfak dolabı, tezgah kurulumu, mutfak tadilatı',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      stats: { providers: 98, rating: 4.6, avgPrice: '500-3000 TL' }
    },
    {
      id: 'banyo',
      name: 'Banyo',
      slug: 'banyo',
      icon: Bath,
      description: 'Banyo tadilatı, fayans döşeme, banyo dolabı',
      color: 'from-teal-400 to-cyan-500',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      stats: { providers: 87, rating: 4.5, avgPrice: '800-4000 TL' }
    },
    {
      id: 'cati',
      name: 'Çatı',
      slug: 'cati',
      icon: Home,
      description: 'Çatı yapımı, onarımı, izolasyonu, tadilatı',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      stats: { providers: 45, rating: 4.7, avgPrice: '1000-8000 TL' }
    },
    {
      id: 'parke',
      name: 'Parke',
      slug: 'parke',
      icon: HardDrive,
      description: 'Parke döşeme, cilalama, onarımı, zemin kaplama',
      color: 'from-yellow-600 to-amber-700',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      stats: { providers: 76, rating: 4.4, avgPrice: '300-2000 TL' }
    },
    {
      id: 'demirci',
      name: 'Demirci',
      slug: 'demirci',
      icon: Hammer,
      description: 'Demir işleri, kapı yapımı, parmaklık yapımı',
      color: 'from-gray-500 to-slate-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      stats: { providers: 67, rating: 4.5, avgPrice: '200-1500 TL' }
    },
    {
      id: 'marangoz',
      name: 'Marangoz',
      slug: 'marangoz',
      icon: Car,
      description: 'Ahşap işleri, mobilya yapımı, kapı yapımı',
      color: 'from-orange-600 to-red-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      stats: { providers: 89, rating: 4.6, avgPrice: '300-2000 TL' }
    },
    {
      id: 'seramik',
      name: 'Seramik',
      slug: 'seramik',
      icon: Palette,
      description: 'Seramik döşeme, fayans döşeme, seramik onarımı',
      color: 'from-red-600 to-pink-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      stats: { providers: 78, rating: 4.5, avgPrice: '200-1500 TL' }
    },
    {
      id: 'boya',
      name: 'Boya',
      slug: 'boya',
      icon: Palette,
      description: 'İç cephe boya, dış cephe boya, boya badana',
      color: 'from-pink-400 to-rose-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      stats: { providers: 134, rating: 4.4, avgPrice: '150-1000 TL' }
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ankara'da <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Hizmet Kategorileri
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            24 farklı kategoride 2,500+ doğrulanmış usta ve firma ile evinizdeki tüm işleriniz için profesyonel çözümler
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Link
                key={category.id}
                href={`/kategori/${category.slug}`}
                className={`category-card group relative overflow-hidden transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2`}
                style={{ animationDelay: `${index * 50}ms` }}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Card Content */}
                <div className={`${category.bgColor} p-6 rounded-2xl border-2 ${category.borderColor} transition-all duration-300 group-hover:shadow-2xl`}>
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-600">{category.stats.providers} usta</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span className="text-gray-600">{category.stats.rating}/5</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-gray-600">{category.stats.avgPrice}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                      Detayları Gör
                    </span>
                    <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
              </Link>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Aradığınız Hizmeti Bulamadınız mı?</h3>
            <p className="text-blue-100 mb-6">
              Özel istekleriniz için bizimle iletişime geçin, size en uygun ustayı bulalım.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              <span>İletişime Geç</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export { CategoryGrid }

export default CategoryGrid; 