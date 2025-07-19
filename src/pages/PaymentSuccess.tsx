import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Mail, Phone, MapPin, Clock, Star } from 'lucide-react';

interface PaymentSuccessData {
  transactionId: string;
  ustaName: string;
  packageType: string;
  amount: number;
}

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<PaymentSuccessData | null>(null);

  useEffect(() => {
    if (location.state) {
      setPaymentData(location.state as PaymentSuccessData);
    } else {
      // Eğer state yoksa ana sayfaya yönlendir
      navigate('/');
    }
  }, [location.state, navigate]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const getPackageName = (packageType: string): string => {
    const packages = {
      'BASIC': 'Temel Paket',
      'PREMIUM': 'Premium Paket',
      'VIP': 'VIP Paket'
    };
    return packages[packageType as keyof typeof packages] || packageType;
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Ödeme Başarılı!
            </h1>
            <p className="text-xl text-gray-600">
              Ankara Usta Bul platformuna hoş geldiniz!
            </p>
          </div>

          {/* Payment Details Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Ödeme Detayları
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">İşlem Numarası:</span>
                <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded">
                  {paymentData.transactionId}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Usta Adı:</span>
                <span className="font-semibold">{paymentData.ustaName}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Paket:</span>
                <span className="font-semibold text-blue-600">
                  {getPackageName(paymentData.packageType)}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Ödenen Tutar:</span>
                <span className="text-2xl font-bold text-green-600">
                  {formatCurrency(paymentData.amount)}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Sonraki Adımlar
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    E-posta Bildirimi
                  </h3>
                  <p className="text-gray-600">
                    Ödeme onayı ve hesap bilgileriniz e-posta adresinize gönderildi.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Hesap Aktivasyonu
                  </h3>
                  <p className="text-gray-600">
                    Hesabınız 24 saat içinde aktif hale gelecek ve müşteriler tarafından görülebilecek.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Star className="w-6 h-6 text-yellow-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Profil Optimizasyonu
                  </h3>
                  <p className="text-gray-600">
                    Profilinizi tamamlayarak daha fazla müşteri çekebilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              İletişim Bilgileri
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">Destek Hattı: +90 555 123 4567</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">E-posta: info@ynadijital.com</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">Adres: Ankara, Türkiye</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
            >
              Ana Sayfaya Dön
            </button>
            
            <button
              onClick={() => navigate('/ustalar')}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105"
            >
              Ustaları Görüntüle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess; 