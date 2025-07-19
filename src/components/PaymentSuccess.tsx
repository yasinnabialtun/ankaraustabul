import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Mail, Phone, MapPin, Star, Clock, Users, ArrowRight, Home } from 'lucide-react';
import shopierService from '../services/shopierService';

interface PaymentSuccessProps {
  transactionId?: string;
  amount?: number;
  packageType?: string;
  ustaData?: any;
}

function PaymentSuccess({ 
  transactionId: propTransactionId, 
  amount: propAmount, 
  packageType: propPackageType,
  ustaData: propUstaData 
}: PaymentSuccessProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const transactionId = propTransactionId || searchParams.get('transaction_id');
  const amount = propAmount || parseFloat(searchParams.get('amount') || '0');
  const packageType = propPackageType || searchParams.get('package_type') || 'BASIC';
  const ustaData = propUstaData || JSON.parse(searchParams.get('usta_data') || '{}');

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (transactionId) {
        try {
          const status = await shopierService.checkPaymentStatus(transactionId);
          setPaymentStatus(status);
        } catch (error) {
          console.error('Payment status check failed:', error);
        }
      }
      setIsLoading(false);
    };

    checkPaymentStatus();
  }, [transactionId]);

  const packageNames = {
    'BASIC': 'Temel Paket',
    'PREMIUM': 'Premium Paket',
    'VIP': 'VIP Paket'
  };

  const packageFeatures = {
    'BASIC': [
      'Temel profil oluşturma',
      'Müşteri değerlendirmeleri',
      'Temel SEO optimizasyonu',
      '7/24 destek'
    ],
    'PREMIUM': [
      'Öncelikli liste görünümü',
      'Detaylı profil sayfası',
      'Gelişmiş SEO optimizasyonu',
      'Özel rozet ve işaretler',
      'Öncelikli müşteri desteği',
      'İstatistik ve analitik'
    ],
    'VIP': [
      'En üst sırada görünüm',
      'Özel VIP rozeti',
      'Öncelikli müşteri eşleştirme',
      'Özel pazarlama desteği',
      '7/24 özel destek hattı',
      'Detaylı iş analitikleri'
    ]
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ödeme durumu kontrol ediliyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-12">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-bounce" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Ödeme Başarılı!</h1>
          <p className="text-xl text-gray-600 mb-2">
            Usta kaydınız başarıyla tamamlandı
          </p>
          <div className="bg-green-50 rounded-xl p-4 inline-block">
            <p className="text-green-700 font-semibold">
              İşlem Tutarı: {shopierService.formatCurrency(amount)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Usta Bilgileri */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-600" />
              Usta Bilgileri
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{ustaData.name}</h3>
                  <p className="text-gray-600">{ustaData.category}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{ustaData.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{ustaData.experience} yıl deneyim</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{ustaData.hourlyRate} ₺/saat</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{ustaData.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Paket Bilgileri */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Star className="w-6 h-6 mr-2 text-yellow-600" />
              Seçilen Paket
            </h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {packageNames[packageType as keyof typeof packageNames]}
              </h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">
                {shopierService.formatCurrency(amount)}
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 mb-3">Paket Özellikleri:</h4>
              <ul className="space-y-2">
                {packageFeatures[packageType as keyof typeof packageFeatures]?.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* İşlem Detayları */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
            İşlem Detayları
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">E-posta Bildirimi</h3>
              <p className="text-sm text-gray-600">
                Onay e-postası {ustaData.email} adresine gönderildi
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Profil Aktif</h3>
              <p className="text-sm text-gray-600">
                Profiliniz 24 saat içinde aktif olacak
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Müşteri Desteği</h3>
              <p className="text-sm text-gray-600">
                7/24 destek hattımız size yardımcı olacak
              </p>
            </div>
          </div>
        </div>

        {/* Sonraki Adımlar */}
        <div className="bg-blue-50 rounded-2xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Sonraki Adımlar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">1. Profil Tamamlama</h3>
              <p className="text-sm text-gray-600 mb-4">
                Profilinizi tamamlayarak daha fazla müşteri çekebilirsiniz
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Profili Düzenle
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">2. Ana Sayfa</h3>
              <p className="text-sm text-gray-600 mb-4">
                Ana sayfaya dönerek diğer özellikleri keşfedin
              </p>
              <button 
                onClick={() => navigate('/')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                Ana Sayfa <Home className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* İşlem Numarası */}
        {transactionId && (
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              İşlem Numarası: <span className="font-mono">{transactionId}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentSuccess; 