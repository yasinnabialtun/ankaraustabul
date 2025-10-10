import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit as firestoreLimit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import type { Usta, User } from '../types';
import { FIREBASE_CONFIG, isFirebaseConfigured } from '../utils/env';
import { logger } from '../utils';

// Validate Firebase configuration
const isFirebaseConfigValid = () => {
  return isFirebaseConfigured();
};

// Firebase'i başlat (sadece gerekli değerler varsa ve client-side ise)
const app = typeof window !== 'undefined' && isFirebaseConfigValid() ? 
  initializeApp(FIREBASE_CONFIG) : null;

// Conditional exports for server-side rendering safety
export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;
export const storage = app ? getStorage(app) : null;

// Analytics (sadece client-side ve production'da)
let analytics: any = null;
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production' && app && FIREBASE_CONFIG.measurementId) {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Analytics initialization failed:', error);
  }
}

// Analytics'i güvenli şekilde al
export const getAnalyticsInstance = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production' && app && FIREBASE_CONFIG.measurementId && !analytics) {
    try {
      analytics = getAnalytics(app);
    } catch (error) {
      console.warn('Analytics instance creation failed:', error);
    }
  }
  return analytics;
};

// Firestore koleksiyonları
export const COLLECTIONS = {
  USTALAR: 'ustalar',
  KATEGORILER: 'kategoriler',
  ILCELER: 'ilceler',
  BLOG: 'blog',
  YORUMLAR: 'yorumlar',
  SETTINGS: 'settings'
} as const;

// Usta verilerini Firestore'dan al (pagination ile)
export const getUstalarFromFirestore = async (
  limitCount: number = 10,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
) => {
  // Server-side rendering safety check
  if (typeof window === 'undefined') {
    console.warn('Firestore operations should not be called during SSR');
    return {
      data: [],
      lastDoc: null,
      hasMore: false
    };
  }
  
  if (!db) {
    console.warn('Firebase not initialized');
    return {
      data: [],
      lastDoc: null,
      hasMore: false
    };
  }
  
  try {
    let q = query(
      collection(db, COLLECTIONS.USTALAR),
      where('status', '==', 'approved'),
      orderBy('createdAt', 'desc'),
      firestoreLimit(limitCount)
    );

    if (lastDoc) {
      q = query(
        collection(db, COLLECTIONS.USTALAR),
        where('status', '==', 'approved'),
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        firestoreLimit(limitCount)
      );
    }

    const querySnapshot = await getDocs(q);
    const ustalar = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Usta[];

    const newLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
    const hasMore = querySnapshot.docs.length === limitCount;

    return {
      data: ustalar,
      lastDoc: newLastDoc,
      hasMore
    };
  } catch (error) {
    logger.error('Ustalar getirilemedi', { limitCount, hasLastDoc: !!lastDoc });
    return {
      data: [],
      lastDoc: null,
      hasMore: false
    };
  }
};

// Tek usta getir
export const getUstaById = async (ustaId: string): Promise<Usta | null> => {
  // Server-side rendering safety check
  if (typeof window === 'undefined') {
    console.warn('Firestore operations should not be called during SSR');
    return null;
  }
  
  if (!db) {
    console.warn('Firebase not initialized');
    return null;
  }
  
  try {
    const docRef = doc(db, COLLECTIONS.USTALAR, ustaId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Usta;
    }
    
    return null;
  } catch (error) {
    logger.error('Usta getirilemedi', { ustaId });
    return null;
  }
};

// Yeni usta ekle
export const addUstaToFirestore = async (
  ustaData: Omit<Usta, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  // Server-side rendering safety check
  if (typeof window === 'undefined') {
    console.warn('Firestore operations should not be called during SSR');
    throw new Error('Firestore operations not available during SSR');
  }
  
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.USTALAR), {
      ...ustaData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return docRef.id;
  } catch (error) {
    logger.error('Usta eklenemedi', { ustaData });
    throw error;
  }
};

// Usta güncelle
export const updateUstaInFirestore = async (
  ustaId: string,
  ustaData: Partial<Usta>
): Promise<void> => {
  // Server-side rendering safety check
  if (typeof window === 'undefined') {
    console.warn('Firestore operations should not be called during SSR');
    throw new Error('Firestore operations not available during SSR');
  }
  
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  
  try {
    const docRef = doc(db, COLLECTIONS.USTALAR, ustaId);
    await updateDoc(docRef, {
      ...ustaData,
      updatedAt: new Date(),
    });
  } catch (error) {
    logger.error('Usta güncellenemedi', { ustaId, ustaData });
    throw error;
  }
};

// Usta sil
export const deleteUstaFromFirestore = async (ustaId: string): Promise<void> => {
  // Server-side rendering safety check
  if (typeof window === 'undefined') {
    console.warn('Firestore operations should not be called during SSR');
    throw new Error('Firestore operations not available during SSR');
  }
  
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  
  try {
    const docRef = doc(db, COLLECTIONS.USTALAR, ustaId);
    await deleteDoc(docRef);
  } catch (error) {
    logger.error('Usta silinemedi', { ustaId });
    throw error;
  }
};

