// Ankara İlçeleri
export const DISTRICTS = [
  { id: 'cankaya', name: 'Çankaya', ustaCount: 8 },
  { id: 'kecioren', name: 'Keçiören', ustaCount: 6 },
  { id: 'mamak', name: 'Mamak', ustaCount: 5 },
  { id: 'yenimahalle', name: 'Yenimahalle', ustaCount: 4 },
  { id: 'etimesgut', name: 'Etimesgut', ustaCount: 4 },
  { id: 'sincan', name: 'Sincan', ustaCount: 3 },
  { id: 'altindag', name: 'Altındağ', ustaCount: 3 },
];

// Hizmet Kategorileri
export const CATEGORIES = [
  { 
    id: 'elektrik', 
    name: 'Elektrik', 
    icon: '⚡', 
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
    count: 5, 
    description: 'Elektrik tesisatı, aydınlatma, priz montajı',
    averagePrice: '150 TL/saat',
    popularServices: ['Elektrik Tesisatı', 'Aydınlatma', 'Priz Montajı'],
    color: 'blue',
  },
  { 
    id: 'su-tesisati', 
    name: 'Su Tesisatı', 
    icon: '🚰', 
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
    count: 5, 
    description: 'Su tesisatı, kanal açma, tesisat tamiri',
    averagePrice: '180 TL/saat',
    popularServices: ['Su Tesisatı', 'Kanal Açma', 'Tesisat Tamiri'],
    color: 'green',
  },
  { 
    id: 'temizlik', 
    name: 'Temizlik', 
    icon: '🧹', 
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    count: 5, 
    description: 'Ev temizliği, ofis temizliği',
    averagePrice: '120 TL/saat',
    popularServices: ['Ev Temizliği', 'Ofis Temizliği', 'Derinlemesine Temizlik'],
    color: 'yellow',
  },
  { 
    id: 'mobilya', 
    name: 'Mobilya', 
    icon: '🪑', 
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    count: 5, 
    description: 'Mobilya montajı, tamiri',
    averagePrice: '140 TL/saat',
    popularServices: ['Mobilya Montajı', 'Mobilya Tamiri'],
    color: 'purple',
  },
];

// Öne Çıkan Ustalar
export const FEATURED_USTALAR = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    category: 'Elektrik',
    categoryId: 'elektrik',
    location: 'Çankaya, Ankara',
    districtId: 'cankaya',
    experience: '8 yıl',
    hourlyRate: '150 TL',
    specialties: ['Elektrik Tesisatı', 'Aydınlatma'],
    completedJobs: 156,
    responseTime: '2 saat',
    verified: true,
    available: true,
    phone: '+90 555 123 45 67',
    email: 'ahmet.yilmaz@email.com',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    rating: 4.9,
    isPremium: true,
    premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme'],
    premiumBadge: '⭐ Premium Usta',
    featuredUntil: '2024-12-31',
  },
  {
    id: '2',
    name: 'Mehmet Demir',
    category: 'Su Tesisatı',
    categoryId: 'su-tesisati',
    location: 'Keçiören, Ankara',
    districtId: 'kecioren',
    experience: '12 yıl',
    hourlyRate: '180 TL',
    specialties: ['Su Tesisatı', 'Kanal Açma'],
    completedJobs: 134,
    responseTime: '1 saat',
    verified: true,
    available: true,
    phone: '+90 555 234 56 78',
    email: 'mehmet.demir@email.com',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    rating: 4.8,
    isPremium: true,
    premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme'],
    premiumBadge: '⭐ Premium Usta',
    featuredUntil: '2024-12-31',
  },
];

// Ek Ustalar
export const EXTRA_USTALAR = [
  {
    id: '9',
    name: 'Murat Şahin',
    category: 'Elektrik',
    categoryId: 'elektrik',
    location: 'Keçiören, Ankara',
    districtId: 'kecioren',
    experience: '6 yıl',
    hourlyRate: '140 TL',
    specialties: ['Elektrik Tesisatı', 'Aydınlatma'],
    completedJobs: 89,
    responseTime: '3 saat',
    verified: true,
    available: true,
    phone: '+90 555 901 23 45',
    email: 'murat.sahin@email.com',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    rating: 4.6,
    isPremium: false,
  },
];

// Tüm Ustalar Listesi
export const ALL_USTALAR = [
  ...FEATURED_USTALAR,
  ...EXTRA_USTALAR,
];

// Home Page Mock Data
export const HOME_FEATURED_USTALAR = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    category: 'Elektrikçi',
    district: 'Çankaya',
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    responseTime: '2 saat',
    price: '150-200 TL/saat',
  },
  {
    id: 2,
    name: 'Mehmet Özkan',
    category: 'Tesisatçı',
    district: 'Keçiören',
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    responseTime: '1 saat',
    price: '180-250 TL/saat',
  },
  {
    id: 3,
    name: 'Ali Demir',
    category: 'Boyacı',
    district: 'Mamak',
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    responseTime: '3 saat',
    price: '120-180 TL/saat',
  },
];

export const HOME_TESTIMONIALS = [
  {
    name: 'Ayşe Kaya',
    role: 'Ev Sahibi',
    content: 'Elektrik arızam için bulduğum usta çok profesyoneldi. Hızlı ve güvenilir hizmet aldım.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
  {
    name: 'Mehmet Öz',
    role: 'İşyeri Sahibi',
    content: 'Su tesisatı sorunu için aldığım hizmet mükemmeldi. Kesinlikle tavsiye ederim.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
];

// İstatistikler
export const STATS = {
  totalUstalar: 200,
  totalJobs: 1500,
  totalDistricts: 7,
  monthlyActiveUstalar: 50,
  customerSatisfaction: 98,
};