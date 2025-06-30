export interface District {
  id: string;
  name: string;
  slug: string;
  description: string;
  population: number;
  area: number; // km²
  popularServices: string[];
  neighborhoods: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const ankaraDistricts: District[] = [
  {
    id: "cankaya",
    name: "Çankaya",
    slug: "cankaya",
    description: "Ankara'nın merkezi ilçesi, devlet kurumları, üniversiteler ve iş merkezlerinin bulunduğu modern bir bölge. Yüksek yaşam kalitesi ve gelişmiş altyapısıyla öne çıkar.",
    population: 920000,
    area: 267.61,
    popularServices: ["Elektrik", "Su Tesisatı", "Temizlik", "Güvenlik", "Bakım Onarım"],
    neighborhoods: [
      "Kızılay", "Bahçelievler", "Emek", "Çayyolu", "Ümitköy", "Bilkent", "Oran", "Söğütözü", 
      "Kurtuluş", "Kurtuluş", "Küçükesat", "Gaziosmanpaşa", "Çankaya", "Dikmen", "Ayrancı"
    ],
    coordinates: { lat: 39.9208, lng: 32.8541 }
  },
  {
    id: "kecioren",
    name: "Keçiören",
    slug: "kecioren",
    description: "Ankara'nın en kalabalık ilçelerinden biri, geleneksel mahalle yapısı ve modern yerleşim alanlarının harmanlandığı bir bölge.",
    population: 850000,
    area: 159.3,
    popularServices: ["Su Tesisatı", "Elektrik", "Temizlik", "Nakliye", "Bakım Onarım"],
    neighborhoods: [
      "Etlik", "Bağlum", "Ufuktepe", "Yenimahalle", "Şenlik", "Kale", "Güçlükaya", 
      "Karaköse", "Aşağı Eğlence", "Yukarı Eğlence", "Sanatoryum", "Aktaş"
    ],
    coordinates: { lat: 39.9833, lng: 32.8667 }
  },
  {
    id: "mamak",
    name: "Mamak",
    slug: "mamak",
    description: "Ankara'nın doğusunda yer alan, gelişmekte olan bir ilçe. Genç nüfusu ve dinamik yapısıyla dikkat çeker.",
    population: 650000,
    area: 478.87,
    popularServices: ["Su Tesisatı", "Elektrik", "Temizlik", "Bakım Onarım", "Nakliye"],
    neighborhoods: [
      "Kutludüğün", "Hürel", "Gülveren", "Şafaktepe", "Dutluk", "Mevlana", "Kartaltepe", 
      "Bayındır", "Kayaş", "Lalahan", "Kazım Orbay", "General Zeki Doğan"
    ],
    coordinates: { lat: 39.9500, lng: 32.9167 }
  },
  {
    id: "yenimahalle",
    name: "Yenimahalle",
    slug: "yenimahalle",
    description: "Ankara'nın batısında yer alan, planlı yerleşim alanları ve yeşil alanlarıyla öne çıkan modern bir ilçe.",
    population: 680000,
    area: 274.0,
    popularServices: ["Elektrik", "Su Tesisatı", "Temizlik", "Güvenlik", "Bakım Onarım"],
    neighborhoods: [
      "Batıkent", "Demetevler", "Şentepe", "İnönü", "Barış", "Aşağı Yahşihan", 
      "Yukarı Yahşihan", "Karşıyaka", "Gazi", "Emek", "Yeni Batı"
    ],
    coordinates: { lat: 39.9833, lng: 32.7833 }
  },
  {
    id: "etimesgut",
    name: "Etimesgut",
    slug: "etimesgut",
    description: "Ankara'nın batısında, Eskişehir yolu üzerinde yer alan, hızla gelişen bir ilçe. Organize sanayi bölgesi ve üniversite kampüsleri bulunur.",
    population: 570000,
    area: 49.0,
    popularServices: ["Elektrik", "Su Tesisatı", "Temizlik", "Bakım Onarım", "Nakliye"],
    neighborhoods: [
      "Elvankent", "Göksu", "Pınarbaşı", "Yurtçu", "Aşağıyurtçu", "Erler", "Güzelkent", 
      "Şehitlik", "Atakent", "Bağlıca", "Söğütözü", "Yapracık"
    ],
    coordinates: { lat: 39.9500, lng: 32.6667 }
  },
  {
    id: "sincan",
    name: "Sincan",
    slug: "sincan",
    description: "Ankara'nın batısında, Eskişehir yolu üzerinde yer alan, sanayi ve ticaret merkezi olan bir ilçe.",
    population: 520000,
    area: 880.0,
    popularServices: ["Elektrik", "Su Tesisatı", "Temizlik", "Bakım Onarım", "Nakliye"],
    neighborhoods: [
      "Fatih", "Cumhuriyet", "Piri Reis", "Törekent", "Ertuğrulgazi", "Malazgirt", 
      "Gazi Osman Paşa", "Mevlana", "Türkobası", "Akşemsettin", "Alaattin"
    ],
    coordinates: { lat: 39.9667, lng: 32.5667 }
  },
  {
    id: "altindag",
    name: "Altındağ",
    slug: "altindag",
    description: "Ankara'nın tarihi merkezi, Ulus semtini içeren, tarihi yapıları ve geleneksel çarşılarıyla ünlü ilçe.",
    population: 380000,
    area: 174.0,
    popularServices: ["Su Tesisatı", "Elektrik", "Temizlik", "Bakım Onarım", "Nakliye"],
    neighborhoods: [
      "Ulus", "Hacettepe", "Hamamönü", "Kale", "Doğanbey", "Hacı Bayram", "Karacabey", 
      "Samanpazarı", "Telsizler", "Yıldırım Beyazıt", "Aydınlıkevler"
    ],
    coordinates: { lat: 39.9667, lng: 32.8667 }
  },
  {
    id: "pursaklar",
    name: "Pursaklar",
    slug: "pursaklar",
    description: "Ankara'nın kuzeydoğusunda yer alan, hızla gelişen bir ilçe. Yeni yerleşim alanları ve modern konut projeleriyle öne çıkar.",
    population: 140000,
    area: 162.0,
    popularServices: ["Elektrik", "Su Tesisatı", "Temizlik", "Bakım Onarım", "Nakliye"],
    neighborhoods: [
      "Fatih", "Cumhuriyet", "Saray", "Yeni Karşıyaka", "Karaköy", "Hacı Bayram", 
      "Karaköy", "Yeni Karaköy", "Yeni Karşıyaka", "Yeni Saray"
    ],
    coordinates: { lat: 40.0333, lng: 32.9833 }
  },
  {
    id: "golbasi",
    name: "Gölbaşı",
    slug: "golbasi",
    description: "Ankara'nın güneyinde yer alan, doğal gölleri ve yeşil alanlarıyla öne çıkan, şehir merkezine yakın ama sakin bir ilçe.",
    population: 130000,
    area: 738.0,
    popularServices: ["Su Tesisatı", "Elektrik", "Temizlik", "Bakım Onarım", "Bahçe Bakımı"],
    neighborhoods: [
      "Gölbaşı", "Bademlidere", "Karaoğlan", "Yurtbeyi", "Seğmenler", "Hacılar", 
      "Koparan", "Velihimmetli", "Emirler", "Ahiboz", "Karaali"
    ],
    coordinates: { lat: 39.7833, lng: 32.8167 }
  },
  {
    id: "polatli",
    name: "Polatlı",
    slug: "polatli",
    description: "Ankara'nın batısında yer alan, tarım ve hayvancılığın önemli olduğu, Sakarya Meydan Muharebesi'nin geçtiği tarihi bir ilçe.",
    population: 125000,
    area: 3618.0,
    popularServices: ["Su Tesisatı", "Elektrik", "Temizlik", "Bakım Onarım", "Tarım Hizmetleri"],
    neighborhoods: [
      "Polatlı", "Yenidoğan", "Şehitlik", "Cumhuriyet", "Fatih", "Yenişehir", 
      "Karahamzalı", "Tatlıkuyu", "Adatoprakpınar", "Avdan", "Beynam"
    ],
    coordinates: { lat: 39.5833, lng: 32.1500 }
  },
  {
    id: "cubuk",
    name: "Çubuk",
    slug: "cubuk",
    description: "Ankara'nın kuzeydoğusunda yer alan, doğal güzellikleri ve tarihi yapılarıyla öne çıkan, şehir merkezine yakın ama sakin bir ilçe.",
    population: 90000,
    area: 1198.0,
    popularServices: ["Su Tesisatı", "Elektrik", "Temizlik", "Bakım Onarım", "Bahçe Bakımı"],
    neighborhoods: [
      "Çubuk", "Yukarı Çavundur", "Aşağı Çavundur", "Kışlacık", "Köseler", "Sirkeli", 
      "Kışlacık", "Yukarı Çavundur", "Aşağı Çavundur", "Köseler", "Sirkeli"
    ],
    coordinates: { lat: 40.2333, lng: 33.0333 }
  },
  {
    id: "kazykan",
    name: "Kazıkan",
    slug: "kazykan",
    description: "Ankara'nın kuzeydoğusunda yer alan, doğal güzellikleri ve tarihi yapılarıyla öne çıkan, şehir merkezine yakın ama sakin bir ilçe.",
    population: 55000,
    area: 599.0,
    popularServices: ["Su Tesisatı", "Elektrik", "Temizlik", "Bakım Onarım", "Bahçe Bakımı"],
    neighborhoods: [
      "Kazıkan", "Bağbaşı", "Cuma", "Karaşar", "Uruş", "Yeşilöz", "Yurtbeyli", 
      "Bağbaşı", "Cuma", "Karaşar", "Uruş", "Yeşilöz"
    ],
    coordinates: { lat: 40.2333, lng: 32.6833 }
  },
  {
    id: "nallihan",
    name: "Nallıhan",
    slug: "nallihan",
    description: "Ankara'nın kuzeybatısında yer alan, doğal güzellikleri ve tarihi yapılarıyla öne çıkan, şehir merkezine uzak ama sakin bir ilçe.",
    population: 30000,
    area: 2074.0,
    popularServices: ["Su Tesisatı", "Elektrik", "Temizlik", "Bakım Onarım", "Bahçe Bakımı"],
    neighborhoods: [
      "Nallıhan", "Çayırhan", "Sarıyar", "Güzelöz", "Kurşunlu", "Tekke", "Çalış", 
      "Çayırhan", "Sarıyar", "Güzelöz", "Kurşunlu", "Tekke"
    ],
    coordinates: { lat: 40.1833, lng: 31.3500 }
  },
  {
    id: "beypazari",
    name: "Beypazarı",
    slug: "beypazari",
    description: "Ankara'nın kuzeybatısında yer alan, tarihi yapıları ve geleneksel el sanatlarıyla ünlü, turistik bir ilçe.",
    population: 48000,
    area: 1896.0,
    popularServices: ["Su Tesisatı", "Elektrik", "Temizlik", "Bakım Onarım", "Turizm Hizmetleri"],
    neighborhoods: [
      "Beypazarı", "Kırbaşı", "Uruş", "Karaşar", "Yeşilöz", "Yurtbeyli", "Bağbaşı", 
      "Cuma", "Karaşar", "Uruş", "Yeşilöz", "Yurtbeyli"
    ],
    coordinates: { lat: 40.1667, lng: 31.9167 }
  },
  {
    id: "ayas",
    name: "Ayaş",
    slug: "ayas",
    description: "Ankara'nın kuzeybatısında yer alan, doğal güzellikleri ve kaplıcalarıyla ünlü, şehir merkezine uzak ama sakin bir ilçe.",
    population: 13000,
    area: 1024.0,
    popularServices: ["Su Tesisatı", "Elektrik", "Temizlik", "Bakım Onarım", "Kaplıca Hizmetleri"],
    neighborhoods: [
      "Ayaş", "Gökler", "Oltan", "Tekke", "Ulupınar", "Yenikayı", "Başayaş", 
      "Gökler", "Oltan", "Tekke", "Ulupınar", "Yenikayı"
    ],
    coordinates: { lat: 40.0167, lng: 32.3333 }
  },
  {
    id: "kizilcahamam",
    name: "Kızılcahamam",
    slug: "kizilcahamam",
    description: "Ankara'nın kuzeyinde yer alan, kaplıcaları ve doğal güzellikleriyle ünlü, turistik bir ilçe.",
    population: 25000,
    area: 1628.0,
    popularServices: ["Su Tesisatı", "Elektrik", "Temizlik", "Bakım Onarım", "Kaplıca Hizmetleri"],
    neighborhoods: [
      "Kızılcahamam", "Güvem", "Pazar", "Seyhamamı", "Yenice", "Adatepe", "Akçakese", 
      "Güvem", "Pazar", "Seyhamamı", "Yenice", "Adatepe"
    ],
    coordinates: { lat: 40.4667, lng: 32.6500 }
  },
  {
    id: "sereflikochisar",
    name: "Şereflikoçhisar",
    slug: "sereflikochisar",
    description: "Ankara'nın güneyinde yer alan, Tuz Gölü kıyısında bulunan, tarım ve hayvancılığın önemli olduğu bir ilçe.",
    population: 35000,
    area: 2154.0,
    popularServices: ["Su Tesisatı", "Elektrik", "Temizlik", "Bakım Onarım", "Tarım Hizmetleri"],
    neighborhoods: [
      "Şereflikoçhisar", "Devekovan", "Gülyazı", "Hacıbektaş", "Kalealtı", "Küçükbeşkavak", 
      "Devekovan", "Gülyazı", "Hacıbektaş", "Kalealtı", "Küçükbeşkavak"
    ],
    coordinates: { lat: 38.9500, lng: 33.5500 }
  },
  {
    id: "elmadag",
    name: "Elmadağ",
    slug: "elmadag",
    description: "Ankara'nın doğusunda yer alan, dağlık yapısı ve doğal güzellikleriyle öne çıkan, şehir merkezine yakın ama sakin bir ilçe.",
    population: 45000,
    area: 647.0,
    popularServices: ["Su Tesisatı", "Elektrik", "Temizlik", "Bakım Onarım", "Dağ Turizmi"],
    neighborhoods: [
      "Elmadağ", "Hasanoğlan", "Lalahan", "Tekke", "Yurtbeyli", "Bağbaşı", "Cuma", 
      "Hasanoğlan", "Lalahan", "Tekke", "Yurtbeyli", "Bağbaşı"
    ],
    coordinates: { lat: 39.9167, lng: 33.2333 }
  },
  {
    id: "haymana",
    name: "Haymana",
    slug: "haymana",
    description: "Ankara'nın güneyinde yer alan, kaplıcaları ve doğal güzellikleriyle ünlü, tarım ve hayvancılığın önemli olduğu bir ilçe.",
    population: 30000,
    area: 2164.0,
    popularServices: ["Su Tesisatı", "Elektrik", "Temizlik", "Bakım Onarım", "Kaplıca Hizmetleri"],
    neighborhoods: [
      "Haymana", "Yenice", "Çalış", "Güzelöz", "Kurşunlu", "Tekke", "Ulupınar", 
      "Yenice", "Çalış", "Güzelöz", "Kurşunlu", "Tekke"
    ],
    coordinates: { lat: 39.4333, lng: 32.5000 }
  },
  {
    id: "kalecik",
    name: "Kalecik",
    slug: "kalecik",
    description: "Ankara'nın kuzeydoğusunda yer alan, tarihi yapıları ve doğal güzellikleriyle öne çıkan, şehir merkezine uzak ama sakin bir ilçe.",
    population: 15000,
    area: 1150.0,
    popularServices: ["Su Tesisatı", "Elektrik", "Temizlik", "Bakım Onarım", "Turizm Hizmetleri"],
    neighborhoods: [
      "Kalecik", "Çandır", "Kızılırmak", "Tekkeköy", "Yenidoğan", "Bağbaşı", "Cuma", 
      "Çandır", "Kızılırmak", "Tekkeköy", "Yenidoğan", "Bağbaşı"
    ],
    coordinates: { lat: 40.1000, lng: 33.4167 }
  }
];

export const getDistrictBySlug = (slug: string): District | undefined => {
  return ankaraDistricts.find(district => district.slug === slug);
};

export const getPopularDistricts = (): District[] => {
  return ankaraDistricts.slice(0, 8); // İlk 8 ilçeyi popüler olarak döndür
};

export const searchDistricts = (query: string): District[] => {
  const lowercaseQuery = query.toLowerCase();
  return ankaraDistricts.filter(district => 
    district.name.toLowerCase().includes(lowercaseQuery) ||
    district.description.toLowerCase().includes(lowercaseQuery) ||
    district.neighborhoods.some(neighborhood => 
      neighborhood.toLowerCase().includes(lowercaseQuery)
    )
  );
}; 