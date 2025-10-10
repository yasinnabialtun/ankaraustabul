// Ankara İlçeleri - Tüm 25 İlçe
export const DISTRICTS = [
  { id: 'cankaya', name: 'Çankaya', ustaCount: 25 },
  { id: 'kecioren', name: 'Keçiören', ustaCount: 18 },
  { id: 'mamak', name: 'Mamak', ustaCount: 15 },
  { id: 'yenimahalle', name: 'Yenimahalle', ustaCount: 12 },
  { id: 'etimesgut', name: 'Etimesgut', ustaCount: 10 },
  { id: 'sincan', name: 'Sincan', ustaCount: 8 },
  { id: 'altindag', name: 'Altındağ', ustaCount: 7 },
  { id: 'pursaklar', name: 'Pursaklar', ustaCount: 6 },
  { id: 'golbasi', name: 'Gölbaşı', ustaCount: 5 },
  { id: 'beypazari', name: 'Beypazarı', ustaCount: 4 },
  { id: 'elmadag', name: 'Elmadağ', ustaCount: 3 },
  { id: 'evren', name: 'Evren', ustaCount: 2 },
  { id: 'haymana', name: 'Haymana', ustaCount: 3 },
  { id: 'kalecik', name: 'Kalecik', ustaCount: 2 },
  { id: 'kizilcahamam', name: 'Kızılcahamam', ustaCount: 4 },
  { id: 'nallihan', name: 'Nallıhan', ustaCount: 3 },
  { id: 'polatli', name: 'Polatlı', ustaCount: 5 },
  { id: 'sereflikochisar', name: 'Şereflikoçhisar', ustaCount: 3 },
  { id: 'akyurt', name: 'Akyurt', ustaCount: 2 },
  { id: 'ayas', name: 'Ayaş', ustaCount: 1 },
  { id: 'bala', name: 'Bala', ustaCount: 2 },
  { id: 'camlidere', name: 'Çamlıdere', ustaCount: 1 },
  { id: 'cubuk', name: 'Çubuk', ustaCount: 3 },
  { id: 'gudul', name: 'Güdül', ustaCount: 1 },
  { id: 'kahramankazan', name: 'Kahramankazan', ustaCount: 2 },
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

// Note: Mock data removed - these should be loaded from Firebase
// Use AdminService.getAllUstalar() or similar methods to get real data

// Note: These stats should be calculated from real data
// Use AdminService.getStats() to get actual statistics