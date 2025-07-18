// Shopier API Configuration
const SHOPIER_CONFIG = {
  API_USER: '3c9f8238d58a9c5dd4a4219e95ab8678',
  API_PASSWORD: '688aa693ca57a801eeb7cf1f12a3b472',
  RETURN_URL: window.location.origin + '/payment-success',
  BASE_URL: 'https://www.shopier.com/api'
};

export interface ShopierPaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  description: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  returnUrl: string;
  cancelUrl: string;
}

export interface ShopierPaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  error?: string;
}

export interface ShopierPaymentStatus {
  success: boolean;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  transactionId?: string;
  amount?: number;
  error?: string;
}

class ShopierService {
  private generateOrderId(): string {
    return 'ORDER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private async makeApiRequest(endpoint: string, data: any): Promise<any> {
    try {
      const response = await fetch(`${SHOPIER_CONFIG.BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${SHOPIER_CONFIG.API_USER}:${SHOPIER_CONFIG.API_PASSWORD}`)}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Shopier API Error:', error);
      throw error;
    }
  }

  async initiatePayment(paymentData: Omit<ShopierPaymentRequest, 'orderId' | 'returnUrl' | 'cancelUrl'>): Promise<ShopierPaymentResponse> {
    try {
      const orderId = this.generateOrderId();
      
      const requestData = {
        ...paymentData,
        orderId,
        returnUrl: SHOPIER_CONFIG.RETURN_URL,
        cancelUrl: window.location.origin + '/payment-cancelled'
      };

      // Simulate API call for development
      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate successful payment
        return {
          success: true,
          transactionId: 'SHOP_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
          paymentUrl: '/payment-success'
        };
      }

      // Real API call
      const response = await this.makeApiRequest('/payment/initiate', requestData);
      
      return {
        success: response.success,
        transactionId: response.transactionId,
        paymentUrl: response.paymentUrl,
        error: response.error
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Ödeme başlatılamadı'
      };
    }
  }

  async checkPaymentStatus(transactionId: string): Promise<ShopierPaymentStatus> {
    try {
      // Simulate API call for development
      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
          success: true,
          status: 'completed',
          transactionId,
          amount: 177
        };
      }

      // Real API call
      const response = await this.makeApiRequest('/payment/status', { transactionId });
      
      return {
        success: response.success,
        status: response.status,
        transactionId: response.transactionId,
        amount: response.amount,
        error: response.error
      };
    } catch (error) {
      return {
        success: false,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Ödeme durumu kontrol edilemedi'
      };
    }
  }

  async refundPayment(transactionId: string, amount: number): Promise<ShopierPaymentResponse> {
    try {
      // Simulate API call for development
      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        return {
          success: true,
          transactionId: 'REFUND_' + transactionId
        };
      }

      // Real API call
      const response = await this.makeApiRequest('/payment/refund', {
        transactionId,
        amount
      });
      
      return {
        success: response.success,
        transactionId: response.refundTransactionId,
        error: response.error
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'İade işlemi başarısız'
      };
    }
  }

  // Helper method to format currency
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  }

  // Helper method to validate card number
  validateCardNumber(cardNumber: string): boolean {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    return /^\d{16}$/.test(cleanNumber);
  }

  // Helper method to validate CVV
  validateCVV(cvv: string): boolean {
    return /^\d{3,4}$/.test(cvv);
  }

  // Helper method to validate expiry date
  validateExpiryDate(month: string, year: string): boolean {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    const expYear = parseInt(year);
    const expMonth = parseInt(month);
    
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    
    return expMonth >= 1 && expMonth <= 12;
  }
}

export const shopierService = new ShopierService();
export default shopierService; 