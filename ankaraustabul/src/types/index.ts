// Usta interface'i
export interface Usta {
  id: string;
  ad: string;
  soyad: string;
  telefon: string;
  email?: string;
  hizmetler: string[];
  ilce: string;
  deneyim: number; // yıl cinsinden
  acilServis: boolean;
  calismaSaatleri: {
    baslangic: string;
    bitis: string;
  };
  garanti: boolean;
  garantiSuresi?: number; // ay cinsinden
  resim?: string;
  puan?: number;
  yorumSayisi?: number;
  adres?: string;
  hakkinda?: string;
  sertifikalar?: string[];
  favori?: boolean;
}

// Hizmet Kategorisi interface'i
export interface HizmetKategorisi {
  id: string;
  ad: string;
  aciklama: string;
  icon: string;
  ustaSayisi: number;
  acilServis: boolean;
  ortalamaMaliyet?: {
    min: number;
    max: number;
  };
}

// İlçe interface'i
export interface Ilce {
  id: string;
  ad: string;
  ustaSayisi: number;
}

// Arama Filtreleri interface'i
export interface AramaFiltreleri {
  ilce?: string;
  hizmet?: string;
  arama?: string;
  acilServis?: boolean;
  garanti?: boolean;
  minDeneyim?: number;
  minPuan?: number;
}

// İstatistikler interface'i
export interface Istatistikler {
  toplamUsta: number;
  kategoriSayisi: number;
  yediYirmidortHizmet: number;
  memnuniyetOrani: number;
  gunlukHizmet: number;
  aylikMusteri: number;
}

// Müşteri Yorumu interface'i
export interface MusteriYorumu {
  id: string;
  ad: string;
  ilce: string;
  puan: number;
  yorum: string;
  tarih: string;
  hizmet: string;
}

// Öne Çıkan Özellik interface'i
export interface OneCikanOzellik {
  id: string;
  baslik: string;
  aciklama: string;
  icon: string;
  renk: string;
}

// Blog Kategori interface'i
export interface BlogKategori {
  id: string;
  ad: string;
  yaziSayisi: number;
}

// Blog İçerik Bölümü interface'i
export interface BlogIcerikBolumu {
  baslik?: string;
  paragraf?: string;
  maddeListesi?: string[];
  altBaslik?: string;
  altParagraf?: string;
}

// Blog Yazısı interface'i
export interface BlogYazisi {
  id: string;
  baslik: string;
  slug: string;
  ozet: string;
  icerik: BlogIcerikBolumu[];
  sonuc?: string;
  kategori: string;
  yazar: string;
  tarih: string;
  okumaSuresi: number;
  goruntulenme: number;
  resim: string;
  etiketler: string[];
}

// Form verileri için interface'ler
export interface UstaEklemeFormu {
  ad: string;
  soyad: string;
  telefon: string;
  email?: string;
  hizmetler: string[];
  ilce: string;
  deneyim: number;
  acilServis: boolean;
  calismaSaatleriBaslangic: string;
  calismaSaatleriBitis: string;
  garanti: boolean;
  garantiSuresi?: number;
  adres?: string;
  hakkinda?: string;
  fiyatlandirma: {
    seyahatUcreti: number;
    minimumUcret: number;
    saatlikUcret: number;
    acilServisUcreti: number;
    indirimOrani?: number;
    odemeYontemleri: string[];
  };
}



// API Response tipleri
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Sayfa props'ları için genel tip
export interface PageProps {
  className?: string;
}