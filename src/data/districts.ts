export interface District {
  id: number
  name: string
  slug: string
  neighborhoods: string[]
  businessCount: number
}

export const districts: District[] = [
  {
    id: 1,
    name: 'Çankaya',
    slug: 'cankaya',
    businessCount: 156,
    neighborhoods: [
      'Kızılay', 'Bahçelievler', 'Emek', 'Aşağı Ayrancı', 'Yukarı Ayrancı',
      'Çayyolu', 'Ümitköy', 'Bilkent', 'Oran', 'Kurtuluş', 'Kurtuluş',
      'Küçükesat', 'Gaziosmanpaşa', 'Çankaya', 'Mebusevleri', 'Anıttepe',
      'Dikmen', 'Yıldız', 'Çiğdem', 'Öveçler', 'Balgat', 'Tunalı Hilmi',
      'Kavaklıdere', 'Çankaya', 'Maltepe', 'Cebeci', 'Dikmen', 'Yıldız'
    ]
  },
  {
    id: 2,
    name: 'Keçiören',
    slug: 'kecioren',
    businessCount: 89,
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
    neighborhoods: [
      'Evren', 'Şereflikoçhisar', 'Evren', 'Şereflikoçhisar', 'Evren',
      'Şereflikoçhisar', 'Evren', 'Şereflikoçhisar', 'Evren', 'Şereflikoçhisar'
    ]
  }
] 