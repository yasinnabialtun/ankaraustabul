import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { 
  Star, MapPin, Phone, Clock, CheckCircle, Filter,
  Search, ArrowLeft, Users, Award, Shield
} from 'lucide-react'
import { getCategoryBySlug } from '@/data/categories'
import { getProvidersByCategory } from '@/data/providers'
import { getPopularDistricts } from '@/data/districts'
import SEO from '@/components/SEO'

export default function KategoriPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug)
  
  if (!category) {
    notFound()
  }

  const providers = getProvidersByCategory(category.slug)
  const districts = getPopularDistricts()

  // SEO için JSON-LD şeması
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${category.name} | Ankara Usta Bul`,
    description: category.description,
    areaServed: 'Ankara',
    provider: {
      '@type': 'Organization',
      name: 'Ankara Usta Bul',
      url: 'https://ankaraustabul.com',
    },
    serviceType: category.name,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'TRY',
      price: category.averagePrice,
      availability: 'https://schema.org/InStock',
    },
    url: `https://ankaraustabul.com/kategori/${category.slug}`,
  }

  return (
    <>
      <SEO
        title={`${category.name} Hizmetleri - Ankara Usta Bul`}
        description={`Ankara'da ${category.name.toLowerCase()} hizmetleri. ${category.description} Güvenilir ustalar ve uygun fiyatlar için hemen arama yapın.`}
        keywords={`ankara ${category.name.toLowerCase()}, ${category.name.toLowerCase()} ustası, ${category.name.toLowerCase()} hizmeti, ankara ${category.slug}`}
        canonical={`https://ankaraustabul.com/kategori/${category.slug}`}
        image="/og-image.jpg"
        type="service"
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-sky-500 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-4 mb-6">
              <Link href="/kategoriler" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-5 h-5" />
                <span>Kategorilere Dön</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className={`w-20 h-20 ${category.color} rounded-full flex items-center justify-center text-4xl`}>
                {category.icon}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {category.name}
                </h1>
                <p className="text-xl opacity-90 mb-4">
                  {category.description}
                </p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{category.providerCount} Usta</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Ortalama: {category.averagePrice}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>Puan: {category.averageRating}/5</span>
                  </div>
                </div>
                <div className="mt-6">
                  <ul className="space-y-2 text-lg text-blue-100">
                    <li>✔️ Tüm {category.name.toLowerCase()} ustalarımız doğrulanmış ve referanslıdır.</li>
                    <li>✔️ Hızlı arama, kolay iletişim ve fiyat teklifi alma imkanı.</li>
                    <li>✔️ Müşteri memnuniyeti ve yüksek puan garantisi.</li>
                    <li>✔️ 7/24 acil durum desteği ve hızlı yanıt.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-10 max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-2">{category.name} Hizmetlerinde Neler Yapılır?</h2>
              <p className="text-lg text-blue-100 mb-4">{category.popularServices ? category.popularServices.join(', ') : 'Tüm işler için uzman desteği.'}</p>
              <p className="text-base text-blue-50">Ustalarımızdan ücretsiz fiyat teklifi alabilir, müşteri yorumlarını inceleyebilirsiniz.</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Filters */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtreler
                </h3>
                
                {/* District Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">İlçe</h4>
                  <div className="space-y-2">
                    {districts.map((district) => (
                      <label key={district.id} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{district.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Puan</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 flex items-center">
                          {rating}+ <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Fiyat Aralığı</h4>
                  <div className="space-y-2">
                    {['0-200 TL', '200-500 TL', '500-1000 TL', '1000+ TL'].map((range) => (
                      <label key={range} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Müsaitlik</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Şu an müsait</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Acil servis</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Popular Services */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Popüler Hizmetler</h3>
                <div className="space-y-3">
                  {category.popularServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{service}</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search Bar */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder={`${category.name} ustası ara...`}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Ara
                  </button>
                </div>
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  <span className="font-semibold">{providers.length}</span> usta bulundu
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sırala:</span>
                  <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                    <option>En popüler</option>
                    <option>En yüksek puan</option>
                    <option>En düşük fiyat</option>
                    <option>En hızlı yanıt</option>
                  </select>
                </div>
              </div>

              {/* Providers List */}
              <div className="space-y-4">
                {providers.map((provider) => (
                  <div key={provider.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-semibold text-gray-900">{provider.name}</h3>
                          {provider.verified && (
                            <Shield className="w-5 h-5 text-blue-500" />
                          )}
                          {provider.featured && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                              Öne Çıkan
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{provider.district}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span>{provider.rating} ({provider.reviewCount} değerlendirme)</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{provider.responseTime}</span>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4 line-clamp-2">
                          {provider.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {provider.services.slice(0, 3).map((service, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            >
                              {service}
                            </span>
                          ))}
                          {provider.services.length > 3 && (
                            <span className="text-gray-500 text-xs px-2 py-1">
                              +{provider.services.length - 3} daha
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Deneyim: {provider.experience}</span>
                            <span>Fiyat: {provider.priceRange}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                              Detaylar
                            </button>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                              <Phone className="w-4 h-4 mr-2" />
                              Ara
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {providers.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.name} ustası bulunamadı
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Arama kriterlerinizi değiştirerek tekrar deneyin veya farklı bir ilçe seçin.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Filtreleri Temizle
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 