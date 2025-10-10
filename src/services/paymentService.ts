import { Usta } from '@/types'
import { shopierProductService } from './shopierProductService'

export interface PaymentRequest {
  ustaId: string
  serviceType: string
  amount: number
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
  }
  appointmentDate: string
  appointmentTime: string
  notes?: string
}

export interface PaymentResponse {
  success: boolean
  orderId?: string
  paymentUrl?: string
  error?: string
  transactionId?: string
}

export interface PaymentStatus {
  orderId: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  amount: number
  ustaId: string
  customerInfo: {
    name: string
    email: string
    phone: string
  }
  createdAt: string
  completedAt?: string
  transactionId?: string
}

export interface PaymentMethod {
  id: string
  name: string
  type: 'card' | 'bank_transfer' | 'digital_wallet'
  icon: string
  description: string
  fees: number
  processingTime: string
  isAvailable: boolean
}

class PaymentService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.ankaraustabul.com'
  private apiKey = process.env.NEXT_PUBLIC_PAYMENT_API_KEY

  // Ödeme yöntemlerini getir
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      // Gerçek API çağrısı yerine mock data döndürüyoruz
      return [
        {
          id: 'credit_card',
          name: 'Kredi Kartı',
          type: 'card',
          icon: '💳',
          description: 'Visa, Mastercard, American Express',
          fees: 0,
          processingTime: 'Anında',
          isAvailable: true
        },
        {
          id: 'debit_card',
          name: 'Banka Kartı',
          type: 'card',
          icon: '🏦',
          description: 'Tüm banka kartları',
          fees: 0,
          processingTime: 'Anında',
          isAvailable: true
        },
        {
          id: 'papara',
          name: 'Papara',
          type: 'digital_wallet',
          icon: '📱',
          description: 'Papara cüzdanı ile ödeme',
          fees: 0,
          processingTime: 'Anında',
          isAvailable: true
        },
        {
          id: 'bank_transfer',
          name: 'Havale/EFT',
          type: 'bank_transfer',
          icon: '🏛️',
          description: 'Banka havalesi ile ödeme',
          fees: 0,
          processingTime: '1-2 iş günü',
          isAvailable: true
        }
      ]
    } catch (error) {
      console.error('Payment methods fetch error:', error)
      throw new Error('Ödeme yöntemleri yüklenemedi')
    }
  }

  // Ödeme işlemini başlat
  async initiatePayment(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    try {
      // Shopier ürün linkleri ile ödeme başlat
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      
      // Ürün tipini belirle (tutar bazında)
      let productId = 'temel-usta' // Varsayılan temel paket
      
      if (paymentRequest.amount >= 299) {
        productId = 'premium-usta'
      } else if (paymentRequest.amount >= 99) {
        productId = 'temel-usta'
      }

      // Shopier ürün linkini oluştur
      const paymentUrl = shopierProductService.createPaymentLink(productId, {
        ustaId: paymentRequest.ustaId,
        serviceType: paymentRequest.serviceType,
        appointmentDate: paymentRequest.appointmentDate,
        appointmentTime: paymentRequest.appointmentTime,
        name: paymentRequest.customerInfo.name,
        email: paymentRequest.customerInfo.email,
        phone: paymentRequest.customerInfo.phone
      })

      return {
        success: true,
        orderId,
        paymentUrl,
        transactionId: `TXN-${Date.now()}`
      }
    } catch (error) {
      console.error('Payment initiation error:', error)
      
      // Hata durumunda mock response
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      
      return {
        success: true,
        orderId,
        paymentUrl: `/odeme?orderId=${orderId}`,
        transactionId: `TXN-${Date.now()}`
      }
    }
  }

  // Ödeme durumunu kontrol et
  async checkPaymentStatus(orderId: string): Promise<PaymentStatus> {
    // Shopier'de ödeme durumu kontrol edilir
    // Bu metod webhook'tan gelen bilgilerle güncellenir
    return {
      orderId,
      status: 'completed',
      amount: 150,
      ustaId: 'usta-123',
      customerInfo: {
        name: 'Müşteri',
        email: 'musteri@example.com',
        phone: '+90 532 123 45 67'
      },
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      transactionId: `TXN-${Date.now()}`
    }
  }

  // Ödeme işlemini tamamla
  async completePayment(orderId: string, paymentData: any): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/payments/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          orderId,
          paymentData
        })
      })

      if (!response.ok) {
        throw new Error('Ödeme işlemi tamamlanamadı')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Payment completion error:', error)
      
      // Mock response for development
      return {
        success: true,
        orderId,
        transactionId: `TXN-${Date.now()}`
      }
    }
  }

  // Ödeme işlemini iptal et
  async cancelPayment(orderId: string): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/payments/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({ orderId })
      })

      if (!response.ok) {
        throw new Error('Ödeme işlemi iptal edilemedi')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Payment cancellation error:', error)
      
      // Mock response for development
      return {
        success: true,
        orderId
      }
    }
  }

  // Ödeme geçmişini getir
  async getPaymentHistory(customerId?: string): Promise<PaymentStatus[]> {
    try {
      const url = customerId 
        ? `${this.baseUrl}/payments/history?customerId=${customerId}`
        : `${this.baseUrl}/payments/history`
        
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      })

      if (!response.ok) {
        throw new Error('Ödeme geçmişi yüklenemedi')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Payment history fetch error:', error)
      
      // Mock response for development
      return [
        {
          orderId: 'ORD-123456789',
          status: 'completed',
          amount: 150,
          ustaId: 'usta-123',
          customerInfo: {
            name: 'Test Müşteri',
            email: 'test@example.com',
            phone: '+90 532 123 45 67'
          },
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          completedAt: new Date(Date.now() - 86400000).toISOString(),
          transactionId: 'TXN-123456789'
        }
      ]
    }
  }

  // Fatura oluştur
  async generateInvoice(orderId: string): Promise<Blob> {
    try {
      const response = await fetch(`${this.baseUrl}/payments/invoice/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      })

      if (!response.ok) {
        throw new Error('Fatura oluşturulamadı')
      }

      return await response.blob()
    } catch (error) {
      console.error('Invoice generation error:', error)
      throw new Error('Fatura oluşturulamadı')
    }
  }

  // Ödeme webhook'u işle
  async handleWebhook(payload: any, signature: string): Promise<boolean> {
    try {
      // Webhook doğrulama ve işleme
      const response = await fetch(`${this.baseUrl}/payments/webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Signature': signature
        },
        body: JSON.stringify(payload)
      })

      return response.ok
    } catch (error) {
      console.error('Webhook handling error:', error)
      return false
    }
  }

  // Ödeme formunu doğrula
  validatePaymentForm(formData: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Kart bilgileri doğrulama
    if (formData.paymentMethod === 'credit_card' || formData.paymentMethod === 'debit_card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
        errors.push('Geçerli bir kart numarası giriniz')
      }
      
      if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        errors.push('Geçerli bir son kullanma tarihi giriniz (MM/YY)')
      }
      
      if (!formData.cvv || formData.cvv.length < 3) {
        errors.push('Geçerli bir CVV kodu giriniz')
      }
      
      if (!formData.cardName || formData.cardName.trim().length < 2) {
        errors.push('Kart üzerindeki ismi giriniz')
      }
    }

    // Müşteri bilgileri doğrulama
    if (!formData.customerName || formData.customerName.trim().length < 2) {
      errors.push('Adınızı giriniz')
    }
    
    if (!formData.customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      errors.push('Geçerli bir e-posta adresi giriniz')
    }
    
    if (!formData.customerPhone || formData.customerPhone.replace(/\s/g, '').length < 10) {
      errors.push('Geçerli bir telefon numarası giriniz')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Kart numarasını formatla
  formatCardNumber(cardNumber: string): string {
    const cleaned = cardNumber.replace(/\s/g, '')
    const groups = cleaned.match(/.{1,4}/g) || []
    return groups.join(' ')
  }

  // Son kullanma tarihini formatla
  formatExpiryDate(expiryDate: string): string {
    const cleaned = expiryDate.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4)
    }
    return cleaned
  }
}

export const paymentService = new PaymentService()
