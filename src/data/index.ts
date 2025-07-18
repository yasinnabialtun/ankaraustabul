import type { Usta, Kategori, BlogPost } from '../types';

export const ustalar: Usta[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    category: 'Elektrik',
    rating: 4.8,
    experience: 15,
    location: 'Çankaya, Ankara',
    phone: '0532 123 45 67',
    description: '15 yıllık deneyimle elektrik tesisatı ve arıza giderme konusunda uzman. Ev ve işyeri elektrik işlerinde güvenilir hizmet.',
    image: '/images/usta1.jpg',
    hourlyRate: 150,
    reviews: 127
  },
  {
    id: '2',
    name: 'Mehmet Kaya',
    category: 'Su Tesisatı',
    rating: 4.6,
    experience: 12,
    location: 'Keçiören, Ankara',
    phone: '0533 234 56 78',
    description: 'Su tesisatı, kanal açma ve tıkanıklık giderme işlerinde uzman. Acil durumlarda 7/24 hizmet.',
    image: '/images/usta2.jpg',
    hourlyRate: 120,
    reviews: 89
  },
  {
    id: '3',
    name: 'Ali Demir',
    category: 'İnşaat',
    rating: 4.9,
    experience: 20,
    location: 'Mamak, Ankara',
    phone: '0534 345 67 89',
    description: 'İnşaat, tadilat ve yapı işlerinde 20 yıllık deneyim. Kaliteli işçilik ve uygun fiyat.',
    image: '/images/usta3.jpg',
    hourlyRate: 200,
    reviews: 156
  },
  {
    id: '4',
    name: 'Fatma Özkan',
    category: 'Temizlik',
    rating: 4.7,
    experience: 8,
    location: 'Yenimahalle, Ankara',
    phone: '0535 456 78 90',
    description: 'Ev ve ofis temizlik hizmetleri. Detaylı temizlik ve düzenli bakım hizmetleri.',
    image: '/images/usta4.jpg',
    hourlyRate: 80,
    reviews: 94
  },
  {
    id: '5',
    name: 'Hasan Arslan',
    category: 'Boya',
    rating: 4.5,
    experience: 10,
    location: 'Etimesgut, Ankara',
    phone: '0536 567 89 01',
    description: 'İç ve dış cephe boya işleri. Profesyonel boya uygulamaları ve dekoratif boya işleri.',
    image: '/images/usta5.jpg',
    hourlyRate: 100,
    reviews: 73
  },
  {
    id: '6',
    name: 'Ayşe Çelik',
    category: 'Elektrik',
    rating: 4.4,
    experience: 6,
    location: 'Sincan, Ankara',
    phone: '0537 678 90 12',
    description: 'Elektrik tesisatı ve küçük elektrik işleri. Kadın elektrikçi olarak güvenilir hizmet.',
    image: '/images/usta6.jpg',
    hourlyRate: 110,
    reviews: 45
  },
  {
    id: '7',
    name: 'Mustafa Öz',
    category: 'Su Tesisatı',
    rating: 4.8,
    experience: 18,
    location: 'Altındağ, Ankara',
    phone: '0538 789 01 23',
    description: 'Su tesisatı ve ısıtma sistemleri uzmanı. Kombi ve kalorifer tesisatı işleri.',
    image: '/images/usta7.jpg',
    hourlyRate: 140,
    reviews: 112
  },
  {
    id: '8',
    name: 'Zeynep Korkmaz',
    category: 'Temizlik',
    rating: 4.6,
    experience: 5,
    location: 'Gölbaşı, Ankara',
    phone: '0539 890 12 34',
    description: 'Özel temizlik hizmetleri. Halı yıkama, cam temizliği ve genel temizlik.',
    image: '/images/usta8.jpg',
    hourlyRate: 75,
    reviews: 67
  }
];

export const kategoriler: Kategori[] = [
  {
    id: 'elektrik',
    name: 'Elektrik',
    description: 'Elektrik tesisatı, arıza giderme ve elektrik işleri',
    icon: '⚡',
    ustalar: ustalar.filter(u => u.category === 'Elektrik')
  },
  {
    id: 'su-tesisati',
    name: 'Su Tesisatı',
    description: 'Su tesisatı, kanal açma ve tıkanıklık giderme',
    icon: '🚰',
    ustalar: ustalar.filter(u => u.category === 'Su Tesisatı')
  },
  {
    id: 'insaat',
    name: 'İnşaat',
    description: 'İnşaat, tadilat ve yapı işleri',
    icon: '🏗️',
    ustalar: ustalar.filter(u => u.category === 'İnşaat')
  },
  {
    id: 'temizlik',
    name: 'Temizlik',
    description: 'Ev ve ofis temizlik hizmetleri',
    icon: '🧹',
    ustalar: ustalar.filter(u => u.category === 'Temizlik')
  },
  {
    id: 'boya',
    name: 'Boya',
    description: 'İç ve dış cephe boya işleri',
    icon: '🎨',
    ustalar: ustalar.filter(u => u.category === 'Boya')
  },
  {
    id: 'diger',
    name: 'Diğer',
    description: 'Diğer hizmet kategorileri',
    icon: '🔧',
    ustalar: ustalar.filter(u => u.category === 'Diğer')
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Ev Tadilatında Dikkat Edilmesi Gerekenler',
    content: 'Ev tadilatı yaparken dikkat edilmesi gereken önemli noktalar ve profesyonel usta seçiminin önemi hakkında detaylı bilgiler.',
    author: 'Ankara Usta Bul',
    date: '2024-01-15',
    slug: 'ev-tadilatinda-dikkat-edilmesi-gerekenler'
  },
  {
    id: '2',
    title: 'Elektrik Arızası Nasıl Giderilir?',
    content: 'Elektrik arızalarını gidermek için yapılması gerekenler ve güvenlik önlemleri hakkında kapsamlı rehber.',
    author: 'Ankara Usta Bul',
    date: '2024-01-10',
    slug: 'elektrik-arizasi-nasil-giderilir'
  },
  {
    id: '3',
    title: 'Su Tesisatı Problemleri ve Çözümleri',
    content: 'Su tesisatında sık karşılaşılan problemler ve bu problemlerin çözüm yöntemleri hakkında bilgiler.',
    author: 'Ankara Usta Bul',
    date: '2024-01-05',
    slug: 'su-tesisati-problemleri-ve-cozumleri'
  },
  {
    id: '4',
    title: 'Doğru Usta Seçimi Nasıl Yapılır?',
    content: 'Güvenilir ve kaliteli usta seçimi için dikkat edilmesi gereken kriterler ve öneriler.',
    author: 'Ankara Usta Bul',
    date: '2024-01-01',
    slug: 'dogru-usta-secimi-nasil-yapilir'
  },
  {
    id: '5',
    title: 'Ev Temizliği İpuçları',
    content: 'Ev temizliği için pratik ipuçları ve profesyonel temizlik hizmetlerinin avantajları.',
    author: 'Ankara Usta Bul',
    date: '2023-12-28',
    slug: 'ev-temizligi-ipuclari'
  },
  {
    id: '6',
    title: 'Boya İşlerinde Kalite Nasıl Sağlanır?',
    content: 'Boya işlerinde kaliteli sonuç almak için dikkat edilmesi gereken noktalar ve profesyonel boya uygulamaları.',
    author: 'Ankara Usta Bul',
    date: '2023-12-25',
    slug: 'boya-islerinde-kalite-nasil-saglanir'
  }
]; 