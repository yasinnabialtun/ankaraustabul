// Backend API entegrasyonu için servis
export interface PaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
  redirectUrl?: string;
}

export interface PaymentStatusResponse {
  success: boolean;
  transactionId?: string;
  status?: string;
  error?: string;
}

// Backend API URL'i
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class PaymentService {
  // Backend üzerinden ödeme başlatma
  async initiatePayment(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentRequest)
      });

      const data = await response.json();

      if (data.success) {
        return {
          success: true,
          transactionId: data.transactionId,
          redirectUrl: data.redirectUrl
        };
      } else {
        return {
          success: false,
          error: data.error || 'Ödeme başlatılamadı'
        };
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      return {
        success: false,
        error: 'Ödeme servisi şu anda kullanılamıyor'
      };
    }
  }

  // Backend üzerinden ödeme durumu sorgulama
  async checkPaymentStatus(transactionId: string): Promise<PaymentStatusResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/status/${transactionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      return {
        success: data.success,
        transactionId: data.transactionId,
        status: data.status,
        error: data.error
      };
    } catch (error) {
      console.error('Payment status check error:', error);
      return {
        success: false,
        error: 'Ödeme durumu sorgulanamadı'
      };
    }
  }

  // Backend sağlık kontrolü
  async checkBackendHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      const data = await response.json();
      return data.status === 'OK';
    } catch (error) {
      console.error('Backend health check failed:', error);
      return false;
    }
  }
}

// Payment service instance
export const paymentService = new PaymentService();

// Ödeme yardımcı fonksiyonları
export const createPaymentRequest = (
  amount: number,
  packageType: 'premium' | 'vip',
  extras: string[],
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  }
): PaymentRequest => {
  const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const items = [
    {
      name: packageType === 'vip' ? 'VIP İlan Paketi' : 'Premium İlan Paketi',
      price: packageType === 'vip' ? 399 : 199,
      quantity: 1
    }
  ];

  // Ek hizmetler
  extras.forEach(extra => {
    items.push({
      name: extra,
      price: 100,
      quantity: 1
    });
  });

  return {
    amount,
    currency: 'TRY',
    orderId,
    customerInfo,
    items
  };
};

// Ödeme sonucu işleme
export const handlePaymentResult = async (
  transactionId: string,
  onSuccess: (transactionId: string) => void,
  onError: (error: string) => void
) => {
  try {
    const result = await paymentService.checkPaymentStatus(transactionId);
    
    if (result.success && result.status === 'success') {
      onSuccess(transactionId);
    } else {
      onError(result.error || 'Ödeme doğrulanamadı');
    }
  } catch (error) {
    onError('Ödeme durumu kontrol edilemedi');
  }
}; 