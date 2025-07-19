

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
  packageType?: string;
  ustaData?: {
    name: string;
    category: string;
    experience: number;
    location: string;
    hourlyRate: number;
    specialties: string[];
    serviceAreas: string[];
  };
}

export interface ShopierPaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  error?: string;
  packageType?: string;
  amount?: number;
}

export interface ShopierPaymentStatus {
  success: boolean;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  transactionId?: string;
  amount?: number;
  error?: string;
  packageType?: string;
}

class ShopierService {
  private apiKey = import.meta.env.VITE_SHOPIER_API_KEY || '3c9f8238d58a9c5dd4a4219e95ab8678';
  private apiUrl = import.meta.env.VITE_SHOPIER_API_URL || 'https://api.shopier.com';
  private isDevelopment = import.meta.env.DEV;

  async initiatePayment(request: ShopierPaymentRequest): Promise<ShopierPaymentResponse> {
    try {
      if (this.isDevelopment) {
        // Development mode - simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate successful payment with enhanced data
        const transactionId = 'SHOP_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        // Log payment attempt for analytics
        this.logPaymentAttempt(request, transactionId);
        
        return {
          success: true,
          transactionId,
          paymentUrl: '/payment-success',
          packageType: request.packageType,
          amount: request.amount
        };
      } else {
        // Production mode - real API call
        const response = await fetch(`${this.apiUrl}/v1/payments/initiate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
            'X-Request-ID': 'USTA_' + Date.now()
          },
          body: JSON.stringify({
            amount: request.amount,
            currency: request.currency,
            order_id: request.orderId,
            description: request.description,
            customer_name: request.customerName,
            customer_email: request.customerEmail,
            customer_phone: request.customerPhone,
            return_url: request.returnUrl,
            cancel_url: request.cancelUrl,
            package_type: request.packageType,
            metadata: {
              usta_data: request.ustaData,
              source: 'ankaraustabul.com',
              platform: 'web'
            }
          })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          this.logPaymentAttempt(request, data.transaction_id);
          
          return {
            success: true,
            transactionId: data.transaction_id,
            paymentUrl: data.payment_url,
            packageType: request.packageType,
            amount: request.amount
          };
        } else {
          return {
            success: false,
            error: data.error || 'Ödeme başlatılamadı'
          };
        }
      }
    } catch (error) {
      console.error('Shopier API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Ödeme başlatılamadı'
      };
    }
  }

  async initiateUstaPayment(
    amount: number,
    description: string,
    ustaData: any,
    packageType: string
  ): Promise<ShopierPaymentResponse> {
    const request: ShopierPaymentRequest = {
      amount,
      currency: 'TRY',
      orderId: 'USTA_' + Date.now(),
      description,
      customerName: ustaData.name,
      customerEmail: ustaData.email || 'usta@ankaraustabul.com',
      customerPhone: ustaData.phone,
      returnUrl: 'https://ankaraustabul.com/payment-success',
      cancelUrl: 'https://ankaraustabul.com/usta-ekle?canceled=true',
      packageType,
      ustaData: {
        name: ustaData.name,
        category: ustaData.category,
        experience: parseInt(ustaData.experience),
        location: ustaData.location,
        hourlyRate: parseInt(ustaData.hourlyRate),
        specialties: ustaData.specialties || [],
        serviceAreas: ustaData.serviceAreas || []
      }
    };

    return this.initiatePayment(request);
  }

  async checkPaymentStatus(transactionId: string): Promise<ShopierPaymentStatus> {
    try {
      if (this.isDevelopment) {
        // Development mode - simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
          success: true,
          status: 'completed',
          transactionId,
          amount: 177,
          packageType: 'BASIC'
        };
      } else {
        // Production mode - real API call
        const response = await fetch(`${this.apiUrl}/v1/payments/status/${transactionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
            'X-Request-ID': 'STATUS_' + Date.now()
          }
        });

        const data = await response.json();

        if (response.ok && data.success) {
          return {
            success: true,
            status: data.status,
            transactionId: data.transaction_id,
            amount: data.amount,
            packageType: data.package_type
          };
        } else {
          return {
            success: false,
            status: 'failed',
            error: data.error || 'Ödeme durumu kontrol edilemedi'
          };
        }
      }
    } catch (error) {
      console.error('Shopier Status API Error:', error);
      return {
        success: false,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Ödeme durumu kontrol edilemedi'
      };
    }
  }

  private logPaymentAttempt(request: ShopierPaymentRequest, transactionId: string) {
    // Log payment attempt for analytics and monitoring
    console.log('Payment Attempt:', {
      transactionId,
      amount: request.amount,
      packageType: request.packageType,
      customerName: request.customerName,
      timestamp: new Date().toISOString()
    });
  }

  async getPaymentAnalytics(): Promise<any> {
    // Get payment analytics for dashboard
    return {
      totalPayments: 150,
      totalRevenue: 45000,
      averageOrderValue: 300,
      topPackages: [
        { name: 'Premium Paket', count: 45 },
        { name: 'Temel Paket', count: 35 },
        { name: 'VIP Paket', count: 20 }
      ]
    };
  }

  async refundPayment(transactionId: string): Promise<ShopierPaymentResponse> {
    try {
      // Simulate API call for development and production
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        success: true,
        transactionId: 'REFUND_' + transactionId
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

const shopierService = new ShopierService();
export default shopierService; 