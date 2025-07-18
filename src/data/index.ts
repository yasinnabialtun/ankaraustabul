import type { Usta, Kategori, BlogPost } from '../types';

export const ustalar: Usta[] = [
  {
    id: '1',
    name: 'Ahmet Usta',
    category: 'Elektrik',
    rating: 4.8,
    experience: 15,
    location: 'Çankaya, Ankara',
    phone: '0532 123 45 67',
    description: '15 yıllık deneyimle elektrik tesisatı ve arıza giderme konusunda uzman.',
    image: '/images/usta1.jpg'
  },
  {
    id: '2',
    name: 'Mehmet Usta',
    category: 'Su Tesisatı',
    rating: 4.6,
    experience: 12,
    location: 'Keçiören, Ankara',
    phone: '0533 234 56 78',
    description: 'Su tesisatı, kanal açma ve tıkanıklık giderme işlerinde uzman.',
    image: '/images/usta2.jpg'
  },
  {
    id: '3',
    name: 'Ali Usta',
    category: 'İnşaat',
    rating: 4.9,
    experience: 20,
    location: 'Mamak, Ankara',
    phone: '0534 345 67 89',
    description: 'İnşaat, tadilat ve yapı işlerinde 20 yıllık deneyim.',
    image: '/images/usta3.jpg'
  }
];

export const kategoriler: Kategori[] = [
  {
    id: 'elektrik',
    name: 'Elektrik',
    description: 'Elektrik tesisatı ve arıza giderme',
    icon: '⚡',
    ustalar: ustalar.filter(u => u.category === 'Elektrik')
  },
  {
    id: 'su-tesisati',
    name: 'Su Tesisatı',
    description: 'Su tesisatı ve kanal işleri',
    icon: '🚰',
    ustalar: ustalar.filter(u => u.category === 'Su Tesisatı')
  },
  {
    id: 'insaat',
    name: 'İnşaat',
    description: 'İnşaat ve tadilat işleri',
    icon: '🏗️',
    ustalar: ustalar.filter(u => u.category === 'İnşaat')
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Ev Tadilatında Dikkat Edilmesi Gerekenler',
    content: 'Ev tadilatı yaparken dikkat edilmesi gereken önemli noktalar...',
    author: 'Ankara Usta Bul',
    date: '2024-01-15',
    slug: 'ev-tadilatinda-dikkat-edilmesi-gerekenler'
  },
  {
    id: '2',
    title: 'Elektrik Arızası Nasıl Giderilir?',
    content: 'Elektrik arızalarını gidermek için yapılması gerekenler...',
    author: 'Ankara Usta Bul',
    date: '2024-01-10',
    slug: 'elektrik-arizasi-nasil-giderilir'
  }
]; 