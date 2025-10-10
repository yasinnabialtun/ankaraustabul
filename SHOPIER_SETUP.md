# Shopier Entegrasyonu Kurulum Rehberi

Bu doküman, Ankara Usta Bul projesinde Shopier ödeme sistemi entegrasyonunu nasıl kuracağınızı açıklar.

## 🎯 Mevcut Shopier Ürünleriniz

Sisteminizde aşağıdaki Shopier ürünleri entegre edilmiştir:

- **Temel Usta Kaydı**: ₺99 - https://shopier.com/37747290
- **Öne Çıkan Usta Kaydı**: ₺299 - https://shopier.com/37747307

## 🔧 Gerekli Adımlar

### 1. Shopier Hesabı Oluşturun

1. [Shopier](https://www.shopier.com) web sitesine gidin
2. "Üye Ol" butonuna tıklayın
3. Gerekli bilgileri doldurun ve hesabınızı oluşturun
4. E-posta doğrulamasını tamamlayın

### 2. API Anahtarlarını Alın

1. Shopier dashboard'a giriş yapın
2. "Geliştirici" veya "API" bölümüne gidin
3. Aşağıdaki anahtarları alın:
   - API Key
   - Secret Key
   - Merchant ID

### 3. Environment Variables

`.env.local` dosyasını oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
# Shopier Configuration
NEXT_PUBLIC_SHOPIER_API_KEY=your_shopier_api_key_here
SHOPIER_SECRET_KEY=your_shopier_secret_key_here
NEXT_PUBLIC_SHOPIER_MERCHANT_ID=your_merchant_id_here
NEXT_PUBLIC_SHOPIER_ENVIRONMENT=sandbox

# Application URL
NEXT_PUBLIC_APP_URL=https://ankaraustabul.com
```

### 4. Webhook URL'sini Ayarlayın

Shopier dashboard'da webhook URL'sini ayarlayın:
```
https://ankaraustabul.com/api/webhook/shopier
```

## 🧪 Test Etme

### 1. Ödeme Sayfası

Ödeme sayfasına gidin: `/odeme`

### 2. Paket Seçimi

- **Temel Paket**: ₺99 - Standart usta kaydı
- **Premium Paket**: ₺299 - Öne çıkan usta kaydı

### 3. Test Senaryoları

1. **Paket Seçimi**
   - Temel veya Premium paket seçin
   - Fiyatın doğru göründüğünü kontrol edin

2. **Shopier Yönlendirme**
   - "Shopier ile Ödeme Yap" butonuna tıklayın
   - Doğru Shopier linkine yönlendirildiğinizi kontrol edin

3. **Ödeme Süreci**
   - Shopier'de ödeme yapın
   - Başarılı/iptal sayfalarına yönlendirildiğinizi kontrol edin

## 🔒 Güvenlik

### 1. Secret Key Güvenliği

- Secret key'i asla client-side'da kullanmayın
- Sadece server-side işlemlerde kullanın
- Environment variables'da saklayın

### 2. Webhook Doğrulama

- Tüm webhook isteklerini doğrulayın
- Signature kontrolü yapın
- HTTPS kullanın

### 3. Test vs Production

- Sandbox ve production anahtarlarını ayırın
- Test verilerini production'da kullanmayın
- Environment variables'ı doğru ayarlayın

## 📊 Monitoring

### 1. Log Takibi

```javascript
// Webhook logları
console.log('Shopier webhook received:', {
  orderId: order_id,
  status,
  transactionId: transaction_id
})
```

### 2. Error Handling

```javascript
try {
  const result = await shopierService.initiatePayment(request)
} catch (error) {
  console.error('Shopier payment error:', error)
  // Fallback işlemi
}
```

### 3. Performance Monitoring

- API yanıt sürelerini izleyin
- Başarı oranlarını takip edin
- Hata loglarını analiz edin

## 🚀 Production'a Geçiş

### 1. Environment Variables Güncelleme

```env
NEXT_PUBLIC_SHOPIER_ENVIRONMENT=production
NEXT_PUBLIC_SHOPIER_API_KEY=production_api_key
SHOPIER_SECRET_KEY=production_secret_key
```

### 2. Webhook URL Güncelleme

Production webhook URL'sini Shopier'de güncelleyin:
```
https://ankaraustabul.com/api/webhook/shopier
```

### 3. SSL Sertifikası

- HTTPS kullanımını zorunlu hale getirin
- SSL sertifikasını kontrol edin
- Mixed content uyarılarını çözün

## 🐛 Troubleshooting

### Yaygın Sorunlar

1. **API Key Hatası**
   - Anahtarları kontrol edin
   - Environment variables'ı yeniden yükleyin
   - Sandbox/Production ayrımını kontrol edin

2. **Webhook Çalışmıyor**
   - URL'nin doğru olduğunu kontrol edin
   - SSL sertifikasını kontrol edin
   - Firewall ayarlarını kontrol edin

3. **Ödeme Başarısız**
   - Test kartlarını kullanın
   - Sandbox modunda test edin
   - Log dosyalarını kontrol edin

### Debug Modu

```env
NEXT_PUBLIC_DEBUG=true
```

Bu modda detaylı loglar görüntülenir.

## 📞 Destek

- Shopier Destek: https://www.shopier.com/iletisim
- API Dokümantasyonu: https://docs.shopier.com
- Test Kartları: https://docs.shopier.com/test-cards

## ✅ Checklist

- [ ] Shopier hesabı oluşturuldu
- [ ] API anahtarları alındı
- [ ] Environment variables ayarlandı
- [ ] Webhook URL'si yapılandırıldı
- [ ] Test ödemeleri yapıldı
- [ ] Production anahtarları ayarlandı
- [ ] SSL sertifikası kontrol edildi
- [ ] Monitoring sistemi kuruldu
