import { useState } from 'react';
import { Link } from 'react-router-dom';
import ShopierPayment from '../components/ShopierPayment';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

function TestPayment() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState('');

  const handlePaymentSuccess = (transactionId: string) => {
    setTransactionId(transactionId);
    setIsSuccess(true);
  };

  const handlePaymentError = (error: string) => {
    setError(error);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Test Ödemesi Başarılı!</h1>
          <p className="text-gray-600 mb-6">
            Test ödeme işleminiz başarıyla tamamlandı.
          </p>
          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-green-700">
              <strong>İşlem ID:</strong> {transactionId}
            </p>
            <p className="text-sm text-green-700">
              <strong>Tutar:</strong> 177,00 ₺
            </p>
          </div>
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center text-blue-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Ana Sayfaya Dön
            </Link>
            <h1 className="text-2xl font-bold">Ödeme Test Sayfası</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </section>

      {/* Test Payment Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Test Information */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Test Bilgileri</h2>
                
                <div className="space-y-6">
                  {/* Test Card */}
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-4">Test Kartı Bilgileri</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kart Numarası:</span>
                        <span className="font-mono font-semibold">4111 1111 1111 1111</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Son Kullanma:</span>
                        <span className="font-semibold">12/25</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">CVV:</span>
                        <span className="font-semibold">123</span>
                      </div>
                    </div>
                  </div>

                  {/* Test Details */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800">Test Detayları</h4>
                    
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Test Türü</span>
                        <span className="font-semibold text-gray-800">Shopier API Test</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Test Tutarı</span>
                        <span className="font-semibold text-gray-800">177,00 ₺</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Test Açıklaması</span>
                        <span className="font-semibold text-gray-800">Test Ödemesi</span>
                      </div>
                    </div>

                    <div className="bg-yellow-50 rounded-xl p-4">
                      <h5 className="font-semibold text-yellow-800 mb-2">Test Notları</h5>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Bu bir test ödemesidir</li>
                        <li>• Gerçek para çekilmez</li>
                        <li>• API entegrasyonu test edilir</li>
                        <li>• Geliştirme ortamında simülasyon</li>
                      </ul>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Test Talimatları</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>1. Sağdaki ödeme formunu doldurun</p>
                      <p>2. Test kartı bilgilerini kullanın</p>
                      <p>3. "177,00 ₺ Öde" butonuna tıklayın</p>
                      <p>4. Ödeme simülasyonunu bekleyin</p>
                      <p>5. Başarı sayfasını kontrol edin</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div>
                <ShopierPayment
                  amount={177}
                  description="Shopier API Test Ödemesi"
                  customerEmail="test@example.com"
                  customerPhone="0555 123 45 67"
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />

                {/* Error Display */}
                {error && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                      <span className="text-red-700">{error}</span>
                    </div>
                  </div>
                )}

                {/* Test Notice */}
                <div className="mt-6 bg-blue-50 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Test Bilgisi</h4>
                  <p className="text-sm text-blue-700">
                    Bu sayfa Shopier API entegrasyonunu test etmek için oluşturulmuştur. 
                    Geliştirme ortamında simülasyon çalışır, production'da gerçek API çağrıları yapılır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TestPayment; 