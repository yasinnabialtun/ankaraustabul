import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, User, Wrench, Shield, TrendingUp, Users, Clock, Star, ShoppingCart, Package } from 'lucide-react';
import { CATEGORIES } from '../data/constants';
import { ustaService } from '../services/ustaService';
import { useToast } from '../components/ui/Toast';
import PaymentModal from '../components/ui/PaymentModal';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  category: '',
  experience: '',
  location: '',
  hourlyRate: '',
  specialties: '',
  description: '',
  selectedPackage: 'FREE' as keyof typeof PACKAGES,
};

// URL'den paket parametresini al
const getInitialPackage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const packageParam = urlParams.get('plan');
  
  if (packageParam === 'premium') {
    return 'PREMIUM';
  }
  if (packageParam === 'basic') {
    return 'BASIC';
  }
  return 'FREE';
};

// Paket seçenekleri
const PACKAGES = {
  FREE: {
    id: 'free',
    name: 'Ücretsiz Usta Kaydı',
    price: 0,
    features: [
      'Temel profil oluşturma',
      'Sınırlı görünürlük',
      'Temel iletişim bilgileri',
      'E-posta desteği',
    ],
    shopierUrl: '',
    color: 'border-gray-200 bg-gray-50',
    popular: false,
    isFree: true,
    duration: 0, // Süresiz
  },
  BASIC: {
    id: 'basic',
    name: 'Temel Paket',
    price: 99,
    features: [
      'Normal sıralama',
      'Temel profil detayları',
      'Tam iletişim bilgileri',
      'E-posta desteği',
      '30 gün geçerlilik',
    ],
    shopierUrl: 'https://www.shopier.com/s/payment/778645022',
    color: 'border-blue-200 bg-blue-50',
    popular: false,
    isFree: false,
    duration: 30, // 30 gün
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium Paket',
    price: 299,
    features: [
      'Öne çıkan profil',
      'Öncelikli sıralama',
      'Gelişmiş profil detayları',
      'PREMIUM rozeti',
      'Tam iletişim bilgileri',
      'Öncelikli müşteri yönlendirme',
      'WhatsApp yönlendirme',
      'Öncelikli e-posta desteği',
      '90 gün geçerlilik',
    ],
    shopierUrl: 'https://www.shopier.com/s/payment/778645023',
    color: 'border-yellow-200 bg-yellow-50',
    popular: true,
    isFree: false,
    duration: 90, // 90 gün
  },
} as const;

