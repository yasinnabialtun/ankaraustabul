import React, { useState } from 'react';
import { shopierService } from '../services/shopierService';
import { Users, Star, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface ShopierPaymentProps {
  selectedPackage: 'BASIC' | 'PREMIUM';
  onPaymentSuccess?: () => void;
  onPaymentError?: (error: string) => void;
}

const ShopierPayment: React.FC<ShopierPaymentProps> = ({
  selectedPackage,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setPaymentStatus('processing');

      console.log('💳 Ödeme başlatılıyor:', selectedPackage);

      const success = await shopierService.processPayment(selectedPackage);

      if (success) {
        setPaymentStatus('success');
        console.log('✅ Ödeme başarılı');
        onPaymentSuccess?.();
      } else {
        setPaymentStatus('error');
        console.error('❌ Ödeme başarısız');
        onPaymentError?.('Ödeme işlemi başarısız oldu');
      }

    } catch (error) {
      setPaymentStatus('error');
      console.error('❌ Ödeme hatası:', error);
      onPaymentError?.('Ödeme sırasında bir hata oluştu');
    } finally {
      setIsProcessing(false);
    }
  };

  const getPackageInfo = (packageType: 'BASIC' | 'PREMIUM') => {
    switch (packageType) {
      case 'BASIC':
        return {
          name: 'Temel Usta Kayıt',
          price: 99,
          icon: <Users className="w-6 h-6" />,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
      case 'PREMIUM':
        return {
          name: 'Öne Çıkan Usta Kayıt',
          price: 299,
          icon: <Star className="w-6 h-6" />,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
    }
  };

  const packageInfo = getPackageInfo(selectedPackage);

  return (
    <div className="max-w-md mx-auto">
      {/* Paket Bilgisi */}
      <div className={`p-6 rounded-xl border-2 ${packageInfo.bgColor} ${packageInfo.borderColor} mb-6`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${packageInfo.bgColor}`}>
            {packageInfo.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{packageInfo.name}</h3>
            <p className="text-2xl font-bold text-gray-900">{packageInfo.price} TL/ay</p>
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>Shopier güvenli ödeme sistemi ile ödeme yapın</p>
        </div>
      </div>

      {/* Ödeme Butonu */}
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
        }`}
      >
        {isProcessing ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            İşleniyor...
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" />
            Güvenli Ödeme Yap
          </>
        )}
      </button>

      {/* Durum Mesajları */}
      {paymentStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle className="w-5 h-5" />
            <span>Ödeme başlatıldı! Yeni sekmede Shopier sayfası açılacak.</span>
          </div>
        </div>
      )}

      {paymentStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="w-5 h-5" />
            <span>Ödeme sırasında bir hata oluştu. Lütfen tekrar deneyin.</span>
          </div>
        </div>
      )}

      {/* Güvenlik Bilgisi */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>256-bit SSL güvenlik sertifikası</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Ödeme bilgileriniz güvenle korunmaktadır
        </p>
      </div>
    </div>
  );
};

export default ShopierPayment; 