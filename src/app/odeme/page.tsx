'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import Head from 'next/head'
import PackageSelector from '@/components/payment/PackageSelector'
import { shopierProductService } from '@/services/shopierProductService'

function OdemePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPackage, setSelectedPackage] = useState('temel-usta')
  const [packagePrice, setPackagePrice] = useState(99)

  // Mock data - gerçek uygulamada API'den gelecek
  const [orderData, setOrderData] = useState({
    ustaId: 'usta-123',
    ustaName: 'Ahmet Yılmaz',
    serviceType: 'Elektrik Hizmeti',
    amount: 150,
    appointmentDate: '25 Ocak 2024',
    appointmentTime: '14:00',
    ustaPhone: '+90 532 123 45 67',
    ustaEmail: 'ahmet.yilmaz@email.com',
    ustaRating: 4.9,
    ustaExperience: '5 yıl deneyim',
    ustaLocation: 'Çankaya, Ankara'
  })

  useEffect(() => {
    // URL parametrelerinden sipariş bilgilerini al
    const ustaId = searchParams.get('ustaId')
    const serviceType = searchParams.get('serviceType')
    const amount = searchParams.get('amount')
    const date = searchParams.get('date')
    const time = searchParams.get('time')
    const address = searchParams.get('address')
    
    if (!ustaId || !serviceType || !amount) {
      setError('Eksik sipariş bilgileri')
      setIsLoading(false)
      return
    }

    // Mock data güncelleme
    setOrderData(prev => ({
      ...prev,
      ustaId,
      serviceType,
      amount: parseFloat(amount),
      appointmentDate: date || prev.appointmentDate,
      appointmentTime: time || prev.appointmentTime,
      ustaLocation: address || prev.ustaLocation
    }))
    
    setIsLoading(false)
  }, [searchParams])

  const handlePaymentSuccess = (orderId: string) => {
    // Shopier linkine yönlendir
    const shopierUrl = shopierProductService.createPaymentLink(selectedPackage, {
      ustaId: orderData.ustaId,
      serviceType: orderData.serviceType,
      appointmentDate: orderData.appointmentDate,
      appointmentTime: orderData.appointmentTime,
      name: 'Müşteri', // Form'dan gelecek
      email: 'musteri@example.com', // Form'dan gelecek
      phone: '+90 532 123 45 67' // Form'dan gelecek
    })
    
    // Shopier'e yönlendir
    window.location.href = shopierUrl
  }


  const handlePackageSelect = (packageId: string, price: number) => {
    setSelectedPackage(packageId)
    setPackagePrice(price)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ödeme sayfası yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error && !orderData.ustaId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Hata</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => router.push('/ustalar')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ustalar Sayfasına Dön
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Ödeme - Ankara Usta Bul</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="Güvenli ödeme sayfası" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            className="flex items-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button 
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Geri Dön
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Paket Seçimi</h1>
              <p className="text-gray-600">İhtiyacınıza uygun paketi seçin ve Shopier ile güvenli ödeme yapın</p>
            </div>
          </motion.div>

          {/* Package Selection */}
          <div className="mb-8">
            <PackageSelector
              onPackageSelect={handlePackageSelect}
              selectedPackage={selectedPackage}
            />
          </div>

          {/* Payment Button */}
          <div className="text-center">
            <motion.button
              onClick={() => handlePaymentSuccess('direct-shopier')}
              className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>₺{packagePrice} - Shopier ile Ödeme Yap</span>
            </motion.button>
            
            <p className="text-sm text-gray-600 mt-4">
              Güvenli ödeme için Shopier sayfasına yönlendirileceksiniz
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default function OdemePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    }>
      <OdemePageContent />
    </Suspense>
  )
}