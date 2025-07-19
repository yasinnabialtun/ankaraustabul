// Shopier Payment Service
export const shopierService = {
  // Shopier ürün linkleri
  PRODUCT_LINKS: {
    BASIC: 'https://shopier.com/37747307',
    PREMIUM: 'https://shopier.com/37747290'
  },

  // Paket tipine göre Shopier linki al
  getProductLink(packageType: 'BASIC' | 'PREMIUM'): string {
    return this.PRODUCT_LINKS[packageType] || this.PRODUCT_LINKS.BASIC;
  },

  // Shopier ürün linki ile ödeme
  async payWithProductLink(packageType: 'BASIC' | 'PREMIUM'): Promise<boolean> {
    try {
      const productLink = this.getProductLink(packageType);
      console.log('🛒 Shopier ürün linki:', productLink);
      
      // Yeni sekmede Shopier ürün sayfasını aç
      window.open(productLink, '_blank');
      
      return true;
    } catch (error) {
      console.error('❌ Shopier ürün linki hatası:', error);
      return false;
    }
  },

  // Test ödeme simülasyonu (fallback)
  async simulatePayment(packageType: 'BASIC' | 'PREMIUM'): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('✅ Test ödeme simülasyonu başarılı:', packageType);
        resolve(true);
      }, 2000);
    });
  },

  // Ana ödeme fonksiyonu
  async processPayment(packageType: 'BASIC' | 'PREMIUM'): Promise<boolean> {
    try {
      // Önce Shopier ürün linki ile dene
      const success = await this.payWithProductLink(packageType);
      
      if (success) {
        console.log('✅ Shopier ürün linki ile ödeme başlatıldı');
        return true;
      }
      
      // Fallback olarak test simülasyonu
      console.log('⚠️ Shopier linki başarısız, test simülasyonu deneniyor...');
      return await this.simulatePayment(packageType);
      
    } catch (error) {
      console.error('❌ Ödeme işlemi hatası:', error);
      return false;
    }
  }
}; 