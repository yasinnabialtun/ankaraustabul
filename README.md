# Ankara Usta Bul

Ankara'da güvenilir usta arama platformu. Elektrik, su tesisatı, temizlik ve diğer hizmetler için ustalar bulun.

## 🚀 Özellikler

- **Modern UI/UX** - Tailwind CSS ile responsive tasarım
- **PWA Desteği** - Mobil cihazlarda app-like deneyim
- **Admin Paneli** - Usta yönetimi ve onay sistemi
- **Arama & Filtreleme** - Kategori ve lokasyon bazlı arama
- **Blog Sistemi** - Ustalar için ipuçları ve rehberler
- **Form Validasyonu** - Güvenli usta kayıt sistemi

## 🛠️ Teknolojiler

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **PWA**: Vite Plugin PWA
- **Deployment**: Vercel

## 📦 Kurulum

```bash
# Dependencies yükle
npm install

# Development server başlat
npm run dev

# Production build
npm run build

# Build preview
npm run preview
```

## 🌐 Canlı Demo

- **Ana Site**: [ankaraustabul.vercel.app](https://ankaraustabul.vercel.app)
- **Admin Panel**: `/admin-login` (admin/admin123)

## 📱 Sayfalar

- **Ana Sayfa** (`/`) - Hero section, kategoriler, öne çıkan ustalar
- **Ustalar** (`/ustalar`) - Usta listesi, arama ve filtreleme
- **Usta Detay** (`/usta/:id`) - Detaylı usta profili
- **Usta Ekle** (`/usta-ekle`) - Usta kayıt formu
- **Kategoriler** (`/kategoriler`) - Hizmet kategorileri
- **Blog** (`/blog`) - Blog yazıları
- **Admin Login** (`/admin-login`) - Admin girişi
- **Admin Dashboard** (`/admin`) - Yönetim paneli

## 🔧 Geliştirme

### Proje Yapısı

```
src/
├── components/          # Ortak component'ler
│   ├── ErrorBoundary.tsx
│   ├── Layout.tsx
│   └── Navigation.tsx
├── pages/              # Sayfa component'leri
│   ├── Home.tsx
│   ├── Ustalar.tsx
│   ├── UstaDetay.tsx
│   ├── UstaEkle.tsx
│   ├── Kategoriler.tsx
│   ├── Blog.tsx
│   ├── AdminLogin.tsx
│   ├── AdminDashboard.tsx
│   └── NotFound.tsx
├── services/           # API servisleri
├── types/             # TypeScript tipleri
├── hooks/             # Custom hooks
├── App.tsx            # Ana uygulama
└── main.tsx           # Entry point
```

### Environment Variables

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_SHOPIER_API_KEY=your_shopier_key
```

## 🚀 Deployment

### Vercel (Önerilen)

1. GitHub'a push yapın
2. [Vercel](https://vercel.com)'e giriş yapın
3. "New Project" seçin
4. GitHub repo'nuzu seçin
5. Framework olarak "Vite" seçin
6. Deploy edin

### Manuel Deploy

```bash
# Build
npm run build

# Dist klasörünü deploy edin
```

## 📊 Performans

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: ~150KB (gzipped)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s

## 🔒 Güvenlik

- **Input Validation**: Tüm form girişleri validate edilir
- **XSS Protection**: React'in built-in XSS koruması
- **HTTPS**: Tüm production trafiği HTTPS üzerinden
- **CSP**: Content Security Policy headers

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Website**: [ankaraustabul.com](https://ankaraustabul.com)
- **Email**: info@ankaraustabul.com
- **GitHub**: [github.com/ankaraustabul](https://github.com/ankaraustabul)

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın! 