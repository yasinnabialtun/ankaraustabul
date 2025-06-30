import { Star, Quote, ThumbsUp, Clock, MapPin, Award, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const testimonials = [
  {
    name: 'Ahmet Yılmaz',
    location: 'Çankaya, Ankara',
    rating: 5,
    service: 'Elektrik Tesisatı',
    content: 'Çok profesyonel bir hizmet aldım. Usta çok deneyimliydi ve işini hızlıca tamamladı. Fiyatı da makuldu. Kesinlikle tavsiye ederim.',
    avatar: 'AY'
  },
  {
    name: 'Fatma Kaya',
    location: 'Keçiören, Ankara',
    rating: 5,
    service: 'Su Tesisatı',
    content: 'Gece yarısı su kaçağı sorunu yaşadık. Platformdan bulduğumuz usta 30 dakika içinde geldi ve sorunu çözdü. Çok teşekkürler!',
    avatar: 'FK'
  },
  {
    name: 'Mehmet Demir',
    location: 'Mamak, Ankara',
    rating: 5,
    service: 'Boya Badana',
    content: 'Evimizin boya işini yaptırdık. Usta çok titiz çalıştı, hiç leke bırakmadı. Fiyat performans açısından çok memnun kaldık.',
    avatar: 'MD'
  },
  {
    name: 'Zeynep Özkan',
    location: 'Yenimahalle, Ankara',
    rating: 5,
    service: 'Mobilya Montajı',
    content: 'Yeni aldığımız mobilyaları monte ettirdik. Usta çok dikkatli ve özenli çalıştı. Sonuç mükemmel oldu.',
    avatar: 'ZÖ'
  },
  {
    name: 'Ali Çelik',
    location: 'Etimesgut, Ankara',
    rating: 5,
    service: 'Klima Montajı',
    content: 'Klima montajı için aradık. Usta hem teknik bilgisi hem de iş ahlakı açısından çok başarılıydı. Teşekkürler.',
    avatar: 'AÇ'
  },
  {
    name: 'Selin Arslan',
    location: 'Sincan, Ankara',
    rating: 5,
    service: 'Tadilat',
    content: 'Banyo tadilatımızı yaptırdık. Usta söz verdiği tarihte bitirdi ve kaliteli malzeme kullandı. Çok memnunuz.',
    avatar: 'SA'
  }
]

const stats = [
  {
    icon: Star,
    number: '4.8',
    label: 'Ortalama Puan',
    description: '15,000+ değerlendirme'
  },
  {
    icon: ThumbsUp,
    number: '98%',
    label: 'Memnuniyet',
    description: 'Müşteri memnuniyeti'
  },
  {
    icon: Clock,
    number: '30 dk',
    label: 'Ortalama Yanıt',
    description: 'Hızlı yanıt süresi'
  },
  {
    icon: CheckCircle,
    number: '2,500+',
    label: 'Doğrulanmış Usta',
    description: 'Güvenilir hizmet'
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Binlerce memnun müşterimizin deneyimleri ve gerçek değerlendirmeleri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                </div>
              </div>

              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-sm text-gray-600">{testimonial.rating}/5</span>
              </div>

              <div className="text-sm text-gray-500 mb-3 font-medium">
                {testimonial.service}
              </div>

              <div className="relative">
                <Quote className="w-6 h-6 text-blue-200 absolute -top-2 -left-1" />
                <p className="text-gray-700 leading-relaxed pl-4">
                  {testimonial.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Müşteri Memnuniyeti Garantisi
            </h3>
            <p className="text-gray-600 mb-6">
              Her hizmet sonrası müşteri memnuniyeti anketi yapıyoruz. 
              Memnun kalmayan müşterilerimiz için ücretsiz düzeltme hizmeti sunuyoruz.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">%98</div>
                <div className="text-sm text-gray-600">Memnun Müşteri Oranı</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">15,000+</div>
                <div className="text-sm text-gray-600">Tamamlanan İş</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
                <div className="text-sm text-gray-600">Ortalama Puan</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
            Tüm Yorumları Görüntüle
          </button>
        </div>
      </div>
    </section>
  )
} 