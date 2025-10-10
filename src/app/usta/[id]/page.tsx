'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Star, Phone, MessageCircle, MapPin, Clock, Award, CheckCircle, Calendar, Shield } from 'lucide-react'

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
  services: string[]
  workingHours: string
  languages: string[]
  certifications: string[]
}

export default function UstaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string>('')
  
  useEffect(() => {
    params.then(({ id: paramId }) => setId(paramId))
  }, [params])

  const router = useRouter()
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  // Mock data - gerçek uygulamada API'den gelecek
  const usta: Usta = {
    id: id,
    name: "Ahmet Yılmaz",
    category: "elektrik",
    rating: 4.9,
    reviews: 127,
    location: "Çankaya",
    experience: "15 yıl",
    price: "₺150/saat",
    description: "Profesyonel elektrik hizmetleri sunan deneyimli ustayım. Ev ve işyeri elektrik kurulumları, arıza giderme ve bakım hizmetleri veriyorum. Müşteri memnuniyeti önceliğimdir.",
    phone: "+90 532 123 45 67",
    isAvailable: true,
    responseTime: "1 saat",
    services: [
      "Elektrik tesisatı kurulumu",
      "Elektrik arıza giderme",
      "Elektrik panosu montajı",
      "Aydınlatma sistemleri",
      "Elektrikli cihaz montajı",
      "Elektrik bakım hizmetleri"
    ],
    workingHours: "Pazartesi - Cumartesi: 08:00 - 18:00",
    languages: ["Türkçe", "İngilizce"],
    certifications: ["Elektrik Teknisyeni Sertifikası", "İş Güvenliği Sertifikası"]
  }

  const handleCall = () => {
    window.open(`tel:${usta.phone}`)
  }

  const handleMessage = () => {
    const message = `Merhaba ${usta.name}, hizmetleriniz hakkında bilgi almak istiyorum.`
    window.open(`https://wa.me/905321234567?text=${encodeURIComponent(message)}`)
  }

  const handleBack = () => {
    router.back()
  }

  const getCategoryName = (category: string) => {
    const categories: { [key: string]: string } = {
      'elektrik': 'Elektrik Ustası',
      'su-tesisati': 'Su Tesisatçısı',
      'temizlik': 'Temizlik Hizmeti',
      'mobilya': 'Mobilya Ustası',
      'tadilat': 'Tadilat Ustası',
      'klima': 'Klima Teknisyeni'
    }
    return categories[category] || category
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button 
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Geri Dön</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Usta Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-3xl">
                  {usta.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{usta.name}</h1>
                  <p className="text-xl text-blue-600 font-medium mb-4">{getCategoryName(usta.category)}</p>
                  
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="ml-2 text-lg font-semibold">{usta.rating}</span>
                      <span className="ml-1 text-gray-600">({usta.reviews} değerlendirme)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {usta.location}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      usta.isAvailable 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {usta.isAvailable ? 'Müsait' : 'Meşgul'}
                    </div>
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed">{usta.description}</p>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Hizmetler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {usta.services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Değerlendirmeler</h2>
              <div className="space-y-6">
                {[
                  { name: "Mehmet K.", rating: 5, comment: "Çok profesyonel ve hızlı. Elektrik sorunumu kısa sürede çözdü.", date: "2 gün önce" },
                  { name: "Ayşe D.", rating: 5, comment: "Fiyatı uygun, işi kaliteli. Kesinlikle tavsiye ederim.", date: "1 hafta önce" },
                  { name: "Ali S.", rating: 4, comment: "İyi hizmet verdi, sadece biraz geç geldi.", date: "2 hafta önce" }
                ].map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{review.name}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">İletişim</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{usta.workingHours}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{usta.responseTime} yanıt süresi</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{usta.experience} deneyim</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleCall}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Ara: {usta.phone}</span>
                </button>
                
                <button 
                  onClick={handleMessage}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Mesaj</span>
                </button>
                
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Randevu Al</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">{usta.price}</div>
                  <div className="text-sm text-gray-500">Saatlik ücret</div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sertifikalar</h3>
              <div className="space-y-3">
                {usta.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Award className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-700 text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Diller</h3>
              <div className="flex flex-wrap gap-2">
                {usta.languages.map((lang, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Randevu Al</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                <input type="text" className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                <input type="tel" className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tarih</label>
                <input type="date" className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Saat</label>
                <select className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>09:00</option>
                  <option>10:00</option>
                  <option>11:00</option>
                  <option>14:00</option>
                  <option>15:00</option>
                  <option>16:00</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                <textarea rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="İhtiyacınızı açıklayın..."></textarea>
              </div>
              <div className="flex space-x-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Randevu Al
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}