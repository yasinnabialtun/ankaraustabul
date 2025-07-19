// Usta Service for Ankara Usta Bul with Firebase Firestore
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, limit, getDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { UstaData, FeaturedUsta, UstaStats, SearchFilters } from '../types';

class UstaService {
  private collectionName = 'ustalar';

  // Tüm ustaları getir
  async getAllUstalar(): Promise<UstaData[]> {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as UstaData[];
    } catch (error) {
      console.error('Ustalar getirilemedi:', error);
      return [];
    }
  }

  // Onaylanmış ustaları getir
  async getApprovedUstalar(): Promise<UstaData[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('status', '==', 'approved'),
        orderBy('priorityRank', 'desc'),
        orderBy('rating', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as UstaData[];
    } catch (error) {
      console.error('Onaylanmış ustalar getirilemedi:', error);
      return [];
    }
  }

  // Öne çıkan ustaları getir
  async getFeaturedUstalar(limit: number = 10): Promise<FeaturedUsta[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('status', '==', 'approved'),
        where('isFeatured', '==', true),
        orderBy('priorityRank', 'desc'),
        orderBy('rating', 'desc'),
        limit(limit)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FeaturedUsta[];
    } catch (error) {
      console.error('Öne çıkan ustalar getirilemedi:', error);
      return [];
    }
  }

  // Kategoriye göre ustaları getir
  async getUstalarByCategory(category: string): Promise<UstaData[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('status', '==', 'approved'),
        where('category', '==', category),
        orderBy('priorityRank', 'desc'),
        orderBy('rating', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as UstaData[];
    } catch (error) {
      console.error('Kategori ustaları getirilemedi:', error);
      return [];
    }
  }

  // Filtrelenmiş arama
  async searchUstalar(filters: SearchFilters): Promise<UstaData[]> {
    try {
      let q = query(
        collection(db, this.collectionName),
        where('status', '==', 'approved')
      );

      // Kategori filtresi
      if (filters.category) {
        q = query(q, where('category', '==', filters.category));
      }

      // Öne çıkan filtresi
      if (filters.featuredOnly) {
        q = query(q, where('isFeatured', '==', true));
      }

      // Doğrulanmış filtresi
      if (filters.verifiedOnly) {
        q = query(q, where('verifiedBadge', '==', true));
      }

      // Sıralama
      if (filters.sortBy === 'featured') {
        q = query(q, orderBy('priorityRank', 'desc'));
      } else if (filters.sortBy === 'rating') {
        q = query(q, orderBy('rating', filters.sortOrder || 'desc'));
      } else if (filters.sortBy === 'price') {
        q = query(q, orderBy('hourlyRate', filters.sortOrder || 'asc'));
      } else {
        q = query(q, orderBy('priorityRank', 'desc'), orderBy('rating', 'desc'));
      }

      const querySnapshot = await getDocs(q);
      let results = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as UstaData[];

      // Client-side filtreler
      if (filters.location) {
        results = results.filter(usta => 
          usta.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }

      if (filters.rating) {
        results = results.filter(usta => (usta.rating || 0) >= filters.rating!);
      }

      if (filters.availability) {
        results = results.filter(usta => usta.availability === filters.availability);
      }

      if (filters.emergencyService) {
        results = results.filter(usta => usta.emergencyService);
      }

      if (filters.instantBooking) {
        results = results.filter(usta => usta.instantBooking);
      }

      return results;
    } catch (error) {
      console.error('Usta araması yapılamadı:', error);
      return [];
    }
  }

  // Usta ekle
  async addUsta(ustaData: UstaData): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...ustaData,
        createdAt: Timestamp.now(),
        isFeatured: ustaData.packageType === 'PREMIUM',
        priorityRank: ustaData.packageType === 'PREMIUM' ? 10 : 0,
        profileViews: 0,
        contactClicks: 0,
        rating: 0,
        reviewCount: 0,
        lastActive: new Date().toISOString(),
        responseTime: 60,
        availability: 'available',
        emergencyService: ustaData.packageType === 'PREMIUM',
        instantBooking: ustaData.packageType === 'PREMIUM',
        verifiedBadge: ustaData.packageType === 'PREMIUM',
        premiumProfile: ustaData.packageType === 'PREMIUM',
        whatsappEnabled: ustaData.packageType === 'PREMIUM',
        whatsappNumber: ustaData.phone,
        specialBadges: ustaData.packageType === 'PREMIUM' ? ['Öne Çıkan'] : [],
        workingHours: {
          start: '08:00',
          end: '18:00',
          days: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma']
        }
      });
      return docRef.id;
    } catch (error) {
      console.error('Usta eklenemedi:', error);
      return null;
    }
  }

  // Usta durumunu güncelle
  async updateUstaStatus(ustaId: string, status: 'approved' | 'rejected'): Promise<UstaData | null> {
    try {
      const ustaRef = doc(db, this.collectionName, ustaId);
      await updateDoc(ustaRef, { status });
      
      const ustaDoc = await getDoc(ustaRef);
      if (ustaDoc.exists()) {
        return { id: ustaDoc.id, ...ustaDoc.data() } as UstaData;
      }
      return null;
    } catch (error) {
      console.error('Usta durumu güncellenemedi:', error);
      return null;
    }
  }

  // Usta öne çıkarma
  async featureUsta(ustaId: string, featuredData: {
    isFeatured: boolean;
    priorityRank?: number;
    featuredUntil?: string;
    featuredReason?: string;
  }): Promise<boolean> {
    try {
      const ustaRef = doc(db, this.collectionName, ustaId);
      await updateDoc(ustaRef, {
        ...featuredData,
        featuredStartDate: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error('Usta öne çıkarılamadı:', error);
      return false;
    }
  }

  // Usta istatistiklerini güncelle
  async updateUstaStats(ustaId: string, stats: {
    profileViews?: number;
    contactClicks?: number;
    rating?: number;
    reviewCount?: number;
    lastActive?: string;
  }): Promise<boolean> {
    try {
      const ustaRef = doc(db, this.collectionName, ustaId);
      await updateDoc(ustaRef, stats);
      return true;
    } catch (error) {
      console.error('Usta istatistikleri güncellenemedi:', error);
      return false;
    }
  }

  // WhatsApp durumunu güncelle
  async updateWhatsappStatus(ustaId: string, enabled: boolean, number?: string): Promise<boolean> {
    try {
      const ustaRef = doc(db, this.collectionName, ustaId);
      await updateDoc(ustaRef, {
        whatsappEnabled: enabled,
        whatsappNumber: number
      });
      return true;
    } catch (error) {
      console.error('WhatsApp durumu güncellenemedi:', error);
      return false;
    }
  }

  // Usta sil
  async deleteUsta(ustaId: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, this.collectionName, ustaId));
      return true;
    } catch (error) {
      console.error('Usta silinemedi:', error);
      return false;
    }
  }

  // İstatistikleri getir
  async getStatistics(): Promise<UstaStats> {
    try {
      const allUstalar = await this.getAllUstalar();
      const approvedUstalar = allUstalar.filter(u => u.status === 'approved');
      const featuredUstalar = approvedUstalar.filter(u => u.isFeatured);
      
      const totalRevenue = allUstalar.reduce((sum, u) => sum + u.amount, 0);
      const averageRating = approvedUstalar.length > 0 
        ? approvedUstalar.reduce((sum, u) => sum + (u.rating || 0), 0) / approvedUstalar.length 
        : 0;
      
      const totalReviews = approvedUstalar.reduce((sum, u) => sum + (u.reviewCount || 0), 0);
      
      const categoryCounts = approvedUstalar.reduce((acc, usta) => {
        acc[usta.category] = (acc[usta.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const popularCategories = Object.entries(categoryCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([category]) => category);

      const topPerformingUstalar = approvedUstalar
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 10);

      return {
        totalUstalar: allUstalar.length,
        featuredUstalar: featuredUstalar.length,
        activeUstalar: approvedUstalar.length,
        totalRevenue,
        averageRating,
        totalReviews,
        popularCategories,
        topPerformingUstalar
      };
    } catch (error) {
      console.error('İstatistikler getirilemedi:', error);
      return {
        totalUstalar: 0,
        featuredUstalar: 0,
        activeUstalar: 0,
        totalRevenue: 0,
        averageRating: 0,
        totalReviews: 0,
        popularCategories: [],
        topPerformingUstalar: []
      };
    }
  }
}

export const ustaService = new UstaService(); 