# Ankara Usta Bul

Ankara'da güvenilir ustalar ve hizmet sağlayıcıları bulmanızı sağlayan modern web uygulaması.

## 🚀 Hızlı Başlangıç

### Otomatik Tarayıcı Açma (Önerilen)

Projeyi başlatmak ve tarayıcıyı otomatik açmak için:

#### Windows (Command Prompt veya PowerShell):
```bash
.\start-dev.bat
```

#### NPM Script ile:
```bash
npm run dev:auto
```

#### Manuel Başlatma:
```bash
npm run dev
```
Sonra tarayıcıda `http://localhost:3000` adresini açın.

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development server'ı başlat (otomatik tarayıcı açma)
.\start-dev.bat

# Veya manuel başlatma
npm run dev

# Production build
npm run build

# Production server'ı başlat
npm start
```

## 🛠️ Teknolojiler

- **Next.js 14** - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Styling
- **Lucide React** - İkonlar

## 📁 Proje Yapısı

```
ankaraustabul/
├── app/                 # Next.js 14 app router
│   ├── page.tsx        # Ana sayfa
│   ├── layout.tsx      # Root layout
│   ├── globals.css     # Global stiller
│   ├── sitemap.ts      # SEO sitemap
│   ├── robots.ts       # SEO robots
│   └── manifest.ts     # PWA manifest
├── components/         # React bileşenleri
├── data/              # Statik veri dosyaları
├── start-dev.bat      # Otomatik başlatma dosyası
└── package.json       # Proje konfigürasyonu
```

## 🎨 Özellikler

- ✅ **Responsive Design** - Tüm cihazlarda uyumlu
- ✅ **SEO Optimized** - Google PageSpeed 90+
- ✅ **Accessibility** - WCAG uyumlu
- ✅ **Performance** - Hızlı yükleme
- ✅ **Modern UX** - Kullanıcı dostu arayüz
- ✅ **PWA Ready** - Progressive Web App

## 📱 Sayfalar

- **Ana Sayfa** - Hero section, kategoriler, öne çıkan ustalar
- **Kategoriler** - Tüm hizmet kategorileri
- **Kategori Detay** - Belirli kategorideki ustalar
- **Usta Detay** - Usta profili ve iletişim
- **Firma Ekle** - Yeni firma kaydı
- **İletişim** - İletişim bilgileri
- **Hakkımızda** - Şirket bilgileri

## 🔧 Geliştirme

### Script'ler

```bash
npm run dev          # Development server (port 3000)
npm run dev:auto     # Otomatik tarayıcı açma
.\start-dev.bat      # Batch dosyası ile otomatik başlatma
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint kontrolü
```

### Otomatik Başlatma

Projeyi her seferinde otomatik olarak tarayıcıda açmak için:

1. **En Kolay Yöntem**: `.\start-dev.bat` komutunu çalıştırın
2. **NPM Script**: `npm run dev:auto` komutunu kullanın
3. **Manuel**: `npm run dev` sonra tarayıcıda `http://localhost:3000` açın

## 🌐 Canlı Demo

Proje şu anda development modunda çalışıyor. Production'a deploy etmek için:

1. `npm run build` ile build alın
2. Vercel, Netlify veya benzeri platforma deploy edin

## 📞 İletişim

- **Telefon**: 0312 123 45 67
- **E-posta**: info@ankaraustabul.com
- **Adres**: Ankara, Türkiye

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🚀 Özellikler

### Ana Özellikler
- **Kapsamlı Hizmet Kategorileri**: 20+ farklı hizmet kategorisi
- **İlçe Bazlı Arama**: Ankara'nın tüm 25 ilçesi için hizmet
- **Güvenilir Usta Profilleri**: Detaylı usta bilgileri ve değerlendirmeler
- **Gelişmiş Arama ve Filtreleme**: Kategori, ilçe, puan ve fiyat bazlı filtreleme
- **Responsive Tasarım**: Mobil uyumlu modern arayüz
- **SEO Optimizasyonu**: Arama motorları için optimize edilmiş

