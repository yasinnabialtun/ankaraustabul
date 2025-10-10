'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, AlertCircle, Upload, User, Building, Wrench, DollarSign } from 'lucide-react'

export default function UstaEklePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    phone: '',
    email: '',
    
    // Business Information
    category: '',
    district: '',
    address: '',
    
    // Service Details
    description: '',
    experience: '',
    workingHours: '',
    
    // Pricing
    hourlyRate: '',
    minimumHours: '',
    
    // Additional
    languages: ''
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitStatus('success')
      setIsSubmitting(false)
      
      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/ustalar')
      }, 3000)
    } catch (error) {
      setSubmitStatus('error')
      setIsSubmitting(false)
    }
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.phone && formData.email
      case 2:
        return formData.category && formData.district && formData.address
      case 3:
        return formData.description && formData.experience
      case 4:
        return formData.hourlyRate
      default:
        return false
    }
  }

  const steps = [
    { number: 1, title: 'Kişisel Bilgiler', icon: User },
    { number: 2, title: 'İşletme Bilgileri', icon: Building },
    { number: 3, title: 'Hizmet Detayları', icon: Wrench },
    { number: 4, title: 'Fiyatlandırma', icon: DollarSign }
  ]

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Başvuru Başarılı!</h2>
          <p className="text-gray-600 mb-6">
            Başvurunuz alındı. Bilgileriniz incelendikten sonra platformda görüneceksiniz.
          </p>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600">
              Onay süreci 1-2 iş günü sürmektedir. E-posta ile bilgilendirileceksiniz.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Usta Ekle</h1>
            <p className="text-xl text-gray-600">İşletmenizi platformumuza ekleyin ve daha fazla müşteriye ulaşın</p>
          </div>

          {/* Progress Steps */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = currentStep === step.number
                const isCompleted = currentStep > step.number
                const isValid = isStepValid(step.number)
                
                return (
                  <div key={step.number} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      isCompleted || (isActive && isValid)
                        ? 'bg-green-500 text-white'
                        : isActive
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${
                      isActive ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Kişisel Bilgiler</h3>
                
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
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ad Soyad"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+90 5XX XXX XX XX"
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
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Business Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">İşletme Bilgileri</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hizmet Kategorisi *
                    </label>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required 
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Kategori seçin</option>
                      <option value="elektrik">Elektrik</option>
                      <option value="su-tesisati">Su Tesisatı</option>
                      <option value="temizlik">Temizlik</option>
                      <option value="mobilya">Mobilya</option>
                      <option value="tadilat">Tadilat</option>
                      <option value="klima">Klima</option>
                      <option value="boya">Boya Badana</option>
                      <option value="insaat">İnşaat</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hizmet Verdiğiniz İlçe *
                    </label>
                    <select 
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      required 
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">İlçe seçin</option>
                      <option value="cankaya">Çankaya</option>
                      <option value="kecioren">Keçiören</option>
                      <option value="yenimahalle">Yenimahalle</option>
                      <option value="mamak">Mamak</option>
                      <option value="sincan">Sincan</option>
                      <option value="etimesgut">Etimesgut</option>
                      <option value="altindag">Altındağ</option>
                      <option value="pursaklar">Pursaklar</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adres *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tam adres"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Service Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Hizmet Detayları</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hizmet Açıklaması *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="İşletmeniz hakkında detaylı bilgi verin, hangi hizmetleri sunduğunuzu açıklayın"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deneyim Süresi *
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="örn: 5 yıl"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Çalışma Saatleri
                    </label>
                    <input
                      type="text"
                      name="workingHours"
                      value={formData.workingHours}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="örn: 09:00 - 18:00"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* Step 4: Package Selection */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Paket Seçimi</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Free Package */}
                  <div className="border-2 border-gray-200 rounded-lg p-6">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Ücretsiz</h4>
                      <div className="text-3xl font-bold text-gray-900 mb-4">₺0</div>
                      <ul className="text-sm text-gray-600 space-y-2 mb-6">
                        <li>• Temel profil</li>
                        <li>• 5 fotoğraf</li>
                        <li>• Temel arama</li>
                        <li>• Müşteri iletişimi</li>
                      </ul>
                      <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        Seç
                      </button>
                    </div>
                  </div>

                  {/* Premium Package */}
                  <div className="border-2 border-blue-500 rounded-lg p-6 relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Popüler
                      </span>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Premium</h4>
                      <div className="text-3xl font-bold text-blue-600 mb-4">₺299</div>
                      <ul className="text-sm text-gray-600 space-y-2 mb-6">
                        <li>• Öne çıkan profil</li>
                        <li>• Sınırsız fotoğraf</li>
                        <li>• Öncelikli arama</li>
                        <li>• Premium rozet</li>
                        <li>• Detaylı istatistikler</li>
                        <li>• Özel destek</li>
                      </ul>
                      <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Seç
                      </button>
                    </div>
                  </div>

                  {/* Pro Package */}
                  <div className="border-2 border-purple-200 rounded-lg p-6">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Pro</h4>
                      <div className="text-3xl font-bold text-purple-600 mb-4">₺599</div>
                      <ul className="text-sm text-gray-600 space-y-2 mb-6">
                        <li>• Tüm Premium özellikler</li>
                        <li>• Reklam kampanyaları</li>
                        <li>• Özel logo tasarımı</li>
                        <li>• API erişimi</li>
                        <li>• Öncelikli müşteri desteği</li>
                        <li>• Özel raporlar</li>
                      </ul>
                      <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        Seç
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-2">Paket Avantajları</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Premium paketler daha fazla müşteriye ulaşmanızı sağlar</li>
                    <li>• Öne çıkan profiller arama sonuçlarında üstte görünür</li>
                    <li>• Tüm paketler aylık olarak faturalandırılır</li>
                    <li>• İstediğiniz zaman paket değiştirebilirsiniz</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Önceki
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    isStepValid(currentStep)
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Sonraki
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !isStepValid(currentStep)}
                  className={`px-8 py-3 rounded-lg font-medium ${
                    isSubmitting || !isStepValid(currentStep)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Başvuruyu Tamamla'}
                </button>
              )}
            </div>

            {submitStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700">Bir hata oluştu. Lütfen tekrar deneyin.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}