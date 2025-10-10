export interface BlogArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  district: string
  tags: string[]
  author: string
  publishedAt: string
  updatedAt: string
  readingTime: number
  featured: boolean
  seoTitle: string
  seoDescription: string
  image: string
  relatedArticles: string[]
}

export const blogArticles: BlogArticle[] = [
  // Çankaya İlçesi Makaleleri
  {
    id: 'cankaya-elektrikci-rehberi',
    title: 'Çankaya Elektrikçi Rehberi: En İyi Elektrikçi Nasıl Bulunur? | 2025',
    slug: 'cankaya-elektrikci-rehberi',
    excerpt: 'Çankaya\'da güvenilir elektrikçi arama rehberi. Kızılay, Bahçelievler, Çayyolu bölgelerinde profesyonel elektrik hizmetleri. 7/24 elektrikçi, uygun fiyatlar.',
    seoTitle: 'Çankaya Elektrikçi | En İyi Elektrikçi Nasıl Bulunur? | 2025',
    seoDescription: 'Çankaya\'da güvenilir elektrikçi arama rehberi. Kızılay, Bahçelievler, Çayyolu bölgelerinde profesyonel elektrik hizmetleri. 7/24 elektrikçi, uygun fiyatlar.',
    content: `
# Çankaya Elektrikçi Rehberi: En İyi Elektrikçi Nasıl Bulunur?

Çankaya, Ankara'nın en kalabalık ve gelişmiş ilçelerinden biridir. Kızılay, Bahçelievler, Çayyolu gibi önemli bölgeleri barındıran Çankaya'da elektrik ihtiyaçlarınız için güvenilir elektrikçi bulmak çok önemlidir.

## Çankaya'da Elektrikçi Seçerken Dikkat Edilmesi Gerekenler

### 1. Lisans ve Sertifikalar
- TSE belgeli elektrikçi tercih edin
- Elektrik tesisatı sertifikası olan ustaları seçin
- SGK kayıtlı elektrikçi çalıştırın

### 2. Deneyim ve Referanslar
- En az 5 yıl deneyimli elektrikçi
- Önceki müşteri referansları
- Çankaya bölgesinde çalışma deneyimi

### 3. Hizmet Kalitesi
- 7/24 acil müdahale
- Modern ekipman kullanımı
- Garanti veren hizmet

## Çankaya'nın Önemli Bölgelerinde Elektrikçi Hizmetleri

### Kızılay Bölgesi
- Merkezi konumda hızlı müdahale
- Ofis ve işyeri elektrik işleri
- Aydınlatma sistemleri

### Bahçelievler Bölgesi
- Konut elektrik işleri
- Güvenlik sistemleri
- Enerji tasarrufu çözümleri

### Çayyolu Bölgesi
- Villa ve lüks konut elektrik işleri
- Akıllı ev sistemleri
- Güneş enerjisi kurulumları

## Elektrikçi Fiyatları Çankaya'da

Çankaya'da elektrikçi fiyatları bölgeye ve işin karmaşıklığına göre değişiklik gösterir:

- **Basit tamir işleri**: 150-300 TL
- **Priz ve anahtar değişimi**: 200-400 TL
- **Elektrik tesisatı yenileme**: 500-1500 TL/m²
- **Acil müdahale**: +%50 ücret

## Güvenlik Önlemleri

Çankaya'da elektrik işleri yaparken mutlaka:
- Elektrik kesintisi yapın
- İzole eldiven kullanın
- Kalifiye elektrikçi çalıştırın
- Sigorta kontrolü yapın

## Sonuç

Çankaya'da elektrik ihtiyaçlarınız için güvenilir, deneyimli ve profesyonel elektrikçi seçimi yapmak çok önemlidir. Yukarıdaki kriterleri göz önünde bulundurarak en iyi elektrikçiyi bulabilirsiniz.
    `,
    category: 'elektrik-hizmetleri',
    district: 'Çankaya',
    tags: ['elektrikçi', 'çankaya', 'elektrik tamiri', 'tesisat'],
    author: 'Ankara Usta Bul',
    publishedAt: '2025-01-25T10:00:00Z',
    updatedAt: '2025-01-25T10:00:00Z',
    readingTime: 5,
    featured: true,
    image: '/images/blog/cankaya-elektrikci.jpg',
    relatedArticles: ['cankaya-tesisatci', 'cankaya-temizlik']
  },
  
  // Keçiören İlçesi Makaleleri
  {
    id: 'kecioren-tesisatci-rehberi',
    title: 'Keçiören Su Tesisatçısı Rehberi: Profesyonel Hizmet Nasıl Bulunur? | 2025',
    slug: 'kecioren-tesisatci-rehberi',
    excerpt: 'Keçiören\'de güvenilir su tesisatçısı arama rehberi. Etlik, Pursaklar, Bağlum bölgelerinde profesyonel tesisat hizmetleri. 7/24 tesisatçı, uygun fiyatlar.',
    seoTitle: 'Keçiören Su Tesisatçısı | Profesyonel Tesisat Hizmetleri | 2025',
    seoDescription: 'Keçiören\'de güvenilir su tesisatçısı arama rehberi. Etlik, Pursaklar, Bağlum bölgelerinde profesyonel tesisat hizmetleri. 7/24 tesisatçı, uygun fiyatlar.',
    content: `
# Keçiören Su Tesisatçısı Rehberi: Profesyonel Hizmet Nasıl Bulunur?

Keçiören, Ankara'nın hızla gelişen ilçelerinden biridir. Etlik, Pursaklar, Bağlum gibi bölgeleri barındıran Keçiören'de su tesisatı ihtiyaçlarınız için güvenilir tesisatçı bulmak çok önemlidir.

## Keçiören'de Tesisatçı Seçerken Dikkat Edilmesi Gerekenler

### 1. Lisans ve Sertifikalar
- TSE belgeli tesisatçı tercih edin
- Su tesisatı sertifikası olan ustaları seçin
- SGK kayıtlı tesisatçı çalıştırın

### 2. Deneyim ve Referanslar
- En az 5 yıl deneyimli tesisatçı
- Önceki müşteri referansları
- Keçiören bölgesinde çalışma deneyimi

### 3. Hizmet Kalitesi
- 7/24 acil müdahale
- Modern ekipman kullanımı
- Garanti veren hizmet

## Keçiören'in Önemli Bölgelerinde Tesisat Hizmetleri

### Etlik Bölgesi
- Merkezi konumda hızlı müdahale
- Konut tesisat işleri
- Su kaçağı tespiti

### Pursaklar Bölgesi
- Yeni yapı tesisat işleri
- Su basıncı ayarları
- Tesisat yenileme

### Bağlum Bölgesi
- Villa tesisat işleri
- Su arıtma sistemleri
- Tesisat bakımı

## Tesisatçı Fiyatları Keçiören'de

Keçiören'de tesisatçı fiyatları bölgeye ve işin karmaşıklığına göre değişiklik gösterir:

- **Basit tamir işleri**: 200-400 TL
- **Musluk değişimi**: 150-300 TL
- **Tesisat yenileme**: 800-2000 TL/m²
- **Acil müdahale**: +%50 ücret

## Güvenlik Önlemleri

Keçiören'de tesisat işleri yaparken mutlaka:
- Su vanasını kapatın
- Koruyucu ekipman kullanın
- Kalifiye tesisatçı çalıştırın
- Basınç kontrolü yapın

## Sonuç

Keçiören'de tesisat ihtiyaçlarınız için güvenilir, deneyimli ve profesyonel tesisatçı seçimi yapmak çok önemlidir. Yukarıdaki kriterleri göz önünde bulundurarak en iyi tesisatçıyı bulabilirsiniz.
    `,
    category: 'su-tesisati-hizmetleri',
    district: 'Keçiören',
    tags: ['tesisatçı', 'keçiören', 'su tesisatı', 'musluk'],
    author: 'Ankara Usta Bul',
    publishedAt: '2025-01-25T11:00:00Z',
    updatedAt: '2025-01-25T11:00:00Z',
    readingTime: 6,
    featured: true,
    image: '/images/blog/kecioren-tesisatci.jpg',
    relatedArticles: ['kecioren-elektrikci', 'kecioren-temizlik']
  }
]