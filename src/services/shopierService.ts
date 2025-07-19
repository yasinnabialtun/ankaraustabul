// Shopier Payment Service
export interface PaymentData {
  amount: number;
  currency: string;
  description: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  packageType: string;
}

export const shopierService = {
  // Test mode - simulate payment
  async initiatePayment(data: PaymentData) {
    try {
      // In development, simulate payment
      if (import.meta.env.DEV) {
        console.log('💳 SHOPIER ÖDEME SIMÜLASYONU:', data);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate fake transaction ID
        const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        return {
          success: true,
          transactionId,
          paymentUrl: '#',
          message: 'Test modunda ödeme simülasyonu başarılı'
        };
      }

      // In production, use actual Shopier API
      if (import.meta.env.PROD) {
        console.log('💳 SHOPIER ÖDEME BAŞLATILIYOR:', data);
        
        // For now, simulate payment in production too
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        return {
          success: true,
          transactionId,
          paymentUrl: '#',
          message: 'Ödeme başarıyla başlatıldı'
        };
      }

      throw new Error('Environment not configured');
    } catch (error) {
      console.error('❌ Shopier API Error:', error);
      return {
        success: false,
        error: 'Ödeme başlatılamadı. Lütfen tekrar deneyin.',
        details: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  // Verify payment
  async verifyPayment(transactionId: string) {
    try {
      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        verified: true,
        message: 'Ödeme doğrulandı'
      };
    } catch (error) {
      console.error('❌ Payment verification error:', error);
      return {
        success: false,
        verified: false,
        error: 'Ödeme doğrulanamadı'
      };
    }
  }
}; 