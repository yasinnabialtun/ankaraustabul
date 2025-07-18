import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { kategoriler } from '../data';
import { 
  User, 
  Phone, 
  MapPin, 
  Clock, 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  Briefcase,
  CreditCard
} from 'lucide-react';

interface FormData {
  name: string;
  category: string;
  phone: string;
  location: string;
  experience: string;
  description: string;
  email: string;
  hourlyRate: string;
  workingHours: string;
  services: string[];
  certifications: string[];
}

function UstaEkle() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    phone: '',
    location: '',
    experience: '',
    description: '',
    email: '',
    hourlyRate: '',
    workingHours: '',
    services: [],
    certifications: []
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const totalSteps = 4;

  const validateStep = (step: number) => {
    const newErrors: Partial<FormData> = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'Ad soyad gereklidir';
        if (!formData.category) newErrors.category = 'Kategori seçimi gereklidir';
        if (!formData.phone.trim()) newErrors.phone = 'Telefon numarası gereklidir';
        break;
      case 2:
        if (!formData.location.trim()) newErrors.location = 'Konum gereklidir';
        if (!formData.experience) newErrors.experience = 'Deneyim yılı gereklidir';
        if (!formData.description.trim()) newErrors.description = 'Açıklama gereklidir';
        break;
      case 3:
        if (!formData.email.trim()) newErrors.email = 'E-posta gereklidir';
        if (!formData.hourlyRate) newErrors.hourlyRate = 'Saatlik ücret gereklidir';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleCertificationToggle = (cert: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter(c => c !== cert)
        : [...prev.certifications, cert]
    }));
  };

  const handlePaymentSuccess = () => {
    // Başarılı ödeme sonrası ana sayfaya yönlendir
    navigate('/', { 
      state: { 
        message: 'Usta kaydınız ve ödeme işleminiz başarıyla tamamlandı! En kısa sürede size dönüş yapacağız.' 
      } 
    });
  };

  if (isSuccess && showPayment) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="text-center mb-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Başvurunuz Alındı!</h2>
                <p className="text-gray-600 mb-6">
                  Usta başvurunuz başarıyla alındı. Şimdi kayıt ücretini ödeyerek işlemi tamamlayabilirsiniz.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Kayıt Ücreti Detayları</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">₺99</div>
                    <div className="text-sm text-gray-600">Kayıt Ücreti</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">₺49</div>
                    <div className="text-sm text-gray-600">Doğrulama</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600">₺29</div>
                    <div className="text-sm text-gray-600">Platform</div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <div className="text-3xl font-bold text-gray-800">Toplam: ₺177</div>
                  <p className="text-sm text-gray-600 mt-2">Tek seferlik ödeme</p>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setShowPayment(false);
                    setCurrentStep(1);
                    setFormData({
                      name: '',
                      category: '',
                      phone: '',
                      location: '',
                      experience: '',
                      description: '',
                      email: '',
                      hourlyRate: '',
                      workingHours: '',
                      services: [],
                      certifications: []
                    });
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Geri Dön
                </button>
                <button
                  onClick={() => setShowPayment(true)}
                  className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Ödeme Yap
                </button>
              </div>
            </div>

            {/* Payment Component */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Güvenli Ödeme</h3>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Kayıt Ücreti:</span>
                  <span className="text-2xl font-bold text-gray-800">₺177</span>
                </div>
              </div>
              
              {/* Payment Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    Kart Numarası
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Son Kullanma</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">CVV</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>

                <button
                  onClick={() => handlePaymentSuccess()}
                  className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-colors font-semibold"
                >
                  ₺177 Öde
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Başvurunuz Alındı!</h2>
          <p className="text-gray-600 mb-6">
            Usta başvurunuz başarıyla alındı. Şimdi kayıt ücretini ödeyerek işlemi tamamlayabilirsiniz.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => setShowPayment(true)}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <CreditCard className="w-4 h-4 inline mr-2" />
              Kayıt Ücretini Öde (₺177)
            </button>
            <button
              onClick={() => {
                setIsSuccess(false);
                setCurrentStep(1);
                setFormData({
                  name: '',
                  category: '',
                  phone: '',
                  location: '',
                  experience: '',
                  description: '',
                  email: '',
                  hourlyRate: '',
                  workingHours: '',
                  services: [],
                  certifications: []
                });
              }}
              className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Daha Sonra
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Usta <span className="text-yellow-300">Olun</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Sitemize katılın ve müşterilerinizle buluşun.
            <br />Binlerce potansiyel müşteri sizi bekliyor!
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Adım {currentStep} / {totalSteps}
                </h2>
                <div className="text-sm text-gray-600">
                  %{Math.round((currentStep / totalSteps) * 100)} Tamamlandı
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">Temel Bilgiler</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Ad Soyad
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Adınız ve soyadınız"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Telefon
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="0532 123 45 67"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        <Briefcase className="w-4 h-4 inline mr-2" />
                        Kategori
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Kategori Seçin</option>
                        {kategoriler.map((kategori) => (
                          <option key={kategori.id} value={kategori.name}>
                            {kategori.name}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.category}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Experience & Location */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">Deneyim ve Konum</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Konum
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.location ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Çankaya, Ankara"
                      />
                      {errors.location && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.location}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Deneyim (Yıl)
                      </label>
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.experience ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="5"
                        min="0"
                        max="50"
                      />
                      {errors.experience && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.experience}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        <FileText className="w-4 h-4 inline mr-2" />
                        Açıklama
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Hizmet alanlarınız, uzmanlıklarınız ve deneyimleriniz hakkında bilgi verin..."
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Contact & Pricing */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">İletişim ve Fiyatlandırma</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        E-posta
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="usta@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        <Star className="w-4 h-4 inline mr-2" />
                        Saatlik Ücret (₺)
                      </label>
                      <input
                        type="number"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.hourlyRate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="150"
                        min="0"
                      />
                      {errors.hourlyRate && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.hourlyRate}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Çalışma Saatleri
                      </label>
                      <input
                        type="text"
                        name="workingHours"
                        value={formData.workingHours}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Pazartesi - Cumartesi: 08:00 - 18:00"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Services & Certifications */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">Hizmetler ve Sertifikalar</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-4">
                        Hizmet Alanları
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['Elektrik Tesisatı', 'Su Tesisatı', 'Boya', 'Temizlik', 'İnşaat', 'Tadilat', 'Kombi Servisi', 'Cam Balkon', 'Asansör Bakımı'].map((service) => (
                          <label key={service} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.services.includes(service)}
                              onChange={() => handleServiceToggle(service)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-4">
                        Sertifikalar ve Belgeler
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['Elektrik Ustası Belgesi', 'Su Tesisatı Sertifikası', 'İSG Belgesi', 'Meslek Lisesi Diploması', 'Teknik Servis Belgesi', 'Kalite Belgesi'].map((cert) => (
                          <label key={cert} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.certifications.includes(cert)}
                              onChange={() => handleCertificationToggle(cert)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{cert}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        <Upload className="w-4 h-4 inline mr-2" />
                        Sertifika Dosyaları
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Dosyaları buraya sürükleyin veya tıklayın</p>
                        <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Önceki
                  </button>
                )}
                
                <div className="ml-auto">
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Sonraki
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Gönderiliyor...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Başvuruyu Gönder
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UstaEkle; 