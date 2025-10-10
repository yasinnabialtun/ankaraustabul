'use client'

import { useState } from 'react'
import { CreditCard, Lock, CheckCircle, X, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PaymentModalProps {
  open: boolean
  onClose: () => void
  amount: number
  packageName: string
  onPaymentSuccess: () => void
}

export default function PaymentModal({
  open,
  onClose,
  amount,
  packageName,
  onPaymentSuccess
}: PaymentModalProps) {
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<'shopier' | 'bank-transfer'>('shopier')
  const [loading, setLoading] = useState(false)
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    phone: ''
  })

  if (!open) return null

  const handlePayment = async () => {
    setLoading(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate success
      setStep(3)
      onPaymentSuccess()
    } catch (error) {
      console.error('Payment error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleShopierPayment = () => {
    // Shopier payment integration
    const shopierData = {
      amount: amount,
      package: packageName,
      user_email: paymentData.email,
      user_phone: paymentData.phone
    }
    
    // In real implementation, this would redirect to Shopier
    console.log('Shopier payment data:', shopierData)
    handlePayment()
  }

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiryDate = (value: string) => {
    return value.replace(/\D/g, '').replace(/(.{2})/, '$1/')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Ödeme</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Package Info */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{packageName}</CardTitle>
              <CardDescription>Paket detayları</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">₺{amount}</span>
                <Badge variant="secondary">Aylık</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Step 1: Payment Method */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Ödeme Yöntemi Seçin</h3>
              
              <div className="space-y-3">
                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'shopier' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('shopier')}
                >
                  <div className="flex items-center">
                    <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium">Kredi/Banka Kartı</div>
                      <div className="text-sm text-gray-500">Shopier ile güvenli ödeme</div>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'bank-transfer' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('bank-transfer')}
                >
                  <div className="flex items-center">
                    <Lock className="w-6 h-6 text-green-600 mr-3" />
                    <div>
                      <div className="font-medium">Banka Havalesi</div>
                      <div className="text-sm text-gray-500">Manuel onay gerekir</div>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                className="w-full"
                disabled={!paymentMethod}
              >
                Devam Et
              </Button>
            </div>
          )}

          {/* Step 2: Payment Details */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Ödeme Bilgileri</h3>
              
              {paymentMethod === 'shopier' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta
                    </label>
                    <Input
                      type="email"
                      value={paymentData.email}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="ornek@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <Input
                      type="tel"
                      value={paymentData.phone}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+90 5XX XXX XX XX"
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Lock className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm text-blue-800">
                        Shopier güvenli ödeme sistemi kullanılacak
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                      <span className="text-sm text-yellow-800">
                        Banka havalesi bilgileri e-posta ile gönderilecek
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta
                    </label>
                    <Input
                      type="email"
                      value={paymentData.email}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Geri
                </Button>
                <Button
                  onClick={paymentMethod === 'shopier' ? handleShopierPayment : handlePayment}
                  className="flex-1"
                  disabled={loading || !paymentData.email}
                >
                  {loading ? 'İşleniyor...' : 'Ödeme Yap'}
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Ödeme Başarılı!</h3>
                <p className="text-gray-600">
                  {packageName} paketiniz aktif edildi.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  Paket detayları e-posta ile gönderildi. 
                  Premium özellikleriniz hemen kullanıma hazır!
                </p>
              </div>

              <Button
                onClick={onClose}
                className="w-full"
              >
                Tamam
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
