import React from 'react';
import { CheckCircle, Star, Users, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PaymentSuccessProps {
  transactionId: string;
  packageType: 'premium' | 'vip';
  amount: number;
  onClose: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
  transactionId,
  packageType,
  amount,
  onClose
}) => {
  const packageBenefits = packageType === 'vip' ? [
    'Maksimum görünürlük ve öncelikli gösterim',
    'Özel VIP rozet ve gelişmiş profil tasarımı',
    'WhatsApp entegrasyonu ve VIP destek hattı',
    'Reklam kredisi ve promosyon kampanyaları',
    'Sertifika programı ve eğitim desteği',
    '7/24 öncelikli müşteri hizmetleri'
  ] : [
    'Öne çıkan ilanlar ve üst sıralama',
    'Özel premium rozet ve gelişmiş kart tasarımı',
    'WhatsApp entegrasyonu',
    'Detaylı analitik ve raporlama',
    'Öncelikli müşteri desteği',
    'Promosyon kampanyaları'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Ödeme Başarılı!
          </h2>
          <p className="text-gray-600">
            Tebrikler! {packageType === 'vip' ? 'VIP' : 'Premium'} üyeliğiniz aktif edildi.
          </p>
        </div>

        {/* İşlem Detayları */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">İşlem Detayları</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">İşlem No:</span>
              <span className="font-medium ml-2">{transactionId}</span>
            </div>
            <div>
              <span className="text-gray-600">Paket:</span>
              <span className="font-medium ml-2">
                {packageType === 'vip' ? 'VIP İlan' : 'Premium İlan'}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Tutar:</span>
              <span className="font-medium ml-2">₺{amount}</span>
            </div>
            <div>
              <span className="text-gray-600">Tarih:</span>
              <span className="font-medium ml-2">
                {new Date().toLocaleDateString('tr-TR')}
              </span>
            </div>
          </div>
        </div>

        {/* Paket Avantajları */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Award className="text-primary-600" size={20} />
            <span>{packageType === 'vip' ? 'VIP' : 'Premium'} Paket Avantajları</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packageBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Star className="text-yellow-500 mt-0.5" size={16} />
                <span className="text-sm text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sonraki Adımlar */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-primary-900 mb-4">Sonraki Adımlar</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              <span className="text-primary-800">
                Profil bilgileriniz 24 saat içinde onaylanacak
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              <span className="text-primary-800">
                E-posta ile onay mesajı alacaksınız
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              <span className="text-primary-800">
                Profiliniz aktif olduğunda müşteriler size ulaşabilecek
              </span>
            </div>
          </div>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Users className="mx-auto mb-2 text-blue-600" size={24} />
            <div className="text-lg font-bold text-blue-600">500+</div>
            <div className="text-xs text-gray-600">Aktif Usta</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <TrendingUp className="mx-auto mb-2 text-green-600" size={24} />
            <div className="text-lg font-bold text-green-600">1000+</div>
            <div className="text-xs text-gray-600">Aylık Hizmet</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <Star className="mx-auto mb-2 text-yellow-600" size={24} />
            <div className="text-lg font-bold text-yellow-600">4.8</div>
            <div className="text-xs text-gray-600">Ortalama Puan</div>
          </div>
        </div>

        {/* Aksiyon Butonları */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Link
            to="/ustalar"
            className="btn-primary flex-1 text-center"
          >
            Ustalar Sayfasına Git
          </Link>
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            Ana Sayfaya Dön
          </button>
        </div>

        {/* Yardım */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Sorularınız için{' '}
            <a href="mailto:destek@ankaraustabul.com" className="text-primary-600 hover:underline">
              destek@ankaraustabul.com
            </a>{' '}
            adresine yazabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 