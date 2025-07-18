import { Usta, HizmetKategorisi, Ilce, Istatistikler, BlogYazisi, BlogKategori } from '../types';

// İlçeler
export const ilceler: Ilce[] = [
  { id: '1', ad: 'Çankaya', ustaSayisi: 45 },
  { id: '2', ad: 'Keçiören', ustaSayisi: 38 },
  { id: '3', ad: 'Yenimahalle', ustaSayisi: 42 },
  { id: '4', ad: 'Mamak', ustaSayisi: 35 },
  { id: '5', ad: 'Altındağ', ustaSayisi: 28 },
  { id: '6', ad: 'Etimesgut', ustaSayisi: 32 },
  { id: '7', ad: 'Sincan', ustaSayisi: 25 },
  { id: '8', ad: 'Pursaklar', ustaSayisi: 22 },
  { id: '9', ad: 'Gölbaşı', ustaSayisi: 18 },
  { id: '10', ad: 'Polatlı', ustaSayisi: 15 },
  { id: '11', ad: 'Kazan', ustaSayisi: 12 },
  { id: '12', ad: 'Akyurt', ustaSayisi: 10 },
  { id: '13', ad: 'Kalecik', ustaSayisi: 8 },
  { id: '14', ad: 'Çubuk', ustaSayisi: 14 },
  { id: '15', ad: 'Beypazarı', ustaSayisi: 11 },
];

// Hizmet Kategorileri
export const hizmetKategorileri: HizmetKategorisi[] = [
  {
    id: '1',
    ad: 'Elektrikçi',
    aciklama: 'Elektrik tesisatı, arıza giderme, aydınlatma sistemleri',
    icon: 'Zap',
    ustaSayisi: 45,
    acilServis: true,
    ortalamaMaliyet: { min: 150, max: 500 }
  },
  {
    id: '2',
    ad: 'Tesisatçı',
    aciklama: 'Su tesisatı, kalorifer, banyo-mutfak tesisatı',
    icon: 'Wrench',
    ustaSayisi: 38,
    acilServis: true,
    ortalamaMaliyet: { min: 200, max: 800 }
  },
  {
    id: '3',
    ad: 'Boyacı',
    aciklama: 'İç-dış cephe boyama, dekoratif boyama, badana',
    icon: 'Paintbrush',
    ustaSayisi: 32,
    acilServis: false,
    ortalamaMaliyet: { min: 300, max: 1200 }
  },
  {
    id: '4',
    ad: 'Marangoz',
    aciklama: 'Mobilya yapımı, onarım, ahşap işleri',
    icon: 'Hammer',
    ustaSayisi: 28,
    acilServis: false,
    ortalamaMaliyet: { min: 250, max: 1500 }
  },
  {
    id: '5',
    ad: 'Klima Servisi',
    aciklama: 'Klima montaj, bakım, onarım, gaz dolumu',
    icon: 'Wind',
    ustaSayisi: 25,
    acilServis: true,
    ortalamaMaliyet: { min: 180, max: 600 }
  },
  {
    id: '6',
    ad: 'Çilingir',
    aciklama: 'Kapı açma, kilit değişimi, güvenlik sistemleri',
    icon: 'Key',
    ustaSayisi: 22,
    acilServis: true,
    ortalamaMaliyet: { min: 100, max: 400 }
  },
  {
    id: '7',
    ad: 'Temizlikçi',
    aciklama: 'Ev temizliği, ofis temizliği, derin temizlik',
    icon: 'Sparkles',
    ustaSayisi: 35,
    acilServis: false,
    ortalamaMaliyet: { min: 120, max: 350 }
  },
  {
    id: '8',
    ad: 'Bahçıvan',
    aciklama: 'Bahçe düzenleme, peyzaj, bitki bakımı',
    icon: 'TreePine',
    ustaSayisi: 18,
    acilServis: false,
    ortalamaMaliyet: { min: 200, max: 800 }
  },
  {
    id: '9',
    ad: 'Çatı Ustası',
    aciklama: 'Çatı onarımı, kiremit değişimi, yalıtım',
    icon: 'Home',
    ustaSayisi: 15,
    acilServis: true,
    ortalamaMaliyet: { min: 400, max: 2000 }
  },
  {
    id: '10',
    ad: 'Fayansçı',
    aciklama: 'Fayans döşeme, seramik işleri, banyo yenileme',
    icon: 'Square',
    ustaSayisi: 20,
    acilServis: false,
    ortalamaMaliyet: { min: 300, max: 1000 }
  },
  {
    id: '11',
    ad: 'Cam Ustası',
    aciklama: 'Cam değişimi, cam kesimi, vitrin montajı',
    icon: 'Square',
    ustaSayisi: 12,
    acilServis: true,
    ortalamaMaliyet: { min: 150, max: 800 }
  },
  {
    id: '12',
    ad: 'Demirci',
    aciklama: 'Demir işleri, kapı-pencere, çit yapımı',
    icon: 'Hammer',
    ustaSayisi: 16,
    acilServis: false,
    ortalamaMaliyet: { min: 300, max: 1500 }
  },
  {
    id: '13',
    ad: 'Sıhhi Tesisatçı',
    aciklama: 'Kanal açma, tıkanıklık giderme, su kaçağı',
    icon: 'Wrench',
    ustaSayisi: 24,
    acilServis: true,
    ortalamaMaliyet: { min: 200, max: 600 }
  },
  {
    id: '14',
    ad: 'Mobilya Montajcısı',
    aciklama: 'Mobilya montajı, demontaj, taşıma',
    icon: 'Hammer',
    ustaSayisi: 19,
    acilServis: false,
    ortalamaMaliyet: { min: 100, max: 400 }
  },
  {
    id: '15',
    ad: 'Asansör Servisi',
    aciklama: 'Asansör bakım, onarım, modernizasyon',
    icon: 'Zap',
    ustaSayisi: 8,
    acilServis: true,
    ortalamaMaliyet: { min: 500, max: 2000 }
  }
];

