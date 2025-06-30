export interface Provider {
  id: string;
  name: string;
  category: string;
  district: string;
  rating: number;
  reviewCount: number;
  experience: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  services: string[];
  workingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  images: string[];
  verified: boolean;
  featured: boolean;
  priceRange: string;
  responseTime: string;
  languages: string[];
  certificates: string[];
  insurance: boolean;
  warranty: boolean;
}

export const providers: Provider[] = [
  // Elektrik Ustaları
  {
    id: "elektrik-1",
    name: "Ahmet Usta Elektrik",
    category: "elektrik",
    district: "Çankaya",
    rating: 4.8,
    reviewCount: 127,
    experience: "15 yıl",
    phone: "+90 532 123 45 67",
    email: "ahmet@elektrikusta.com",
    address: "Çankaya Mahallesi, Atatürk Bulvarı No:123, Çankaya/Ankara",
    description: "15 yıllık deneyimimle Ankara'nın en güvenilir elektrik ustalarından biriyim. Ev, ofis, işyeri elektrik tesisatı, arıza giderme, yeni tesisat kurulumu gibi tüm elektrik işlerinizde hizmet veriyorum. Garantili ve uygun fiyatlı hizmet için hemen arayın.",
    services: [
      "Elektrik tesisatı kurulumu",
      "Arıza giderme ve onarım",
      "Aydınlatma sistemleri",
      "Elektrik panosu kurulumu",
      "Güvenlik sistemleri",
      "Enerji tasarrufu çözümleri"
    ],
    workingHours: {
      monday: "08:00 - 18:00",
      tuesday: "08:00 - 18:00",
      wednesday: "08:00 - 18:00",
      thursday: "08:00 - 18:00",
      friday: "08:00 - 18:00",
      saturday: "09:00 - 16:00",
      sunday: "Kapalı"
    },
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
    verified: true,
    featured: true,
    priceRange: "150-500 TL",
    responseTime: "2 saat",
    languages: ["Türkçe"],
    certificates: ["Elektrik Teknisyeni Belgesi", "İSG Sertifikası"],
    insurance: true,
    warranty: true
  },
  {
    id: "elektrik-2",
    name: "Mehmet Elektrik Servisi",
    category: "elektrik",
    district: "Keçiören",
    rating: 4.6,
    reviewCount: 89,
    experience: "12 yıl",
    phone: "+90 533 234 56 78",
    email: "mehmet@elektrikservisi.com",
    address: "Etlik Mahallesi, Etlik Caddesi No:45, Keçiören/Ankara",
    description: "12 yıllık deneyimimle Keçiören bölgesinde elektrik hizmetleri veriyorum. Acil arıza durumlarında 7/24 hizmet veriyorum.",
    services: [
      "Elektrik arıza giderme",
      "Tesisat kurulumu",
      "Aydınlatma sistemleri",
      "Elektrik panosu onarımı"
    ],
    workingHours: {
      monday: "07:00 - 19:00",
      tuesday: "07:00 - 19:00",
      wednesday: "07:00 - 19:00",
      thursday: "07:00 - 19:00",
      friday: "07:00 - 19:00",
      saturday: "08:00 - 17:00",
      sunday: "Acil durumlar"
    },
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    verified: true,
    featured: false,
    priceRange: "120-400 TL",
    responseTime: "1 saat",
    languages: ["Türkçe"],
    certificates: ["Elektrik Teknisyeni Belgesi"],
    insurance: true,
    warranty: true
  },
  // Su Tesisatı Ustaları
  {
    id: "su-tesisati-1",
    name: "Ali Tesisat Ustası",
    category: "su-tesisati",
    district: "Mamak",
    rating: 4.7,
    reviewCount: 156,
    experience: "18 yıl",
    phone: "+90 534 345 67 89",
    email: "ali@tesisatusta.com",
    address: "Kutludüğün Mahallesi, Tesisat Sokak No:12, Mamak/Ankara",
    description: "18 yıllık deneyimimle su tesisatı konusunda uzmanım. Tıkanıklık açma, su kaçağı tespiti, yeni tesisat kurulumu gibi tüm işlerinizde hizmet veriyorum.",
    services: [
      "Su tesisatı kurulumu",
      "Tıkanıklık açma",
      "Su kaçağı tespiti",
      "Sıhhi tesisat onarımı",
      "Su sayacı değişimi",
      "Kanal açma"
    ],
    workingHours: {
      monday: "08:00 - 18:00",
      tuesday: "08:00 - 18:00",
      wednesday: "08:00 - 18:00",
      thursday: "08:00 - 18:00",
      friday: "08:00 - 18:00",
      saturday: "09:00 - 16:00",
      sunday: "Kapalı"
    },
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
    verified: true,
    featured: true,
    priceRange: "100-400 TL",
    responseTime: "1.5 saat",
    languages: ["Türkçe"],
    certificates: ["Tesisat Teknisyeni Belgesi", "Su Tesisatı Sertifikası"],
    insurance: true,
    warranty: true
  },
  // Temizlik Hizmetleri
  {
    id: "temizlik-1",
    name: "Güvenilir Temizlik",
    category: "temizlik",
    district: "Yenimahalle",
    rating: 4.5,
    reviewCount: 234,
    experience: "8 yıl",
    phone: "+90 535 456 78 90",
    email: "info@guvenilirtemizlik.com",
    address: "Batıkent Mahallesi, Temizlik Caddesi No:78, Yenimahalle/Ankara",
    description: "8 yıllık deneyimimizle ev, ofis, işyeri temizliği konusunda profesyonel hizmet veriyoruz. Güvenilir ve kaliteli temizlik için bizi tercih edin.",
    services: [
      "Ev temizliği",
      "Ofis temizliği",
      "Halı yıkama",
      "Cam temizliği",
      "Genel temizlik",
      "İnşaat sonrası temizlik"
    ],
    workingHours: {
      monday: "07:00 - 20:00",
      tuesday: "07:00 - 20:00",
      wednesday: "07:00 - 20:00",
      thursday: "07:00 - 20:00",
      friday: "07:00 - 20:00",
      saturday: "08:00 - 18:00",
      sunday: "08:00 - 16:00"
    },
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    verified: true,
    featured: false,
    priceRange: "80-300 TL",
    responseTime: "3 saat",
    languages: ["Türkçe"],
    certificates: ["Temizlik Hizmetleri Sertifikası"],
    insurance: true,
    warranty: false
  },
  // Nakliye Hizmetleri
  {
    id: "nakliye-1",
    name: "Hızlı Nakliyat",
    category: "nakliye",
    district: "Etimesgut",
    rating: 4.4,
    reviewCount: 167,
    experience: "10 yıl",
    phone: "+90 536 567 89 01",
    email: "info@hizlinakliyat.com",
    address: "Elvankent Mahallesi, Nakliyat Sokak No:34, Etimesgut/Ankara",
    description: "10 yıllık deneyimimizle evden eve nakliyat, ofis taşıma, eşya taşıma hizmetleri veriyoruz. Güvenli ve hızlı taşımacılık için bizi tercih edin.",
    services: [
      "Evden eve nakliyat",
      "Ofis taşıma",
      "Eşya taşıma",
      "Depolama",
      "Paketleme hizmeti",
      "Montaj demontaj"
    ],
    workingHours: {
      monday: "08:00 - 18:00",
      tuesday: "08:00 - 18:00",
      wednesday: "08:00 - 18:00",
      thursday: "08:00 - 18:00",
      friday: "08:00 - 18:00",
      saturday: "09:00 - 16:00",
      sunday: "Kapalı"
    },
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
    verified: true,
    featured: true,
    priceRange: "500-2000 TL",
    responseTime: "24 saat",
    languages: ["Türkçe"],
    certificates: ["Nakliyat Ruhsatı", "İSG Sertifikası"],
    insurance: true,
    warranty: true
  },
  // Bakım Onarım
  {
    id: "bakim-onarim-1",
    name: "Uzman Tamirci",
    category: "bakim-onarim",
    district: "Altındağ",
    rating: 4.6,
    reviewCount: 198,
    experience: "20 yıl",
    phone: "+90 537 678 90 12",
    email: "info@uzmantamirci.com",
    address: "Ulus Mahallesi, Tamir Sokak No:56, Altındağ/Ankara",
    description: "20 yıllık deneyimimle genel tamirat, tadilat, boya badana gibi tüm işlerinizde hizmet veriyorum. Kaliteli ve uygun fiyatlı hizmet garantisi.",
    services: [
      "Genel tamirat",
      "Tadilat",
      "Boya badana",
      "Fayans döşeme",
      "Kapı pencere onarımı",
      "Mobilya montajı"
    ],
    workingHours: {
      monday: "08:00 - 18:00",
      tuesday: "08:00 - 18:00",
      wednesday: "08:00 - 18:00",
      thursday: "08:00 - 18:00",
      friday: "08:00 - 18:00",
      saturday: "09:00 - 16:00",
      sunday: "Kapalı"
    },
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    verified: true,
    featured: false,
    priceRange: "200-800 TL",
    responseTime: "2 saat",
    languages: ["Türkçe"],
    certificates: ["İnşaat Teknisyeni Belgesi"],
    insurance: true,
    warranty: true
  },
  // Güvenlik Sistemleri
  {
    id: "guvenlik-1",
    name: "Güvenlik Sistemleri Ankara",
    category: "guvenlik",
    district: "Çankaya",
    rating: 4.8,
    reviewCount: 89,
    experience: "12 yıl",
    phone: "+90 538 789 01 23",
    email: "info@guvenliksistemleri.com",
    address: "Kızılay Mahallesi, Güvenlik Caddesi No:90, Çankaya/Ankara",
    description: "12 yıllık deneyimimizle güvenlik sistemleri kurulumu, kamera sistemleri, alarm sistemleri konusunda uzmanız. Güvenliğiniz için profesyonel çözümler.",
    services: [
      "Güvenlik kamera sistemi",
      "Alarm sistemi kurulumu",
      "Güvenlik görevlisi",
      "Kapı telefonu",
      "Parmak izi okuyucu",
      "Kartlı geçiş sistemi"
    ],
    workingHours: {
      monday: "09:00 - 18:00",
      tuesday: "09:00 - 18:00",
      wednesday: "09:00 - 18:00",
      thursday: "09:00 - 18:00",
      friday: "09:00 - 18:00",
      saturday: "10:00 - 16:00",
      sunday: "Kapalı"
    },
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
    verified: true,
    featured: true,
    priceRange: "300-1500 TL",
    responseTime: "4 saat",
    languages: ["Türkçe"],
    certificates: ["Güvenlik Sistemleri Sertifikası", "Elektronik Güvenlik Belgesi"],
    insurance: true,
    warranty: true
  },
  // Bahçe Bakımı
  {
    id: "bahce-bakimi-1",
    name: "Yeşil Bahçe Bakımı",
    category: "bahce-bakimi",
    district: "Gölbaşı",
    rating: 4.5,
    reviewCount: 67,
    experience: "8 yıl",
    phone: "+90 539 890 12 34",
    email: "info@yesilbahce.com",
    address: "Gölbaşı Mahallesi, Bahçe Sokak No:23, Gölbaşı/Ankara",
    description: "8 yıllık deneyimimizle bahçe düzenleme, çim biçme, ağaç budama, peyzaj tasarımı konusunda profesyonel hizmet veriyoruz.",
    services: [
      "Bahçe düzenleme",
      "Çim biçme",
      "Ağaç budama",
      "Peyzaj tasarımı",
      "Sulama sistemi",
      "Çiçek dikimi"
    ],
    workingHours: {
      monday: "07:00 - 17:00",
      tuesday: "07:00 - 17:00",
      wednesday: "07:00 - 17:00",
      thursday: "07:00 - 17:00",
      friday: "07:00 - 17:00",
      saturday: "08:00 - 15:00",
      sunday: "Kapalı"
    },
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    verified: true,
    featured: false,
    priceRange: "150-600 TL",
    responseTime: "24 saat",
    languages: ["Türkçe"],
    certificates: ["Peyzaj Mimarı Belgesi"],
    insurance: true,
    warranty: false
  },
  // Klima Servisi
  {
    id: "klima-1",
    name: "Soğuk Klima Servisi",
    category: "klima",
    district: "Sincan",
    rating: 4.7,
    reviewCount: 145,
    experience: "14 yıl",
    phone: "+90 540 901 23 45",
    email: "info@sogukklima.com",
    address: "Fatih Mahallesi, Klima Caddesi No:67, Sincan/Ankara",
    description: "14 yıllık deneyimimizle klima kurulumu, bakım, onarım, temizlik hizmetleri veriyoruz. Tüm marka klimalarda uzmanız.",
    services: [
      "Klima kurulumu",
      "Klima bakımı",
      "Klima onarımı",
      "Klima temizliği",
      "Gaz doldurma",
      "Klima taşıma"
    ],
    workingHours: {
      monday: "08:00 - 18:00",
      tuesday: "08:00 - 18:00",
      wednesday: "08:00 - 18:00",
      thursday: "08:00 - 18:00",
      friday: "08:00 - 18:00",
      saturday: "09:00 - 16:00",
      sunday: "Acil durumlar"
    },
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
    verified: true,
    featured: true,
    priceRange: "200-800 TL",
    responseTime: "2 saat",
    languages: ["Türkçe"],
    certificates: ["Klima Teknisyeni Belgesi", "Soğutma Sistemleri Sertifikası"],
    insurance: true,
    warranty: true
  },
  // Kombi Servisi
  {
    id: "kombi-1",
    name: "Sıcak Kombi Servisi",
    category: "kombi",
    district: "Pursaklar",
    rating: 4.6,
    reviewCount: 123,
    experience: "16 yıl",
    phone: "+90 541 012 34 56",
    email: "info@sicakkombi.com",
    address: "Fatih Mahallesi, Kombi Sokak No:89, Pursaklar/Ankara",
    description: "16 yıllık deneyimimizle kombi kurulumu, bakım, onarım, servis hizmetleri veriyoruz. Tüm marka kombilerde uzmanız.",
    services: [
      "Kombi kurulumu",
      "Kombi bakımı",
      "Kombi onarımı",
      "Kombi servisi",
      "Petek temizliği",
      "Kombi taşıma"
    ],
    workingHours: {
      monday: "08:00 - 18:00",
      tuesday: "08:00 - 18:00",
      wednesday: "08:00 - 18:00",
      thursday: "08:00 - 18:00",
      friday: "08:00 - 18:00",
      saturday: "09:00 - 16:00",
      sunday: "Acil durumlar"
    },
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    verified: true,
    featured: false,
    priceRange: "150-600 TL",
    responseTime: "1.5 saat",
    languages: ["Türkçe"],
    certificates: ["Kombi Teknisyeni Belgesi", "Isıtma Sistemleri Sertifikası"],
    insurance: true,
    warranty: true
  }
];

export const getProviderById = (id: string): Provider | undefined => {
  return providers.find(provider => provider.id === id);
};

export const getProvidersByCategory = (category: string): Provider[] => {
  return providers.filter(provider => provider.category === category);
};

export const getProvidersByDistrict = (district: string): Provider[] => {
  return providers.filter(provider => provider.district === district);
};

export const getFeaturedProviders = (): Provider[] => {
  return providers.filter(provider => provider.featured);
};

export const searchProviders = (query: string): Provider[] => {
  const lowercaseQuery = query.toLowerCase();
  return providers.filter(provider => 
    provider.name.toLowerCase().includes(lowercaseQuery) ||
    provider.description.toLowerCase().includes(lowercaseQuery) ||
    provider.services.some(service => 
      service.toLowerCase().includes(lowercaseQuery)
    ) ||
    provider.district.toLowerCase().includes(lowercaseQuery)
  );
};

export const getProvidersByCategoryAndDistrict = (category: string, district: string): Provider[] => {
  return providers.filter(provider => 
    provider.category === category && provider.district === district
  );
}; 