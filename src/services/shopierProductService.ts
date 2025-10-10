import { PaymentRequest, PaymentResponse } from './paymentService'

interface ShopierProduct {
  id: string
  name: string
  price: number
  currency: string
  description: string
  shopierUrl: string
  isActive: boolean
}

interface ShopierProductService {
  getProducts(): ShopierProduct[]
  getProductById(id: string): ShopierProduct | null
  createPaymentLink(productId: string, customerInfo: any): string
}

class ShopierProductService {
  private products: ShopierProduct[] = [
    {
      id: 'premium-usta',
      name: 'Öne Çıkan Usta Kaydı',
      price: 299.00,
      currency: 'TL',
      description: 'Premium usta kaydı - Öne çıkan konumda görünme',
      shopierUrl: 'https://shopier.com/37747307',
      isActive: true
    },
    {
      id: 'temel-usta',
      name: 'Temel Usta Kaydı',
      price: 99.00,
      currency: 'TL',
      description: 'Temel usta kaydı - Standart konumda görünme',
      shopierUrl: 'https://shopier.com/37747290',
      isActive: true
    }
  ]

  // Tüm ürünleri getir
  getProducts(): ShopierProduct[] {
    return this.products.filter(product => product.isActive)
  }

  // ID'ye göre ürün getir
  getProductById(id: string): ShopierProduct | null {
    return this.products.find(product => product.id === id && product.isActive) || null
  }

  // Ödeme linki oluştur
  createPaymentLink(productId: string, customerInfo: any): string {
    const product = this.getProductById(productId)
    
    if (!product) {
      throw new Error('Ürün bulunamadı')
    }

    // Shopier URL'sine müşteri bilgilerini ekle
    const params = new URLSearchParams({
      // Shopier'de önceden tanımlanmış parametreler
      'customer_name': customerInfo.name || '',
      'customer_email': customerInfo.email || '',
      'customer_phone': customerInfo.phone || '',
      'return_url': `${process.env.NEXT_PUBLIC_APP_URL}/odeme-basarili`,
      'cancel_url': `${process.env.NEXT_PUBLIC_APP_URL}/odeme-iptal`,
      'webhook_url': `${process.env.NEXT_PUBLIC_APP_URL}/api/webhook/shopier`,
      'custom_data': JSON.stringify({
        ustaId: customerInfo.ustaId,
        serviceType: customerInfo.serviceType,
        appointmentDate: customerInfo.appointmentDate,
        appointmentTime: customerInfo.appointmentTime
      })
    })

    return `${product.shopierUrl}?${params.toString()}`
  }

  // Ürün fiyatını getir
  getProductPrice(productId: string): number {
    const product = this.getProductById(productId)
    return product ? product.price : 0
  }

  // Ürün açıklamasını getir
  getProductDescription(productId: string): string {
    const product = this.getProductById(productId)
    return product ? product.description : ''
  }
}

export const shopierProductService = new ShopierProductService()