// Popüler Kategoriler (Ana sayfa için)
export const populerKategoriler = hizmetKategorileri.slice(0, 6);

// İstatistikler
export const istatistikler: Istatistikler = {
  toplamUsta: 1250,
  kategoriSayisi: 15,
  yediYirmidortHizmet: 24,
  memnuniyetOrani: 98,
  gunlukHizmet: 85,
  aylikMusteri: 2500
};

// Blog Kategorileri
export const blogKategorileri: BlogKategori[] = [
  { id: '1', ad: 'Ev Bakımı', yaziSayisi: 25 },
  { id: '2', ad: 'Elektrik', yaziSayisi: 18 },
  { id: '3', ad: 'Tesisat', yaziSayisi: 22 },
  { id: '4', ad: 'Temizlik', yaziSayisi: 15 },
  { id: '5', ad: 'Bahçe', yaziSayisi: 12 },
  { id: '6', ad: 'Güvenlik', yaziSayisi: 10 },
  { id: '7', ad: 'Enerji Tasarrufu', yaziSayisi: 8 },
  { id: '8', ad: 'Dekorasyon', yaziSayisi: 14 }
];

// Blog Yazıları
export const blogYazilari: BlogYazisi[] = [
  {
    id: '1',
    baslik: 'Ankara\'da Elektrik Arızası Nasıl Çözülür?',
    slug: 'ankara-elektrik-arizasi-cozumu',
    ozet: 'Elektrik arızaları ev ve işyerlerinde sık karşılaşılan sorunlardır. Bu yazıda Ankara\'da elektrik arızası yaşadığınızda nasıl hareket etmeniz gerektiğini öğreneceksiniz.',
    icerik: [
      {
        baslik: 'Elektrik Arızası Belirtileri',
        paragraf: 'Elektrik arızaları genellikle belirli belirtilerle kendini gösterir. Bu belirtileri erken fark etmek, büyük sorunların önüne geçmenizi sağlar.',
        maddeListesi: [
          'Sürekli sigorta atması',
          'Prizlerden kıvılcım çıkması',
          'Elektrik kesintileri',
          'Aşırı ısınan kablolar',
          'Elektrikli cihazlarda anormal davranışlar'
        ]
      },
      {
        altBaslik: 'Acil Durumda Yapılması Gerekenler',
        altParagraf: 'Elektrik arızası yaşadığınızda öncelikle güvenliğinizi sağlamalısınız. Ana şalteri kapatarak elektrik akışını durdurun ve profesyonel bir elektrikçi çağırın.'
      }
    ],
    sonuc: 'Elektrik arızaları ciddi güvenlik riskleri oluşturabilir. Bu nedenle mutlaka uzman elektrikçilerden yardım almalısınız.',
    kategori: 'Elektrik',
    yazar: 'Ahmet Yılmaz',
    tarih: '2024-01-15',
    okumaSuresi: 8,
    goruntulenme: 15420,
    resim: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=400&fit=crop',
    etiketler: ['elektrik', 'arıza', 'güvenlik', 'ankara', 'elektrikçi']
  },
  {
    id: '2',
    baslik: 'Su Tesisatı Problemleri ve Çözümleri',
    slug: 'su-tesisati-problemleri-cozumleri',
    ozet: 'Su tesisatı problemleri ev sahiplerinin en çok karşılaştığı sorunlardan biridir. Bu rehberde yaygın tesisat problemlerini ve çözümlerini bulabilirsiniz.',
    icerik: [
      {
        baslik: 'Yaygın Tesisat Problemleri',
        paragraf: 'Su tesisatı problemleri genellikle tıkanıklık, sızıntı ve basınç sorunları şeklinde ortaya çıkar.',
        maddeListesi: [
          'Lavabo ve banyo tıkanıklıkları',
          'Su sızıntıları',
          'Düşük su basıncı',
          'Su kesintileri',
          'Koku problemleri'
        ]
      },
      {
        altBaslik: 'Önleyici Bakım',
        altParagraf: 'Düzenli bakım ile tesisat problemlerinin önüne geçebilirsiniz. Yılda en az bir kez profesyonel tesisatçı kontrolü yaptırmanız önerilir.'
      }
    ],
    sonuc: 'Tesisat problemlerini erken fark etmek ve düzenli bakım yaptırmak, büyük sorunların önüne geçmenizi sağlar.',
    kategori: 'Tesisat',
    yazar: 'Mehmet Demir',
    tarih: '2024-01-12',
    okumaSuresi: 6,
    goruntulenme: 12850,
    resim: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop',
    etiketler: ['tesisat', 'su', 'tıkanıklık', 'sızıntı', 'bakım']
  },
  {
    id: '3',
    baslik: 'Ev Temizliği İpuçları ve Püf Noktaları',
    slug: 'ev-temizligi-ipuclari-puf-noktalari',
    ozet: 'Ev temizliği sadece görsel değil, sağlık açısından da önemlidir. Bu yazıda etkili ev temizliği yöntemlerini öğreneceksiniz.',
    icerik: [
      {
        baslik: 'Günlük Temizlik Rutini',
        paragraf: 'Düzenli bir temizlik rutini oluşturmak, evinizin her zaman temiz kalmasını sağlar.',
        maddeListesi: [
          'Sabah yatak düzenleme',
          'Banyo temizliği',
          'Mutfak düzenleme',
          'Yer süpürme',
          'Havalandırma'
        ]
      },
      {
        altBaslik: 'Derin Temizlik',
        altParagraf: 'Haftalık derin temizlik ile evinizin her köşesini temizleyebilirsiniz. Bu işlem için profesyonel temizlikçi hizmeti alabilirsiniz.'
      }
    ],
    sonuc: 'Düzenli temizlik alışkanlığı, hem evinizin görünümünü hem de aile sağlığınızı olumlu etkiler.',
    kategori: 'Temizlik',
    yazar: 'Fatma Kaya',
    tarih: '2024-01-10',
    okumaSuresi: 5,
    goruntulenme: 9870,
    resim: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    etiketler: ['temizlik', 'ev', 'rutin', 'sağlık', 'düzen']
  },
  {
    id: '4',
    baslik: 'Bahçe Bakımı ve Peyzaj Tasarımı',
    slug: 'bahce-bakimi-peyzaj-tasarimi',
    ozet: 'Bahçe bakımı ve peyzaj tasarımı, evinizin değerini artıran önemli faktörlerdir. Bu rehberde bahçe bakımı hakkında detaylı bilgiler bulabilirsiniz.',
    icerik: [
      {
        baslik: 'Mevsimsel Bahçe Bakımı',
        paragraf: 'Her mevsimin kendine özgü bahçe bakım gereksinimleri vardır.',
        maddeListesi: [
          'İlkbahar: Çiçek ekimi ve budama',
          'Yaz: Sulama ve gübreleme',
          'Sonbahar: Yaprak temizliği',
          'Kış: Koruma ve hazırlık'
        ]
      },
      {
        altBaslik: 'Peyzaj Tasarımı',
        altParagraf: 'Profesyonel peyzaj tasarımı ile bahçenizi hem güzel hem de işlevsel hale getirebilirsiniz.'
      }
    ],
    sonuc: 'Düzenli bahçe bakımı ve profesyonel peyzaj tasarımı, evinizin değerini artırır.',
    kategori: 'Bahçe',
    yazar: 'Zeynep Arslan',
    tarih: '2024-01-08',
    okumaSuresi: 7,
    goruntulenme: 7560,
    resim: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=400&fit=crop',
    etiketler: ['bahçe', 'peyzaj', 'bakım', 'çiçek', 'tasarım']
  },
  {
    id: '5',
    baslik: 'Güvenlik Sistemleri ve Ev Koruma',
    slug: 'guvenlik-sistemleri-ev-koruma',
    ozet: 'Ev güvenliği modern yaşamın en önemli konularından biridir. Bu yazıda ev güvenlik sistemleri hakkında kapsamlı bilgiler bulabilirsiniz.',
    icerik: [
      {
        baslik: 'Temel Güvenlik Önlemleri',
        paragraf: 'Ev güvenliği için alınması gereken temel önlemler vardır.',
        maddeListesi: [
          'Kaliteli kilit sistemleri',
          'Alarm sistemleri',
          'Kamera sistemleri',
          'Aydınlatma',
          'Komşuluk ilişkileri'
        ]
      },
      {
        altBaslik: 'Profesyonel Güvenlik Hizmetleri',
        altParagraf: 'Güvenlik sistemleri kurulumu için mutlaka uzman çilingir ve güvenlik firmalarından hizmet almalısınız.'
      }
    ],
    sonuc: 'Güvenlik sistemleri yatırımı, evinizin ve ailenizin güvenliği için en önemli adımlardan biridir.',
    kategori: 'Güvenlik',
    yazar: 'Mustafa Çelik',
    tarih: '2024-01-05',
    okumaSuresi: 9,
    goruntulenme: 11230,
    resim: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    etiketler: ['güvenlik', 'alarm', 'kamera', 'kilit', 'koruma']
  },
  {
    id: '6',
    baslik: 'Enerji Tasarrufu İpuçları',
    slug: 'enerji-tasarrufu-ipuclari',
    ozet: 'Enerji tasarrufu hem çevre hem de bütçe açısından önemlidir. Bu yazıda evinizde enerji tasarrufu sağlayacak ipuçlarını öğreneceksiniz.',
    icerik: [
      {
        baslik: 'Elektrik Tasarrufu',
        paragraf: 'Elektrik faturalarınızı düşürmek için uygulayabileceğiniz yöntemler vardır.',
        maddeListesi: [
          'LED ampul kullanımı',
          'Enerji tasarruflu cihazlar',
          'Gereksiz cihazları kapatma',
          'Doğal aydınlatma',
          'Akıllı ev sistemleri'
        ]
      },
      {
        altBaslik: 'Isıtma ve Soğutma',
        altParagraf: 'Isıtma ve soğutma sistemlerinizi verimli kullanarak enerji tasarrufu sağlayabilirsiniz.'
      }
    ],
    sonuc: 'Küçük değişikliklerle büyük enerji tasarrufu sağlayabilirsiniz.',
    kategori: 'Enerji Tasarrufu',
    yazar: 'Ayşe Şahin',
    tarih: '2024-01-03',
    okumaSuresi: 6,
    goruntulenme: 8930,
    resim: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    etiketler: ['enerji', 'tasarruf', 'elektrik', 'çevre', 'bütçe']
  }
];

