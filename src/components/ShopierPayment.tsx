import { useState } from 'react';
import { CreditCard, Lock, Shield, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { shopierService } from '../services/shopierService';

interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  amount: string;
  description: string;
}

interface ShopierPaymentProps {
  amount: number;
  description: string;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
  ustaData?: {
    name: string;
    category: string;
    experience: string;
    location: string;
    hourlyRate: string;
    specialties: string[];
    serviceAreas: string[];
    email?: string;
    phone?: string;
  };
  packageType?: string;
}

function ShopierPayment({ 
  amount, 
  description, 
  onSuccess, 
  onError,
  ustaData,
  packageType
}: ShopierPaymentProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    amount: amount.toString(),
    description: description
  });
  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

  const validateForm = () => {
    const newErrors: Partial<PaymentFormData> = {};

    if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Geçerli bir kart numarası giriniz';
    }

    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = 'Kart sahibi adı gereklidir';
    }

    if (!formData.expiryMonth) {
      newErrors.expiryMonth = 'Son kullanma ayı gereklidir';
    }

    if (!formData.expiryYear) {
      newErrors.expiryYear = 'Son kullanma yılı gereklidir';
    }

    if (!formData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'Geçerli bir CVV giriniz';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Geçerli bir tutar giriniz';
    }

    // Validate expiry date
    if (formData.expiryMonth && formData.expiryYear) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      
      const expYear = parseInt(formData.expiryYear);
      const expMonth = parseInt(formData.expiryMonth);
      
      if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        newErrors.expiryMonth = 'Geçersiz son kullanma tarihi';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    
    if (errors[name as keyof PaymentFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Call Shopier API with enhanced data
      const paymentResponse = await shopierService.initiatePayment({
        amount: parseFloat(formData.amount),
        currency: 'TRY',
        description: formData.description,
        customerEmail: ustaData?.email || 'customer@example.com',
        customerName: ustaData?.name || formData.cardHolder,
        customerPhone: ustaData?.phone || '+905551234567',
        packageType: packageType || 'BASIC'
      });

      if (paymentResponse.success && paymentResponse.transactionId) {
        setIsSuccess(true);
        onSuccess(paymentResponse.transactionId);
      } else {
        onError(paymentResponse.error || 'Ödeme işlemi başarısız oldu');
      }
    } catch (error) {
      onError('Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ödeme Başarılı!</h2>
        <p className="text-gray-600 mb-6">
          Ödeme işleminiz başarıyla tamamlandı. İşlem detayları e-posta adresinize gönderilecektir.
        </p>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-sm text-green-700">
            <strong>İşlem Tutarı:</strong> {formatCurrency(parseFloat(formData.amount))}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Güvenli Ödeme</h2>
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-green-600" />
          <span className="text-sm text-green-600 font-semibold">SSL Güvenli</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount Display */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Ödenecek Tutar:</span>
            <span className="text-2xl font-bold text-gray-800">
              {formatCurrency(parseFloat(formData.amount))}
            </span>
          </div>
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kart Numarası
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
          )}
        </div>

        {/* Card Holder */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kart Sahibi
          </label>
          <input
            type="text"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleInputChange}
            placeholder="Ad Soyad"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.cardHolder ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.cardHolder && (
            <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>
          )}
        </div>

        {/* Expiry Date and CVV */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ay
            </label>
            <select
              name="expiryMonth"
              value={formData.expiryMonth}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.expiryMonth ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Ay</option>
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            {errors.expiryMonth && (
              <p className="text-red-500 text-sm mt-1">{errors.expiryMonth}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Yıl
            </label>
            <select
              name="expiryYear"
              value={formData.expiryYear}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.expiryYear ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Yıl</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {errors.expiryYear && (
              <p className="text-red-500 text-sm mt-1">{errors.expiryYear}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength={4}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.cvv ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.cvv && (
              <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
              İşleniyor...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Shield className="w-5 h-5 mr-2" />
              Güvenli Ödeme Yap
            </div>
          )}
        </button>

        {/* Security Notice */}
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-semibold mb-1">Güvenli Ödeme</p>
              <p>Bilgileriniz SSL şifreleme ile korunmaktadır. Kart bilgileriniz saklanmaz.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ShopierPayment; 