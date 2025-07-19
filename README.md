# 🏠 Ankara Usta Bul - Usta Bildirim Sistemi

## 📋 Proje Özeti

Ankara Usta Bul platformu, ustaların kayıt olması ve size bildirim göndermesi için geliştirilmiş modern bir web uygulamasıdır. Usta kayıt formundan gelen bilgiler size **4 farklı yöntemle** ulaşır.

## 🎯 Usta Bilgilerinin Size Ulaşma Yöntemleri

### 1. 📧 **E-posta Bildirimi**
- **Admin'e gönderilen e-posta:** Yeni usta kaydı hakkında detaylı bilgi
- **Ustaya gönderilen hoş geldin e-postası:** Kayıt onayı ve sonraki adımlar
- **HTML formatında** güzel tasarımlı e-postalar
- **Development modunda** console'da görüntülenir

### 2. 📱 **WhatsApp Bildirimi**
- **Admin'e gönderilen mesaj:** Hızlı bildirim
- **Ustaya gönderilen hoş geldin mesajı:** Karşılama ve bilgilendirme
- **Markdown formatında** düzenli mesajlar
- **Development modunda** console'da görüntülenir

### 3. 🖥️ **Admin Dashboard**
- **Web tabanlı yönetim paneli:** `/admin` adresinde
- **Gerçek zamanlı usta listesi**
- **İstatistikler ve analitikler**
- **Onay/red işlemleri**
- **Detaylı usta bilgileri**

### 4. 📊 **Console Logları**
- **Development modunda** tüm bildirimler console'da görüntülenir
- **Hata ayıklama** için detaylı loglar
- **Test amaçlı** kullanım

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
```bash
Node.js 18+ 
npm 9+
```

### Kurulum
```bash
# Projeyi klonlayın
git clone [repository-url]
cd ankaraustabul

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

## 📁 Proje Yapısı

```
src/
├── pages/
│   ├── UstaEkle.tsx          # Usta kayıt formu
│   └── AdminDashboard.tsx     # Admin paneli
├── services/
│   ├── emailService.ts        # E-posta bildirim servisi
│   ├── whatsappService.ts     # WhatsApp bildirim servisi
│   └── shopierService.ts      # Ödeme servisi
├── components/
│   ├── ShopierPayment.tsx     # Ödeme bileşeni
│   └── Layout.tsx             # Ana layout
└── types/
    └── index.ts               # TypeScript tipleri
```

## 🔧 Bildirim Sistemi Detayları

### E-posta Servisi (`emailService.ts`)
```typescript
// Admin'e gönderilen bildirim
await emailService.sendUstaRegistrationNotification({
  name: "Ahmet Yılmaz",
  email: "ahmet@example.com",
  phone: "+905551234567",
  category: "Elektrik",
  experience: "5",
  location: "Çankaya",
  hourlyRate: "150",
  specialties: ["Elektrik Tesisatı", "Aydınlatma"],
  serviceAreas: ["Çankaya", "Keçiören"],
  packageType: "Premium Paket",
  transactionId: "TXN_123456"
});

// Ustaya gönderilen hoş geldin e-postası
await emailService.sendUstaWelcomeEmail(ustaData);
```

### WhatsApp Servisi (`whatsappService.ts`)
```typescript
// Admin'e gönderilen bildirim
await whatsappService.sendUstaRegistrationNotification({
  name: "Ahmet Yılmaz",
  category: "Elektrik",
  experience: "5",
  location: "Çankaya",
  hourlyRate: "150",
  phone: "+905551234567",
  transactionId: "TXN_123456",
  packageType: "Premium Paket"
});

// Ustaya gönderilen hoş geldin mesajı
await whatsappService.sendUstaWelcomeMessage(ustaData);
```

## 🎨 Usta Kayıt Formu Özellikleri

### Form Adımları:
1. **Kişisel Bilgiler** - Ad, telefon, e-posta
2. **Kategori Seçimi** - Hizmet alanı
3. **Deneyim Detayları** - Uzmanlık alanları
4. **Lokasyon & Hizmetler** - Çalışma bölgeleri
5. **Paket Seçimi** - Fiyatlandırma
6. **Ödeme** - Güvenli ödeme

### Paket Seçenekleri:
- **Temel Paket** (177₺) - Başlangıç seviyesi
- **Premium Paket** (297₺) - En popüler
- **VIP Paket** (497₺) - En kapsamlı

## 🔐 Environment Variables

`.env` dosyasında aşağıdaki değişkenleri tanımlayın:

```env
# Admin E-posta Adresleri
VITE_ADMIN_EMAIL=admin@ankaraustabul.com
VITE_NOTIFICATION_EMAIL=bildirim@ankaraustabul.com

# WhatsApp API
VITE_ADMIN_WHATSAPP=+905551234567
VITE_WHATSAPP_API_URL=https://api.whatsapp.com
VITE_WHATSAPP_API_KEY=your_whatsapp_api_key

# Shopier Payment
VITE_SHOPIER_API_KEY=your_shopier_api_key
VITE_SHOPIER_API_URL=https://api.shopier.com
```

## 📱 Admin Dashboard Özellikleri

### URL: `http://localhost:5173/admin`

- **📊 İstatistikler:** Toplam usta, bekleyen, onaylanan
- **📋 Usta Listesi:** Tüm kayıtların detaylı görünümü
- **✅ Onay/Red:** Usta kayıtlarını onaylama veya reddetme
- **🔍 Detay Görüntüleme:** Her usta için detaylı bilgi
- **📅 Tarih Filtreleme:** Kayıt tarihlerine göre filtreleme

## 🧪 Test Etme

### Development Modunda Test:
1. `npm run dev` ile projeyi başlatın
2. `http://localhost:5173/usta-ekle` adresine gidin
3. Formu doldurun ve ödeme yapın
4. Console'da bildirimleri kontrol edin:
   ```
   📧 YENİ USTA KAYDI BİLDİRİMİ: {...}
   📱 WHATSAPP BİLDİRİMİ: {...}
   📧 USTA HOŞ GELDİN E-MAİLİ: {...}
   📱 USTA HOŞ GELDİN MESAJI: {...}
   ```

### Admin Dashboard Test:
1. `http://localhost:5173/admin` adresine gidin
2. Mock verilerle dashboard'u test edin
3. Onay/red işlemlerini deneyin

## 🚀 Production Deployment

### Vercel'e Deploy:
```bash
# Vercel CLI kurulumu
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables (Vercel):
Vercel dashboard'unda environment variables'ları ayarlayın:
- `VITE_ADMIN_EMAIL`
- `VITE_ADMIN_WHATSAPP`
- `VITE_WHATSAPP_API_KEY`
- `VITE_SHOPIER_API_KEY`

## 📞 Destek ve İletişim

- **E-posta:** admin@ankaraustabul.com
- **WhatsApp:** +905551234567
- **Web:** https://ankaraustabul.com

## 🔄 Güncellemeler

### v1.0.0 (2024-01-15)
- ✅ Usta kayıt formu
- ✅ E-posta bildirim sistemi
- ✅ WhatsApp bildirim sistemi
- ✅ Admin dashboard
- ✅ Ödeme entegrasyonu
- ✅ Modern UI/UX tasarımı

---

**🎯 Sonuç:** Artık usta kayıt formundan gelen tüm bilgiler size **4 farklı yöntemle** ulaşacak ve hiçbir kayıt kaçırmayacaksınız!