// Örnek Ustalar
export const ustalar: Usta[] = [
  {
    id: '1',
    ad: 'Mehmet',
    soyad: 'Yılmaz',
    telefon: '0532 123 45 67',
    email: 'mehmet.yilmaz@email.com',
    hizmetler: ['Elektrikçi'],
    ilce: 'Çankaya',
    deneyim: 15,
    acilServis: true,
    calismaSaatleri: { baslangic: '08:00', bitis: '18:00' },
    garanti: true,
    garantiSuresi: 12,
    resim: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    puan: 4.8,
    yorumSayisi: 127,
    adres: 'Kızılay Mahallesi, Ankara',
    hakkinda: '15 yıllık deneyimle elektrik tesisatı ve arıza giderme konusunda uzmanım.',
    sertifikalar: ['Elektrik Tesisatı Sertifikası', 'İSG Sertifikası'],
    ilanPaketi: 'premium'
  },
  {
    id: '2',
    ad: 'Ali',
    soyad: 'Demir',
    telefon: '0533 234 56 78',
    hizmetler: ['Tesisatçı'],
    ilce: 'Keçiören',
    deneyim: 12,
    acilServis: true,
    calismaSaatleri: { baslangic: '07:00', bitis: '19:00' },
    garanti: true,
    garantiSuresi: 6,
    resim: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    puan: 4.6,
    yorumSayisi: 89,
    adres: 'Etlik Mahallesi, Keçiören',
    hakkinda: 'Su tesisatı, kalorifer ve banyo tesisatı konularında profesyonel hizmet.',
    ilanPaketi: 'vip'
  },
  {
    id: '3',
    ad: 'Fatma',
    soyad: 'Kaya',
    telefon: '0534 345 67 89',
    hizmetler: ['Temizlikçi'],
    ilce: 'Yenimahalle',
    deneyim: 8,
    acilServis: false,
    calismaSaatleri: { baslangic: '09:00', bitis: '17:00' },
    garanti: false,
    resim: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    puan: 4.9,
    yorumSayisi: 156,
    adres: 'Batıkent Mahallesi, Yenimahalle',
    hakkinda: 'Ev ve ofis temizliği konusunda titiz ve güvenilir hizmet sunuyorum.',
    ilanPaketi: 'premium'
  },
  {
    id: '4',
    ad: 'Hasan',
    soyad: 'Özkan',
    telefon: '0535 456 78 90',
    hizmetler: ['Boyacı', 'Fayansçı'],
    ilce: 'Mamak',
    deneyim: 20,
    acilServis: false,
    calismaSaatleri: { baslangic: '08:00', bitis: '17:00' },
    garanti: true,
    garantiSuresi: 24,
    resim: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    puan: 4.7,
    yorumSayisi: 203,
    adres: 'Akdere Mahallesi, Mamak',
    hakkinda: '20 yıllık tecrübeyle boyama ve fayans işlerinde kaliteli hizmet.',
    ilanPaketi: 'vip'
  },
  {
    id: '5',
    ad: 'Ayşe',
    soyad: 'Şahin',
    telefon: '0536 567 89 01',
    hizmetler: ['Klima Servisi'],
    ilce: 'Altındağ',
    deneyim: 10,
    acilServis: true,
    calismaSaatleri: { baslangic: '08:00', bitis: '20:00' },
    garanti: true,
    garantiSuresi: 12,
    resim: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    puan: 4.5,
    yorumSayisi: 78,
    adres: 'Ulus Mahallesi, Altındağ',
    hakkinda: 'Klima montaj, bakım ve onarım konusunda uzman teknisyen.',
    ilanPaketi: 'premium'
  },
  {
    id: '6',
    ad: 'Mustafa',
    soyad: 'Çelik',
    telefon: '0537 678 90 12',
    hizmetler: ['Çilingir'],
    ilce: 'Etimesgut',
    deneyim: 7,
    acilServis: true,
    calismaSaatleri: { baslangic: '00:00', bitis: '23:59' },
    garanti: true,
    garantiSuresi: 3,
    resim: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    puan: 4.4,
    yorumSayisi: 92,
    adres: 'Elvankent Mahallesi, Etimesgut',
    hakkinda: '7/24 çilingir hizmeti, kapı açma ve güvenlik sistemleri.',
    ilanPaketi: 'vip'
  },
  {
    id: '7',
    ad: 'Zeynep',
    soyad: 'Arslan',
    telefon: '0538 789 01 23',
    hizmetler: ['Bahçıvan'],
    ilce: 'Gölbaşı',
    deneyim: 5,
    acilServis: false,
    calismaSaatleri: { baslangic: '07:00', bitis: '16:00' },
    garanti: false,
    resim: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    puan: 4.8,
    yorumSayisi: 45,
    adres: 'Merkez Mahallesi, Gölbaşı',
    hakkinda: 'Bahçe düzenleme ve peyzaj tasarımı konusunda yaratıcı çözümler.'
  },
  {
    id: '8',
    ad: 'İbrahim',
    soyad: 'Koç',
    telefon: '0539 890 12 34',
    hizmetler: ['Marangoz'],
    ilce: 'Sincan',
    deneyim: 18,
    acilServis: false,
    calismaSaatleri: { baslangic: '08:00', bitis: '17:00' },
    garanti: true,
    garantiSuresi: 18,
    resim: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    puan: 4.9,
    yorumSayisi: 167,
    adres: 'Fatih Mahallesi, Sincan',
    hakkinda: '18 yıllık marangozluk tecrübesiyle mobilya yapımı ve onarımı.'
  },
  {
    id: '9',
    ad: 'Emine',
    soyad: 'Yıldız',
    telefon: '0531 901 23 45',
    hizmetler: ['Temizlikçi', 'Bahçıvan'],
    ilce: 'Pursaklar',
    deneyim: 6,
    acilServis: false,
    calismaSaatleri: { baslangic: '08:00', bitis: '16:00' },
    garanti: false,
    resim: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    puan: 4.7,
    yorumSayisi: 73,
    adres: 'Saray Mahallesi, Pursaklar',
    hakkinda: 'Ev temizliği ve bahçe bakımı konusunda güvenilir hizmet.'
  },
  {
    id: '10',
    ad: 'Ahmet',
    soyad: 'Kurt',
    telefon: '0532 012 34 56',
    hizmetler: ['Çatı Ustası'],
    ilce: 'Polatlı',
    deneyim: 25,
    acilServis: true,
    calismaSaatleri: { baslangic: '07:00', bitis: '18:00' },
    garanti: true,
    garantiSuresi: 36,
    resim: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    puan: 4.8,
    yorumSayisi: 134,
    adres: 'Merkez Mahallesi, Polatlı',
    hakkinda: '25 yıllık çatı ustalığı tecrübesiyle kaliteli hizmet.'
  },
  {
    id: '11',
    ad: 'Selin',
    soyad: 'Özkan',
    telefon: '0533 123 45 67',
    hizmetler: ['Cam Ustası'],
    ilce: 'Kazan',
    deneyim: 9,
    acilServis: true,
    calismaSaatleri: { baslangic: '08:00', bitis: '19:00' },
    garanti: true,
    garantiSuresi: 6,
    resim: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    puan: 4.6,
    yorumSayisi: 89,
    adres: 'Kurtboğazı Mahallesi, Kazan',
    hakkinda: 'Cam kesimi, değişimi ve vitrin montajı konusunda uzman.'
  },
  {
    id: '12',
    ad: 'Murat',
    soyad: 'Aydın',
    telefon: '0534 234 56 78',
    hizmetler: ['Demirci'],
    ilce: 'Akyurt',
    deneyim: 14,
    acilServis: false,
    calismaSaatleri: { baslangic: '07:00', bitis: '17:00' },
    garanti: true,
    garantiSuresi: 12,
    resim: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    puan: 4.5,
    yorumSayisi: 67,
    adres: 'Merkez Mahallesi, Akyurt',
    hakkinda: 'Demir işleri, kapı-pencere ve çit yapımı konusunda tecrübeli.'
  },
  {
    id: '13',
    ad: 'Burak',
    soyad: 'Taş',
    telefon: '0532 222 33 44',
    hizmetler: ['Fayansçı'],
    ilce: 'Çubuk',
    deneyim: 11,
    acilServis: false,
    calismaSaatleri: { baslangic: '08:00', bitis: '17:00' },
    garanti: true,
    garantiSuresi: 12,
    resim: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=150&h=150&fit=crop&crop=face',
    puan: 4.7,
    yorumSayisi: 54,
    adres: 'Yıldırım Mahallesi, Çubuk',
    hakkinda: 'Banyo ve mutfak fayans döşeme, seramik işleri uzmanı.'
  },
  {
    id: '14',
    ad: 'Serkan',
    soyad: 'Güneş',
    telefon: '0533 333 44 55',
    hizmetler: ['Sıhhi Tesisatçı'],
    ilce: 'Kalecik',
    deneyim: 13,
    acilServis: true,
    calismaSaatleri: { baslangic: '07:00', bitis: '18:00' },
    garanti: true,
    garantiSuresi: 6,
    resim: 'https://images.unsplash.com/photo-1503389152951-9c3d0c6b7a5a?w=150&h=150&fit=crop&crop=face',
    puan: 4.6,
    yorumSayisi: 61,
    adres: 'Merkez Mahallesi, Kalecik',
    hakkinda: 'Kanal açma, tıkanıklık ve su kaçağı çözümlerinde uzman.'
  },
  {
    id: '15',
    ad: 'Gökhan',
    soyad: 'Asansör',
    telefon: '0534 444 55 66',
    hizmetler: ['Asansör Servisi'],
    ilce: 'Beypazarı',
    deneyim: 9,
    acilServis: true,
    calismaSaatleri: { baslangic: '08:00', bitis: '20:00' },
    garanti: true,
    garantiSuresi: 24,
    resim: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150&h=150&fit=crop&crop=face',
    puan: 4.5,
    yorumSayisi: 37,
    adres: 'Yeni Mahalle, Beypazarı',
    hakkinda: 'Asansör bakım, onarım ve modernizasyon hizmetleri.'
  },
  {
    id: '16',
    ad: 'Elif',
    soyad: 'Mobilya',
    telefon: '0535 555 66 77',
    hizmetler: ['Mobilya Montajcısı'],
    ilce: 'Altındağ',
    deneyim: 7,
    acilServis: false,
    calismaSaatleri: { baslangic: '09:00', bitis: '18:00' },
    garanti: true,
    garantiSuresi: 6,
    resim: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=150&h=150&fit=crop&crop=face',
    puan: 4.8,
    yorumSayisi: 29,
    adres: 'Aydınlıkevler Mahallesi, Altındağ',
    hakkinda: 'Mobilya montajı, demontajı ve taşıma hizmetlerinde uzman.'
  },
  {
    id: '17',
    ad: 'Mert',
    soyad: 'Dekor',
    telefon: '0536 666 77 88',
    hizmetler: ['Dekorasyon'],
    ilce: 'Çankaya',
    deneyim: 10,
    acilServis: false,
    calismaSaatleri: { baslangic: '08:00', bitis: '17:00' },
    garanti: true,
    garantiSuresi: 12,
    resim: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=150&h=150&fit=crop&crop=face',
    puan: 4.9,
    yorumSayisi: 41,
    adres: 'Bahçelievler Mahallesi, Çankaya',
    hakkinda: 'Ev ve ofis dekorasyonunda modern ve yenilikçi çözümler.'
  },
  {
    id: '18',
    ad: 'Seda',
    soyad: 'Enerji',
    telefon: '0537 777 88 99',
    hizmetler: ['Enerji Tasarrufu'],
    ilce: 'Yenimahalle',
    deneyim: 8,
    acilServis: false,
    calismaSaatleri: { baslangic: '09:00', bitis: '18:00' },
    garanti: true,
    garantiSuresi: 12,
    resim: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150&h=150&fit=crop&crop=face',
    puan: 4.7,
    yorumSayisi: 22,
    adres: 'Ostim Mahallesi, Yenimahalle',
    hakkinda: 'Ev ve iş yerlerinde enerji tasarrufu ve yalıtım uygulamaları.'
  },
  {
    id: '19',
    ad: 'Barış',
    soyad: 'Güven',
    telefon: '0538 888 99 00',
    hizmetler: ['Güvenlik'],
    ilce: 'Keçiören',
    deneyim: 14,
    acilServis: true,
    calismaSaatleri: { baslangic: '00:00', bitis: '23:59' },
    garanti: true,
    garantiSuresi: 24,
    resim: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=150&h=150&fit=crop&crop=face',
    puan: 4.8,
    yorumSayisi: 58,
    adres: 'Yükseltepe Mahallesi, Keçiören',
    hakkinda: 'Alarm, kamera ve akıllı güvenlik sistemlerinde uzman.'
  }
];

