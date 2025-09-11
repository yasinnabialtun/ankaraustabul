import { db } from './firebase';
import { collection, addDoc, updateDoc, doc, getDoc, query, where, getDocs } from 'firebase/firestore';

export interface Payment {
  id?: string;
  userId: string;
  packageId: string;
  packageName: string;
  amount: number;
  currency: string;
  paymentMethod: 'shopier' | 'bank-transfer' | 'crypto';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  transactionId?: string;
  paymentDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentRequest {
  userId: string;
  packageId: string;
  packageName: string;
  amount: number;
  paymentMethod: 'shopier' | 'bank-transfer' | 'crypto';
}

class PaymentService {
  private readonly COLLECTION_NAME = 'payments';

  // Yeni ödeme kaydı oluştur
  async createPayment(paymentData: PaymentRequest): Promise<string> {
    try {
      const payment: Omit<Payment, 'id'> = {
        ...paymentData,
        currency: 'TRY',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), payment);
      return docRef.id;
    } catch (error) {
      console.error('Payment creation error:', error);
      throw new Error('Ödeme kaydı oluşturulamadı');
    }
  }

  // Ödeme durumunu güncelle
  async updatePaymentStatus(paymentId: string, status: Payment['status'], transactionId?: string): Promise<void> {
    try {
      const paymentRef = doc(db, this.COLLECTION_NAME, paymentId);
      const updateData: Partial<Payment> = {
        status,
        updatedAt: new Date(),
      };

      if (status === 'completed') {
        updateData.paymentDate = new Date();
        if (transactionId) {
          updateData.transactionId = transactionId;
        }
      }

      await updateDoc(paymentRef, updateData);
    } catch (error) {
      console.error('Payment status update error:', error);
      throw new Error('Ödeme durumu güncellenemedi');
    }
  }

  // Ödeme bilgilerini getir
  async getPayment(paymentId: string): Promise<Payment | null> {
    try {
      const paymentRef = doc(db, this.COLLECTION_NAME, paymentId);
      const paymentDoc = await getDoc(paymentRef);

      if (paymentDoc.exists()) {
        return { id: paymentDoc.id, ...paymentDoc.data() } as Payment;
      }
      return null;
    } catch (error) {
      console.error('Payment fetch error:', error);
      throw new Error('Ödeme bilgileri alınamadı');
    }
  }

  // Kullanıcının ödemelerini getir
  async getUserPayments(userId: string): Promise<Payment[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      const payments: Payment[] = [];

      querySnapshot.forEach((doc) => {
        payments.push({ id: doc.id, ...doc.data() } as Payment);
      });

      return payments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
      console.error('User payments fetch error:', error);
      throw new Error('Kullanıcı ödemeleri alınamadı');
    }
  }

  // Bekleyen ödemeleri getir
  async getPendingPayments(): Promise<Payment[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('status', '==', 'pending')
      );
      
      const querySnapshot = await getDocs(q);
      const payments: Payment[] = [];

      querySnapshot.forEach((doc) => {
        payments.push({ id: doc.id, ...doc.data() } as Payment);
      });

      return payments.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    } catch (error) {
      console.error('Pending payments fetch error:', error);
      throw new Error('Bekleyen ödemeler alınamadı');
    }
  }

  // Ödeme doğrulama (Shopier callback için)
  async verifyPayment(paymentId: string, transactionId: string): Promise<boolean> {
    try {
      const payment = await this.getPayment(paymentId);
      
      if (!payment) {
        throw new Error('Ödeme bulunamadı');
      }

      if (payment.status === 'completed') {
        return true; // Zaten tamamlanmış
      }

      // Gerçek uygulamada burada Shopier API'si ile doğrulama yapılır
      // Şimdilik basit bir simülasyon
      const isValid = transactionId.length > 10; // Basit doğrulama

      if (isValid) {
        await this.updatePaymentStatus(paymentId, 'completed', transactionId);
        return true;
      } else {
        await this.updatePaymentStatus(paymentId, 'failed');
        return false;
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      throw new Error('Ödeme doğrulanamadı');
    }
  }

  // Ödeme istatistikleri
  async getPaymentStats(): Promise<{
    totalPayments: number;
    totalAmount: number;
    completedPayments: number;
    pendingPayments: number;
    failedPayments: number;
  }> {
    try {
      const payments = await this.getAllPayments();
      
      const stats = {
        totalPayments: payments.length,
        totalAmount: 0,
        completedPayments: 0,
        pendingPayments: 0,
        failedPayments: 0,
      };

      payments.forEach(payment => {
        if (payment.status === 'completed') {
          stats.completedPayments++;
          stats.totalAmount += payment.amount;
        } else if (payment.status === 'pending') {
          stats.pendingPayments++;
        } else if (payment.status === 'failed') {
          stats.failedPayments++;
        }
      });

      return stats;
    } catch (error) {
      console.error('Payment stats error:', error);
      throw new Error('Ödeme istatistikleri alınamadı');
    }
  }

  // Tüm ödemeleri getir (Admin için)
  async getAllPayments(): Promise<Payment[]> {
    try {
      const querySnapshot = await getDocs(collection(db, this.COLLECTION_NAME));
      const payments: Payment[] = [];

      querySnapshot.forEach((doc) => {
        payments.push({ id: doc.id, ...doc.data() } as Payment);
      });

      return payments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
      console.error('All payments fetch error:', error);
      throw new Error('Tüm ödemeler alınamadı');
    }
  }
}

export default new PaymentService();
