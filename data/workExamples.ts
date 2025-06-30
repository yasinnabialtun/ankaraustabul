export interface WorkExample {
  id: string
  title: string
  description: string
  category: string
  beforeImage: string
  afterImage: string
  date: string
  rating: number
  views: number
  location: string
  provider: string
  price: string
  duration: string
}

export const workExamples: WorkExample[] = [
  {
    id: 'elektrik-1',
    title: 'Eski Elektrik Tesisatının Modernizasyonu',
    description: 'Çankaya\'da 1980\'lerden kalma eski elektrik tesisatının tamamen yenilenmesi. Yeni panolar, güvenlik sistemleri ve LED aydınlatma kurulumu.',
    category: 'Elektrik',
    beforeImage: '/api/placeholder/400/300?text=Eski+Tesisat',
    afterImage: '/api/placeholder/400/300?text=Yeni+Tesisat',
    date: '2024-01-15',
    rating: 4.9,
    views: 1247,
    location: 'Çankaya, Ankara',
    provider: 'Ahmet Usta Elektrik',
    price: '15,000 TL',
    duration: '3 gün'
  },
  {
    id: 'su-tesisati-1',
    title: 'Su Kaçağı Tespiti ve Onarımı',
    description: 'Mamak\'ta gizli su kaçağı tespiti ve hızlı onarım. Modern cihazlarla tespit edilen kaçak, minimal hasarla giderildi.',
    category: 'Su Tesisatı',
    beforeImage: '/api/placeholder/400/300?text=Su+Kaçağı',
    afterImage: '/api/placeholder/400/300?text=Onarım+Sonrası',
    date: '2024-01-12',
    rating: 4.8,
    views: 892,
    location: 'Mamak, Ankara',
    provider: 'Ali Tesisat Ustası',
    price: '2,500 TL',
    duration: '1 gün'
  },
  {
    id: 'temizlik-1',
    title: 'İnşaat Sonrası Temizlik',
    description: 'Yenimahalle\'de yeni tamamlanan ofis binasının kapsamlı temizliği. Cam, zemin, mobilya ve havalandırma sistemleri temizliği.',
    category: 'Temizlik',
    beforeImage: '/api/placeholder/400/300?text=İnşaat+Sonrası',
    afterImage: '/api/placeholder/400/300?text=Temizlik+Sonrası',
    date: '2024-01-10',
    rating: 4.7,
    views: 567,
    location: 'Yenimahalle, Ankara',
    provider: 'Güvenilir Temizlik',
    price: '8,000 TL',
    duration: '2 gün'
  },
  {
    id: 'nakliye-1',
    title: 'Evden Eve Nakliyat',
    description: 'Etimesgut\'tan Çankaya\'ya 3+1 daire nakliyatı. Özenli paketleme, güvenli taşıma ve montaj hizmeti.',
    category: 'Nakliye',
    beforeImage: '/api/placeholder/400/300?text=Eski+Ev',
    afterImage: '/api/placeholder/400/300?text=Yeni+Ev',
    date: '2024-01-08',
    rating: 4.6,
    views: 734,
    location: 'Etimesgut → Çankaya',
    provider: 'Hızlı Nakliyat',
    price: '12,000 TL',
    duration: '1 gün'
  },
  {
    id: 'bakim-onarim-1',
    title: 'Banyo Tadilatı',
    description: 'Altındağ\'da eski banyonun modern tadilatı. Fayans değişimi, dolap kurulumu ve aksesuar montajı.',
    category: 'Bakım Onarım',
    beforeImage: '/api/placeholder/400/300?text=Eski+Banyo',
    afterImage: '/api/placeholder/400/300?text=Yeni+Banyo',
    date: '2024-01-05',
    rating: 4.8,
    views: 1023,
    location: 'Altındağ, Ankara',
    provider: 'Uzman Tamirci',
    price: '25,000 TL',
    duration: '5 gün'
  },
  {
    id: 'guvenlik-1',
    title: 'Güvenlik Sistemi Kurulumu',
    description: 'Çankaya\'da villa için kapsamlı güvenlik sistemi. Kamera, alarm ve otomasyon sistemi kurulumu.',
    category: 'Güvenlik',
    beforeImage: '/api/placeholder/400/300?text=Güvenlik+Öncesi',
    afterImage: '/api/placeholder/400/300?text=Güvenlik+Sistemi',
    date: '2024-01-03',
    rating: 4.9,
    views: 445,
    location: 'Çankaya, Ankara',
    provider: 'Güvenlik Sistemleri Ankara',
    price: '35,000 TL',
    duration: '3 gün'
  },
  {
    id: 'klima-1',
    title: 'Klima Kurulumu ve Bakımı',
    description: 'Sincan\'da 5 adet split klima kurulumu ve mevcut klimaların bakımı. Enerji tasarruflu sistemler.',
    category: 'Klima',
    beforeImage: '/api/placeholder/400/300?text=Klima+Öncesi',
    afterImage: '/api/placeholder/400/300?text=Klima+Sonrası',
    date: '2023-12-30',
    rating: 4.7,
    views: 678,
    location: 'Sincan, Ankara',
    provider: 'Soğuk Klima Servisi',
    price: '18,000 TL',
    duration: '2 gün'
  },
  {
    id: 'kombi-1',
    title: 'Kombi Değişimi ve Petek Temizliği',
    description: 'Pursaklar\'da eski kombinin yenisiyle değişimi ve tüm peteklerin temizliği. Enerji tasarrufu sağlandı.',
    category: 'Kombi',
    beforeImage: '/api/placeholder/400/300?text=Eski+Kombi',
    afterImage: '/api/placeholder/400/300?text=Yeni+Kombi',
    date: '2023-12-28',
    rating: 4.6,
    views: 523,
    location: 'Pursaklar, Ankara',
    provider: 'Sıcak Kombi Servisi',
    price: '22,000 TL',
    duration: '1 gün'
  },
  {
    id: 'cam-balkon-1',
    title: 'Cam Balkon Kurulumu',
    description: 'Gölbaşı\'nda villa için lüks cam balkon sistemi kurulumu. Isı yalıtımlı ve güvenlikli sistem.',
    category: 'Cam Balkon',
    beforeImage: '/api/placeholder/400/300?text=Açık+Balkon',
    afterImage: '/api/placeholder/400/300?text=Cam+Balkon',
    date: '2023-12-25',
    rating: 4.8,
    views: 389,
    location: 'Gölbaşı, Ankara',
    provider: 'Cam Balkon Uzmanı',
    price: '45,000 TL',
    duration: '4 gün'
  }
]

export const getWorkExamplesByCategory = (category: string): WorkExample[] => {
  return workExamples.filter(work => work.category === category)
}

export const getFeaturedWorkExamples = (): WorkExample[] => {
  return workExamples.filter(work => work.rating >= 4.8).slice(0, 6)
}

export const getRecentWorkExamples = (): WorkExample[] => {
  return workExamples
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)
} 