// Müşteri Yorumları
export const musteriYorumlari = [
  {
    id: '1',
    ad: 'Ayşe K.',
    ilce: 'Çankaya',
    puan: 5,
    yorum: 'Elektrik arızam için aradığım usta çok hızlı geldi ve sorunu kısa sürede çözdü. Çok memnun kaldım, herkese tavsiye ederim.',
    tarih: '2024-01-15',
    hizmet: 'Elektrikçi'
  },
  {
    id: '2',
    ad: 'Mehmet Y.',
    ilce: 'Keçiören',
    puan: 5,
    yorum: 'Tesisatçı usta çok profesyoneldi. İşini titizlikle yaptı ve garanti verdi. Fiyatlar da çok uygundu.',
    tarih: '2024-01-12',
    hizmet: 'Tesisatçı'
  },
  {
    id: '3',
    ad: 'Fatma S.',
    ilce: 'Yenimahalle',
    puan: 5,
    yorum: 'Boyacı ustamız evimizi çok güzel boyadı. Temiz çalışıyor ve işinin ehli. Kesinlikle tekrar çalışırım.',
    tarih: '2024-01-10',
    hizmet: 'Boyacı'
  },
  {
    id: '4',
    ad: 'Ali R.',
    ilce: 'Mamak',
    puan: 4,
    yorum: 'Klima servisi çok hızlı geldi. Sorunu çözdü ve bakım yaptı. Fiyat biraz yüksekti ama kaliteli hizmet.',
    tarih: '2024-01-08',
    hizmet: 'Klima Servisi'
  },
  {
    id: '5',
    ad: 'Zeynep A.',
    ilce: 'Etimesgut',
    puan: 5,
    yorum: 'Çilingir 7/24 hizmet veriyor. Gece yarısı kapı kilitlendi, 20 dakikada geldi ve açtı. Çok teşekkürler.',
    tarih: '2024-01-05',
    hizmet: 'Çilingir'
  },
  {
    id: '6',
    ad: 'Hasan K.',
    ilce: 'Sincan',
    puan: 4,
    yorum: 'Marangoz usta mobilyamızı çok güzel onardı. Fiyat uygun, işçilik kaliteli. Tavsiye ederim.',
    tarih: '2024-01-03',
    hizmet: 'Marangoz'
  }
];