### Hizmet Kategorileri
- ⚡ Elektrik
- 🚰 Su Tesisatı
- 🧹 Temizlik
- 🚚 Nakliye
- 🔧 Bakım Onarım
- 🔒 Güvenlik
- 🌳 Bahçe Bakımı
- ❄️ Klima
- 🛗 Asansör
- 🔥 Kombi
- 🪟 Cam Balkon
- 🚗 Kaporta Boya
- 💻 Bilgisayar
- 📱 Telefon
- 🍳 Mutfak
- 🛁 Banyo
- 🏠 Çatı
- 🪵 Parke
- 🔨 Demirci
- 🪚 Marangoz
- 🧱 Seramik
- 🎨 Boya

### Ankara İlçeleri
- Çankaya, Keçiören, Mamak, Yenimahalle
- Etimesgut, Sincan, Altındağ, Pursaklar
- Gölbaşı, Polatlı, Çubuk, Kazıkan
- Nallıhan, Beypazarı, Ayaş, Kızılcahamam
- Şereflikoçhisar, Elmadağ, Haymana, Kalecik

## 🎯 Kullanım

### Ana Sayfa
- Hizmet arama
- Popüler kategoriler
- Öne çıkan ustalar
- İstatistikler

### Kategori Sayfaları
- Kategori bazlı usta listesi
- Gelişmiş filtreleme
- Sıralama seçenekleri
- İlçe bazlı arama

### Usta Detay Sayfaları
- Detaylı usta bilgileri
- Hizmet listesi
- Müşteri değerlendirmeleri
- İletişim bilgileri
- Çalışma saatleri

### Firma Ekleme
- Çok adımlı kayıt formu
- Kategori seçimi
- İlçe seçimi
- Hizmet tanımlama
- İletişim bilgileri

## 🔧 Özelleştirme

### Yeni Kategori Ekleme
`data/categories.ts` dosyasına yeni kategori ekleyin:

```typescript
{
  id: "yeni-kategori",
  name: "Yeni Kategori",
  slug: "yeni-kategori",
  description: "Kategori açıklaması",
  icon: "🔧",
  popularServices: ["Hizmet 1", "Hizmet 2"],
  averagePrice: "100-500 TL",
  averageRating: 4.5,
  providerCount: 50,
  color: "bg-blue-500"
}
```

### Yeni İlçe Ekleme
`data/districts.ts` dosyasına yeni ilçe ekleyin:

```typescript
{
  id: "yeni-ilce",
  name: "Yeni İlçe",
  slug: "yeni-ilce",
  description: "İlçe açıklaması",
  population: 100000,
  area: 100.0,
  popularServices: ["Hizmet 1", "Hizmet 2"],
  neighborhoods: ["Mahalle 1", "Mahalle 2"],
  coordinates: { lat: 39.9208, lng: 32.8541 }
}
```

### Yeni Usta Ekleme
`data/providers.ts` dosyasına yeni usta ekleyin:

```typescript
{
  id: "usta-id",
  name: "Usta Adı",
  category: "kategori-slug",
  district: "İlçe Adı",
  rating: 4.8,
  reviewCount: 100,
  experience: "10 yıl",
  phone: "+90 532 123 45 67",
  email: "usta@email.com",
  address: "Adres bilgisi",
  description: "Usta açıklaması",
  services: ["Hizmet 1", "Hizmet 2"],
  workingHours: { /* çalışma saatleri */ },
  images: ["resim1.jpg", "resim2.jpg"],
  verified: true,
  featured: false,
  priceRange: "200-800 TL",
  responseTime: "2 saat",
  languages: ["Türkçe"],
  certificates: ["Sertifika 1"],
  insurance: true,
  warranty: true
}
```

## 🚀 Deployment

### Vercel (Önerilen)
1. GitHub'a projeyi push edin
2. Vercel'de yeni proje oluşturun
3. GitHub repository'sini bağlayın
4. Otomatik deployment başlayacak