// Kategoriye göre ustaları getir
export const getUstalarByCategory = async (categorySlug: string, limitCount: number = 10): Promise<Usta[]> => {
  // Server-side rendering safety check
  if (typeof window === 'undefined') {
    console.warn('Firestore operations should not be called during SSR');
    return [];
  }
  
  if (!db) {
    console.warn('Firebase not initialized');
    return [];
  }
  
  try {
    const q = query(
      collection(db, COLLECTIONS.USTALAR),
      where('sectorSlug', '==', categorySlug),
      where('status', '==', 'approved'),
      orderBy('rating', 'desc'),
      firestoreLimit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Usta[];
  } catch (error) {
    logger.error('Kategori ustaları getirilemedi', { categorySlug, limitCount });
    return [];
  }
};

// İlçeye göre ustaları getir
export const getUstalarByDistrict = async (districtSlug: string, limitCount: number = 10): Promise<Usta[]> => {
  // Server-side rendering safety check
  if (typeof window === 'undefined') {
    console.warn('Firestore operations should not be called during SSR');
    return [];
  }
  
  if (!db) {
    console.warn('Firebase not initialized');
    return [];
  }
  
  try {
    const q = query(
      collection(db, COLLECTIONS.USTALAR),
      where('districtSlug', '==', districtSlug),
      where('status', '==', 'approved'),
      orderBy('rating', 'desc'),
      firestoreLimit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Usta[];
  } catch (error) {
    logger.error('İlçe ustaları getirilemedi', { districtSlug, limitCount });
    return [];
  }
};

// Premium ustaları getir
export const getPremiumUstalar = async (limitCount: number = 10): Promise<Usta[]> => {
  // Server-side rendering safety check
  if (typeof window === 'undefined') {
    console.warn('Firestore operations should not be called during SSR');
    return [];
  }
  
  if (!db) {
    console.warn('Firebase not initialized');
    return [];
  }
  
  try {
    const q = query(
      collection(db, COLLECTIONS.USTALAR),
      where('isPremium', '==', true),
      where('status', '==', 'approved'),
      orderBy('rating', 'desc'),
      firestoreLimit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Usta[];
  } catch (error) {
    logger.error('Premium ustalar getirilemedi', { limitCount });
    return [];
  }
};

// Ustaları ara
export const searchUstalar = async (searchTerm: string, limitCount: number = 20): Promise<Usta[]> => {
  // Server-side rendering safety check
  if (typeof window === 'undefined') {
    console.warn('Firestore operations should not be called during SSR');
    return [];
  }
  
  if (!db) {
    console.warn('Firebase not initialized');
    return [];
  }
  
  try {
    const q = query(
      collection(db, COLLECTIONS.USTALAR),
      where('status', '==', 'approved'),
      orderBy('rating', 'desc'),
      firestoreLimit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const allUstalar = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Usta[];
    
    // Client-side filtering for search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return allUstalar.filter(usta => 
        usta.name.toLowerCase().includes(searchLower) ||
        usta.category.toLowerCase().includes(searchLower) ||
        usta.district.toLowerCase().includes(searchLower) ||
        usta.specialties.some(specialty => specialty.toLowerCase().includes(searchLower))
      );
    }
    
    return allUstalar;
  } catch (error) {
    logger.error('Usta arama başarısız', { searchTerm, limitCount });
    return [];
  }
};

// İstatistikleri getir
export const getStatistics = async (): Promise<{
  totalUstalar: number;
  totalCategories: number;
  totalDistricts: number;
  averageRating: number;
}> => {
  // Server-side rendering safety check
  if (typeof window === 'undefined') {
    console.warn('Firestore operations should not be called during SSR');
    return {
      totalUstalar: 0,
      totalCategories: 0,
      totalDistricts: 0,
      averageRating: 0
    };
  }
  
  if (!db) {
    console.warn('Firebase not initialized');
    return {
      totalUstalar: 0,
      totalCategories: 0,
      totalDistricts: 0,
      averageRating: 0
    };
  }
  
  try {
    const q = query(
      collection(db, COLLECTIONS.USTALAR),
      where('status', '==', 'approved')
    );
    
    const querySnapshot = await getDocs(q);
    const ustalar = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Usta[];
    
    const totalUstalar = ustalar.length;
    const categories = new Set(ustalar.map(u => u.category));
    const districts = new Set(ustalar.map(u => u.district));
    const averageRating = ustalar.length > 0 
      ? ustalar.reduce((sum, u) => sum + (u.rating || 0), 0) / ustalar.length 
      : 0;
    
    return {
      totalUstalar,
      totalCategories: categories.size,
      totalDistricts: districts.size,
      averageRating: Math.round(averageRating * 10) / 10
    };
  } catch (error) {
    logger.error('İstatistikler getirilemedi');
    return {
      totalUstalar: 0,
      totalCategories: 0,
      totalDistricts: 0,
      averageRating: 0
    };
  }
};

// Auth functions
export const loginUser = async (email: string, password: string): Promise<FirebaseUser | null> => {
  // Server-side rendering safety check
  if (typeof window === 'undefined') {
    console.warn('Auth operations should not be called during SSR');
    return null;
  }
  
  if (!auth) {
    throw new Error('Firebase Auth not initialized');
  }
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    logger.error('Login failed', { email });
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  // Server-side rendering safety check
  if (typeof window === 'undefined') {
    console.warn('Auth operations should not be called during SSR');
    return;
  }
  
  if (!auth) {
    throw new Error('Firebase Auth not initialized');
  }
  
  try {
    await signOut(auth);
  } catch (error) {
    logger.error('Logout failed', {});
    throw error;
  }
};

export const onAuthStateChange = (callback: (user: FirebaseUser | null) => void) => {
  // Server-side rendering safety check
  if (typeof window === 'undefined') {
    console.warn('Auth operations should not be called during SSR');
    return () => {};
  }
  
  if (!auth) {
    console.warn('Firebase Auth not initialized');
    return () => {};
  }
  
  return onAuthStateChanged(auth, callback);
};