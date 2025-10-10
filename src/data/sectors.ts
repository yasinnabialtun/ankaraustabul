export interface BusinessSector {
  id: number
  name: string
  slug: string
  description: string
  icon: string
  subcategories: string[]
  businessCount: number
}

export const businessSectors: BusinessSector[] = [
  {
    id: 1,
    name: 'Elektrik',
    slug: 'elektrik',
    description: 'Elektrik tesisatı, arıza giderme ve elektrik işleri',
    icon: 'Zap',
    businessCount: 45,
    subcategories: [
      'Elektrik Arıza',
      'Tesisat Döşeme',
      'Aydınlatma',
      'Elektrik Panosu',
      'Topraklama',
      'Elektrik Bakım'
    ]
  },
  {
    id: 2,
    name: 'Su Tesisatı',
    slug: 'su-tesisati',
    description: 'Su tesisatı, sıhhi tesisat ve su kaçağı giderme',
    icon: 'Droplets',
    businessCount: 38,
    subcategories: [
      'Su Kaçağı',
      'Tesisat Döşeme',
      'Klozet Montaj',
      'Lavabo Montaj',
      'Banyo Tadilat',
      'Su Arıtma'
    ]
  },
  {
    id: 3,
    name: 'Temizlik',
    slug: 'temizlik',
    description: 'Ev, ofis ve işyeri temizlik hizmetleri',
    icon: 'Sparkles',
    businessCount: 52,
    subcategories: [
      'Ev Temizliği',
      'Ofis Temizliği',
      'Halı Yıkama',
      'Cam Temizliği',
      'Derin Temizlik',
      'Periyodik Temizlik'
    ]
  },
  {
    id: 4,
    name: 'Nakliyat',
    slug: 'nakliyat',
    description: 'Evden eve nakliyat ve taşıma hizmetleri',
    icon: 'Truck',
    businessCount: 41,
    subcategories: [
      'Evden Eve Nakliyat',
      'Ofis Taşıma',
      'Eşya Depolama',
      'Paketleme',
      'Montaj Demontaj',
      'Şehirler Arası'
    ]
  },
  {
    id: 5,
    name: 'Tadilat',
    slug: 'tadilat',
    description: 'Ev ve işyeri tadilat, onarım işleri',
    icon: 'Hammer',
    businessCount: 35,
    subcategories: [
      'Banyo Tadilat',
      'Mutfak Tadilat',
      'Oda Tadilat',
      'Dış Cephe',
      'Çatı Tadilat',
      'Boya Badana'
    ]
  },
  {
    id: 6,
    name: 'Teknik Servis',
    slug: 'teknik-servis',
    description: 'Elektronik cihaz tamir ve bakım',
    icon: 'Wrench',
    businessCount: 28,
    subcategories: [
      'Beyaz Eşya',
      'Küçük Ev Aletleri',
      'Klima Servisi',
      'Bilgisayar Tamir',
      'Telefon Tamir',
      'TV Tamir'
    ]
  },
  {
    id: 7,
    name: 'Güvenlik',
    slug: 'guvenlik',
    description: 'Güvenlik sistemleri ve kamera montajı',
    icon: 'Shield',
    businessCount: 22,
    subcategories: [
      'Kamera Sistemi',
      'Alarm Sistemi',
      'Kartlı Geçiş',
      'Parmak İzi',
      'Güvenlik Kapısı',
      'Gözetleme'
    ]
  },
  {
    id: 8,
    name: 'Bahçe Düzenleme',
    slug: 'bahce-duzenleme',
    description: 'Bahçe bakımı ve peyzaj düzenleme',
    icon: 'TreePine',
    businessCount: 19,
    subcategories: [
      'Çim Biçme',
      'Ağaç Budama',
      'Çiçek Dikimi',
      'Sulama Sistemi',
      'Peyzaj Tasarım',
      'Bahçe Bakım'
    ]
  },
  {
    id: 9,
    name: 'İnşaat',
    slug: 'insaat',
    description: 'İnşaat, yapı ve konut projeleri',
    icon: 'Building2',
    businessCount: 31,
    subcategories: [
      'Konut İnşaat',
      'Ticari Yapı',
      'Villa İnşaat',
      'Renovasyon',
      'Yapı Denetim',
      'Mimari Tasarım'
    ]
  },
  {
    id: 10,
    name: 'Mobilya',
    slug: 'mobilya',
    description: 'Mobilya montajı ve tamir işleri',
    icon: 'Sofa',
    businessCount: 25,
    subcategories: [
      'Mobilya Montaj',
      'Dolap Montaj',
      'Mobilya Tamir',
      'Mutfak Dolabı',
      'Gardrop Montaj',
      'Mobilya Taşıma'
    ]
  },
  {
    id: 11,
    name: 'Klima',
    slug: 'klima',
    description: 'Klima montaj, bakım ve servis',
    icon: 'Snowflake',
    businessCount: 33,
    subcategories: [
      'Klima Montaj',
      'Klima Bakım',
      'Klima Tamir',
      'Klima Temizlik',
      'Split Klima',
      'Merkezi Klima'
    ]
  },
  {
    id: 12,
    name: 'Boya Badana',
    slug: 'boya-badana',
    description: 'İç ve dış cephe boya işleri',
    icon: 'Palette',
    businessCount: 29,
    subcategories: [
      'İç Cephe Boya',
      'Dış Cephe Boya',
      'Tavan Boya',
      'Dekoratif Boya',
      'Epoksi Boya',
      'Su Bazlı Boya'
    ]
  },
  {
    id: 13,
    name: 'Çatı',
    slug: 'cati',
    description: 'Çatı yapımı, onarımı ve izolasyon',
    icon: 'Square',
    businessCount: 18,
    subcategories: [
      'Çatı Yapımı',
      'Çatı Onarımı',
      'Çatı İzolasyonu',
      'Çatı Kaplama',
      'Çatı Temizliği',
      'Çatı Bakım'
    ]
  },
  {
    id: 14,
    name: 'Kilitçi',
    slug: 'kilitci',
    description: 'Kilit değişimi ve güvenlik sistemleri',
    icon: 'Key',
    businessCount: 16,
    subcategories: [
      'Kilit Değişimi',
      'Anahtar Kopyalama',
      'Kasa Açma',
      'Güvenlik Kilitleri',
      'Elektronik Kilit',
      'Acil Kilit Açma'
    ]
  },
  {
    id: 15,
    name: 'Çevre Düzenleme',
    slug: 'cevre-duzenleme',
    description: 'Çevre düzenleme ve yeşil alan projeleri',
    icon: 'Leaf',
    businessCount: 14,
    subcategories: [
      'Yeşil Alan',
      'Çevre Düzenleme',
      'Peyzaj Projesi',
      'Ağaç Dikimi',
      'Çiçek Bakımı',
      'Çevre Temizliği'
    ]
  },
  {
    id: 16,
    name: 'Teknoloji',
    slug: 'teknoloji',
    description: 'Teknoloji ve yazılım hizmetleri',
    icon: 'Smartphone',
    businessCount: 27,
    subcategories: [
      'Web Tasarım',
      'Mobil Uygulama',
      'Yazılım Geliştirme',
      'Bilgisayar Tamir',
      'Ağ Kurulumu',
      'Teknik Destek'
    ]
  },
  {
    id: 17,
    name: 'Sağlık',
    slug: 'saglik',
    description: 'Sağlık ve bakım hizmetleri',
    icon: 'Heart',
    businessCount: 23,
    subcategories: [
      'Evde Bakım',
      'Hemşirelik',
      'Fizyoterapi',
      'Masaj Terapi',
      'Sağlık Danışmanlığı',
      'İlk Yardım'
    ]
  },
  {
    id: 18,
    name: 'Eğitim',
    slug: 'egitim',
    description: 'Özel ders ve eğitim hizmetleri',
    icon: 'GraduationCap',
    businessCount: 37,
    subcategories: [
      'Özel Ders',
      'Matematik',
      'İngilizce',
      'Müzik Dersi',
      'Spor Eğitimi',
      'Yabancı Dil'
    ]
  },
  {
    id: 19,
    name: 'Kuaför',
    slug: 'kuafor',
    description: 'Saç ve güzellik hizmetleri',
    icon: 'Scissors',
    businessCount: 42,
    subcategories: [
      'Saç Kesimi',
      'Saç Boyama',
      'Saç Bakımı',
      'Cilt Bakımı',
      'Makyaj',
      'Güzellik Bakımı'
    ]
  },
  {
    id: 20,
    name: 'Oto Servis',
    slug: 'oto-servis',
    description: 'Araç bakım ve onarım hizmetleri',
    icon: 'Car',
    businessCount: 48,
    subcategories: [
      'Motor Bakım',
      'Fren Sistemi',
      'Elektrik Sistemi',
      'Yağ Değişimi',
      'Lastik Değişimi',
      'Araç Yıkama'
    ]
  }
]

export const sectors = businessSectors 