### Diğer Platformlar
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 📊 SEO Optimizasyonu

- Meta etiketleri optimize edildi
- Structured data eklendi
- Sitemap oluşturuldu
- Robots.txt eklendi
- Sayfa hızı optimize edildi

## 🔒 Güvenlik

- Input validation
- XSS koruması
- CSRF koruması
- Rate limiting (önerilen)
- HTTPS zorunluluğu

## 📱 Responsive Tasarım

- Mobile-first yaklaşım
- Tablet uyumlu
- Desktop optimize
- Touch-friendly arayüz

## 🎨 Tasarım Sistemi

### Renkler
- Primary: Blue (#2563eb)
- Secondary: Sky (#0ea5e9)
- Success: Green (#16a34a)
- Warning: Yellow (#ca8a04)
- Error: Red (#dc2626)

### Tipografi
- Font: Inter
- Headings: Font-bold
- Body: Font-normal

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 📞 İletişim

- Website: [ankaraustabul.com](https://ankaraustabul.com)
- Email: info@ankaraustabul.com
- Phone: +90 312 123 45 67

## 🙏 Teşekkürler

- Next.js ekibi
- Tailwind CSS ekibi
- Lucide React ekibi
- Tüm katkıda bulunanlara

---

**Ankara Usta Bul** - Ankara'nın güvenilir hizmet rehberi 🏠✨ 

## 🚀 Hızlı Başlangıç

### Otomatik Tarayıcı Açma (Önerilen)

Projeyi başlatmak ve tarayıcıyı otomatik açmak için:

#### Windows (Command Prompt veya PowerShell):
```bash
.\start-dev.bat
```

#### NPM Script ile:
```bash
npm run dev:auto
```

#### Manuel Başlatma:
```bash
npm run dev
```
Sonra tarayıcıda `http://localhost:3000` adresini açın.

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development server'ı başlat (otomatik tarayıcı açma)
.\start-dev.bat

# Veya manuel başlatma
npm run dev

# Production build
npm run build

# Production server'ı başlat
npm start
```

## 🎨 Özellikler

- ✅ **Responsive Design** - Tüm cihazlarda uyumlu
- ✅ **SEO Optimized** - Google PageSpeed 90+
- ✅ **Accessibility** - WCAG uyumlu
- ✅ **Performance** - Hızlı yükleme
- ✅ **Modern UX** - Kullanıcı dostu arayüz
- ✅ **PWA Ready** - Progressive Web App

## 📱 Sayfalar

- **Ana Sayfa** - Hero section, kategoriler, öne çıkan ustalar
- **Kategoriler** - Tüm hizmet kategorileri
- **Kategori Detay** - Belirli kategorideki ustalar
- **Usta Detay** - Usta profili ve iletişim
- **Firma Ekle** - Yeni firma kaydı
- **İletişim** - İletişim bilgileri
- **Hakkımızda** - Şirket bilgileri

## 🔧 Geliştirme

### Script'ler

```bash
npm run dev          # Development server (port 3000)
npm run dev:auto     # Otomatik tarayıcı açma
.\start-dev.bat      # Batch dosyası ile otomatik başlatma
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint kontrolü
```

### Otomatik Başlatma

Projeyi her seferinde otomatik olarak tarayıcıda açmak için:

1. **En Kolay Yöntem**: `.\start-dev.bat` komutunu çalıştırın
2. **NPM Script**: `npm run dev:auto` komutunu kullanın
3. **Manuel**: `npm run dev` sonra tarayıcıda `http://localhost:3000` açın

## 🌐 Canlı Demo

Proje şu anda development modunda çalışıyor. Production'a deploy etmek için:

1. `npm run build` ile build alın
2. Vercel, Netlify veya benzeri platforma deploy edin

## 📞 İletişim

- **Telefon**: 0312 123 45 67
- **E-posta**: info@ankaraustabul.com
- **Adres**: Ankara, Türkiye

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. 