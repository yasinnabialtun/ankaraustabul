import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Lock, Shield, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import paymentService from '../../services/paymentService';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  packageName: string;
  amount: number;
  packageId: string;
  userId?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  url: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  packageName,
  amount,
  packageId,
  userId,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'shopier',
      name: 'Shopier',
      icon: CreditCard,
      description: 'Güvenli online ödeme',
      url: `https://www.shopier.com/s/payment/${packageId}`,
    },
    {
      id: 'bank-transfer',
      name: 'Banka Havalesi',
      icon: Shield,
      description: 'Manuel banka transferi',
      url: '',
    },
    {
      id: 'crypto',
      name: 'Kripto Para',
      icon: Lock,
      description: 'Bitcoin, Ethereum',
      url: '',
    },
  ];

  const handlePayment = async () => {
    if (!selectedMethod) {
      setError('Lütfen bir ödeme yöntemi seçin');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const method = paymentMethods.find(m => m.id === selectedMethod);
      
      if (!method) {
        throw new Error('Geçersiz ödeme yöntemi');
      }

      // Ödeme kaydı oluştur
      let paymentId = '';
      if (userId) {
        paymentId = await paymentService.createPayment({
          userId,
          packageId,
          packageName,
          amount,
          paymentMethod: selectedMethod as 'shopier' | 'bank-transfer' | 'crypto',
        });
      }

      if (method.id === 'shopier') {
        // Shopier ödeme sayfasına yönlendir
        const paymentWindow = window.open(method.url, '_blank', 'width=800,height=600');
        
        if (paymentWindow) {
          // Ödeme penceresi açıldı, kullanıcıya bilgi ver
          showPaymentInfo(paymentId);
        } else {
          throw new Error('Popup engellendi. Lütfen popup engelleyiciyi kapatın.');
        }
      } else if (method.id === 'bank-transfer') {
        // Banka havalesi bilgilerini göster
        showBankTransferInfo(paymentId);
      } else if (method.id === 'crypto') {
        // Kripto ödeme bilgilerini göster
        showCryptoInfo(paymentId);
      }

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ödeme işlemi başlatılamadı');
    } finally {
      setIsProcessing(false);
    }
  };

  const showPaymentInfo = (paymentId: string) => {
    // Toast mesajı göster
    if (window.showToast) {
      window.showToast({
        type: 'info',
        title: 'Ödeme Sayfası Açıldı',
        message: 'Ödeme tamamlandıktan sonra kaydınız otomatik olarak aktif olacaktır.'
      });
    }

    // Ödeme ID'sini localStorage'a kaydet
    localStorage.setItem('pendingPayment', JSON.stringify({
      type: 'shopier',
      paymentId,
      packageId,
      amount,
      timestamp: new Date().toISOString(),
    }));
  };

  const showBankTransferInfo = (paymentId: string) => {
    // Banka havalesi modal'ı göster
    const bankInfo = {
      bankName: 'Garanti BBVA',
      accountName: 'ANKARA USTA BUL',
      iban: 'TR12 3456 7890 1234 5678 9012 34',
      amount: amount,
      description: `Usta Kaydı - ${packageName}`,
    };

    // Banka bilgilerini localStorage'a kaydet
    localStorage.setItem('pendingPayment', JSON.stringify({
      type: 'bank-transfer',
      paymentId,
      packageId,
      amount,
      timestamp: new Date().toISOString(),
    }));

    // Banka bilgileri modal'ını göster
    showBankInfoModal(bankInfo);
  };

  const showCryptoInfo = (paymentId: string) => {
    // Kripto ödeme bilgilerini göster
    const cryptoInfo = {
      bitcoin: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      ethereum: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      amount: amount,
    };

    // Kripto bilgilerini localStorage'a kaydet
    localStorage.setItem('pendingPayment', JSON.stringify({
      type: 'crypto',
      paymentId,
      packageId,
      amount,
      timestamp: new Date().toISOString(),
    }));

    // Kripto bilgileri modal'ını göster
    showCryptoInfoModal(cryptoInfo);
  };

  const showBankInfoModal = (bankInfo: any) => {
    // Basit alert ile göster (gerçek uygulamada modal kullanılır)
    alert(`
Banka Havalesi Bilgileri:
      
Banka: ${bankInfo.bankName}
Hesap Sahibi: ${bankInfo.accountName}
IBAN: ${bankInfo.iban}
Tutar: ${bankInfo.amount} TL
Açıklama: ${bankInfo.description}

Havale yaptıktan sonra dekontunuzu info@ankaraustabul.com adresine gönderin.
    `);
  };

  const showCryptoInfoModal = (cryptoInfo: any) => {
    // Basit alert ile göster (gerçek uygulamada modal kullanılır)
    alert(`
Kripto Para Ödeme Bilgileri:
      
Bitcoin Adresi: ${cryptoInfo.bitcoin}
Ethereum Adresi: ${cryptoInfo.ethereum}
Tutar: ${cryptoInfo.amount} TL (USD karşılığı)

Ödeme yaptıktan sonra işlem hash'inizi info@ankaraustabul.com adresine gönderin.
    `);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Ödeme</h2>
                  <p className="text-xs text-gray-600 mt-1">
                    {packageName} paketi - {amount} TL
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 overflow-hidden flex flex-col">
              {/* Payment Methods */}
              <div className="space-y-2 mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Ödeme Yöntemi Seçin</h3>
                
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.id}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          selectedMethod === method.id ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-4 h-4 ${
                            selectedMethod === method.id ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{method.name}</h4>
                          <p className="text-xs text-gray-600">{method.description}</p>
                        </div>
                        {selectedMethod === method.id && (
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-3 h-3 text-red-600" />
                    <span className="text-xs text-red-700">{error}</span>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-medium text-green-800">Güvenli Ödeme</h4>
                    <p className="text-xs text-green-700 mt-1">
                      Tüm ödeme işlemleriniz SSL şifreleme ile korunmaktadır.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 mt-auto">
                <button
                  onClick={onClose}
                  className="flex-1 px-3 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors text-sm"
                >
                  İptal
                </button>
                <button
                  onClick={handlePayment}
                  disabled={!selectedMethod || isProcessing}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>İşleniyor...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-3 h-3" />
                      <span>Ödeme Yap</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
