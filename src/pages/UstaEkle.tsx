import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ustaService } from '../services/ustaService';
import { UstaData } from '../types';
import ShopierPayment from '../components/ShopierPayment';
import StepProgress from '../components/StepProgress';
import { emailService } from '../services/emailService';
import { whatsappService } from '../services/whatsappService';
import { CheckCircle, AlertCircle, ArrowLeft, ArrowRight, CreditCard, Star, Users, Shield, Zap, Crown, MapPin, User, Phone, Mail, Wrench, Clock, DollarSign, Calendar, Package, Check, X, Briefcase, Award } from 'lucide-react';

// Form Steps
const STEP_BASIC_INFO = 1;
const STEP_CATEGORY_SELECTION = 2;
const STEP_EXPERIENCE_DETAILS = 3;
const STEP_LOCATION_SERVICES = 4;
const STEP_PRICING_PLANS = 5;
const STEP_PAYMENT = 6;
const STEP_SUCCESS = 7;

// Enhanced Pricing Plans with better UI
const PRICING_PLANS = {
  BASIC: {
    name: 'Temel Usta Kayıt',
    price: 99,
    originalPrice: 119,
    discount: 17,
    features: [
      'Temel profil oluşturma',
      'Standart liste görünümü',
      'Temel istatistikler'
    ],
    icon: <Users className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    popular: false,
    duration: '1 ay',
    badge: 'Temel'
  },
  PREMIUM: {
    name: 'Öne Çıkan Usta Kayıt',
    price: 299,
    originalPrice: 359,
    discount: 17,
    features: [
      'Öncelikli liste görünümü',
      'WhatsApp yönlendirme',
      'Özel rozet ve işaretler',
      'Gelişmiş SEO optimizasyonu',
      'Öncelikli müşteri desteği',
      'Özel kampanya fırsatları',
      'Site içi reklamlar'
    ],
    icon: <Star className="w-8 h-8" />,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
    borderColor: 'border-yellow-300',
    popular: true,
    duration: '1 ay',
    badge: 'Öne Çıkan'
  }
};

const initialForm = {
  // Basic Info
  name: '',
  phone: '',
  email: '',
  
  // Category & Experience
  category: '',
  experience: '',
  specialties: [] as string[],
  
  // Location & Services
  location: '',
  serviceAreas: [] as string[],
  description: '',
  
  // Pricing
  hourlyRate: '',
  selectedPlan: 'BASIC' as keyof typeof PRICING_PLANS,
  
  // Additional Info
  availability: '',
  languages: [] as string[],
  certifications: [] as string[]
};

const categories = [
  { id: 'elektrik', name: 'Elektrik', icon: '⚡', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'su-tesisati', name: 'Su Tesisatı', icon: '🚰', color: 'bg-blue-100 text-blue-800' },
  { id: 'temizlik', name: 'Temizlik', icon: '🧹', color: 'bg-green-100 text-green-800' },
  { id: 'mobilya', name: 'Mobilya', icon: '🪑', color: 'bg-brown-100 text-brown-800' },
  { id: 'boya-badana', name: 'Boya & Badana', icon: '🎨', color: 'bg-purple-100 text-purple-800' },
  { id: 'insaat-tadilat', name: 'İnşaat & Tadilat', icon: '🏗️', color: 'bg-gray-100 text-gray-800' },
  { id: 'bahce-peyzaj', name: 'Bahçe & Peyzaj', icon: '🌿', color: 'bg-emerald-100 text-emerald-800' },
  { id: 'klima-havalandirma', name: 'Klima & Havalandırma', icon: '❄️', color: 'bg-cyan-100 text-cyan-800' },
  { id: 'cam-pencere', name: 'Cam & Pencere', icon: '🪟', color: 'bg-slate-100 text-slate-800' },
  { id: 'hali-perde', name: 'Halı & Perde', icon: '🪟', color: 'bg-pink-100 text-pink-800' },
  { id: 'guvenlik-sistemleri', name: 'Güvenlik Sistemleri', icon: '🔒', color: 'bg-red-100 text-red-800' },
  { id: 'asansor-yuruyen-merdiven', name: 'Asansör & Yürüyen Merdiven', icon: '🛗', color: 'bg-indigo-100 text-indigo-800' }
];

