import { useState } from 'react';
import { CreditCard, Lock, Shield, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import shopierService from '../services/shopierService';

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
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

function ShopierPayment({ 
  amount, 
  description, 
  customerEmail = 'musteri@email.com',
  customerPhone = '',
  onSuccess, 
  onError 
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

    if (!shopierService.validateCardNumber(formData.cardNumber)) {
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

    if (!shopierService.validateCVV(formData.cvv)) {
      newErrors.cvv = 'Geçerli bir CVV giriniz';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Geçerli bir tutar giriniz';
    }

    // Validate expiry date
    if (formData.expiryMonth && formData.expiryYear) {
      if (!shopierService.validateExpiryDate(formData.expiryMonth, formData.expiryYear)) {
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
      // Call Shopier API
      const paymentResponse = await shopierService.initiatePayment({
        amount: parseFloat(formData.amount),
        currency: 'TRY',
        description: formData.description,
        customerName: formData.cardHolder,
        customerEmail: customerEmail,
        customerPhone: customerPhone
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
            <strong>İşlem Tutarı:</strong> {shopierService.formatCurrency(parseFloat(formData.amount))}
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
              {shopierService.formatCurrency(parseFloat(formData.amount))}
            </span>
          </div>
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <CreditCard className="w-4 h-4 inline mr-2" />
            Kart Numarası
          </label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            maxLength={19}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.cardNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="1234 5678 9012 3456"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.cardNumber}
            </p>
          )}
        </div>

        {/* Card Holder */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Kart Sahibi
          </label>
          <input
            type="text"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.cardHolder ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ad Soyad"
          />
          {errors.cardHolder && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.cardHolder}
            </p>
          )}
        </div>

        {/* Expiry and CVV */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ay
            </label>
            <select
              name="expiryMonth"
              value={formData.expiryMonth}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.expiryMonth ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Ay</option>
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            {errors.expiryMonth && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.expiryMonth}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Yıl
            </label>
            <select
              name="expiryYear"
              value={formData.expiryYear}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.expiryYear ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Yıl</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {errors.expiryYear && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.expiryYear}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              CVV
            </label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              maxLength={4}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.cvv ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="123"
            />
            {errors.cvv && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.cvv}
              </p>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-800 mb-1">Güvenli Ödeme</h4>
              <p className="text-sm text-blue-700">
                Kart bilgileriniz SSL şifreleme ile korunmaktadır. 
                Bilgileriniz hiçbir şekilde saklanmamaktadır.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              İşlem Yapılıyor...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Lock className="w-5 h-5 mr-2" />
              {shopierService.formatCurrency(parseFloat(formData.amount))} Öde
            </div>
          )}
        </button>
      </form>
    </div>
  );
}

export default ShopierPayment; 