import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, MapPin, Briefcase, Clock, Shield, Plus, X, DollarSign, CreditCard, Banknote, Percent, Star, CheckCircle, ChevronRight, ChevronLeft, Zap, Users, MessageCircle, TrendingUp, Award, Heart } from 'lucide-react';
import { ilceler, hizmetKategorileri } from '../data';
import { validatePhone, validateEmail } from '../utils';
import { UstaEklemeFormu } from '../types';
import ShopierPayment from '../components/ShopierPayment';

const UstaEkle: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<UstaEklemeFormu>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    amount: 0,
    package: 'premium' as 'premium' | 'vip',
    extras: [] as string[],
    totalAmount: 0
  });
  
  const [formData, setFormData] = useState({
    // Kişisel Bilgiler
    ad: '',
    soyad: '',
    telefon: '',
    email: '',
    ilce: '',
    adres: '',
    
    // Meslek Bilgileri
    hizmetler: [],
    deneyim: 1,
    calismaSaatleriBaslangic: '08:00',
    calismaSaatleriBitis: '18:00',
    acilServis: false,
    garanti: false,
    garantiSuresi: 12,
    hakkinda: '',
    
    // İlan Yayınlama Ücretleri
    ilanPaketi: 'premium', // Default to premium
    oneCikanUsta: false, // Added for "Öne Çıkan Usta Olmak İstiyorum"
    
    // Fiyatlandırma
    fiyatlandirma: {
      minimumUcret: 0,
      saatlikUcret: 0,
      seyahatUcreti: 0,
      acilServisUcreti: 0,
      indirimOrani: 0,
      odemeYontemleri: ['Nakit']
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Hata temizleme
    if (errors[name as keyof UstaEklemeFormu]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Fiyatlandırma handler'ları kaldırıldı - artık kullanılmıyor

  const handleHizmetToggle = (hizmet: string) => {
    setFormData(prev => ({
      ...prev,
      hizmetler: prev.hizmetler.includes(hizmet)
        ? prev.hizmetler.filter(h => h !== hizmet)
        : [...prev.hizmetler, hizmet]
    }));

    if (errors.hizmetler) {
      setErrors(prev => ({ ...prev, hizmetler: undefined }));
    }
  };



  const validateStep = (step: number): boolean => {
    const newErrors: Partial<UstaEklemeFormu> = {};

    if (step === 1) {
      if (!formData.ad.trim()) newErrors.ad = 'Ad zorunludur';
      if (!formData.soyad.trim()) newErrors.soyad = 'Soyad zorunludur';
      if (!formData.telefon.trim()) {
        newErrors.telefon = 'Telefon zorunludur';
      } else if (!validatePhone(formData.telefon)) {
        newErrors.telefon = 'Geçerli bir telefon numarası giriniz';
      }
      if (!formData.ilce) newErrors.ilce = 'İlçe seçimi zorunludur';
    }

    if (step === 2) {
      if (formData.hizmetler.length === 0) newErrors.hizmetler = 'En az bir hizmet seçmelisiniz';
      if (formData.deneyim < 1) newErrors.deneyim = 'Deneyim en az 1 yıl olmalıdır';
    }

    if (step === 3) {
      // Step 3 artık sadece ilan ücretleri seçimi
      // Fiyatlandırma validasyonu kaldırıldı
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UstaEklemeFormu> = {};

    // Tüm validasyonlar
    if (!formData.ad.trim()) newErrors.ad = 'Ad zorunludur';
    if (!formData.soyad.trim()) newErrors.soyad = 'Soyad zorunludur';
    if (!formData.telefon.trim()) {
      newErrors.telefon = 'Telefon zorunludur';
    } else if (!validatePhone(formData.telefon)) {
      newErrors.telefon = 'Geçerli bir telefon numarası giriniz';
    }
    if (!formData.ilce) newErrors.ilce = 'İlçe seçimi zorunludur';
    if (formData.hizmetler.length === 0) newErrors.hizmetler = 'En az bir hizmet seçmelisiniz';
    if (formData.deneyim < 1) newErrors.deneyim = 'Deneyim en az 1 yıl olmalıdır';

    // Email validasyonu (opsiyonel ama geçerli olmalı)
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    // Garanti süresi kontrolü
    if (formData.garanti && (!formData.garantiSuresi || formData.garantiSuresi < 1)) {
      newErrors.garantiSuresi = 'Garanti süresi en az 1 ay olmalıdır';
    }

    // Fiyatlandırma validasyonu kaldırıldı - artık fiyatlandırma step'i yok

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Ödeme detaylarını hesapla
    const baseAmount = formData.ilanPaketi === 'vip' ? 399 : 199;
    const extras: string[] = [];
    
    if (formData.oneCikanUsta) {
      extras.push('Öne Çıkan Usta');
    }

    const totalAmount = baseAmount + (extras.length * 100);

    setPaymentDetails({
      amount: baseAmount,
      package: formData.ilanPaketi as 'premium' | 'vip',
      extras,
      totalAmount
    });

    setShowPayment(true);
  };

  const handlePaymentSuccess = (transactionId: string) => {
    // Başarılı ödeme sonrası işlemler
    console.log('Ödeme başarılı:', transactionId);
    setShowPayment(false);
    
    // Burada backend'e usta kaydı gönderilebilir
    alert('Usta kaydınız başarıyla tamamlandı! Ödeme işlemi başarılı.');
  };

  const handlePaymentError = (error: string) => {
    console.error('Ödeme hatası:', error);
    setShowPayment(false);
    alert('Ödeme işlemi başarısız: ' + error);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  const odemeYontemleri = [
    { id: 'nakit', label: 'Nakit', icon: Banknote },
    { id: 'kredi-karti', label: 'Kredi Kartı', icon: CreditCard },
    { id: 'banka-karti', label: 'Banka Kartı', icon: CreditCard },
    { id: 'havale', label: 'Havale/EFT', icon: Banknote },
    { id: 'cek', label: 'Çek', icon: Banknote }
  ];



  const steps = [
    { id: 1, title: 'Kişisel Bilgiler', icon: User },
    { id: 2, title: 'Meslek Bilgileri', icon: Briefcase },
    { id: 3, title: 'İlan Ücretleri', icon: DollarSign },
    { id: 4, title: 'Özet & Gönder', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-primary-600">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-gray-900">Usta Ekle</span>
        </div>

        {/* Geri Dön Butonu */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="gradient-text">Usta Ekle</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AnkaraUstaBul ailesine katılın ve binlerce müşteriye ulaşın. 
            Hemen başvurunuzu yapın, onaylandıktan sonra hizmet vermeye başlayın.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center space-x-2 ${isActive ? 'text-primary-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      isActive ? 'border-primary-600 bg-primary-50' : 
                      isCompleted ? 'border-green-600 bg-green-50' : 
                      'border-gray-300 bg-gray-50'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle size={20} className="text-green-600" />
                      ) : (
                        <IconComponent size={20} />
                      )}
                    </div>
                    <span className="hidden md:block font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${isCompleted ? 'bg-green-600' : 'bg-gray-300'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          {/* Step 1: Kişisel Bilgiler */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <User className="text-primary-600" size={28} />
                <span>Kişisel Bilgiler</span>
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad *
                  </label>
                  <input
                    type="text"
                    name="ad"
                    value={formData.ad}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.ad ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Adınızı giriniz"
                  />
                  {errors.ad && <p className="text-red-500 text-sm mt-1">{errors.ad}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soyad *
                  </label>
                  <input
                    type="text"
                    name="soyad"
                    value={formData.soyad}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.soyad ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Soyadınızı giriniz"
                  />
                  {errors.soyad && <p className="text-red-500 text-sm mt-1">{errors.soyad}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="telefon"
                    value={formData.telefon}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.telefon ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="0532 123 45 67"
                  />
                  {errors.telefon && <p className="text-red-500 text-sm mt-1">{errors.telefon}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.email ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="ornek@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İlçe *
                  </label>
                  <select
                    name="ilce"
                    value={formData.ilce}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.ilce ? 'border-red-300' : 'border-gray-200'
                    }`}
                  >
                    <option value="">İlçe seçiniz</option>
                    {ilceler.map((ilce) => (
                      <option key={ilce.id} value={ilce.ad}>
                        {ilce.ad}
                      </option>
                    ))}
                  </select>
                  {errors.ilce && <p className="text-red-500 text-sm mt-1">{errors.ilce}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adres
                  </label>
                  <textarea
                    name="adres"
                    value={formData.adres}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Detaylı adresinizi giriniz"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary"
                >
                  Geri
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary"
                >
                  Devam Et <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Meslek Bilgileri */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Briefcase className="text-primary-600" size={28} />
                <span>Meslek Bilgileri</span>
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hizmetler *
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                    {hizmetKategorileri.map((kategori) => (
                      <label key={kategori.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.hizmetler.includes(kategori.ad)}
                          onChange={() => handleHizmetToggle(kategori.ad)}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{kategori.ad}</span>
                      </label>
                    ))}
                  </div>
                  {errors.hizmetler && <p className="text-red-500 text-sm mt-1">{errors.hizmetler}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deneyim (Yıl) *
                  </label>
                  <input
                    type="number"
                    name="deneyim"
                    value={formData.deneyim}
                    onChange={handleInputChange}
                    min="1"
                    max="50"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.deneyim ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                  {errors.deneyim && <p className="text-red-500 text-sm mt-1">{errors.deneyim}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlangıç Saati
                  </label>
                      <input
                        type="time"
                        name="calismaSaatleriBaslangic"
                        value={formData.calismaSaatleriBaslangic}
                        onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bitiş Saati
                  </label>
                      <input
                        type="time"
                        name="calismaSaatleriBitis"
                        value={formData.calismaSaatleriBitis}
                        onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acilServis"
                    checked={formData.acilServis}
                    onChange={handleInputChange}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                    <span className="text-sm font-medium text-gray-700">7/24 Acil Servis</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="garanti"
                      checked={formData.garanti}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-gray-700">İşçilik Garantisi</span>
                    </label>
                  
                  {formData.garanti && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Garanti Süresi (Ay)
                      </label>
                      <input
                        type="number"
                        name="garantiSuresi"
                        value={formData.garantiSuresi}
                        onChange={handleInputChange}
                        min="1"
                        max="60"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.garantiSuresi ? 'border-red-300' : 'border-gray-200'
                        }`}
                      />
                      {errors.garantiSuresi && <p className="text-red-500 text-sm mt-1">{errors.garantiSuresi}</p>}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hakkında
                  </label>
                  <textarea
                    name="hakkinda"
                    value={formData.hakkinda}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Kendiniz ve hizmetleriniz hakkında kısa bir açıklama yazın..."
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary"
                >
                  Geri
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary"
                >
                  Devam Et <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: İlan Yayınlama Ücretleri */}
          {currentStep === 3 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sol Taraf - İlan Ücretleri */}
                <div className="space-y-6">
                  {/* İlan Yayınlama Paketleri */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                        <line x1="12" x2="12" y1="2" y2="22"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                      <span>İlan Yayınlama Paketleri</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <label className="flex items-center space-x-3 cursor-pointer p-4 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors bg-primary-50">
                          <input
                            type="radio"
                            name="ilanPaketi"
                            value="premium"
                            checked={formData.ilanPaketi === 'premium'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">Premium İlan</div>
                            <div className="text-sm text-gray-600">Öne çıkan ilan, üst sıralama, özel rozet</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary-600">₺199</div>
                            <div className="text-xs text-gray-500">Aylık</div>
                          </div>
                        </label>
                        
                        <label className="flex items-center space-x-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-white transition-colors bg-white">
                          <input
                            type="radio"
                            name="ilanPaketi"
                            value="vip"
                            checked={formData.ilanPaketi === 'vip'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">VIP İlan</div>
                            <div className="text-sm text-gray-600">Maksimum görünürlük, özel destek, reklam kredisi</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-purple-600">₺399</div>
                            <div className="text-xs text-gray-500">Aylık</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Öne Çıkan Usta Seçeneği */}
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h3 className="text-lg font-semibold text-yellow-900 mb-3">⭐ Öne Çıkan Usta Olmak İstiyorum</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer p-3 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors bg-yellow-100">
                        <input
                          type="checkbox"
                          name="oneCikanUsta"
                          checked={formData.oneCikanUsta}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">Anasayfada Öne Çıkan Usta</div>
                          <div className="text-sm text-gray-600">Anasayfada özel kart tasarımı ile gösterilme</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-yellow-600">+₺100</div>
                          <div className="text-xs text-gray-500">Aylık</div>
                        </div>
                      </label>
                    </div>
                    <div className="mt-3 p-3 bg-white rounded-lg border border-yellow-200">
                      <h4 className="font-medium text-yellow-900 mb-2">Öne Çıkan Usta Avantajları:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li className="flex items-center space-x-2">
                          <span className="text-yellow-500">•</span>
                          <span>Gelişmiş kart tasarımı ve özel rozetler</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-yellow-500">•</span>
                          <span>WhatsApp entegrasyonu ve VIP destek</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-yellow-500">•</span>
                          <span>Anasayfada öncelikli gösterim</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-yellow-500">•</span>
                          <span>Müşteri güvenini artıran özel tasarım</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Toplam Ücret Özeti */}
                  <div className="bg-primary-50 p-4 rounded-lg border border-primary-200">
                    <h3 className="text-lg font-semibold text-primary-900 mb-3">Toplam Ücret Özeti</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Premium İlan Paketi:</span>
                        <span className="font-medium text-primary-600">₺199</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ek Hizmetler:</span>
                        <span className="font-medium text-gray-600">₺0</span>
                      </div>
                      <div className="pt-2 border-t border-primary-200">
                        <div className="flex justify-between">
                          <span className="font-bold">Toplam Aylık Ücret:</span>
                          <span className="font-bold text-primary-600 text-lg">₺199</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* İlan Yayınlama İpuçları */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 İlan Yayınlama İpuçları</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500">•</span>
                      <span>Premium paket ile daha fazla müşteriye ulaşın</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500">•</span>
                      <span>VIP paket ile maksimum görünürlük elde edin</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500">•</span>
                      <span>Ek hizmetler ile müşteri memnuniyetini artırın</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500">•</span>
                      <span>WhatsApp entegrasyonu ile hızlı iletişim sağlayın</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary"
                >
                  Geri
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary"
                >
                  Devam Et <ChevronRight size={20} />
                </button>
              </div>
            </>
          )}

          {/* Step 4: Özet & Gönder */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <CheckCircle className="text-primary-600" size={28} />
                <span>Özet & Gönder</span>
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Kişisel Bilgiler</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div><span className="font-medium">Ad Soyad:</span> {formData.ad} {formData.soyad}</div>
                    <div><span className="font-medium">Telefon:</span> {formData.telefon}</div>
                    <div><span className="font-medium">E-posta:</span> {formData.email || 'Belirtilmedi'}</div>
                    <div><span className="font-medium">İlçe:</span> {formData.ilce}</div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900">Meslek Bilgileri</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div><span className="font-medium">Hizmetler:</span> {formData.hizmetler.join(', ')}</div>
                    <div><span className="font-medium">Deneyim:</span> {formData.deneyim} yıl</div>
                    <div><span className="font-medium">Çalışma Saatleri:</span> {formData.calismaSaatleriBaslangic} - {formData.calismaSaatleriBitis}</div>
                    <div><span className="font-medium">7/24 Acil Servis:</span> {formData.acilServis ? 'Evet' : 'Hayır'}</div>
                    <div><span className="font-medium">Garanti:</span> {formData.garanti ? `${formData.garantiSuresi} ay` : 'Hayır'}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">İlan Yayınlama Ücretleri</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Seçilen Paket:</span>
                      <span className="text-primary-600 font-semibold">Premium İlan</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Paket Ücreti:</span>
                      <span className="text-primary-600 font-semibold">₺199</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Ek Hizmetler:</span>
                      <span className="text-gray-600">₺0</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="font-bold">Toplam Aylık Ücret:</span>
                        <span className="text-primary-600 font-bold text-lg">₺199</span>
                      </div>
                </div>
              </div>
            </div>
          </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary"
                >
                  Geri
                </button>
              <button
                type="submit"
                disabled={loading}
                  className="btn-primary text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  {loading ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
              </button>
              </div>
            </div>
          )}
        </form>

        {/* Ödeme Modal */}
        {showPayment && (
          <ShopierPayment
            paymentDetails={paymentDetails}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            onCancel={handlePaymentCancel}
          />
        )}
      </div>
    </div>
  );
};

export default UstaEkle;