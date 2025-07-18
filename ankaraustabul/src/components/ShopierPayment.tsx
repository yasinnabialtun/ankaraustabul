import React, { useState, useEffect } from 'react';
import { CreditCard, Lock, Shield, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentDetails {
  amount: number;
  package: 'premium' | 'vip';
  extras: string[];
  totalAmount: number;
}

interface ShopierPaymentProps {
  paymentDetails: PaymentDetails;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

const ShopierPayment: React.FC<ShopierPaymentProps> = ({
  paymentDetails,
  onSuccess,
  onError,
  onCancel
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<'details' | 'payment' | 'processing' | 'success' | 'error'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    bankName: '',
    accountNumber: ''
  });

  // Shopier API entegrasyonu simülasyonu
  const processPayment = async () => {
    setIsLoading(true);
    setCurrentStep('processing');

    try {
      // Simüle edilmiş ödeme işlemi
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Başarılı ödeme simülasyonu (%90 başarı oranı)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        const transactionId = `SHOP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setCurrentStep('success');
        onSuccess(transactionId);
      } else {
        setCurrentStep('error');
        onError('Ödeme işlemi başarısız oldu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      setCurrentStep('error');
      onError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (currentStep === 'success') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ödeme Başarılı!</h3>
            <p className="text-gray-600 mb-6">
              Ödeme işleminiz başarıyla tamamlandı. Usta profiliniz aktif edildi.
            </p>
            <button
              onClick={() => window.location.href = '/ustalar'}
              className="btn-primary w-full"
            >
              Ustalar Sayfasına Git
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'error') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="text-red-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ödeme Başarısız</h3>
            <p className="text-gray-600 mb-6">
              Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setCurrentStep('details')}
                className="btn-secondary flex-1"
              >
                Tekrar Dene
              </button>
              <button
                onClick={onCancel}
                className="btn-primary flex-1"
              >
                İptal Et
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'processing') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="loading-spinner w-8 h-8"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ödeme İşleniyor</h3>
            <p className="text-gray-600">
              Ödeme işleminiz güvenli bir şekilde işleniyor. Lütfen bekleyin...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <CreditCard className="text-primary-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Güvenli Ödeme</h2>
              <p className="text-sm text-gray-600">Shopier ile güvenli ödeme</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Ödeme Özeti */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Ödeme Özeti</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Seçilen Paket:</span>
              <span className="font-medium">
                {paymentDetails.package === 'vip' ? 'VIP İlan' : 'Premium İlan'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Paket Ücreti:</span>
              <span className="font-medium">₺{paymentDetails.package === 'vip' ? '399' : '199'}</span>
            </div>
            {paymentDetails.extras.length > 0 && (
              <div className="flex justify-between">
                <span>Ek Hizmetler:</span>
                <span className="font-medium">₺{paymentDetails.extras.length * 50}</span>
              </div>
            )}
            <div className="border-t pt-2">
              <div className="flex justify-between font-bold">
                <span>Toplam:</span>
                <span className="text-primary-600">₺{paymentDetails.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ödeme Yöntemi Seçimi */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Ödeme Yöntemi</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-3 rounded-lg border-2 transition-colors ${
                paymentMethod === 'card'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <CreditCard size={16} />
                <span className="text-sm font-medium">Kredi Kartı</span>
              </div>
            </button>
            <button
              onClick={() => setPaymentMethod('bank')}
              className={`p-3 rounded-lg border-2 transition-colors ${
                paymentMethod === 'bank'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Shield size={16} />
                <span className="text-sm font-medium">Banka Transferi</span>
              </div>
            </button>
          </div>
        </div>

        {/* Kredi Kartı Formu */}
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kart Numarası
              </label>
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kart Sahibi
                </label>
                <input
                  type="text"
                  value={formData.cardHolder}
                  onChange={(e) => handleInputChange('cardHolder', e.target.value.toUpperCase())}
                  placeholder="AD SOYAD"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Son Kullanma Tarihi
                </label>
                <input
                  type="text"
                  value={formData.expiryMonth + formData.expiryYear}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 2) {
                      handleInputChange('expiryMonth', value);
                    } else {
                      handleInputChange('expiryMonth', value.substring(0, 2));
                      handleInputChange('expiryYear', value.substring(2, 4));
                    }
                  }}
                  placeholder="AA/YY"
                  maxLength={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="text"
                value={formData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                placeholder="123"
                maxLength={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Banka Transferi Formu */}
        {paymentMethod === 'bank' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Banka Bilgileri</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Banka:</span>
                  <span className="font-medium">Garanti BBVA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IBAN:</span>
                  <span className="font-medium">TR12 3456 7890 1234 5678 9012 34</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Alıcı:</span>
                  <span className="font-medium">AnkaraUstaBul A.Ş.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tutar:</span>
                  <span className="font-medium text-primary-600">₺{paymentDetails.totalAmount}</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transfer Açıklaması
              </label>
              <input
                type="text"
                value={`${paymentDetails.package.toUpperCase()}_${Date.now()}`}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">
                Bu açıklamayı transfer işleminde kullanın
              </p>
            </div>
          </div>
        )}

        {/* Güvenlik Bilgileri */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Lock className="text-green-600 mt-0.5" size={16} />
            <div className="text-sm">
              <p className="font-medium text-green-900 mb-1">Güvenli Ödeme</p>
              <p className="text-green-700">
                Shopier SSL sertifikası ile tüm ödeme bilgileriniz şifrelenerek korunmaktadır.
              </p>
            </div>
          </div>
        </div>

        {/* Ödeme Butonu */}
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="btn-secondary flex-1"
            disabled={isLoading}
          >
            İptal Et
          </button>
          <button
            onClick={processPayment}
            disabled={isLoading || (paymentMethod === 'card' && (!formData.cardNumber || !formData.cardHolder || !formData.expiryMonth || !formData.cvv))}
            className="btn-primary flex-1"
          >
            {isLoading ? 'İşleniyor...' : `₺${paymentDetails.totalAmount} Öde`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopierPayment; 