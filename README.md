# 🔧 Ankara Usta Bul

Modern ve kullanıcı dostu bir platform ile Ankara'da güvenilir ustaları bulun.

## 🚀 Özellikler

- ⚡ **Modern Teknolojiler**: Next.js 15, TypeScript, Tailwind CSS
- 🎨 **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- 🔥 **Yüksek Performans**: Optimized bundle ve lazy loading
- 🛡️ **Güvenlik**: XSS protection, CSRF güvenliği
- 📊 **Admin Dashboard**: Kapsamlı yönetim paneli
- 🔍 **Gelişmiş Arama**: Kategori ve lokasyon filtreleri
- 📱 **PWA Ready**: Progressive Web App desteği

## 🛠️ Teknoloji Stack

### Frontend
- **Framework**: Next.js 15.0.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Material-UI
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts

### Backend & Database
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Hosting**: Vercel

### Development Tools
- **Linting**: ESLint + TypeScript ESLint
- **Bundler**: Next.js built-in
- **Package Manager**: npm

## 📦 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm 9+

### 1. Proje Klonlama
```bash
git clone https://github.com/yasinnabialtun/ankaraustabul.git
cd ankaraustabul
```

### 2. Bağımlılıkları Yükleme
```bash
npm install
```

### 3. Environment Variables
`.env` dosyasını oluşturun:
```bash
cp .env.example .env
```

Firebase konfigürasyonunu ekleyin:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Development Server
```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacak.

## 🏗️ Build ve Deploy

### Production Build
```bash
npm run build
npm start
```

### Vercel Deploy
```bash
npm install -g vercel
vercel --prod
```

## 📁 Proje Yapısı

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # Reusable components
│   ├── ui/            # Base UI components
│   └── layout/        # Layout components
├── pages/             # Page components
├── services/          # API services
├── types/             # TypeScript types
├── hooks/             # Custom hooks
├── store/             # State management
└── utils/             # Utility functions
```

## 🎯 Ana Sayfalar

- **Ana Sayfa** (`/`): Hero section, öne çıkan ustalar
- **Ustalar** (`/ustalar`): Usta listesi ve filtreleme
- **Kategoriler** (`/kategoriler`): Hizmet kategorileri
- **Blog** (`/blog`): Blog yazıları
- **İletişim** (`/iletisim`): İletişim formu
- **Admin Panel** (`/admin`): Yönetim paneli

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👥 İletişim

- **Developer**: Yasin Nabi Altun
- **GitHub**: [@yasinnabialtun](https://github.com/yasinnabialtun)
- **Website**: [ankaraustabul.com](https://ankaraustabul.com)

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!