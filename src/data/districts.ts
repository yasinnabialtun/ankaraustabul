export interface District {
  id: number
  name: string
  slug: string
  neighborhoods: string[]
  businessCount: number
  population: number
  postalCode: string
  coordinates: {
    lat: number
    lng: number
  }
}

export const districts: District[] = [
  {
    id: 1,
    name: 'Çankaya',
    slug: 'cankaya',
    businessCount: 156,
    population: 950000,
    postalCode: '06420',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Kızılay', 'Bahçelievler', 'Emek', 'Aşağı Ayrancı', 'Yukarı Ayrancı',
      'Çayyolu', 'Ümitköy', 'Bilkent', 'Oran', 'Kurtuluş', 'Küçükesat',
      'Gaziosmanpaşa', 'Çankaya', 'Mebusevleri', 'Anıttepe', 'Dikmen',
      'Yıldız', 'Çiğdem', 'Öveçler', 'Balgat', 'Tunalı Hilmi', 'Kavaklıdere',
      'Maltepe', 'Cebeci', 'Çukurambar', 'Söğütözü', 'Beşevler', 'Çankaya'
    ]
  },
  {
    id: 2,
    name: 'Keçiören',
    slug: 'kecioren',
    businessCount: 89,
    population: 920000,
    postalCode: '06320',
    coordinates: { lat: 40.0212, lng: 32.8597 },
    neighborhoods: [
      'Etlik', 'Bağlum', 'Ufuktepe', 'Aşağı Eğlence', 'Yukarı Eğlence',
      'Şenlik', 'Yayla', 'Güçlükaya', 'Uyanış', 'Yenişehir', 'Aktaş',
      'Kalaba', 'Sanatoryum', 'Küçük Kayaş', 'Büyük Kayaş', 'Kale',
      'Güçlükaya', 'Uyanış', 'Yenişehir', 'Aktaş', 'Kalaba', 'Sanatoryum'
    ]
  },
  {
    id: 3,
    name: 'Mamak',
    slug: 'mamak',
    businessCount: 67,
    population: 650000,
    postalCode: '06200',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Kutludüğün', 'Hürel', 'Gülveren', 'Kayaş', 'Bayındır', 'Kartaltepe',
      'Kutludüğün', 'Hürel', 'Gülveren', 'Kayaş', 'Bayındır', 'Kartaltepe',
      'Kutludüğün', 'Hürel', 'Gülveren', 'Kayaş', 'Bayındır', 'Kartaltepe'
    ]
  },
  {
    id: 4,
    name: 'Yenimahalle',
    slug: 'yenimahalle',
    businessCount: 94,
    population: 720000,
    postalCode: '06170',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Batıkent', 'Şentepe', 'Karşıyaka', 'Ata', 'İnönü', 'Macunköy',
      'Batıkent', 'Şentepe', 'Karşıyaka', 'Ata', 'İnönü', 'Macunköy',
      'Batıkent', 'Şentepe', 'Karşıyaka', 'Ata', 'İnönü', 'Macunköy'
    ]
  },
  {
    id: 5,
    name: 'Etimesgut',
    slug: 'etimesgut',
    businessCount: 73,
    population: 580000,
    postalCode: '06810',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Elvankent', 'Göksu', 'Pınarbaşı', 'Aşağıyurtçu', 'Yukarıyurtçu',
      'Elvankent', 'Göksu', 'Pınarbaşı', 'Aşağıyurtçu', 'Yukarıyurtçu',
      'Elvankent', 'Göksu', 'Pınarbaşı', 'Aşağıyurtçu', 'Yukarıyurtçu'
    ]
  },
  {
    id: 6,
    name: 'Sincan',
    slug: 'sincan',
    businessCount: 58,
    population: 520000,
    postalCode: '06930',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Sincan', 'Törekent', 'Ertuğrulgazi', 'Mareşal Çakmak', 'Osmanlı',
      'Sincan', 'Törekent', 'Ertuğrulgazi', 'Mareşal Çakmak', 'Osmanlı',
      'Sincan', 'Törekent', 'Ertuğrulgazi', 'Mareşal Çakmak', 'Osmanlı'
    ]
  },
  {
    id: 7,
    name: 'Altındağ',
    slug: 'altindag',
    businessCount: 82,
    population: 380000,
    postalCode: '06010',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Ulus', 'Hacettepe', 'Hamamönü', 'Kale', 'Doğanbey', 'Hacıbayram',
      'Ulus', 'Hacettepe', 'Hamamönü', 'Kale', 'Doğanbey', 'Hacıbayram',
      'Ulus', 'Hacettepe', 'Hamamönü', 'Kale', 'Doğanbey', 'Hacıbayram'
    ]
  },
  {
    id: 8,
    name: 'Gölbaşı',
    slug: 'golbasi',
    businessCount: 45,
    population: 120000,
    postalCode: '06830',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Gölbaşı', 'Bademlidere', 'Karaoğlan', 'Gölbaşı', 'Bademlidere',
      'Karaoğlan', 'Gölbaşı', 'Bademlidere', 'Karaoğlan', 'Gölbaşı'
    ]
  },
  {
    id: 9,
    name: 'Polatlı',
    slug: 'polatli',
    businessCount: 34,
    population: 125000,
    postalCode: '06900',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Polatlı', 'Yenidoğan', 'Şehitlik', 'Polatlı', 'Yenidoğan',
      'Şehitlik', 'Polatlı', 'Yenidoğan', 'Şehitlik', 'Polatlı'
    ]
  },
  {
    id: 10,
    name: 'Beypazarı',
    slug: 'beypazari',
    businessCount: 28,
    population: 48000,
    postalCode: '06730',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Beypazarı', 'Kırbaşı', 'Uruş', 'Beypazarı', 'Kırbaşı',
      'Uruş', 'Beypazarı', 'Kırbaşı', 'Uruş', 'Beypazarı'
    ]
  },
  {
    id: 11,
    name: 'Nallıhan',
    slug: 'nallihan',
    businessCount: 22,
    population: 30000,
    postalCode: '06920',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Nallıhan', 'Çayırhan', 'Sarıyar', 'Nallıhan', 'Çayırhan',
      'Sarıyar', 'Nallıhan', 'Çayırhan', 'Sarıyar', 'Nallıhan'
    ]
  },
  {
    id: 12,
    name: 'Kızılcahamam',
    slug: 'kizilcahamam',
    businessCount: 31,
    population: 25000,
    postalCode: '06890',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Kızılcahamam', 'Çamlıdere', 'Güdül', 'Kızılcahamam', 'Çamlıdere',
      'Güdül', 'Kızılcahamam', 'Çamlıdere', 'Güdül', 'Kızılcahamam'
    ]
  },
  {
    id: 13,
    name: 'Ayaş',
    slug: 'ayas',
    businessCount: 19,
    population: 12000,
    postalCode: '06710',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Ayaş', 'Güdül', 'Beypazarı', 'Ayaş', 'Güdül',
      'Beypazarı', 'Ayaş', 'Güdül', 'Beypazarı', 'Ayaş'
    ]
  },
  {
    id: 14,
    name: 'Şereflikoçhisar',
    slug: 'sereflikochisar',
    businessCount: 25,
    population: 35000,
    postalCode: '06950',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Şereflikoçhisar', 'Evren', 'Şereflikoçhisar', 'Evren',
      'Şereflikoçhisar', 'Evren', 'Şereflikoçhisar', 'Evren'
    ]
  },
  {
    id: 15,
    name: 'Kazan',
    slug: 'kazan',
    businessCount: 38,
    population: 50000,
    postalCode: '06980',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Kazan', 'Elmadağ', 'Kazan', 'Elmadağ', 'Kazan',
      'Elmadağ', 'Kazan', 'Elmadağ', 'Kazan', 'Elmadağ'
    ]
  },
  {
    id: 16,
    name: 'Haymana',
    slug: 'haymana',
    businessCount: 16,
    population: 30000,
    postalCode: '06860',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Haymana', 'Bala', 'Haymana', 'Bala', 'Haymana',
      'Bala', 'Haymana', 'Bala', 'Haymana', 'Bala'
    ]
  },
  {
    id: 17,
    name: 'Kalecik',
    slug: 'kalecik',
    businessCount: 13,
    population: 15000,
    postalCode: '06840',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Kalecik', 'Çankırı', 'Kalecik', 'Çankırı', 'Kalecik',
      'Çankırı', 'Kalecik', 'Çankırı', 'Kalecik', 'Çankırı'
    ]
  },
  {
    id: 18,
    name: 'Bala',
    slug: 'bala',
    businessCount: 11,
    population: 18000,
    postalCode: '06720',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Bala', 'Haymana', 'Bala', 'Haymana', 'Bala',
      'Haymana', 'Bala', 'Haymana', 'Bala', 'Haymana'
    ]
  },
  {
    id: 19,
    name: 'Elmadağ',
    slug: 'elmadag',
    businessCount: 29,
    population: 22000,
    postalCode: '06780',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Elmadağ', 'Kazan', 'Elmadağ', 'Kazan', 'Elmadağ',
      'Kazan', 'Elmadağ', 'Kazan', 'Elmadağ', 'Kazan'
    ]
  },
  {
    id: 20,
    name: 'Çubuk',
    slug: 'cubuk',
    businessCount: 42,
    population: 85000,
    postalCode: '06760',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Çubuk', 'Kızılcahamam', 'Çubuk', 'Kızılcahamam', 'Çubuk',
      'Kızılcahamam', 'Çubuk', 'Kızılcahamam', 'Çubuk', 'Kızılcahamam'
    ]
  },
  {
    id: 21,
    name: 'Akyurt',
    slug: 'akyurt',
    businessCount: 24,
    population: 35000,
    postalCode: '06750',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Akyurt', 'Kazan', 'Akyurt', 'Kazan', 'Akyurt',
      'Kazan', 'Akyurt', 'Kazan', 'Akyurt', 'Kazan'
    ]
  },
  {
    id: 22,
    name: 'Güdül',
    slug: 'gudul',
    businessCount: 8,
    population: 8000,
    postalCode: '06850',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Güdül', 'Ayaş', 'Güdül', 'Ayaş', 'Güdül',
      'Ayaş', 'Güdül', 'Ayaş', 'Güdül', 'Ayaş'
    ]
  },
  {
    id: 23,
    name: 'Çamlıdere',
    slug: 'camlidere',
    businessCount: 7,
    population: 6000,
    postalCode: '06740',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Çamlıdere', 'Kızılcahamam', 'Çamlıdere', 'Kızılcahamam', 'Çamlıdere',
      'Kızılcahamam', 'Çamlıdere', 'Kızılcahamam', 'Çamlıdere', 'Kızılcahamam'
    ]
  },
  {
    id: 24,
    name: 'Evren',
    slug: 'evren',
    businessCount: 5,
    population: 4000,
    postalCode: '06970',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Evren', 'Şereflikoçhisar', 'Evren', 'Şereflikoçhisar', 'Evren',
      'Şereflikoçhisar', 'Evren', 'Şereflikoçhisar', 'Evren', 'Şereflikoçhisar'
    ]
  },
  {
    id: 25,
    name: 'Pursaklar',
    slug: 'pursaklar',
    businessCount: 47,
    population: 150000,
    postalCode: '06145',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    neighborhoods: [
      'Pursaklar', 'Sarıbeyler', 'Karaköy', 'Yenikent', 'Çakırlar',
      'Güneykent', 'Kuzeykent', 'Merkez', 'Yenidoğan', 'Çamlıca'
    ]
  }
]