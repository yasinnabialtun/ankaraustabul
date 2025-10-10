import { collection, getDocs, query, where, orderBy, limit, doc, updateDoc, deleteDoc, addDoc, Timestamp } from 'firebase/firestore'
import { db } from './firebase'

export interface Usta {
  id: string
  name: string
  category: string
  rating: number
  reviews: number
  location: string
  district: string
  experience: number
  description: string
  phone: string
  email: string
  website?: string
  socialMedia?: {
    instagram?: string
    facebook?: string
    twitter?: string
    linkedin?: string
  }
  isPremium: boolean
  isVerified: boolean
  isActive: boolean
  packageType: 'free' | 'premium' | 'pro'
  paymentStatus: 'pending' | 'completed' | 'failed'
  paymentDate?: Timestamp
  paymentAmount?: number
  image?: string
  gallery?: string[]
  workingHours: string
  languages: string[]
  certifications: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface AdminStats {
  totalUstalar: number
  totalUsers: number
  totalViews: number
  pendingApprovals: number
  verifiedUstalar: number
  premiumUstalar: number
  activeUstalar: number
  totalRevenue: number
  monthlyRevenue: number
  monthlyGrowth: {
    ustalar: string
    users: string
    views: string
    revenue: string
  }
}

export interface PaymentRecord {
  id: string
  ustaId: string
  ustaName: string
  packageType: 'premium' | 'pro'
  amount: number
  status: 'pending' | 'completed' | 'failed'
  paymentDate: Timestamp
  paymentMethod: string
  transactionId?: string
}

export class AdminService {
  // Usta istatistiklerini getir
  static async getStats(): Promise<AdminStats> {
    try {
      if (!db) {
        throw new Error('Firebase not initialized')
      }
      
      const ustalarRef = collection(db, 'ustalar')
      const usersRef = collection(db, 'users')
      const paymentsRef = collection(db, 'payments')

      const [ustalarSnapshot, usersSnapshot, paymentsSnapshot] = await Promise.all([
        getDocs(ustalarRef),
        getDocs(usersRef),
        getDocs(paymentsRef)
      ])

      const ustalar = ustalarSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Usta))
      
      const totalUstalar = ustalar.length
      const pendingApprovals = ustalar.filter(u => !u.isVerified).length
      const verifiedUstalar = ustalar.filter(u => u.isVerified).length
      const premiumUstalar = ustalar.filter(u => u.packageType === 'premium' || u.packageType === 'pro').length
      const activeUstalar = ustalar.filter(u => u.isActive).length

      const payments = paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PaymentRecord))
      const totalRevenue = payments
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0)

      const currentMonth = new Date()
      currentMonth.setDate(1)
      const monthlyRevenue = payments
        .filter(p => p.status === 'completed' && p.paymentDate.toDate() >= currentMonth)
        .reduce((sum, p) => sum + p.amount, 0)

      return {
        totalUstalar,
        totalUsers: usersSnapshot.size,
        totalViews: 0, // Analytics servisinden gelecek
        pendingApprovals,
        verifiedUstalar,
        premiumUstalar,
        activeUstalar,
        totalRevenue,
        monthlyRevenue,
        monthlyGrowth: {
          ustalar: '+12%', // Hesaplanacak
          users: '+25%',
          views: '+18%',
          revenue: '+15%'
        }
      }
    } catch (error) {
      console.error('Admin stats alınırken hata:', error)
      throw error
    }
  }

  // Tüm ustaları getir
  static async getAllUstalar(): Promise<Usta[]> {
    try {
      if (!db) {
        throw new Error('Firebase not initialized')
      }
      
      const ustalarRef = collection(db, 'ustalar')
      const q = query(ustalarRef, orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Usta))
    } catch (error) {
      console.error('Ustalar alınırken hata:', error)
      throw error
    }
  }

  // Ödeme yapan ustaları getir
  static async getPaidUstalar(): Promise<Usta[]> {
    try {
      if (!db) {
        throw new Error('Firebase not initialized')
      }
      
      const ustalarRef = collection(db, 'ustalar')
      const q = query(
        ustalarRef, 
        where('paymentStatus', '==', 'completed'),
        orderBy('paymentDate', 'desc')
      )
      const snapshot = await getDocs(q)
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Usta))
    } catch (error) {
      console.error('Ödeme yapan ustalar alınırken hata:', error)
      throw error
    }
  }

  // Usta onayla
  static async approveUsta(ustaId: string): Promise<void> {
    try {
      if (!db) {
        throw new Error('Firebase not initialized')
      }
      
      const ustaRef = doc(db, 'ustalar', ustaId)
      await updateDoc(ustaRef, {
        isVerified: true,
        isActive: true,
        updatedAt: Timestamp.now()
      })
    } catch (error) {
      console.error('Usta onaylanırken hata:', error)
      throw error
    }
  }

  // Usta reddet
  static async rejectUsta(ustaId: string): Promise<void> {
    try {
      if (!db) {
        throw new Error('Firebase not initialized')
      }
      
      const ustaRef = doc(db, 'ustalar', ustaId)
      await updateDoc(ustaRef, {
        isVerified: false,
        isActive: false,
        updatedAt: Timestamp.now()
      })
    } catch (error) {
      console.error('Usta reddedilirken hata:', error)
      throw error
    }
  }

  // Usta sil
  static async deleteUsta(ustaId: string): Promise<void> {
    try {
      if (!db) {
        throw new Error('Firebase not initialized')
      }
      
      const ustaRef = doc(db, 'ustalar', ustaId)
      await deleteDoc(ustaRef)
    } catch (error) {
      console.error('Usta silinirken hata:', error)
      throw error
    }
  }

  // Ödeme kayıtlarını getir
  static async getPaymentRecords(): Promise<PaymentRecord[]> {
    try {
      if (!db) {
        throw new Error('Firebase not initialized')
      }
      
      const paymentsRef = collection(db, 'payments')
      const q = query(paymentsRef, orderBy('paymentDate', 'desc'))
      const snapshot = await getDocs(q)
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as PaymentRecord))
    } catch (error) {
      console.error('Ödeme kayıtları alınırken hata:', error)
      throw error
    }
  }

  // Öne çıkan usta ekle
  static async addFeaturedUsta(ustaId: string): Promise<void> {
    try {
      if (!db) {
        throw new Error('Firebase not initialized')
      }
      
      const ustaRef = doc(db, 'ustalar', ustaId)
      await updateDoc(ustaRef, {
        isFeatured: true,
        updatedAt: Timestamp.now()
      })
    } catch (error) {
      console.error('Öne çıkan usta eklenirken hata:', error)
      throw error
    }
  }

  // Öne çıkan usta kaldır
  static async removeFeaturedUsta(ustaId: string): Promise<void> {
    try {
      if (!db) {
        throw new Error('Firebase not initialized')
      }
      
      const ustaRef = doc(db, 'ustalar', ustaId)
      await updateDoc(ustaRef, {
        isFeatured: false,
        updatedAt: Timestamp.now()
      })
    } catch (error) {
      console.error('Öne çıkan usta kaldırılırken hata:', error)
      throw error
    }
  }

  // Son aktiviteleri getir
  static async getRecentActivities(): Promise<any[]> {
    try {
      if (!db) {
        throw new Error('Firebase not initialized')
      }
      
      const activitiesRef = collection(db, 'activities')
      const q = query(activitiesRef, orderBy('createdAt', 'desc'), limit(10))
      const snapshot = await getDocs(q)
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Son aktiviteler alınırken hata:', error)
      // Return empty array instead of mock data
      return []
    }
  }
}
