# Ankara Usta Bul - Tasarım Sistemi

## 🎨 Renk Paleti

### Ana Renkler
- **Brand (Mavi)**: `#0ea5e9` - Ana marka rengi
- **Accent (Mor)**: `#d946ef` - Vurgu rengi
- **Gray (Gri)**: `#6b7280` - Metin ve arka plan

### Renk Tonları
```css
/* Brand Colors */
brand-50: #f0f9ff
brand-100: #e0f2fe
brand-200: #bae6fd
brand-300: #7dd3fc
brand-400: #38bdf8
brand-500: #0ea5e9
brand-600: #0284c7
brand-700: #0369a1
brand-800: #075985
brand-900: #0c4a6e

/* Accent Colors */
accent-50: #fdf4ff
accent-100: #fae8ff
accent-200: #f5d0fe
accent-300: #f0abfc
accent-400: #e879f9
accent-500: #d946ef
accent-600: #c026d3
accent-700: #a21caf
accent-800: #86198f
accent-900: #701a75
```

## 🎯 Tipografi

### Font Aileleri
- **Primary**: Inter (Sans-serif)
- **Display**: Poppins (Başlıklar için)

### Font Boyutları
```css
.text-responsive: text-lg sm:text-xl lg:text-2xl
.text-responsive-lg: text-2xl sm:text-3xl lg:text-4xl
.text-responsive-xl: text-3xl sm:text-4xl lg:text-5xl
```

## 🧩 Bileşenler

### Butonlar
```tsx
// Modern Button Component
<ModernButton 
  variant="primary" // primary, secondary, accent, ghost, outline
  size="md" // sm, md, lg, xl
  icon={ArrowRight}
  iconPosition="right"
  loading={false}
  fullWidth={false}
>
  Buton Metni
</ModernButton>
```

### Kartlar
```tsx
// Modern Card Component
<ModernCard 
  variant="feature" // default, glass, hover, feature, testimonial, pricing
  icon={Wrench}
  title="Kart Başlığı"
  description="Kart açıklaması"
>
  İçerik
</ModernCard>
```

### Input Alanları
```tsx
// Modern Input Component
<ModernInput 
  label="Etiket"
  placeholder="Placeholder metni"
  icon={Search}
  iconPosition="left"
  error="Hata mesajı"
  success="Başarı mesajı"
  size="md" // sm, md, lg
/>
```

## 🎭 Animasyonlar

### Temel Animasyonlar
```css
.animate-fade-in: Fade in efekti
.animate-slide-up: Yukarıdan kayma
.animate-float: Yüzen animasyon
.animate-gradient: Gradyan animasyonu
.animate-pulse-slow: Yavaş pulse
```

### Hover Efektleri
```css
.hover-lift: Yukarı kalkma efekti
.hover-glow: Parlama efekti
```

## 📱 Responsive Tasarım

### Breakpoint'ler
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Container Sınıfları
```css
.container-padding: px-4 sm:px-6 lg:px-8
.section-padding: py-16 sm:py-20 lg:py-24
```

## 🎨 Gradyanlar

### Arka Plan Gradyanları
```css
.hero-gradient: Ana sayfa hero arka planı
.bg-gradient-card: Kart arka planı
.bg-gradient-hero: Hero bölümü
```

### Metin Gradyanları
```css
.text-gradient: Ana gradyan metin
.text-gradient-primary: Birincil gradyan
.text-gradient-accent: Vurgu gradyanı
```

## 🌟 Gölge Sistemi

```css
.shadow-soft: Yumuşak gölge
.shadow-medium: Orta gölge
.shadow-glow: Parlama gölgesi
.shadow-glow-lg: Büyük parlama gölgesi
```

## 🎪 Glass Effect

```css
.glass: Cam efekti (açık)
.glass-dark: Cam efekti (koyu)
```

## 🏷️ Badge'ler

```css
.badge-primary: Birincil badge
.badge-success: Başarı badge'i
.badge-warning: Uyarı badge'i
.badge-error: Hata badge'i
```

## 📊 İstatistik Kartları

```css
.stat-card: İstatistik kartı
.stat-number: İstatistik sayısı
.stat-label: İstatistik etiketi
```

## 🎯 Kullanım Örnekleri

### Hero Bölümü
```tsx
<section className="hero-gradient text-white py-20 lg:py-32">
  <div className="max-w-7xl mx-auto container-padding">
    <h1 className="text-responsive-xl font-black">
      <span className="hero-text-gradient">Güvenilir Usta</span>
    </h1>
  </div>
</section>
```

### Özellik Kartı
```tsx
<ModernCard variant="feature" icon={Wrench} title="Hızlı Hizmet">
  Açıklama metni
</ModernCard>
```

### CTA Butonu
```tsx
<ModernButton variant="primary" size="lg" icon={ArrowRight}>
  Hemen Başla
</ModernButton>
```

## 🔧 Özelleştirme

### CSS Değişkenleri
```css
:root {
  --brand-primary: #0ea5e9;
  --brand-secondary: #d946ef;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
}
```

### Tailwind Config
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: { /* brand renkleri */ },
        accent: { /* accent renkleri */ }
      },
      animation: { /* animasyonlar */ },
      boxShadow: { /* gölgeler */ }
    }
  }
}
```

## 📋 Kontrol Listesi

### ✅ Yapılan İyileştirmeler
- [x] Modern renk paleti eklendi
- [x] Gelişmiş animasyonlar
- [x] Glass effect bileşenleri
- [x] Responsive tasarım
- [x] Modern buton sistemi
- [x] Kart bileşenleri
- [x] Input alanları
- [x] Loading durumları
- [x] Hover efektleri
- [x] Focus states

### 🚀 Gelecek İyileştirmeler
- [ ] Dark mode desteği
- [ ] Daha fazla animasyon
- [ ] Micro-interactions
- [ ] Accessibility iyileştirmeleri
- [ ] Performance optimizasyonları
