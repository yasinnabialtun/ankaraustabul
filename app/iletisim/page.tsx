'use client'

import { useState } from 'react'
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, 
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  CheckCircle, AlertCircle, Send, Building, 
  Users, Star, Shield, Zap, Globe, Award
} from 'lucide-react'
import Link from 'next/link'

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setMessage({
      type: 'success',
      text: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.'
    })

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      type: 'general'
    })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Ana Telefon',
      value: '0312 123 45 67',
      description: '7/24 hizmet veriyoruz',
      link: 'tel:0312-123-45-67',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Phone,
      title: 'Acil Durum',
      value: '0312 999 88 77',
      description: 'Acil durumlar için',
      link: 'tel:0312-999-88-77',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Mail,
      title: 'Genel İletişim',
      value: 'info@ankaraustabul.com',
      description: 'Hızlı yanıt garantisi',
      link: 'mailto:info@ankaraustabul.com',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Mail,
      title: 'Teknik Destek',
      value: 'destek@ankaraustabul.com',
      description: 'Teknik sorunlar için',
      link: 'mailto:destek@ankaraustabul.com',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: MapPin,
      title: 'Merkez Ofis',
      value: 'Kızılay, Ankara',
      description: 'Ana şube adresi',
      link: 'https://maps.google.com/?q=Kızılay,Ankara',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Building,
      title: 'Şube',
      value: 'Çankaya, Ankara',
      description: 'İkinci şube',
      link: 'https://maps.google.com/?q=Çankaya,Ankara',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600', followers: '15K' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-500', followers: '8K' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600', followers: '25K' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700', followers: '5K' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600', followers: '12K' }
  ]

  const faqs = [
    {
      question: 'Nasıl usta bulabilirim?',
      answer: 'Ana sayfadaki arama çubuğunu kullanarak kategori ve ilçe seçebilir, veya kategoriler sayfasından istediğiniz hizmeti seçebilirsiniz. Arama sonuçlarında ustaların puanları, değerlendirmeleri ve fiyat bilgilerini görebilirsiniz.'
    },
    {
      question: 'Ustalar güvenilir mi?',
      answer: 'Tüm ustalarımız doğrulanmış ve referansları kontrol edilmiştir. Ayrıca müşteri değerlendirmeleri ile kalitelerini görebilirsiniz. Güvenlik için tüm ustalarımızın kimlik doğrulaması yapılmıştır.'
    },
    {
      question: 'Fiyatlar nasıl belirleniyor?',
      answer: 'Fiyatlar ustalar tarafından belirlenir. Her ustanın kendi fiyat politikası vardır ve fiyatlar hizmet kalitesine göre değişiklik gösterir. Fiyat tekliflerini ustalardan alabilirsiniz.'
    },
    {
      question: 'Acil durumlarda ne yapmalıyım?',
      answer: 'Acil durumlar için 7/24 hizmet veriyoruz. Acil durum telefon numaramızı arayarak acil durum ustalarımıza ulaşabilirsiniz. Acil durum ustalarımız 30 dakika içinde yanıt verir.'
    },
    {
      question: 'Hizmet kalitesi garantisi var mı?',
      answer: 'Evet, tüm hizmetlerimiz için kalite garantisi veriyoruz. Memnun kalmazsanız ücretsiz düzeltme hizmeti sunuyoruz. Ayrıca sigortalı hizmet seçeneklerimiz de mevcuttur.'
    },
    {
      question: 'Ödeme nasıl yapılıyor?',
      answer: 'Ödemeler hizmet tamamlandıktan sonra yapılır. Nakit, kredi kartı veya banka havalesi ile ödeme yapabilirsiniz. Online ödeme seçeneklerimiz de mevcuttur.'
    }
  ]

  const departments = [
    {
      name: 'Müşteri Hizmetleri',
      phone: '0312 123 45 67',
      email: 'musteri@ankaraustabul.com',
      description: 'Genel sorular ve destek'
    },
    {
      name: 'Teknik Destek',
      phone: '0312 123 45 68',
      email: 'teknik@ankaraustabul.com',
      description: 'Platform ve uygulama sorunları'
    },
    {
      name: 'Usta İlişkileri',
      phone: '0312 123 45 69',
      email: 'usta@ankaraustabul.com',
      description: 'Usta kayıtları ve yönetimi'
    },
    {
      name: 'Pazarlama',
      phone: '0312 123 45 70',
      email: 'pazarlama@ankaraustabul.com',
      description: 'Reklam ve işbirliği'
    }
  ]

  const workingHours = [
    { day: 'Pazartesi - Cuma', hours: '08:00 - 18:00', status: 'Açık' },
    { day: 'Cumartesi', hours: '09:00 - 17:00', status: 'Açık' },
    { day: 'Pazar', hours: '10:00 - 16:00', status: 'Açık' },
    { day: 'Acil Durum', hours: '7/24', status: 'Açık' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-sky-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            İletişim
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Ankara'da güvenilir ustalar ile iletişime geçin. 
            Sorularınız, önerileriniz veya şikayetleriniz için biz buradayız.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-lg">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>7/24 Hizmet</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>50+ Çalışan</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>98% Memnuniyet</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              İletişim Bilgilerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Size en iyi hizmeti sunmak için farklı iletişim kanalları sunuyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`w-16 h-16 ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                  {info.link ? (
                    <a 
                      href={info.link}
                      className="text-blue-600 font-semibold text-lg hover:text-blue-700 transition-colors block mb-2"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-blue-600 font-semibold text-lg mb-2">{info.value}</p>
                  )}
                  <p className="text-gray-600">{info.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Departmanlarımız
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Farklı konularda uzmanlaşmış departmanlarımızla size hizmet veriyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{dept.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{dept.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <a href={`tel:${dept.phone}`} className="text-blue-600 hover:text-blue-700 font-medium">
                      {dept.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <a href={`mailto:${dept.email}`} className="text-blue-600 hover:text-blue-700 font-medium">
                      {dept.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Çalışma Saatleri
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Size en iyi hizmeti sunmak için çalışma saatlerimiz
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="space-y-4">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h3 className="font-bold text-gray-900">{schedule.day}</h3>
                      <p className="text-gray-600">{schedule.hours}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      schedule.status === 'Açık' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {schedule.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Bize Yazın
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Sorularınız, önerileriniz veya şikayetleriniz için aşağıdaki formu kullanabilirsiniz. 
                En kısa sürede size dönüş yapacağız.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {message && (
                  <div className={`p-4 rounded-xl flex items-center space-x-3 ${
                    message.type === 'success' 
                      ? 'bg-green-100 text-green-700 border border-green-300' 
                      : 'bg-red-100 text-red-700 border border-red-300'
                  }`}>
                    {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <span className="font-medium">{message.text}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Konu Türü
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="general">Genel Bilgi</option>
                      <option value="support">Teknik Destek</option>
                      <option value="complaint">Şikayet</option>
                      <option value="suggestion">Öneri</option>
                      <option value="partnership">İşbirliği</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konu *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Mesajınızın konusu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mesaj *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-sky-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Mesaj Gönder</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Harita burada görünecek</p>
                  <p className="text-gray-500 text-sm">Google Maps entegrasyonu</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Sosyal Medya</h3>
                <p className="text-gray-600 mb-6">
                  Bizi sosyal medyada takip edin ve güncel haberlerden haberdar olun.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className={`flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 ${social.color}`}
                      >
                        <IconComponent className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">{social.name}</span>
                        <span className="text-xs text-gray-500">{social.followers}</span>
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-8 rounded-2xl border border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Hızlı İstatistikler</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Ortalama Yanıt Süresi</span>
                    <span className="font-bold text-blue-600">2 saat</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Müşteri Memnuniyeti</span>
                    <span className="font-bold text-green-600">98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Aktif Destek</span>
                    <span className="font-bold text-orange-600">7/24</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Sık Sorulan Sorular
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              En çok sorulan sorular ve cevapları
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-sky-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Hemen İletişime Geçin
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Sorularınız için bizi arayın veya mesaj gönderin. 
            Size en kısa sürede dönüş yapacağız.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="tel:0312-123-45-67"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Hemen Ara
            </a>
            <Link
              href="/firma-ekle"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Firma/Usta Ekle
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 