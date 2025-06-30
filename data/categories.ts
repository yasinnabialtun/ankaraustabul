export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  popularServices: string[];
  averagePrice: string;
  averageRating: number;
  providerCount: number;
  color: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "elektrik",
    name: "Elektrik",
    slug: "elektrik",
    description: "Elektrik tesisatı kurulumu, arıza giderme, aydınlatma sistemleri ve elektrik panosu kurulumu hizmetleri.",
    icon: "⚡",
    popularServices: [
      "Elektrik tesisatı kurulumu",
      "Arıza giderme ve onarım",
      "Aydınlatma sistemleri",
      "Elektrik panosu kurulumu",
      "Güvenlik sistemleri",
      "Enerji tasarrufu çözümleri"
    ],
    averagePrice: "150-500 TL",
    averageRating: 4.6,
    providerCount: 245,
    color: "bg-yellow-500"
  },
  {
    id: "su-tesisati",
    name: "Su Tesisatı",
    slug: "su-tesisati",
    description: "Su tesisatı kurulumu, tıkanıklık açma, sıhhi tesisat onarımı ve su kaçağı tespiti hizmetleri.",
    icon: "🚰",
    popularServices: [
      "Su tesisatı kurulumu",
      "Tıkanıklık açma",
      "Su kaçağı tespiti",
      "Sıhhi tesisat onarımı",
      "Su sayacı değişimi",
      "Kanal açma"
    ],
    averagePrice: "100-400 TL",
    averageRating: 4.5,
    providerCount: 198,
    color: "bg-blue-500"
  },
  {
    id: "temizlik",
    name: "Temizlik",
    slug: "temizlik",
    description: "Ev, ofis, işyeri temizliği, halı yıkama, cam temizliği ve genel temizlik hizmetleri.",
    icon: "🧹",
    popularServices: [
      "Ev temizliği",
      "Ofis temizliği",
      "Halı yıkama",
      "Cam temizliği",
      "Genel temizlik",
      "İnşaat sonrası temizlik"
    ],
    averagePrice: "80-300 TL",
    averageRating: 4.4,
    providerCount: 156,
    color: "bg-green-500"
  },
  {
    id: "nakliye",
    name: "Nakliye",
    slug: "nakliye",
    description: "Evden eve nakliyat, ofis taşıma, eşya taşıma ve depolama hizmetleri.",
    icon: "🚚",
    popularServices: [
      "Evden eve nakliyat",
      "Ofis taşıma",
      "Eşya taşıma",
      "Depolama",
      "Paketleme hizmeti",
      "Montaj demontaj"
    ],
    averagePrice: "500-2000 TL",
    averageRating: 4.3,
    providerCount: 89,
    color: "bg-orange-500"
  },
  {
    id: "bakim-onarim",
    name: "Bakım Onarım",
    slug: "bakim-onarim",
    description: "Genel bakım onarım, tamirat, tadilat ve yenileme hizmetleri.",
    icon: "🔧",
    popularServices: [
      "Genel tamirat",
      "Tadilat",
      "Boya badana",
      "Fayans döşeme",
      "Kapı pencere onarımı",
      "Mobilya montajı"
    ],
    averagePrice: "200-800 TL",
    averageRating: 4.5,
    providerCount: 234,
    color: "bg-red-500"
  },
  {
    id: "guvenlik",
    name: "Güvenlik",
    slug: "guvenlik",
    description: "Güvenlik sistemleri, kamera kurulumu, alarm sistemleri ve güvenlik hizmetleri.",
    icon: "🔒",
    popularServices: [
      "Güvenlik kamera sistemi",
      "Alarm sistemi kurulumu",
      "Güvenlik görevlisi",
      "Kapı telefonu",
      "Parmak izi okuyucu",
      "Kartlı geçiş sistemi"
    ],
    averagePrice: "300-1500 TL",
    averageRating: 4.7,
    providerCount: 67,
    color: "bg-purple-500"
  },
  {
    id: "bahce-bakimi",
    name: "Bahçe Bakımı",
    slug: "bahce-bakimi",
    description: "Bahçe düzenleme, çim biçme, ağaç budama ve peyzaj hizmetleri.",
    icon: "🌳",
    popularServices: [
      "Bahçe düzenleme",
      "Çim biçme",
      "Ağaç budama",
      "Peyzaj tasarımı",
      "Sulama sistemi",
      "Çiçek dikimi"
    ],
    averagePrice: "150-600 TL",
    averageRating: 4.4,
    providerCount: 78,
    color: "bg-emerald-500"
  },
  {
    id: "klima",
    name: "Klima",
    slug: "klima",
    description: "Klima kurulumu, bakım, onarım ve klima temizliği hizmetleri.",
    icon: "❄️",
    popularServices: [
      "Klima kurulumu",
      "Klima bakımı",
      "Klima onarımı",
      "Klima temizliği",
      "Gaz doldurma",
      "Klima taşıma"
    ],
    averagePrice: "200-800 TL",
    averageRating: 4.6,
    providerCount: 112,
    color: "bg-cyan-500"
  },
  {
    id: "asansor",
    name: "Asansör",
    slug: "asansor",
    description: "Asansör bakım, onarım, kurulum ve asansör güvenlik hizmetleri.",
    icon: "🛗",
    popularServices: [
      "Asansör bakımı",
      "Asansör onarımı",
      "Asansör kurulumu",
      "Asansör güvenlik kontrolü",
      "Asansör modernizasyonu",
      "Asansör acil servisi"
    ],
    averagePrice: "500-2000 TL",
    averageRating: 4.8,
    providerCount: 34,
    color: "bg-gray-500"
  },
  {
    id: "kombi",
    name: "Kombi",
    slug: "kombi",
    description: "Kombi kurulumu, bakım, onarım ve kombi servisi hizmetleri.",
    icon: "🔥",
    popularServices: [
      "Kombi kurulumu",
      "Kombi bakımı",
      "Kombi onarımı",
      "Kombi servisi",
      "Petek temizliği",
      "Kombi taşıma"
    ],
    averagePrice: "150-600 TL",
    averageRating: 4.5,
    providerCount: 145,
    color: "bg-red-600"
  },
  {
    id: "cam-balkon",
    name: "Cam Balkon",
    slug: "cam-balkon",
    description: "Cam balkon kurulumu, onarım ve cam balkon sistemleri hizmetleri.",
    icon: "🪟",
    popularServices: [
      "Cam balkon kurulumu",
      "Cam balkon onarımı",
      "Cam balkon sistemleri",
      "Cam balkon temizliği",
      "Cam balkon bakımı",
      "Cam balkon değişimi"
    ],
    averagePrice: "1000-5000 TL",
    averageRating: 4.6,
    providerCount: 56,
    color: "bg-sky-500"
  },
  {
    id: "kaporta-boya",
    name: "Kaporta Boya",
    slug: "kaporta-boya",
    description: "Araç kaporta boya, çizik giderme ve araç boya hizmetleri.",
    icon: "🚗",
    popularServices: [
      "Araç kaporta boya",
      "Çizik giderme",
      "Araç boya",
      "Kaporta onarımı",
      "Araç detay",
      "Araç cilalama"
    ],
    averagePrice: "300-1500 TL",
    averageRating: 4.4,
    providerCount: 89,
    color: "bg-indigo-500"
  },
  {
    id: "bilgisayar",
    name: "Bilgisayar",
    slug: "bilgisayar",
    description: "Bilgisayar tamiri, yazılım kurulumu, ağ kurulumu ve bilgisayar servisi.",
    icon: "💻",
    popularServices: [
      "Bilgisayar tamiri",
      "Yazılım kurulumu",
      "Ağ kurulumu",
      "Bilgisayar servisi",
      "Veri kurtarma",
      "Bilgisayar temizliği"
    ],
    averagePrice: "100-500 TL",
    averageRating: 4.5,
    providerCount: 123,
    color: "bg-blue-600"
  },
  {
    id: "telefon",
    name: "Telefon",
    slug: "telefon",
    description: "Telefon tamiri, ekran değişimi, yazılım kurulumu ve telefon servisi.",
    icon: "📱",
    popularServices: [
      "Telefon tamiri",
      "Ekran değişimi",
      "Yazılım kurulumu",
      "Telefon servisi",
      "Batarya değişimi",
      "Telefon açma"
    ],
    averagePrice: "150-800 TL",
    averageRating: 4.3,
    providerCount: 167,
    color: "bg-green-600"
  },
  {
    id: "mutfak",
    name: "Mutfak",
    slug: "mutfak",
    description: "Mutfak dolabı, tezgah kurulumu, mutfak tadilatı ve mutfak eşyası tamiri.",
    icon: "🍳",
    popularServices: [
      "Mutfak dolabı kurulumu",
      "Tezgah kurulumu",
      "Mutfak tadilatı",
      "Mutfak eşyası tamiri",
      "Mutfak boya",
      "Mutfak temizliği"
    ],
    averagePrice: "500-3000 TL",
    averageRating: 4.6,
    providerCount: 98,
    color: "bg-orange-600"
  },
  {
    id: "banyo",
    name: "Banyo",
    slug: "banyo",
    description: "Banyo tadilatı, fayans döşeme, banyo dolabı kurulumu ve banyo onarımı.",
    icon: "🛁",
    popularServices: [
      "Banyo tadilatı",
      "Fayans döşeme",
      "Banyo dolabı kurulumu",
      "Banyo onarımı",
      "Banyo boya",
      "Banyo temizliği"
    ],
    averagePrice: "800-4000 TL",
    averageRating: 4.5,
    providerCount: 87,
    color: "bg-teal-500"
  },
  {
    id: "cati",
    name: "Çatı",
    slug: "cati",
    description: "Çatı yapımı, çatı onarımı, çatı izolasyonu ve çatı tadilatı hizmetleri.",
    icon: "🏠",
    popularServices: [
      "Çatı yapımı",
      "Çatı onarımı",
      "Çatı izolasyonu",
      "Çatı tadilatı",
      "Çatı boya",
      "Çatı temizliği"
    ],
    averagePrice: "1000-8000 TL",
    averageRating: 4.7,
    providerCount: 45,
    color: "bg-amber-600"
  },
  {
    id: "parke",
    name: "Parke",
    slug: "parke",
    description: "Parke döşeme, parke cilalama, parke onarımı ve zemin kaplama hizmetleri.",
    icon: "🪵",
    popularServices: [
      "Parke döşeme",
      "Parke cilalama",
      "Parke onarımı",
      "Zemin kaplama",
      "Parke boya",
      "Parke temizliği"
    ],
    averagePrice: "300-2000 TL",
    averageRating: 4.4,
    providerCount: 76,
    color: "bg-yellow-700"
  },
  {
    id: "demirci",
    name: "Demirci",
    slug: "demirci",
    description: "Demir işleri, kapı yapımı, parmaklık yapımı ve metal işleri hizmetleri.",
    icon: "🔨",
    popularServices: [
      "Demir işleri",
      "Kapı yapımı",
      "Parmaklık yapımı",
      "Metal işleri",
      "Demir boya",
      "Demir onarımı"
    ],
    averagePrice: "200-1500 TL",
    averageRating: 4.5,
    providerCount: 67,
    color: "bg-gray-600"
  },
  {
    id: "marangoz",
    name: "Marangoz",
    slug: "marangoz",
    description: "Ahşap işleri, mobilya yapımı, kapı yapımı ve ahşap onarım hizmetleri.",
    icon: "🪚",
    popularServices: [
      "Ahşap işleri",
      "Mobilya yapımı",
      "Kapı yapımı",
      "Ahşap onarım",
      "Ahşap boya",
      "Ahşap cilalama"
    ],
    averagePrice: "300-2000 TL",
    averageRating: 4.6,
    providerCount: 89,
    color: "bg-orange-700"
  },
  {
    id: "seramik",
    name: "Seramik",
    slug: "seramik",
    description: "Seramik döşeme, fayans döşeme, seramik onarımı ve zemin kaplama hizmetleri.",
    icon: "🧱",
    popularServices: [
      "Seramik döşeme",
      "Fayans döşeme",
      "Seramik onarımı",
      "Zemin kaplama",
      "Seramik boya",
      "Seramik temizliği"
    ],
    averagePrice: "200-1500 TL",
    averageRating: 4.5,
    providerCount: 78,
    color: "bg-red-700"
  },
  {
    id: "boya",
    name: "Boya",
    slug: "boya",
    description: "İç cephe boya, dış cephe boya, boya badana ve boya hizmetleri.",
    icon: "🎨",
    popularServices: [
      "İç cephe boya",
      "Dış cephe boya",
      "Boya badana",
      "Boya hizmetleri",
      "Boya temizliği",
      "Boya onarımı"
    ],
    averagePrice: "150-1000 TL",
    averageRating: 4.4,
    providerCount: 134,
    color: "bg-pink-500"
  }
];

// Export categories for sitemap
export const categories = serviceCategories;

export const getCategories = (): ServiceCategory[] => {
  return serviceCategories;
};

export const getCategoryBySlug = (slug: string): ServiceCategory | undefined => {
  return serviceCategories.find(category => category.slug === slug);
};

export const getPopularCategories = (): ServiceCategory[] => {
  return serviceCategories.slice(0, 8); // İlk 8 kategoriyi popüler olarak döndür
};

export const searchCategories = (query: string): ServiceCategory[] => {
  const lowercaseQuery = query.toLowerCase();
  return serviceCategories.filter(category => 
    category.name.toLowerCase().includes(lowercaseQuery) ||
    category.description.toLowerCase().includes(lowercaseQuery) ||
    category.popularServices.some(service => 
      service.toLowerCase().includes(lowercaseQuery)
    )
  );
}; 