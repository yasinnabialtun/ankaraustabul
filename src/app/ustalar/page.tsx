'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Filter, Star, Phone, MessageCircle, MapPin, Clock, Award } from 'lucide-react'
import { LoadingPage, ErrorPage } from '@/components/ui'
import { StructuredData } from '@/components/seo'
import { useSEO } from '@/hooks/useSEO'

interface Usta {
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
}

function UstalarPageContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [filteredUstalar, setFilteredUstalar] = useState<Usta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // SEO optimization
  useSEO({
    title: 'Ankara Ustalar - Profesyonel Hizmet Sağlayıcıları | Ankara Usta Bul',
    description: "Ankara'da elektrik, su tesisatı, temizlik, mobilya ve diğer hizmetler için güvenilir ustalar bulun. Değerlendirmeler, fiyatlar ve iletişim bilgileri ile en iyi usta seçimi yapın.",
    keywords: [
      'ankara usta',
      'ankara ustalar',
      'elektrik ustası ankara',
      'su tesisatı ustası ankara',
      'temizlik hizmeti ankara',
      'mobilya ustası ankara',
      'tadilat ustası ankara',
      'klima servisi ankara',
      'boya badana ankara',
      'bahçe peyzaj ankara',
      'inşaat tadilat ankara',
      'usta değerlendirme',
      'güvenilir usta ankara',
      'profesyonel hizmet ankara'
    ],
    type: 'website'
  })

  const ustalar: Usta[] = [
    { 
      id: "1", 
      name: "Ahmet Yılmaz", 
      category: "elektrik", 
      rating: 4.9, 
      reviews: 127, 
      location: "Çankaya",
      experience: "15 yıl",
      price: "₺150/saat",
      description: "Profesyonel elektrik hizmetleri, ev ve işyeri kurulumları",
      phone: "+90 532 123 45 67",
      isAvailable: true,
      responseTime: "1 saat"
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
      description: "Su tesisatı kurulumu, tamiri ve bakım hizmetleri",
      phone: "+90 532 234 56 78",
      isAvailable: true,
      responseTime: "2 saat"
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
      description: "Ev ve ofis temizliği, derinlemesine temizlik hizmetleri",
      phone: "+90 532 345 67 89",
      isAvailable: false,
      responseTime: "3 saat"
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
      description: "Mobilya montajı, tamiri ve özel tasarım hizmetleri",
      phone: "+90 532 456 78 90",
      isAvailable: true,
      responseTime: "1 saat"
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
      description: "Ev tadilatı, boya badana ve dekorasyon hizmetleri",
      phone: "+90 532 567 89 01",
      isAvailable: true,
      responseTime: "2 saat"
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
      description: "Klima kurulumu, bakımı ve tamiri hizmetleri",
      phone: "+90 532 678 90 12",
      isAvailable: true,
      responseTime: "1 saat"
    }
  ]

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    // URL parametrelerinden filtreleri al
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const district = searchParams.get('district')

    if (search) setSearchTerm(search)
    if (category) setSelectedCategory(category)
    if (district) setSelectedDistrict(district)

    return () => clearTimeout(timer)
  }, [searchParams])

  useEffect(() => {
    // Filtreleme işlemi
    let filtered = ustalar

    if (searchTerm) {
      filtered = filtered.filter(usta => 
        usta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usta.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usta.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(usta => usta.category === selectedCategory)
    }

    if (selectedDistrict) {
      filtered = filtered.filter(usta => usta.location.toLowerCase() === selectedDistrict.toLowerCase())
    }

    setFilteredUstalar(filtered)
  }, [searchTerm, selectedCategory, selectedDistrict])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // URL'i güncelle
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedDistrict) params.set('district', selectedDistrict)
    
    router.push(`/ustalar?${params.toString()}`)
  }

  const handleUstaClick = (ustaId: string) => {
    router.push(`/usta/${ustaId}`)
  }

  const handleCall = (phone: string, e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(`tel:${phone}`)
  }

  const handleMessage = (ustaId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    // WhatsApp mesajı gönder
    const message = `Merhaba, ${ustalar.find(u => u.id === ustaId)?.name} ile iletişime geçmek istiyorum.`
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
    return <LoadingPage message="Ustalar yükleniyor..." />
  }

  if (error) {
    return <ErrorPage message="Ustalar yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin." />
  }

  return (
    <>
      {/* Structured Data */}
      <StructuredData 
        type="service" 
        data={{
          name: "Ankara Usta Arama Hizmeti",
          description: "Ankara'da elektrik, su tesisatı, temizlik, mobilya ve diğer hizmetler için güvenilir ustalar bulun.",
          serviceType: "Home Services",
          price: "0"
        }} 
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Ankara Ustaları</h1>
            <p className="text-xl text-gray-600">Profesyonel hizmet sağlayıcılar</p>
          </div>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Usta ara..."
                    className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-12 px-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tüm Kategoriler</option>
                  <option value="elektrik">Elektrik</option>
                  <option value="su-tesisati">Su Tesisatı</option>
                  <option value="temizlik">Temizlik</option>
                  <option value="mobilya">Mobilya</option>
                  <option value="tadilat">Tadilat</option>
                  <option value="klima">Klima</option>
                </select>
                
                <select 
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="h-12 px-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tüm İlçeler</option>
                  <option value="cankaya">Çankaya</option>
                  <option value="kecioren">Keçiören</option>
                  <option value="yenimahalle">Yenimahalle</option>
                  <option value="mamak">Mamak</option>
                  <option value="sincan">Sincan</option>
                  <option value="etimesgut">Etimesgut</option>
                </select>
              </div>
              
              <div className="flex justify-center">
                <button 
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filtrele</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredUstalar.length} usta bulundu
            {searchTerm && ` "${searchTerm}" için`}
            {selectedCategory && ` - ${getCategoryName(selectedCategory)}`}
            {selectedDistrict && ` - ${selectedDistrict}`}
          </p>
        </div>

        {filteredUstalar.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Usta bulunamadı</h3>
            <p className="text-gray-500">Arama kriterlerinizi değiştirerek tekrar deneyin</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUstalar.map((usta) => (
              <div 
                key={usta.id} 
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => handleUstaClick(usta.id)}
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                    {usta.name.charAt(0)}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{usta.name}</h3>
                    <p className="text-blue-600 font-medium">{getCategoryName(usta.category)}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      {usta.location}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    usta.isAvailable 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {usta.isAvailable ? 'Müsait' : 'Meşgul'}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-2">{usta.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-gray-400" />
                      <span className="text-gray-500">Deneyim: {usta.experience}</span>
                    </div>
                    <span className="font-semibold text-green-600">{usta.price}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{usta.rating} ({usta.reviews} değerlendirme)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Award className="w-3 h-3 mr-1" />
                    {usta.responseTime} yanıt
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    onClick={(e) => handleCall(usta.phone, e)}
                  >
                    <Phone className="w-4 h-4" />
                    <span>Ara</span>
                  </button>
                  <button 
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={(e) => handleMessage(usta.id, e)}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button 
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleUstaClick(usta.id)
                    }}
                  >
                    Detay
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  )
}

export default function UstalarPage() {
  return (
    <Suspense fallback={<LoadingPage message="Sayfa yükleniyor..." />}>
      <UstalarPageContent />
    </Suspense>
  )
}