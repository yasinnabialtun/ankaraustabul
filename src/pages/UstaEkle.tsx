import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, User, Wrench, Star, Users, Shield } from 'lucide-react';

// Basitleştirilmiş paket seçenekleri
const PACKAGES = {
  BASIC: {
    name: 'Temel Paket',
    price: 99,
    features: ['Temel profil', 'Standart liste', 'Temel istatistikler'],
    icon: <Users className="w-6 h-6" />,
    color: 'border-blue-200 bg-blue-50',
    popular: false
  },
  PREMIUM: {
    name: 'Öne Çıkan Paket',
    price: 299,
    features: ['Öncelikli liste', 'WhatsApp yönlendirme', 'Özel rozetler', 'Gelişmiş SEO'],
    icon: <Star className="w-6 h-6" />,
    color: 'border-yellow-200 bg-yellow-50',
    popular: true
  }
} as const;

// Basitleştirilmiş kategoriler
const CATEGORIES = [
  { id: 'elektrik', name: 'Elektrik', icon: '⚡' },
  { id: 'su-tesisati', name: 'Su Tesisatı', icon: '🚰' },
  { id: 'temizlik', name: 'Temizlik', icon: '🧹' },
  { id: 'mobilya', name: 'Mobilya', icon: '🪑' },
  { id: 'boya-badana', name: 'Boya & Badana', icon: '🎨' },
  { id: 'insaat-tadilat', name: 'İnşaat & Tadilat', icon: '🏗️' },
  { id: 'bahce-peyzaj', name: 'Bahçe & Peyzaj', icon: '🌿' },
  { id: 'klima-havalandirma', name: 'Klima & Havalandırma', icon: '❄️' }
] as const;

const initialForm = {
  name: '',
  phone: '',
  email: '',
  category: '',
  experience: '',
  location: '',
  hourlyRate: '',
  selectedPackage: 'BASIC' as keyof typeof PACKAGES
};

function UstaEkle() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.name.trim()) newErrors.name = 'Ad Soyad gerekli';
    if (!form.phone.trim()) newErrors.phone = 'Telefon gerekli';
    if (!form.email.trim()) newErrors.email = 'E-posta gerekli';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Geçerli e-posta girin';
    if (!form.category) newErrors.category = 'Kategori seçin';
    if (!form.experience.trim()) newErrors.experience = 'Deneyim yılı gerekli';
    if (!form.location.trim()) newErrors.location = 'Lokasyon gerekli';
    if (!form.hourlyRate.trim()) newErrors.hourlyRate = 'Saatlik ücret gerekli';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Mock submission - gerçek uygulamada API call yapılacak
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Usta kaydı:', form);
      setShowSuccess(true);
    } catch (error) {
      console.error('Kayıt hatası:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return form.name.trim() && 
           form.phone.trim() && 
           form.email.trim() && 
           form.category && 
           form.experience.trim() && 
           form.location.trim() && 
           form.hourlyRate.trim();
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Kayıt Başarılı!</h2>
          <p className="text-gray-600 mb-6">
            Usta kaydınız alındı. Admin onayından sonra profiliniz yayınlanacaktır.
            <br />
            <span className="text-sm text-gray-500">
              Kayıt bilgileriniz güvenle saklanmıştır.
            </span>
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Ana Sayfaya Dön
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Usta Kaydı
          </h1>
          <p className="text-gray-600">
            Profesyonel hizmetlerinizi sunmak için kayıt olun
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {/* Kişisel Bilgiler */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5" />
              Kişisel Bilgiler
            </h3>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          {/* Hizmet Bilgileri */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Hizmet Bilgileri
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleInputChange('category', category.id)}
                    className={`p-3 rounded-xl border-2 transition-all text-sm ${
                      form.category === category.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg mb-1">{category.icon}</div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </button>
                ))}
              </div>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
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
                Lokasyon *
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Çankaya, Ankara"
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>
          </div>

          {/* Paket Seçimi */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Paket Seçimi
            </h3>
            
            <div className="space-y-3">
              {Object.entries(PACKAGES).map(([key, pkg]) => (
                <div
                  key={key}
                  onClick={() => handleInputChange('selectedPackage', key)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    form.selectedPackage === key
                      ? pkg.color
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {pkg.icon}
                      <div>
                        <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-900">{pkg.price} TL</span>
                          {pkg.popular && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                              Popüler
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-1">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-3 ${
                isSubmitting || !isFormValid()
                  ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Kayıt Oluşturuluyor...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Kayıt Oluştur
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UstaEkle; 