const serviceAreas = [
  'Çankaya', 'Keçiören', 'Mamak', 'Yenimahalle', 'Etimesgut',
  'Sincan', 'Polatlı', 'Gölbaşı', 'Kazan', 'Akyurt',
  'Haymana', 'Beypazarı', 'Nallıhan', 'Kızılcahamam', 'Çamlıdere'
];

// const languages = ['Türkçe', 'İngilizce', 'Almanca', 'Arapça', 'Rusça'];

function UstaEkle() {
  const [step, setStep] = useState(STEP_BASIC_INFO);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [transactionId, setTransactionId] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const navigate = useNavigate();

  // Enhanced step configuration
  const stepConfig = [
    { title: 'Kişisel Bilgiler', description: 'Ad, telefon, e-posta', icon: <User className="w-5 h-5" /> },
    { title: 'Kategori Seçimi', description: 'Hizmet alanınız', icon: <Briefcase className="w-5 h-5" /> },
    { title: 'Deneyim Detayları', description: 'Uzmanlık alanları', icon: <Award className="w-5 h-5" /> },
    { title: 'Lokasyon & Hizmetler', description: 'Çalışma bölgeleri', icon: <MapPin className="w-5 h-5" /> },
    { title: 'Paket Seçimi', description: 'Fiyatlandırma', icon: <CreditCard className="w-5 h-5" /> },
    { title: 'Ödeme', description: 'Güvenli ödeme', icon: <Shield className="w-5 h-5" /> }
  ];

  // Form validation for each step
  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    
    switch (currentStep) {
      case STEP_BASIC_INFO:
    if (!form.name.trim()) newErrors.name = 'Ad Soyad gerekli';
    if (!form.phone.trim()) newErrors.phone = 'Telefon gerekli';
        if (!form.email.trim()) newErrors.email = 'E-posta gerekli';
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Geçerli e-posta adresi girin';
        break;
        
      case STEP_CATEGORY_SELECTION:
    if (!form.category) newErrors.category = 'Kategori seçin';
        break;
        
      case STEP_EXPERIENCE_DETAILS:
    if (!form.experience.trim() || isNaN(Number(form.experience))) newErrors.experience = 'Deneyim yılı geçersiz';
        if (form.specialties.length === 0) newErrors.specialties = 'En az bir uzmanlık alanı seçin';
        break;
        
      case STEP_LOCATION_SERVICES:
    if (!form.location.trim()) newErrors.location = 'Lokasyon gerekli';
        if (form.serviceAreas.length === 0) newErrors.serviceAreas = 'En az bir hizmet bölgesi seçin';
    if (!form.description.trim()) newErrors.description = 'Açıklama gerekli';
        break;
        
      case STEP_PRICING_PLANS:
    if (!form.hourlyRate.trim() || isNaN(Number(form.hourlyRate))) newErrors.hourlyRate = 'Saatlik ücret geçersiz';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleInputChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setForm(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field as keyof typeof prev] as string[], value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  // Payment handlers
  const handlePaymentSuccess = async (transactionId: string) => {
    try {
      console.log('💳 Ödeme başarılı! Transaction ID:', transactionId);
      
      // Usta verilerini Firestore'a kaydet
      const ustaData = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        category: form.category,
        experience: form.experience,
        location: form.location,
        hourlyRate: form.hourlyRate,
        specialties: form.specialties,
        serviceAreas: form.serviceAreas,
        packageType: form.selectedPlan,
        transactionId: transactionId,
        amount: PRICING_PLANS[form.selectedPlan].price
      };

      // ustaService ile kaydet
      const savedUsta = await ustaService.addUsta(ustaData);
      console.log('✅ Usta kaydedildi:', savedUsta);
      
      // E-posta bildirimi gönder
      await emailService.sendRegistrationNotification({
        ustaName: form.name,
        ustaEmail: form.email,
        ustaPhone: form.phone,
        ustaCategory: form.category,
        packageType: form.selectedPlan,
        transactionId: transactionId,
        amount: PRICING_PLANS[form.selectedPlan].price
      });

      // Usta'ya hoş geldin e-postası gönder
      await emailService.sendWelcomeEmail({
        ustaName: form.name,
        ustaEmail: form.email,
        packageType: form.selectedPlan
      });

      // Başarı sayfasına yönlendir
      navigate('/payment-success', {
        state: {
          transactionId,
          ustaName: form.name,
          packageType: form.selectedPlan,
          amount: PRICING_PLANS[form.selectedPlan].price
        }
      });

    } catch (error) {
      console.error('❌ Ödeme sonrası işlem hatası:', error);
      // Hata olsa bile başarı sayfasına yönlendir
      navigate('/payment-success', {
        state: {
          transactionId,
          ustaName: form.name,
          packageType: form.selectedPlan,
          amount: PRICING_PLANS[form.selectedPlan].price
        }
      });
    }
  };

  const handlePaymentError = (err: string) => {
    setPaymentError(err);
  };

  // Enhanced Success Step with better UI
  if (step === STEP_SUCCESS) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-in">
          <div className="relative">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Kayıt Başarılı!</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Usta kaydınız ve ödemeniz başarıyla tamamlandı.<br />
            <span className="font-semibold text-green-600">Profiliniz 24 saat içinde aktif olacaktır.</span>
          </p>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border border-green-200">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">İşlem ID:</span>
                <span className="font-mono font-semibold text-green-700">{transactionId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Seçilen Paket:</span>
                <span className="font-semibold text-green-700">{PRICING_PLANS[form.selectedPlan].name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ödenen Tutar:</span>
                <span className="font-bold text-green-700 text-lg">{PRICING_PLANS[form.selectedPlan].price} ₺</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-2xl p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">📧 Sonraki Adımlar</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• E-posta adresinize onay mesajı gönderildi</li>
              <li>• Profil bilgilerinizi tamamlayabilirsiniz</li>
              <li>• Müşteri talepleri almaya başlayabilirsiniz</li>
            </ul>
          </div>
          
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  // Enhanced Payment Step with better UI
  if (step === STEP_PAYMENT) {
    const selectedPlan = PRICING_PLANS[form.selectedPlan];
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-8">
        <div className="max-w-6xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fade-in">
            <div className="mb-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">💳 Güvenli Ödeme</h2>
              <p className="text-gray-600 text-lg">Seçtiğiniz paket için güvenli ödeme yapın</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Enhanced Order Summary */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-200">
                  <h3 className="font-bold text-gray-800 mb-6 flex items-center text-lg">
                    <CheckCircle className="w-6 h-6 mr-3 text-blue-600" />
                    📋 Sipariş Özeti
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white rounded-xl">
                      <span className="text-gray-600 font-medium">Paket:</span>
                      <span className="font-bold text-gray-800">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-xl">
                      <span className="text-gray-600 font-medium">Süre:</span>
                      <span className="font-bold text-gray-800">{selectedPlan.duration}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-xl">
                      <span className="text-gray-600 font-medium">Saatlik Ücret:</span>
                      <span className="font-bold text-gray-800">{form.hourlyRate} ₺/saat</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                      <span className="text-gray-600 font-medium">İndirim:</span>
                      <span className="font-bold text-green-600">%{selectedPlan.discount}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white">
                      <span className="font-bold text-lg">Toplam:</span>
                      <span className="font-bold text-2xl">{selectedPlan.price} ₺</span>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Package Features */}
                <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-3xl p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-4 text-lg">✨ Paket Özellikleri</h4>
                  <ul className="space-y-3">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700 p-2 bg-white rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Enhanced Security Info */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 border border-green-200">
                  <h4 className="font-bold text-green-800 mb-4 flex items-center text-lg">
                    <Shield className="w-6 h-6 mr-3" />
                    🔒 Güvenlik
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center p-2 bg-white rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-sm text-green-700 font-medium">SSL şifreli güvenli ödeme</span>
                    </div>
                    <div className="flex items-center p-2 bg-white rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-sm text-green-700 font-medium">Kişisel bilgileriniz korunur</span>
                    </div>
                    <div className="flex items-center p-2 bg-white rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-sm text-green-700 font-medium">30 gün para iade garantisi</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Payment Form */}
              <div className="space-y-6">
                <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 shadow-lg">
                  <h4 className="font-bold text-gray-800 mb-6 text-lg flex items-center">
                    <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
                    💳 Ödeme Bilgileri
                  </h4>
                  
            <ShopierPayment
                    amount={selectedPlan.price}
                    description={`${selectedPlan.name} - ${form.name} - ${form.category}`}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
                    ustaData={{
                      name: form.name,
                      category: form.category,
                      experience: form.experience,
                      location: form.location,
                      hourlyRate: form.hourlyRate,
                      specialties: form.specialties,
                      serviceAreas: form.serviceAreas,
                      email: form.email,
                      phone: form.phone
                    }}
                    packageType={form.selectedPlan}
                  />
                </div>
                
            {paymentError && (
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-3xl p-6 animate-shake">
                <div className="flex items-center">
                      <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
                      <span className="text-red-700 font-medium">{paymentError}</span>
                    </div>
                  </div>
                )}
                
                <div className="text-center">
                  <button
                    onClick={() => setStep(STEP_PRICING_PLANS)}
                    className="text-blue-600 hover:text-blue-700 hover:underline flex items-center justify-center mx-auto font-medium transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Paket Seçimine Geri Dön
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Enhanced Pricing Plans Step with better UI
  if (step === STEP_PRICING_PLANS) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-8">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CreditCard className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">💎 Paket Seçimi</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">İhtiyacınıza en uygun paketi seçin ve fiyatlandırmanızı belirleyin</p>
          </div>
          
          {/* Enhanced Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {Object.entries(PRICING_PLANS).map(([key, plan]) => (
              <div
                key={key}
                className={`relative bg-white rounded-3xl shadow-xl p-8 border-2 transition-all duration-500 cursor-pointer hover:shadow-2xl transform hover:-translate-y-2 ${
                  form.selectedPlan === key 
                    ? 'border-blue-500 shadow-blue-100 scale-105 ring-4 ring-blue-100' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleInputChange('selectedPlan', key)}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    ⭐ {plan.badge}
                  </div>
                )}
                
                {/* Discount Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  %{plan.discount} İndirim
                </div>
                
                <div className="text-center mb-8">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <div className="text-white">{plan.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{plan.name}</h3>
                  
                  {/* Enhanced Price Display */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-4xl font-bold text-blue-600">{plan.price} ₺</span>
                      <span className="text-xl text-gray-400 line-through">{plan.originalPrice} ₺</span>
                    </div>
                    <div className="text-sm text-gray-500 bg-gray-50 rounded-full px-4 py-2 inline-block">
                      {plan.duration}
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Enhanced Selection Button */}
                <button
                  className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                    form.selectedPlan === key
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {form.selectedPlan === key ? '✓ Seçildi' : 'Seç'}
                </button>
              </div>
            ))}
          </div>
          
          {/* Enhanced Pricing Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 mb-8 border border-blue-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-800 mb-6">🛡️ Güvenlik ve Garanti</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-blue-700">
                <div className="flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm">
                  <Shield className="w-6 h-6 mr-3 text-blue-600" />
                  <span className="font-semibold">Güvenli Ödeme</span>
                </div>
                <div className="flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm">
                  <Zap className="w-6 h-6 mr-3 text-blue-600" />
                  <span className="font-semibold">Anında Aktivasyon</span>
                </div>
                <div className="flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm">
                  <CheckCircle className="w-6 h-6 mr-3 text-blue-600" />
                  <span className="font-semibold">30 Gün Garanti</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Hourly Rate Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center text-2xl">
              <CreditCard className="w-7 h-7 mr-3 text-blue-600" />
              💰 Saatlik Ücret Belirleme
            </h3>
            <p className="text-gray-600 mb-6 text-lg">Müşterilerinize sunacağınız saatlik ücreti belirleyin</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-gray-700 text-lg font-bold mb-4">Saatlik Ücret (₺)</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={form.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                    className={`flex-1 px-6 py-4 rounded-2xl border-2 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold ${
                      errors.hourlyRate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Örn: 150"
                  />
                  <span className="text-gray-600 font-bold text-lg">₺/saat</span>
                </div>
                {errors.hourlyRate && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {errors.hourlyRate}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 text-lg font-bold mb-4">💡 Önerilen Fiyat Aralığı</label>
                <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                  <div className="text-sm text-gray-700 space-y-3">
                    <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                      <span>🧹 Temizlik:</span>
                      <span className="font-semibold text-green-600">80-120 ₺/saat</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                      <span>⚡ Elektrik:</span>
                      <span className="font-semibold text-green-600">150-250 ₺/saat</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                      <span>🚰 Su Tesisatı:</span>
                      <span className="font-semibold text-green-600">120-200 ₺/saat</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                      <span>🪑 Mobilya:</span>
                      <span className="font-semibold text-green-600">100-180 ₺/saat</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Selected Plan Summary */}
          {form.selectedPlan && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 mb-8 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-green-800 mb-2 text-xl">✅ Seçilen Paket</h4>
                  <p className="text-green-700 text-lg">{PRICING_PLANS[form.selectedPlan as keyof typeof PRICING_PLANS].name}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-800">
                    {PRICING_PLANS[form.selectedPlan as keyof typeof PRICING_PLANS].price} ₺
                  </div>
                  <div className="text-sm text-green-600">Bir kerelik ödeme</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex gap-6">
            <button
              onClick={prevStep}
              className="flex-1 bg-gray-100 text-gray-700 px-8 py-4 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-semibold text-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2 inline" /> Geri
            </button>
            <button
              onClick={nextStep}
              disabled={!form.selectedPlan || !form.hourlyRate}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-bold text-lg shadow-lg transform hover:scale-105"
            >
              Devam Et <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Location & Services Step
  if (step === STEP_LOCATION_SERVICES) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Lokasyon ve Hizmetler</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Ana Lokasyon</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Örn: Çankaya, Ankara"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.location}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Hizmet Verdiğiniz Bölgeler</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {serviceAreas.map(area => (
                    <label key={area} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.serviceAreas.includes(area)}
                        onChange={(e) => handleArrayChange('serviceAreas', area, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{area}</span>
                    </label>
                  ))}
                </div>
                {errors.serviceAreas && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.serviceAreas}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Hakkınızda</label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Deneyimleriniz, uzmanlık alanlarınız ve hizmet kaliteniz hakkında bilgi verin..."
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <button
                onClick={prevStep}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1 inline" /> Geri
              </button>
              <button
                onClick={nextStep}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
              >
                Devam Et <ArrowRight className="w-4 h-4 ml-1 inline" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Experience Details Step
  if (step === STEP_EXPERIENCE_DETAILS) {
    const categorySpecialties = {
      'Elektrik': ['Elektrik Tesisatı', 'Aydınlatma', 'Güvenlik Sistemleri', 'Solar Panel', 'Arıza Giderme'],
      'Su Tesisatı': ['Su Tesisatı', 'Kanalizasyon', 'Kombi Servisi', 'Su Kaçağı', 'Isıtma Sistemleri'],
      'Temizlik': ['Ev Temizliği', 'Ofis Temizliği', 'Derin Temizlik', 'Cam Temizliği', 'Halı Yıkama'],
      'Mobilya': ['Mobilya Montajı', 'Mobilya Tamiri', 'Dolap Kurulumu', 'Özel Tasarım', 'Restorasyon'],
      'Boya & Badana': ['İç Cephe Boya', 'Dış Cephe Boya', 'Dekoratif Boya', 'Sıva İşleri', 'Alçı İşleri'],
      'İnşaat & Tadilat': ['Tadilat', 'Duvar Örme', 'Sıva İşleri', 'Yıkım', 'Küçük İnşaat'],
      'Bahçe & Peyzaj': ['Bahçe Düzenleme', 'Çim Ekleme', 'Ağaç Budama', 'Sulama Sistemi', 'Peyzaj Tasarımı'],
      'Klima & Havalandırma': ['Klima Montajı', 'Klima Bakımı', 'Klima Onarımı', 'Havalandırma Sistemi', 'Klima Temizliği'],
      'Cam & Pencere': ['Cam Değişimi', 'Pencere Tamiri', 'Cam Montajı', 'Cam Temizliği', 'Çift Cam Montajı'],
      'Halı & Perde': ['Halı Yıkama', 'Perde Montajı', 'Stor Perde', 'Tül Perde', 'Halı Tamiri'],
      'Güvenlik Sistemleri': ['Kamera Sistemi', 'Alarm Sistemi', 'İnterkom', 'Güvenlik Kapısı', 'Kartlı Geçiş'],
      'Asansör & Yürüyen Merdiven': ['Asansör Bakımı', 'Yürüyen Merdiven', 'Asansör Modernizasyonu', 'Asansör Tamiri', 'Asansör Kontrol']
    };

    const currentSpecialties = categorySpecialties[form.category as keyof typeof categorySpecialties] || [];

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Deneyim ve Uzmanlık</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Deneyim Yılı</label>
                <input
                  type="number"
                  value={form.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.experience ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Kaç yıllık deneyiminiz var?"
                />
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.experience}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Uzmanlık Alanları</label>
                <div className="grid grid-cols-2 gap-2">
                  {currentSpecialties.map(specialty => (
                    <label key={specialty} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.specialties.includes(specialty)}
                        onChange={(e) => handleArrayChange('specialties', specialty, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{specialty}</span>
                    </label>
                  ))}
              </div>
                {errors.specialties && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.specialties}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <button
                onClick={prevStep}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1 inline" /> Geri
              </button>
              <button
                onClick={nextStep}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
              >
                Devam Et <ArrowRight className="w-4 h-4 ml-1 inline" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Category Selection Step
  if (step === STEP_CATEGORY_SELECTION) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Kategori Seçimi</h2>
            <p className="text-gray-600">Hangi alanda hizmet veriyorsunuz?</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(category => (
              <div
                key={category.id}
                className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                  form.category === category.name 
                    ? 'border-blue-500 shadow-blue-100' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleInputChange('category', category.name)}
              >
                <div className="text-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-800">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
          
          {errors.category && (
            <div className="mt-4 text-center">
              <p className="text-red-500 text-sm flex items-center justify-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.category}
              </p>
            </div>
          )}
          
          <div className="flex gap-4 mt-8">
            <button
              onClick={prevStep}
              className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1 inline" /> Geri
            </button>
            <button
              onClick={nextStep}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              Devam Et <ArrowRight className="w-4 h-4 ml-1 inline" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Basic Info Step
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Usta Kaydı</h2>
            <p className="text-gray-600">Güvenilir ustalar ailesine katılın</p>
          </div>
          
          <StepProgress
            currentStep={step}
            totalSteps={6}
            steps={stepConfig}
          />
          
          <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Ad Soyad</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Adınızı ve soyadınızı girin"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Telefon</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="05xx xxx xx xx"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">E-posta</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="ornek@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              Devam Et <ArrowRight className="w-4 h-4 ml-1 inline" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UstaEkle; 