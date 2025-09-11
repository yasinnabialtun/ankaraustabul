export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  slug: string;
  publishedAt: string;
  updatedAt: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Elektrik Tesisatı Yenileme Rehberi',
    excerpt: 'Evinizde elektrik tesisatını yenilerken dikkat etmeniz gereken önemli noktalar...',
    content: 'Elektrik tesisatı yenileme işlemi, evinizin güvenliği açısından büyük önem taşır. Tesisatınız 20 yıldan eski ise mutlaka yenilenmeli. Planlama, söküm, kablo çekimi ve test aşamalarından oluşur.',
    author: 'Elektrik Uzmanı',
    date: '2024-01-15',
    readTime: '5 dk',
    category: 'Elektrik',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop',
    tags: ['elektrik', 'tessisat', 'yenileme'],
    slug: 'elektrik-tesisati-yenileme-rehberi',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Su Tesisatı Bakım İpuçları',
    excerpt: 'Su tesisatınızı düzenli bakımla uzun yıllar sorunsuz kullanmanın yolları...',
    content: 'Su tesisatı bakımı düzenli kontrol gerektirir. Muslukları, bağlantıları ve sayacı kontrol edin. Kışa hazırlık için dış muslukları kapatın ve boruları yalıtın.',
    author: 'Su Tesisatı Uzmanı',
    date: '2024-01-10',
    readTime: '4 dk',
    category: 'Su Tesisatı',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop',
    tags: ['su tesisatı', 'bakım', 'kış'],
    slug: 'su-tesisati-bakim-ipuclari',
    publishedAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
  },
  {
    id: '3',
    title: 'Ev Temizliği Pratik Çözümler',
    excerpt: 'Zamanınızı verimli kullanarak evinizi temiz tutmanın etkili yöntemleri...',
    content: 'Günlük ve haftalık temizlik rutinleri oluşturun. Doğal ürünler kullanın: sirke kireç için, karbonat lekeler için. Sistemli yaklaşımla temizlik daha kolay olur.',
    author: 'Temizlik Uzmanı',
    date: '2024-01-08',
    readTime: '3 dk',
    category: 'Temizlik',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    tags: ['temizlik', 'pratik', 'doğal'],
    slug: 'ev-temizligi-pratik-cozumler',
    publishedAt: '2024-01-08T10:00:00Z',
    updatedAt: '2024-01-08T10:00:00Z',
  },
];
