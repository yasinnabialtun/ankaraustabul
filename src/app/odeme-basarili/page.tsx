'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { CheckCircle, Download, Mail, Phone, MapPin, Calendar, Clock, Star, ArrowRight, Home, User, FileText, MessageCircle } from 'lucide-react'

interface PaymentSuccessData {
  orderId: string
  ustaName: string
  serviceType: string
  amount: number
  date: string
  time: string
  address: string
  ustaPhone: string
  ustaEmail: string
  estimatedDuration: string
}

export default function OdemeBasariliPage() {
  const router = useRouter()
  const [paymentData, setPaymentData] = useState<PaymentSuccessData | null>(null)
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    // Mock data - gerçek uygulamada URL params veya state'den gelecek
    setPaymentData({
      orderId: `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      ustaName: 'Ahmet Yılmaz',
      serviceType: 'Elektrik Hizmeti',
      amount: 150,
      date: '25 Ocak 2024',
      time: '14:00',
      address: 'Çankaya, Ankara',
      ustaPhone: '+90 532 123 45 67',
      ustaEmail: 'ahmet.yilmaz@email.com',
      estimatedDuration: '2 saat'
    })

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/ustalar')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleDownloadReceipt = () => {
    // PDF receipt download functionality
    console.log('Receipt download initiated')
  }

  const handleContactUsta = () => {
    window.open(`tel:${paymentData?.ustaPhone}`)
  }

  const handleMessageUsta = () => {
    const message = `Merhaba ${paymentData?.ustaName}, ${paymentData?.orderId} numaralı siparişim hakkında bilgi almak istiyorum.`
    window.open(`https://wa.me/905321234567?text=${encodeURIComponent(message)}`)
  }

  const nextSteps = [
    {
      icon: Phone,
      title: 'Usta ile İletişim',
      description: 'Usta ile doğrudan iletişime geçin',
      action: 'Ara',
      onClick: handleContactUsta
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Mesaj',
      description: 'WhatsApp üzerinden mesaj gönderin',
      action: 'Mesaj Gönder',
      onClick: handleMessageUsta
    },
    {
      icon: FileText,
      title: 'Fatura İndir',
      description: 'Ödeme faturanızı indirin',
      action: 'İndir',
      onClick: handleDownloadReceipt
    }
  ]

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ödeme bilgileri yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Ödeme Başarılı - Ankara Usta Bul</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="Ödeme başarıyla tamamlandı" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CheckCircle className="w-12 h-12 text-green-500" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Ödeme Başarılı!
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Siparişiniz başarıyla oluşturuldu ve ödemeniz alındı
            </motion.p>

            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Sipariş Numarası</p>
                <p className="text-2xl font-bold text-blue-600">{paymentData.orderId}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Bu numarayı saklayın, usta ile iletişimde kullanacaksınız
                </p>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sipariş Detayları</h2>
              
              {/* Usta Info */}
              <div className="flex items-center mb-6 p-4 bg-blue-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                  {paymentData.ustaName.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{paymentData.ustaName}</h3>
                  <p className="text-blue-600 font-medium">{paymentData.serviceType}</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.9 (127 değerlendirme)</span>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Tarih ve Saat</p>
                    <p className="font-semibold text-gray-900">{paymentData.date} - {paymentData.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Adres</p>
                    <p className="font-semibold text-gray-900">{paymentData.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Tahmini Süre</p>
                    <p className="font-semibold text-gray-900">{paymentData.estimatedDuration}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Usta İletişim</p>
                    <p className="font-semibold text-gray-900">{paymentData.ustaPhone}</p>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ödeme Özeti</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hizmet Ücreti</span>
                    <span className="font-semibold">₺{paymentData.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">KDV</span>
                    <span className="font-semibold">₺{(paymentData.amount * 0.18).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-lg font-bold text-gray-900">Toplam</span>
                    <span className="text-lg font-bold text-green-600">₺{(paymentData.amount * 1.18).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Sonraki Adımlar</h2>
                
                <div className="space-y-4">
                  {nextSteps.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <motion.div
                        key={index}
                        className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                        onClick={step.onClick}
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{step.title}</h3>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">Önemli Notlar</h3>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li>• Usta ile iletişim bilgileri e-posta ile gönderilecek</li>
                  <li>• İş başlamadan önce usta ile detayları konuşun</li>
                  <li>• Herhangi bir sorun yaşarsanız müşteri hizmetlerimizi arayın</li>
                  <li>• İş tamamlandıktan sonra değerlendirme yapmayı unutmayın</li>
                </ul>
              </div>

              {/* Customer Support */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Müşteri Desteği</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Herhangi bir sorunuz veya sorununuz varsa 7/24 müşteri hizmetlerimizle iletişime geçebilirsiniz.
                </p>
                <div className="flex space-x-4">
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>Destek Ara</span>
                  </button>
                  <button className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>E-posta Gönder</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Auto Redirect Notice */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
              <p className="text-gray-600 mb-4">
                Ana sayfaya yönlendiriliyorsunuz...
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">{countdown}</span>
                </div>
                <span className="text-gray-600">saniye</span>
              </div>
              <button 
                onClick={() => router.push('/ustalar')}
                className="mt-4 flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Ana Sayfaya Git</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  )
}
