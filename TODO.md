# Ankara Usta Bul - Proje Todo List

## 🎯 **Proje Hedefi**
Ankara'da ev ve işyeri ihtiyaçları için güvenilir ustaları bulabileceğiniz bir web platformu.

---

## 📋 **Genel Todo List**

### ✅ **Tamamlanan Özellikler**
- [x] Proje kurulumu (React + Vite + TypeScript)
- [x] Tailwind CSS entegrasyonu
- [x] Ana sayfa tasarımı
- [x] Örnek veri yapısı
- [x] Vercel deployment
- [x] Responsive tasarım

### 🔄 **Devam Eden Özellikler**
- [ ] React Router entegrasyonu
- [ ] Sayfa yönlendirmeleri
- [ ] Bileşen yapısı

### ⏳ **Bekleyen Özellikler**
- [ ] Kullanıcı arayüzü geliştirmeleri
- [ ] API entegrasyonu
- [ ] Veritabanı bağlantısı
- [ ] Ödeme sistemi
- [ ] Admin paneli

---

## 🚀 **Adım Adım Geliştirme Planı**

### **Faz 1: Temel Yapı** ✅
- [x] Proje kurulumu
- [x] Tailwind CSS
- [x] Ana sayfa
- [x] Örnek veriler

### **Faz 2: Routing ve Sayfalar** 🔄
- [ ] React Router kurulumu
- [ ] Layout bileşeni
- [ ] Navigation menüsü
- [ ] Sayfa yapısı:
  - [ ] `/` - Ana sayfa
  - [ ] `/kategoriler` - Kategoriler listesi
  - [ ] `/kategori/:id` - Kategori detayı
  - [ ] `/ustalar` - Ustalar listesi
  - [ ] `/usta/:id` - Usta detayı
  - [ ] `/blog` - Blog yazıları
  - [ ] `/usta-ekle` - Usta ekleme formu

### **Faz 3: Bileşenler**
- [ ] KategoriCard bileşeni
- [ ] UstaCard bileşeni
- [ ] SearchForm bileşeni
- [ ] NotificationBar bileşeni
- [ ] Footer bileşeni

### **Faz 4: Fonksiyonalite**
- [ ] Arama özelliği
- [ ] Filtreleme
- [ ] Sıralama
- [ ] Form validasyonu
- [ ] İletişim formu

### **Faz 5: Backend Entegrasyonu**
- [ ] API endpoint'leri
- [ ] Veritabanı bağlantısı
- [ ] Kullanıcı yönetimi
- [ ] Usta kayıt sistemi
- [ ] Değerlendirme sistemi

### **Faz 6: Gelişmiş Özellikler**
- [ ] Ödeme sistemi
- [ ] Mesajlaşma
- [ ] Bildirim sistemi
- [ ] Admin paneli
- [ ] SEO optimizasyonu

---

## 📁 **Dosya Yapısı**

```
src/
├── components/
│   ├── Layout.tsx
│   ├── Navigation.tsx
│   ├── KategoriCard.tsx
│   ├── UstaCard.tsx
│   ├── SearchForm.tsx
│   └── Footer.tsx
├── pages/
│   ├── Home.tsx
│   ├── Kategoriler.tsx
│   ├── KategoriDetay.tsx
│   ├── Ustalar.tsx
│   ├── UstaDetay.tsx
│   ├── UstaEkle.tsx
│   ├── Blog.tsx
│   └── NotFound.tsx
├── data/
│   └── index.ts
├── types/
│   └── index.ts
├── services/
│   └── api.ts
└── utils/
    └── helpers.ts
```

---

## 🎨 **Tasarım Sistemi**

### **Renkler**
- Primary: `#2563eb` (Blue-600)
- Secondary: `#1e40af` (Blue-700)
- Background: `#f9fafb` (Gray-50)
- Text: `#1f2937` (Gray-800)

### **Tipografi**
- Başlıklar: `font-bold`
- Alt başlıklar: `font-semibold`
- Normal metin: `font-normal`

### **Bileşen Stilleri**
- Kartlar: `bg-white rounded-lg shadow-lg`
- Butonlar: `bg-blue-600 text-white px-4 py-2 rounded`
- Hover efektleri: `hover:shadow-xl transition-shadow`

---

## 📊 **Veri Yapısı**

### **Kategori**
```typescript
interface Kategori {
  id: string;
  name: string;
  description: string;
  icon: string;
  ustalar: Usta[];
}
```

### **Usta**
```typescript
interface Usta {
  id: string;
  name: string;
  category: string;
  rating: number;
  experience: number;
  location: string;
  phone: string;
  description: string;
  image: string;
}
```

### **Blog Post**
```typescript
interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  slug: string;
}
```

---

## 🚀 **Deployment**

### **Vercel**
- [x] Otomatik deployment
- [x] Domain ayarları
- [x] Environment variables

### **Performans**
- [ ] Image optimization
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Caching

---

## 📝 **Notlar**

- Proje React 18 + TypeScript + Vite ile kuruldu
- Tailwind CSS ile styling yapılıyor
- Vercel'de deploy ediliyor
- Responsive tasarım öncelikli
- SEO dostu yapı hedefleniyor

---

## 🎯 **Sonraki Adımlar**

1. **React Router kurulumu**
2. **Sayfa yapısının oluşturulması**
3. **Bileşenlerin geliştirilmesi**
4. **API entegrasyonu**
5. **Test yazılması**

---

*Son güncelleme: 2024-01-15* 