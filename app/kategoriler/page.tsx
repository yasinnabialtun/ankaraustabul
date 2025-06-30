import Link from 'next/link'
import { 
  ArrowRight, Star, Users, Clock, CheckCircle
} from 'lucide-react'
import { serviceCategories } from '@/data/categories'

export default function KategorilerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-500 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Ankara Hizmet Kategorileri
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Ankara'da ihtiyacınız olan tüm hizmet kategorileri tek bir yerde. 
            Güvenilir ustalar ve kaliteli hizmet garantisi.
          </p>
          <div className="flex items-center justify-center space-x-8 text-lg">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6" />
              <span>2,500+ Usta</span>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="w-6 h-6" />
              <span>4.8/5 Ortalama</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6" />
              <span>30 dk Yanıt</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                {/* Header */}
                <div className="flex items-center space-x-6 mb-8">
                  <div className={`w-20 h-20 ${category.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <span className="text-4xl">{category.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{category.description}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{category.providerCount}</div>
                    <div className="text-sm text-gray-600 font-medium">Usta</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{category.averageRating}</div>
                    <div className="text-sm text-gray-600 font-medium">Puan</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{category.averagePrice}</div>
                    <div className="text-sm text-gray-600 font-medium">Ortalama</div>
                  </div>
                </div>

                {/* Popular Services */}
                <div className="mb-8">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">Popüler Hizmetler</h4>
                  <div className="space-y-3">
                    {category.popularServices.slice(0, 3).map((service, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="font-medium">{service}</span>
                      </div>
                    ))}
                    {category.popularServices.length > 3 && (
                      <div className="text-sm text-gray-500 font-medium">
                        +{category.popularServices.length - 3} hizmet daha
                      </div>
                    )}
                  </div>
                </div>

                {/* Action */}
                <Link
                  href={`/kategori/${category.slug}`}
                  className="w-full bg-gradient-to-r from-blue-600 to-sky-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-sky-700 transition-all duration-300 flex items-center justify-center space-x-3 font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  <span>Ustaları Görüntüle</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ankara'da Neden Bizi Tercih Ediyorlar?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Binlerce müşterinin güvenini kazandık. Hızlı, güvenilir ve kaliteli hizmet anlayışımızla 
              Ankara'nın en tercih edilen hizmet platformu olduk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">2,500+</h3>
              <p className="text-gray-600 font-medium text-lg">Kayıtlı Usta</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">4.8/5</h3>
              <p className="text-gray-600 font-medium text-lg">Ortalama Puan</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-20 h-20 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">30 dk</h3>
              <p className="text-gray-600 font-medium text-lg">Ortalama Yanıt</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">50,000+</h3>
              <p className="text-gray-600 font-medium text-lg">Mutlu Müşteri</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-sky-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Hemen Usta Bulun veya İlanınızı Ekleyin
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed">
            Ankara'da güvenilir ustalar ile tanışın veya kendi hizmetinizi ekleyin. 
            Ücretsiz başlangıç, premium reklam paketleri ile daha fazla müşteriye ulaşın.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link
              href="/firma-ekle"
              className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Firma/Usta Ekle
            </Link>
            <Link
              href="/iletisim"
              className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              İletişime Geç
            </Link>
          </div>
          
          {/* Package Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="font-bold mb-3 text-lg">Standart Paket</h3>
              <p className="text-sm opacity-90">Ücretsiz • 7 gün yayın</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="font-bold mb-3 text-lg">Premium Paket</h3>
              <p className="text-sm opacity-90">299 TL • 30 gün + reklam</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="font-bold mb-3 text-lg">Reklamlı Paket</h3>
              <p className="text-sm opacity-90">499 TL • Maksimum görünürlük</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 