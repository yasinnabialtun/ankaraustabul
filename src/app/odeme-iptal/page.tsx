'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { XCircle, ArrowLeft, RefreshCw, Home, Phone, Mail, AlertTriangle, CreditCard, Shield, Clock } from 'lucide-react'

export default function OdemeIptalPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(15)

  useEffect(() => {
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

  const handleRetryPayment = () => {
    router.push('/odeme')
  }

  const handleGoHome = () => {
    router.push('/')
  }

  const handleGoToUstalar = () => {
    router.push('/ustalar')
  }

  const commonReasons = [
    {
      icon: CreditCard,
      title: 'Kart Bilgileri Hatalı',
      description: 'Kart numarası, son kullanma tarihi veya CVV kodu yanlış girilmiş olabilir'
    },
    {
      icon: Shield,
      title: 'Güvenlik Kontrolü',
      description: 'Banka tarafından güvenlik kontrolü nedeniyle işlem reddedilmiş olabilir'
    },
    {
      icon: Clock,
      title: 'Zaman Aşımı',
      description: 'İşlem süresi dolmuş olabilir, lütfen tekrar deneyin'
    }
  ]

  const supportOptions = [
    {
      icon: Phone,
      title: 'Telefon Desteği',
      description: '7/24 müşteri hizmetleri',
      action: 'Ara',
      contact: '+90 312 123 45 67'
    },
    {
      icon: Mail,
      title: 'E-posta Desteği',
      description: 'Detaylı yardım için',
      action: 'E-posta Gönder',
      contact: 'destek@ankaraustabul.com'
    }
  ]

  return (
    <>
      <Head>
        <title>Ödeme İptal - Ankara Usta Bul</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="Ödeme iptal edildi" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Error Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <XCircle className="w-12 h-12 text-red-500" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Ödeme İptal Edildi
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Ödeme işleminiz tamamlanamadı. Endişelenmeyin, hiçbir ücret alınmadı.
            </motion.p>

            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="text-center">
                <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-2">İşlem Durumu</p>
                <p className="text-lg font-bold text-red-600">Ödeme Başarısız</p>
                <p className="text-sm text-gray-500 mt-2">
                  Hiçbir ücret hesabınızdan çekilmedi
                </p>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Common Reasons */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Olası Nedenler</h2>
              
              <div className="space-y-4">
                {commonReasons.map((reason, index) => {
                  const Icon = reason.icon
                  return (
                    <motion.div
                      key={index}
                      className="flex items-start p-4 border border-gray-200 rounded-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    >
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <Icon className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{reason.title}</h3>
                        <p className="text-sm text-gray-600">{reason.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* What to do next */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ne Yapmalısınız?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Kart bilgilerinizi kontrol edin</li>
                  <li>• Kart limitinizi kontrol edin</li>
                  <li>• İnternet bağlantınızı kontrol edin</li>
                  <li>• Farklı bir kart deneyin</li>
                  <li>• Bankanızla iletişime geçin</li>
                </ul>
              </div>
            </motion.div>

            {/* Actions & Support */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {/* Retry Payment */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tekrar Deneyin</h2>
                
                <div className="space-y-4">
                  <button 
                    onClick={handleRetryPayment}
                    className="w-full flex items-center justify-center space-x-3 bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Ödemeyi Tekrar Dene</span>
                  </button>
                  
                  <button 
                    onClick={handleGoToUstalar}
                    className="w-full flex items-center justify-center space-x-3 border border-gray-300 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Ustalar Sayfasına Dön</span>
                  </button>
                  
                  <button 
                    onClick={handleGoHome}
                    className="w-full flex items-center justify-center space-x-3 border border-gray-300 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                  >
                    <Home className="w-5 h-5" />
                    <span>Ana Sayfaya Git</span>
                  </button>
                </div>
              </div>

              {/* Customer Support */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Yardıma mı İhtiyacınız Var?</h2>
                
                <div className="space-y-4">
                  {supportOptions.map((option, index) => {
                    const Icon = option.icon
                    return (
                      <motion.div
                        key={index}
                        className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                        onClick={() => {
                          if (option.contact.startsWith('+90')) {
                            window.open(`tel:${option.contact}`)
                          } else {
                            window.open(`mailto:${option.contact}`)
                          }
                        }}
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{option.title}</h3>
                          <p className="text-sm text-gray-600">{option.description}</p>
                          <p className="text-sm font-medium text-blue-600">{option.contact}</p>
                        </div>
                        <span className="text-blue-600 font-semibold">{option.action}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Güvenlik Garantisi</h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Tüm ödeme işlemleri SSL ile korunmaktadır</li>
                  <li>• Kart bilgileriniz saklanmamaktadır</li>
                  <li>• Başarısız işlemlerde hiçbir ücret alınmaz</li>
                  <li>• 7/24 güvenlik izleme sistemi aktif</li>
                </ul>
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
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold">{countdown}</span>
                </div>
                <span className="text-gray-600">saniye</span>
              </div>
              <button 
                onClick={handleGoHome}
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
