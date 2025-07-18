import { Usta, AramaFiltreleri } from '../types';

// Usta filtreleme fonksiyonu
export const filterUstalar = (ustalar: Usta[], filtreler: AramaFiltreleri): Usta[] => {
  return ustalar.filter(usta => {
    // İlçe filtresi
    if (filtreler.ilce && usta.ilce !== filtreler.ilce) {
      return false;
    }

    // Hizmet filtresi
    if (filtreler.hizmet && !usta.hizmetler.includes(filtreler.hizmet)) {
      return false;
    }

    // Arama terimi filtresi (ad, soyad, hizmetler, ilçe)
    if (filtreler.arama) {
      const aramaTerimi = filtreler.arama.toLowerCase();
      const aramaAlanlari = [
        usta.ad.toLowerCase(),
        usta.soyad.toLowerCase(),
        usta.ilce.toLowerCase(),
        ...usta.hizmetler.map(h => h.toLowerCase()),
        usta.hakkinda?.toLowerCase() || ''
      ].join(' ');
      
      if (!aramaAlanlari.includes(aramaTerimi)) {
        return false;
      }
    }

    // Acil servis filtresi
    if (filtreler.acilServis && !usta.acilServis) {
      return false;
    }

    // Garanti filtresi
    if (filtreler.garanti && !usta.garanti) {
      return false;
    }

    // Minimum deneyim filtresi
    if (filtreler.minDeneyim && usta.deneyim < filtreler.minDeneyim) {
      return false;
    }

    // Minimum puan filtresi
    if (filtreler.minPuan && (!usta.puan || usta.puan < filtreler.minPuan)) {
      return false;
    }

    return true;
  });
};

// Usta sıralama fonksiyonu
export const sortUstalar = (ustalar: Usta[], sortBy: 'puan' | 'deneyim' | 'yorumSayisi' = 'puan'): Usta[] => {
  return [...ustalar].sort((a, b) => {
    switch (sortBy) {
      case 'puan':
        return (b.puan || 0) - (a.puan || 0);
      case 'deneyim':
        return b.deneyim - a.deneyim;
      case 'yorumSayisi':
        return (b.yorumSayisi || 0) - (a.yorumSayisi || 0);
      default:
        return 0;
    }
  });
};

// Telefon numarası formatlama
export const formatPhoneNumber = (phone: string): string => {
  // 05321234567 -> 0532 123 45 67
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`;
  }
  return phone;
};

// Puan yıldız gösterimi
export const getStarRating = (puan: number): string => {
  const fullStars = Math.floor(puan);
  const hasHalfStar = puan % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '☆' : '') + 
         '☆'.repeat(emptyStars);
};

// Deneyim metni
export const getExperienceText = (deneyim: number): string => {
  if (deneyim === 1) return '1 yıl deneyim';
  return `${deneyim} yıl deneyim`;
};

// Çalışma saatleri kontrolü
export const isWorkingHours = (calismaSaatleri: { baslangic: string; bitis: string }): boolean => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const [startHour, startMin] = calismaSaatleri.baslangic.split(':').map(Number);
  const [endHour, endMin] = calismaSaatleri.bitis.split(':').map(Number);
  
  const startTime = startHour * 60 + startMin;
  const endTime = endHour * 60 + endMin;
  
  // 24 saat çalışma kontrolü
  if (startTime === 0 && endTime === 1439) return true;
  
  return currentTime >= startTime && currentTime <= endTime;
};

// Favori işlemleri (localStorage)
export const getFavorites = (): string[] => {
  try {
    const favorites = localStorage.getItem('ankaraustabul_favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch {
    return [];
  }
};

export const addToFavorites = (ustaId: string): void => {
  try {
    const favorites = getFavorites();
    if (!favorites.includes(ustaId)) {
      favorites.push(ustaId);
      localStorage.setItem('ankaraustabul_favorites', JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Favori eklenirken hata:', error);
  }
};

export const removeFromFavorites = (ustaId: string): void => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(id => id !== ustaId);
    localStorage.setItem('ankaraustabul_favorites', JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Favori çıkarılırken hata:', error);
  }
};

export const isFavorite = (ustaId: string): boolean => {
  return getFavorites().includes(ustaId);
};

// URL slug oluşturma
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Form validasyon
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^0[5][0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Mesafe hesaplama (basit koordinat sistemi için)
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Dünya'nın yarıçapı (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Debounce fonksiyonu
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};