function UstaEkle() {
  const { showToast } = useToast();
  // URL'den paket parametresini al ve form'a uygula
  const initialPackage = getInitialPackage();
  const [form, setForm] = useState({ ...initialForm, selectedPackage: initialPackage as keyof typeof PACKAGES });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  const selectedPackage = PACKAGES[form.selectedPackage];

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = 'Ad Soyad gereklidir';
    if (!form.phone.trim()) newErrors.phone = 'Telefon gereklidir';
    if (!form.email.trim()) newErrors.email = 'E-posta gereklidir';
    if (!form.category.trim()) newErrors.category = 'Kategori gereklidir';
    if (!form.experience.trim()) newErrors.experience = 'Deneyim gereklidir';
    if (!form.hourlyRate.trim()) newErrors.hourlyRate = 'Saatlik ücret gereklidir';
    if (!form.location.trim()) newErrors.location = 'Konum gereklidir';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddToCart = () => {
    if (!validateForm()) return;

    if (PACKAGES[form.selectedPackage].isFree) {
      // Ücretsiz paket için direkt kayıt
      handleSubmit();
    } else {
      // Ücretli paket için ödeme modalını aç
      setShowPayment(true);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const ustaData = {
        ...form,
        package: form.selectedPackage,
        packageDetails: PACKAGES[form.selectedPackage],
        createdAt: new Date().toISOString(),
        status: 'pending',
      };

      await ustaService.addUsta(ustaData);
      setSubmitSuccess(true);
      
      // Başarı mesajı göster ve ana sayfaya yönlendir
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Usta ekleme hatası:', error);
      showToast({
        type: 'error',
        title: 'Hata!',
        message: 'Bir hata oluştu. Lütfen tekrar deneyin.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = () => {
    // Ödeme başarılı olduğunda formu gönder
    handleSubmit();
    setShowPayment(false);
  };

  const handlePaymentSuccess = () => {
    // Ödeme başarılı olduğunda formu gönder
    handleSubmit();
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Kayıt Başarılı!</h2>
          <p className="text-gray-600 mb-6">
            {PACKAGES[form.selectedPackage].isFree 
              ? 'Ücretsiz usta kaydınız başarıyla oluşturuldu.'
              : 'Ödeme işleminiz başarıyla tamamlandı ve usta kaydınız oluşturuldu.'
            }
          </p>
          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-green-800">
              Kaydınız inceleme sürecinden sonra yayınlanacaktır. Bu süreç genellikle 24 saat içinde tamamlanır.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Usta Kaydı Oluştur
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ankara'nın en güvenilir usta platformuna katılın. Binlerce müşteriye ulaşın ve işinizi büyütün.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                {/* Kişisel Bilgiler */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Kişisel Bilgiler
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Ad Soyad"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="0555 123 45 67"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="ornek@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Hizmet Bilgileri */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Wrench className="w-5 h-5" />
                    Hizmet Bilgileri
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hizmet Kategorisi *
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.category ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Kategori seçin</option>
                      {CATEGORIES.map((category) => (
                        <option key={category.id} value={category.name} data-id={category.id}>
                          {category.icon} {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Deneyim (Yıl) *
                      </label>
                      <input
                        type="number"
                        value={form.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.experience ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="5"
                        min="0"
                      />
                      {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Saatlik Ücret (TL) *
                      </label>
                      <input
                        type="number"
                        value={form.hourlyRate}
                        onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.hourlyRate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="150"
                        min="0"
                      />
                      {errors.hourlyRate && <p className="text-red-500 text-xs mt-1">{errors.hourlyRate}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Çalışma Bölgesi *
                    </label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.location ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Örn: Çankaya, Keçiören, Yenimahalle"
                    />
                    {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Uzmanlık Alanları
                    </label>
                    <textarea
                      value={form.specialties}
                      onChange={(e) => handleInputChange('specialties', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Örn: Elektrik tesisatı, Aydınlatma sistemleri, Güvenlik sistemleri"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hakkımda
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Kendinizi ve hizmetlerinizi tanıtın..."
                    />
                  </div>
                </div>

                {/* Paket Seçimi */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Paket Seçimi
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(PACKAGES).map(([key, pkg]) => (
                      <div
                        key={key}
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                          form.selectedPackage === key
                            ? 'border-blue-500 bg-blue-50'
                            : pkg.color
                        } ${pkg.popular ? 'ring-2 ring-yellow-400' : ''}`}
                        onClick={() => handleInputChange('selectedPackage', key)}
                      >
                        {pkg.popular && (
                          <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full text-center mb-2">
                            EN POPÜLER
                          </div>
                        )}
                        <h4 className="font-semibold text-gray-900 mb-2">{pkg.name}</h4>
                        <div className="text-2xl font-bold text-gray-900 mb-2">
                          {pkg.isFree ? 'Ücretsiz' : `${pkg.price} ₺`}
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1 mb-4">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className={`text-center py-2 px-4 rounded-lg font-medium ${
                          form.selectedPackage === key
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {form.selectedPackage === key ? 'Seçildi' : 'Seç'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </form>
              
              {/* Sepete Ekle Butonu - Form Dışında */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-lg transition-colors bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      İşleniyor...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      {PACKAGES[form.selectedPackage].isFree ? 'Ücretsiz Kayıt Ol' : 'Ödeme Yap ve Kayıt Ol'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Usta Avantajları
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-700">Öncelikli liste görünürlüğü</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-700">Binlerce potansiyel müşteri</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-gray-700">7/24 öncelikli destek</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Platform İstatistikleri
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Kayıtlı usta:</span>
                  <span className="font-medium">711+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tamamlanan iş:</span>
                  <span className="font-medium">2,847+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Müşteri memnuniyeti:</span>
                  <span className="font-semibold text-green-600">98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ortalama yanıt:</span>
                  <span className="font-medium">2 saat</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Payment Modal */}
        <PaymentModal
          isOpen={showPayment && !PACKAGES[form.selectedPackage].isFree}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
          packageName={selectedPackage.name}
          amount={selectedPackage.price}
          packageId={selectedPackage.id}
          userId={form.email} // Email'i geçici userId olarak kullan
        />
      </div>
    </div>
  );
}

export default UstaEkle; 