// Öne Çıkan Özellikler
export const oneCikanOzellikler = [
  {
    id: '1',
    baslik: '7/24 Acil Servis',
    aciklama: 'Acil durumlarınızda 7/24 hizmet veren ustalarımızla anında çözüm bulun.',
    icon: 'Clock',
    renk: 'blue'
  },
  {
    id: '2',
    baslik: 'Güvenilir Ustalar',
    aciklama: 'Tüm ustalarımız kimlik ve sertifika kontrolünden geçer.',
    icon: 'Shield',
    renk: 'green'
  },
  {
    id: '3',
    baslik: 'Kalite Garantisi',
    aciklama: 'İşçilik garantisi ve müşteri memnuniyeti odaklı hizmet.',
    icon: 'CheckCircle',
    renk: 'purple'
  },
  {
    id: '4',
    baslik: 'Uygun Fiyat',
    aciklama: 'Rekabetçi fiyatlarla kaliteli hizmet garantisi.',
    icon: 'TrendingUp',
    renk: 'orange'
  },
  {
    id: '5',
    baslik: 'Hızlı Hizmet',
    aciklama: 'Ortalama 30 dakikada yanınızda olan ustalar.',
    icon: 'Zap',
    renk: 'yellow'
  },
  {
    id: '6',
    baslik: 'Online Randevu',
    aciklama: 'Tek tıkla online randevu alın, zaman kaybetmeyin.',
    icon: 'Calendar',
    renk: 'pink'
  }
];