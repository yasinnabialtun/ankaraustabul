// Usta Service for Ankara Usta Bul with Firebase Firestore
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface UstaData {
  id?: string;
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
  // Get all ustalar from Firestore
  async getAllUstalar(): Promise<UstaData[]> {
    try {
      const ustalarRef = collection(db, 'ustalar');
      const q = query(ustalarRef, orderBy('registrationDate', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const ustalar: UstaData[] = [];
      querySnapshot.forEach((doc) => {
        ustalar.push({ id: doc.id, ...doc.data() } as UstaData);
      });
      
      console.log('📊 Ustalar yüklendi:', ustalar.length);
      return ustalar;
    } catch (error) {
      console.error('❌ Usta verileri alınamadı:', error);
      return [];
    }
  },

  // Add new usta to Firestore
  async addUsta(ustaData: Omit<UstaData, 'id' | 'registrationDate' | 'status'>): Promise<UstaData> {
    try {
      const ustalarRef = collection(db, 'ustalar');
      
      const newUstaData = {
        ...ustaData,
        registrationDate: new Date().toISOString(),
        status: 'pending',
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(ustalarRef, newUstaData);
      
      const newUsta: UstaData = {
        id: docRef.id,
        ...newUstaData
      };
      
      console.log('✅ Yeni usta eklendi:', newUsta);
      return newUsta;
    } catch (error) {
      console.error('❌ Usta eklenemedi:', error);
      throw error;
    }
  },

  // Update usta status
  async updateUstaStatus(ustaId: string, status: 'approved' | 'rejected'): Promise<UstaData | null> {
    try {
      const ustaRef = doc(db, 'ustalar', ustaId);
      await updateDoc(ustaRef, { status });
      
      console.log('✅ Usta durumu güncellendi:', ustaId, status);
      
      // Get updated usta
      const ustalar = await this.getAllUstalar();
      return ustalar.find(u => u.id === ustaId) || null;
    } catch (error) {
      console.error('❌ Usta durumu güncellenemedi:', error);
      return null;
    }
  },

  // Delete usta
  async deleteUsta(ustaId: string): Promise<boolean> {
    try {
      const ustaRef = doc(db, 'ustalar', ustaId);
      await deleteDoc(ustaRef);
      
      console.log('✅ Usta silindi:', ustaId);
      return true;
    } catch (error) {
      console.error('❌ Usta silinemedi:', error);
      return false;
    }
  },

  // Get usta by ID
  async getUstaById(ustaId: string): Promise<UstaData | null> {
    try {
      const ustalar = await this.getAllUstalar();
      return ustalar.find(u => u.id === ustaId) || null;
    } catch (error) {
      console.error('❌ Usta bulunamadı:', error);
      return null;
    }
  },

  // Get ustalar by status
  async getUstalarByStatus(status: 'pending' | 'approved' | 'rejected'): Promise<UstaData[]> {
    try {
      const ustalarRef = collection(db, 'ustalar');
      const q = query(ustalarRef, where('status', '==', status), orderBy('registrationDate', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const ustalar: UstaData[] = [];
      querySnapshot.forEach((doc) => {
        ustalar.push({ id: doc.id, ...doc.data() } as UstaData);
      });
      
      return ustalar;
    } catch (error) {
      console.error('❌ Usta listesi alınamadı:', error);
      return [];
    }
  },

  // Get statistics
  async getStatistics() {
    try {
      const ustalar = await this.getAllUstalar();
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

  // Search ustalar
  async searchUstalar(searchTerm: string): Promise<UstaData[]> {
    try {
      const ustalar = await this.getAllUstalar();
      const searchLower = searchTerm.toLowerCase();
      
      return ustalar.filter(usta => 
        usta.name.toLowerCase().includes(searchLower) ||
        usta.email.toLowerCase().includes(searchLower) ||
        usta.category.toLowerCase().includes(searchLower) ||
        usta.location.toLowerCase().includes(searchLower)
      );
    } catch (error) {
      console.error('❌ Usta arama hatası:', error);
      return [];
    }
  }
}; 