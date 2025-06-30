'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageCircle, 
  Phone, 
  User, 
  MapPin, 
  Calendar,
  Clock,
  Send,
  CheckCircle,
  X
} from 'lucide-react'
import toast from 'react-hot-toast'

interface FormData {
  name: string
  phone: string
  service: string
  district: string
  description: string
  preferredDate: string
  preferredTime: string
}

const WhatsAppForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    service: '',
    district: '',
    description: '',
    preferredDate: '',
    preferredTime: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const services = [
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
    'Boya',
    'Diğer'
  ]

  const districts = [
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

  const timeSlots = [
    'Sabah (08:00-12:00)',
    'Öğle (12:00-16:00)',
    'Akşam (16:00-20:00)',
    'Gece (20:00-24:00)',
    'Fark etmez'
  ]

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '')
    
    // Format as Turkish phone number
    if (cleaned.length === 10) {
      return `+90${cleaned}`
    } else if (cleaned.length === 11 && cleaned.startsWith('0')) {
      return `+90${cleaned.slice(1)}`
    } else if (cleaned.length === 12 && cleaned.startsWith('90')) {
      return `+${cleaned}`
    }
    
    return phone
  }

  const generateWhatsAppMessage = (data: FormData) => {
    const formattedPhone = formatPhoneNumber(data.phone)
    const today = new Date().toLocaleDateString('tr-TR')
    
    const message = `🔧 *USTA HİZMET TALEBİ*

👤 *Müşteri Bilgileri:*
• Ad Soyad: ${data.name}
• Telefon: ${formattedPhone}

📍 *Hizmet Detayları:*
• Hizmet Türü: ${data.service}
• İlçe: ${data.district}
• Tercih Edilen Tarih: ${data.preferredDate || 'Belirtilmedi'}
• Tercih Edilen Saat: ${data.preferredTime || 'Belirtilmedi'}

📝 *Açıklama:*
${data.description || 'Açıklama belirtilmedi'}

📅 *Talep Tarihi:* ${today}

---
*Bu talep Ankara Usta Bul platformu üzerinden gönderilmiştir.*`

    return encodeURIComponent(message)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone || !formData.service || !formData.district) {
      toast.error('Lütfen zorunlu alanları doldurun!')
      return
    }

    setIsSubmitting(true)

    try {
      const message = generateWhatsAppMessage(formData)
      const whatsappNumber = '905551234567' // Replace with actual WhatsApp number
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank')
      
      toast.success('WhatsApp açılıyor... Lütfen mesajı gönderin.')
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          service: '',
          district: '',
          description: '',
          preferredDate: '',
          preferredTime: ''
        })
      }, 2000)
      
    } catch (error) {
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const clearForm = () => {
    setFormData({
      name: '',
      phone: '',
      service: '',
      district: '',
      description: '',
      preferredDate: '',
      preferredTime: ''
    })
    toast.success('Form temizlendi')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 lg:p-8 max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          WhatsApp ile Usta Talebi
        </h2>
        <p className="text-gray-600">
          Formu doldurun, WhatsApp üzerinden direkt iletişime geçin
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Ad Soyad *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300"
              placeholder="Adınız ve soyadınız"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Telefon *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300"
              placeholder="05XX XXX XX XX"
              required
            />
          </div>
        </div>

        {/* Service and District */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔧 Hizmet Türü *
            </label>
            <select
              value={formData.service}
              onChange={(e) => handleInputChange('service', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 appearance-none cursor-pointer"
              required
            >
              <option value="">Hizmet seçin</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              İlçe *
            </label>
            <select
              value={formData.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 appearance-none cursor-pointer"
              required
            >
              <option value="">İlçe seçin</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Tercih Edilen Tarih
            </label>
            <input
              type="date"
              value={formData.preferredDate}
              onChange={(e) => handleInputChange('preferredDate', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              Tercih Edilen Saat
            </label>
            <select
              value={formData.preferredTime}
              onChange={(e) => handleInputChange('preferredTime', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 appearance-none cursor-pointer"
            >
              <option value="">Saat seçin</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📝 Açıklama
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 resize-none"
            placeholder="Hizmet hakkında detaylı bilgi verebilirsiniz..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Gönderiliyor...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>WhatsApp'ta Aç</span>
              </>
            )}
          </motion.button>
          
          <motion.button
            type="button"
            onClick={clearForm}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
          >
            <X className="w-5 h-5" />
            <span>Temizle</span>
          </motion.button>
        </div>
      </form>

      {/* Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Nasıl çalışır?</p>
            <p>Formu doldurduktan sonra WhatsApp uygulaması açılacak ve hazırlanmış mesajı gönderebileceksiniz. Ustalarımız en kısa sürede size dönüş yapacaktır.</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WhatsAppForm 