import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Download, Mail, Phone, ArrowRight, AlertCircle } from 'lucide-react';
import shopierService from '../services/shopierService';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transactionId = searchParams.get('transactionId');
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!transactionId) {
        setError('İşlem ID bulunamadı');
        setIsLoading(false);
        return;
      }

      try {
        const status = await shopierService.checkPaymentStatus(transactionId);
        setPaymentStatus(status);
      } catch (err) {
        setError('Ödeme durumu kontrol edilemedi');
      } finally {
        setIsLoading(false);
      }
    };

    checkPaymentStatus();
  }, [transactionId]);

  const handleDownloadReceipt = () => {
    if (!paymentStatus) return;

    const receiptContent = `
      ÖDEME MAKBUZU
      ===============
      
      İşlem No: ${paymentStatus.transactionId}
      Sipariş No: ${orderId || 'N/A'}
      Tarih: ${new Date().toLocaleDateString('tr-TR')}
      Saat: ${new Date().toLocaleTimeString('tr-TR')}
      
      Durum: ${paymentStatus.status === 'completed' ? 'BAŞARILI' : 'BEKLEMEDE'}
      Tutar: ${shopierService.formatCurrency(paymentStatus.amount || 0)}
      
      Bu makbuz elektronik ortamda oluşturulmuştur.
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `makbuz-${paymentStatus.transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent('Ödeme Makbuzu');
    const body = encodeURIComponent(`
      Ödeme işleminiz başarıyla tamamlanmıştır.
      
      İşlem Detayları:
      - İşlem No: ${paymentStatus?.transactionId || 'N/A'}
      - Tutar: ${shopierService.formatCurrency(paymentStatus?.amount || 0)}
      - Tarih: ${new Date().toLocaleDateString('tr-TR')}
      
      Teşekkürler.
    `);
    
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ödeme durumu kontrol ediliyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Hata Oluştu</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  if (!paymentStatus || paymentStatus.status !== 'completed') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Ödeme Beklemede</h1>
          <p className="text-gray-600 mb-8">
            Ödeme işleminiz henüz tamamlanmadı. Lütfen biraz bekleyin.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Ödeme Başarılı!</h1>
            <p className="text-gray-600">
              İşleminiz başarıyla tamamlandı. Makbuzunuz aşağıda yer almaktadır.
            </p>
          </div>

          {/* Transaction Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <span className="text-sm text-gray-500">İşlem Numarası</span>
                <p className="font-semibold text-gray-800">{paymentStatus.transactionId}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Sipariş Numarası</span>
                <p className="font-semibold text-gray-800">{orderId || 'N/A'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Tarih</span>
                <p className="font-semibold text-gray-800">
                  {new Date().toLocaleDateString('tr-TR')}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Tutar</span>
                <p className="font-semibold text-gray-800 text-xl">
                  {shopierService.formatCurrency(paymentStatus.amount || 0)}
                </p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-500">Durum</span>
              <p className="font-semibold text-green-600">Başarılı</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={handleDownloadReceipt}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Makbuz İndir</span>
            </button>
            
            <button
              onClick={handleSendEmail}
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>E-posta Gönder</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors">
              <Phone className="w-4 h-4" />
              <span>Destek Ara</span>
            </button>
          </div>

          {/* Security Notice */}
          <div className="bg-green-50 rounded-xl p-4 mb-8">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-green-800 mb-1">Güvenli İşlem</h4>
                <p className="text-sm text-green-700">
                  Ödeme işleminiz SSL şifreleme ile güvenli bir şekilde gerçekleştirilmiştir. 
                  İşlem detayları e-posta adresinize gönderilmiştir.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Ana Sayfaya Dön</span>
            </Link>
            
            <Link
              to="/ustalar"
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <span>Usta Bul</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Herhangi bir sorunuz varsa <strong>0850 123 45 67</strong> numaralı telefondan bize ulaşabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess; 