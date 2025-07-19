// Usta Service for Ankara Usta Bul
export interface UstaData {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  experience: string;
  location: string;
  hourlyRate: string;
  specialties: string[];
  serviceAreas: string[];
  packageType: string;
  transactionId: string;
  registrationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  amount: number;
}

export const ustaService = {
  // Get all ustalar from localStorage
  getAllUstalar(): UstaData[] {
    try {
      const ustalar = localStorage.getItem('ankaraustabul_ustalar');
      return ustalar ? JSON.parse(ustalar) : [];
    } catch (error) {
      console.error('❌ Usta verileri alınamadı:', error);
      return [];
    }
  },

  // Add new usta to localStorage
  addUsta(ustaData: Omit<UstaData, 'id' | 'registrationDate' | 'status'>): UstaData {
    try {
      const ustalar = this.getAllUstalar();
      
      const newUsta: UstaData = {
        ...ustaData,
        id: `usta_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        registrationDate: new Date().toISOString(),
        status: 'pending'
      };

      ustalar.push(newUsta);
      localStorage.setItem('ankaraustabul_ustalar', JSON.stringify(ustalar));
      
      console.log('✅ Yeni usta eklendi:', newUsta);
      return newUsta;
    } catch (error) {
      console.error('❌ Usta eklenemedi:', error);
      throw error;
    }
  },

  // Update usta status
  updateUstaStatus(ustaId: string, status: 'approved' | 'rejected'): UstaData | null {
    try {
      const ustalar = this.getAllUstalar();
      const ustaIndex = ustalar.findIndex(u => u.id === ustaId);
      
      if (ustaIndex === -1) {
        console.error('❌ Usta bulunamadı:', ustaId);
        return null;
      }

      ustalar[ustaIndex].status = status;
      localStorage.setItem('ankaraustabul_ustalar', JSON.stringify(ustalar));
      
      console.log('✅ Usta durumu güncellendi:', ustalar[ustaIndex]);
      return ustalar[ustaIndex];
    } catch (error) {
      console.error('❌ Usta durumu güncellenemedi:', error);
      return null;
    }
  },

  // Delete usta
  deleteUsta(ustaId: string): boolean {
    try {
      const ustalar = this.getAllUstalar();
      const filteredUstalar = ustalar.filter(u => u.id !== ustaId);
      
      localStorage.setItem('ankaraustabul_ustalar', JSON.stringify(filteredUstalar));
      
      console.log('✅ Usta silindi:', ustaId);
      return true;
    } catch (error) {
      console.error('❌ Usta silinemedi:', error);
      return false;
    }
  },

  // Get usta by ID
  getUstaById(ustaId: string): UstaData | null {
    try {
      const ustalar = this.getAllUstalar();
      return ustalar.find(u => u.id === ustaId) || null;
    } catch (error) {
      console.error('❌ Usta bulunamadı:', error);
      return null;
    }
  },

  // Get ustalar by status
  getUstalarByStatus(status: 'pending' | 'approved' | 'rejected'): UstaData[] {
    try {
      const ustalar = this.getAllUstalar();
      return ustalar.filter(u => u.status === 'pending');
    } catch (error) {
      console.error('❌ Usta listesi alınamadı:', error);
      return [];
    }
  },

  // Get statistics
  getStatistics() {
    try {
      const ustalar = this.getAllUstalar();
      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      return {
        total: ustalar.length,
        pending: ustalar.filter(u => u.status === 'pending').length,
        approved: ustalar.filter(u => u.status === 'approved').length,
        rejected: ustalar.filter(u => u.status === 'rejected').length,
        thisMonth: ustalar.filter(u => new Date(u.registrationDate) >= thisMonth).length,
        thisWeek: ustalar.filter(u => new Date(u.registrationDate) >= thisWeek).length,
        totalRevenue: ustalar.reduce((sum, u) => sum + u.amount, 0)
      };
    } catch (error) {
      console.error('❌ İstatistikler alınamadı:', error);
      return {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        thisMonth: 0,
        thisWeek: 0,
        totalRevenue: 0
      };
    }
  },

  // Clear all data (for testing)
  clearAllData() {
    try {
      localStorage.removeItem('ankaraustabul_ustalar');
      console.log('✅ Tüm usta verileri temizlendi');
    } catch (error) {
      console.error('❌ Veriler temizlenemedi:', error);
    }
  }
}; 