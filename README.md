# 🏠 Ankara Usta Bul - Modern Usta Arama Platformu

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.1.0-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Modern, responsive ve kullanıcı dostu Ankara usta arama platformu. React, TypeScript ve Tailwind CSS ile geliştirilmiştir.

## ✨ Özellikler

### 🎨 Modern UI/UX
- **Glassmorphism** efektleri
- **Micro-interactions** ve smooth animasyonlar
- **Responsive** tasarım (Mobile-first)
- **Dark/Light** tema desteği
- **Accessibility** standartlarına uygun

### 🚀 Performance
- **Lazy loading** ile hızlı yükleme
- **Code splitting** ve bundle optimization
- **Image optimization** ve WebP desteği
- **PWA** desteği
- **SEO** optimizasyonu

### 🔧 Teknik Özellikler
- **TypeScript** ile tip güvenliği
- **Framer Motion** animasyonları
- **React Router** ile SPA routing
- **Firebase** backend entegrasyonu
- **Analytics** ve error tracking

## 🛠️ Teknoloji Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **React Router** - Routing
- **Lucide React** - Icons

### Backend & Services
- **Firebase** - Backend as a Service
- **Firestore** - Database
- **Firebase Auth** - Authentication
- **Firebase Storage** - File storage

### Development Tools
- **Vite** - Build tool
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **PWA** - Progressive Web App

## 📦 Kurulum

### Gereksinimler
- Node.js 18.0.0 veya üzeri
- npm veya yarn

### Adımlar

1. **Repository'yi klonlayın**
```bash
git clone https://github.com/your-username/ankaraustabul.git
cd ankaraustabul
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Environment variables'ları ayarlayın**
```bash
cp .env.example .env.local
```

4. **Firebase konfigürasyonunu yapın**
- Firebase Console'dan yeni proje oluşturun
- `src/services/firebase.ts` dosyasındaki config'i güncelleyin

5. **Development server'ı başlatın**
```bash
npm run dev
```

## 🚀 Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint

# Type checking
npm run type-check
```

## 📁 Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── ui/             # UI bileşenleri
│   ├── layout/         # Layout bileşenleri
│   └── animations/     # Animasyon bileşenleri
├── pages/              # Sayfa bileşenleri
├── services/           # API ve servis fonksiyonları
├── hooks/              # Custom React hooks
├── types/              # TypeScript type tanımları
├── data/               # Statik veriler
├── utils/              # Utility fonksiyonları
└── styles/             # Global stiller
```

## 🎨 UI Bileşenleri

### Temel Bileşenler
- **Button** - Çoklu variant ve size desteği
- **Card** - Glassmorphism ve hover efektleri
- **Input** - Form input bileşenleri
- **Badge** - Etiket ve durum göstergeleri
- **Skeleton** - Loading state bileşenleri

### Layout Bileşenleri
- **Header** - Responsive navigation
- **Footer** - Modern footer tasarımı
- **BottomNav** - Mobile navigation
- **Hero** - Hero section bileşeni
- **Section** - Sayfa bölümleri

### Özel Bileşenler
- **Search** - Gelişmiş arama bileşeni
- **LoadingSpinner** - Çoklu loading animasyonları
- **ErrorBoundary** - Hata yakalama
- **BackToTop** - Yukarı çıkma butonu

## 📱 Responsive Tasarım

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Özellikler
- **Mobile-first** yaklaşım
- **Touch-friendly** interface
- **Adaptive layouts**
- **Flexible grids**

## 🎭 Animasyonlar

### Framer Motion
- **Page transitions**
- **Scroll-triggered** animasyonlar
- **Micro-interactions**
- **Loading states**

### CSS Animations
- **Keyframe** animasyonları
- **Transform** efektleri
- **Transition** geçişleri

## 🔧 Konfigürasyon

### Tailwind CSS
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { /* Custom colors */ },
        secondary: { /* Custom colors */ },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
}
```

### Vite
```javascript
// vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    PWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],
})
```

## 🚀 Deployment

### Vercel (Önerilen)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Firebase Hosting
```bash
npm run build
firebase deploy
```

## 📊 Performance

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Optimizasyonlar
- **Code splitting**
- **Lazy loading**
- **Image optimization**
- **Bundle analysis**

## 🔒 Güvenlik

- **HTTPS** zorunlu
- **CSP** headers
- **XSS** koruması
- **CSRF** koruması
- **Input validation**

## 📈 Analytics

### Google Analytics
- **Page views** tracking
- **User behavior** analizi
- **Conversion** tracking
- **Error** tracking

### Custom Events
- **Search** queries
- **Category** clicks
- **Contact** form submissions
- **User** interactions

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- **Website**: [ankaraustabul.com](https://ankaraustabul.com)
- **Email**: info@ankaraustabul.com
- **GitHub**: [@your-username](https://github.com/your-username)

## 🙏 Teşekkürler

- [React](https://reactjs.org/) ekibi
- [Tailwind CSS](https://tailwindcss.com/) ekibi
- [Framer Motion](https://www.framer.com/motion/) ekibi
- [Vite](https://vitejs.dev/) ekibi

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın! 