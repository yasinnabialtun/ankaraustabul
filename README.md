# 🏠 Ankara Usta Bul Platformu

Ankara'da güvenilir usta arama platformu. Elektrik, su tesisatı, temizlik ve diğer hizmetler için ustalar bulun.

## 🌐 Canlı Site
**https://ankaraustabul.com**

## 🚀 Özellikler

- ✅ **Usta Kayıt Sistemi** - Ustalar kolayca kayıt olabilir
- ✅ **Arama ve Filtreleme** - Kategori ve lokasyon bazlı arama
- ✅ **Güvenli Ödeme** - Shopier entegrasyonu
- ✅ **Admin Dashboard** - Usta yönetimi ve istatistikler
- ✅ **Bildirim Sistemi** - E-posta ve WhatsApp bildirimleri
- ✅ **Responsive Tasarım** - Mobil uyumlu
- ✅ **SEO Optimizasyonu** - Arama motoru dostu
- ✅ **PWA Desteği** - Progressive Web App

## 🛠️ Teknolojiler

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Payment:** Shopier API
- **Deployment:** Vercel
- **Domain:** ankaraustabul.com

## 📦 Kurulum

### Gereksinimler
```bash
Node.js 18+
npm 9+
```

### Adımlar
```bash
# Projeyi klonlayın
git clone https://github.com/your-username/ankaraustabul.git
cd ankaraustabul

# Bağımlılıkları yükleyin
npm install

# Environment variables ayarlayın
cp env.example .env
# .env dosyasını düzenleyin

# Geliştirme sunucusunu başlatın
npm run dev

# Production build
npm run build
```

## 🔧 Environment Variables

`.env` dosyasını oluşturun ve aşağıdaki değişkenleri ayarlayın:

```env
# Admin Authentication
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=your_secure_password

# Admin Contact
VITE_ADMIN_EMAIL=admin@ankaraustabul.com
VITE_ADMIN_WHATSAPP=+905551234567

# Email Service
VITE_EMAIL_USER=your-email@gmail.com
VITE_EMAIL_PASSWORD=your-app-password

# WhatsApp API
VITE_WHATSAPP_API_KEY=your_whatsapp_api_key

# Shopier Payment
VITE_SHOPIER_API_KEY=your_shopier_api_key

# Google Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

## 🌐 Domain Kurulumu

### 1. Vercel'e Deploy
```bash
npm i -g vercel
vercel --prod
```

### 2. Domain Ayarları
1. Vercel dashboard'unda projenizi seçin
2. Settings > Domains
3. `ankaraustabul.com` ekleyin
4. DNS ayarlarını yapın

### 3. DNS Ayarları
Domain sağlayıcınızda şu kayıtları ekleyin:
```
Type: A
Name: @
Value: 76.76.19.19

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 📱 Admin Dashboard

### Erişim
- **URL:** https://ankaraustabul.com/admin-login
- **Kullanıcı Adı:** admin
- **Şifre:** ankaraustabul2024

### Özellikler
- Usta kayıtlarını görüntüleme
- Onay/red işlemleri
- İstatistikler
- Güvenli giriş sistemi

## 💳 Ödeme Sistemi

### Paketler
- **Temel Paket:** 177₺
- **Premium Paket:** 297₺
- **VIP Paket:** 497₺

### Entegrasyon
- Shopier API entegrasyonu
- Güvenli ödeme işlemi
- Otomatik bildirimler

## 📧 Bildirim Sistemi

### E-posta Bildirimleri
- Admin'e detaylı usta bilgileri
- Ustaya hoş geldin e-postası
- HTML formatında şık tasarım

### WhatsApp Bildirimleri
- Admin'e hızlı bildirim
- Ustaya hoş geldin mesajı
- API entegrasyonu

## 🔍 SEO Optimizasyonu

### Meta Tags
- Title, description, keywords
- Open Graph tags
- Twitter Cards
- Canonical URLs

### Performance
- Lazy loading
- Image optimization
- Code splitting
- PWA features

## 📊 Analytics

### Google Analytics
- Sayfa görüntülemeleri
- Kullanıcı davranışları
- Conversion tracking
- Real-time data

## 🛡️ Güvenlik

### Admin Panel
- Şifreli giriş sistemi
- Session kontrolü
- Güvenli çıkış
- Rate limiting

### Data Protection
- HTTPS zorunlu
- Input validation
- XSS protection
- CSRF protection

## 📞 İletişim

- **E-posta:** info@ankaraustabul.com
- **Telefon:** +905551234567
- **WhatsApp:** +905551234567
- **Adres:** Ankara, Türkiye

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Changelog

### v1.0.0 (2024-01-15)
- ✅ İlk sürüm
- ✅ Usta kayıt sistemi
- ✅ Admin dashboard
- ✅ Ödeme entegrasyonu
- ✅ Bildirim sistemi
- ✅ SEO optimizasyonu
- ✅ PWA desteği
