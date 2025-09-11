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
import type { Usta, User, FirebaseConfig } from '../types';

// Firebase konfigürasyonu - Environment variables kullanarak
const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Validate Firebase configuration
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error('Firebase configuration is incomplete. Please check your environment variables.');
}

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Analytics (sadece production'da)
let analytics = null;
if (import.meta.env.PROD && firebaseConfig.measurementId) {
  analytics = getAnalytics(app);
}

// Firestore koleksiyonları
export const COLLECTIONS = {
  USTALAR: 'ustalar',
  KATEGORILER: 'kategoriler',
  ILCELER: 'ilceler',
  BLOG: 'blog',
  YORUMLAR: 'yorumlar',
  SETTINGS: 'settings'
} as const;

// Paginated query interface
interface PaginatedQuery {
  data: Usta[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}

// Usta verilerini Firestore'dan al (pagination ile)
export const getUstalarFromFirestore = async (
  limitCount: number = 10,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<PaginatedQuery> => {
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
    console.error('Ustalar getirilemedi:', error);
    return {
      data: [],
      lastDoc: null,
      hasMore: false
    };
  }
};

// Tek usta getir
export const getUstaById = async (ustaId: string): Promise<Usta | null> => {
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
    console.error('Usta getirilemedi:', error);
    return null;
  }
};

// Yeni usta ekle
export const addUstaToFirestore = async (
  ustaData: Omit<Usta, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  try {
    console.log('Firebase\'e ekleniyor:', ustaData);
    const docRef = await addDoc(collection(db, COLLECTIONS.USTALAR), {
      ...ustaData,
      status: 'pending', // Yeni ustalar onay bekler
      createdAt: new Date(),
      updatedAt: new Date(),
      viewCount: 0,
      contactCount: 0,
      rating: 0,
      reviewCount: 0
    });
    console.log('Firebase\'de oluşturulan ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Usta Firebase\'e eklenemedi:', error);
    throw error;
  }
};

// Usta güncelle
export const updateUstaInFirestore = async (
  ustaId: string, 
  updateData: Partial<Usta>
): Promise<boolean> => {
  try {
    const ustaRef = doc(db, COLLECTIONS.USTALAR, ustaId);
    await updateDoc(ustaRef, {
      ...updateData,
      updatedAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error('Usta güncellenemedi:', error);
    throw error;
  }
};

// Usta sil
export const deleteUstaFromFirestore = async (ustaId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.USTALAR, ustaId));
    return true;
  } catch (error) {
    console.error('Usta silinemedi:', error);
    throw error;
  }
};

// Kategoriye göre ustaları getir
export const getUstalarByCategory = async (
  categoryId: string,
  limitCount: number = 20
): Promise<Usta[]> => {
  try {
    const q = query(
      collection(db, COLLECTIONS.USTALAR),
      where('categoryId', '==', categoryId),
      where('status', '==', 'approved'),
      orderBy('isPremium', 'desc'),
      orderBy('rating', 'desc'),
      firestoreLimit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Usta[];
  } catch (error) {
    console.error('Kategori ustaları getirilemedi:', error);
    return [];
  }
};

// İlçeye göre ustaları getir
export const getUstalarByDistrict = async (
  districtId: string,
  limitCount: number = 20
): Promise<Usta[]> => {
  try {
    const q = query(
      collection(db, COLLECTIONS.USTALAR),
      where('districtId', '==', districtId),
      where('status', '==', 'approved'),
      orderBy('isPremium', 'desc'),
      orderBy('rating', 'desc'),
      firestoreLimit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Usta[];
  } catch (error) {
    console.error('İlçe ustaları getirilemedi:', error);
    return [];
  }
};

// Premium ustaları getir
export const getPremiumUstalar = async (limitCount: number = 10): Promise<Usta[]> => {
  try {
    const q = query(
      collection(db, COLLECTIONS.USTALAR),
      where('isPremium', '==', true),
      where('status', '==', 'approved'),
      orderBy('rating', 'desc'),
      orderBy('createdAt', 'desc'),
      firestoreLimit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Usta[];
  } catch (error) {
    console.error('Premium ustalar getirilemedi:', error);
    return [];
  }
};

// Arama fonksiyonu
export const searchUstalar = async (
  searchTerm: string,
  categoryId?: string,
  districtId?: string,
  limitCount: number = 20
): Promise<Usta[]> => {
  try {
    let q = query(
      collection(db, COLLECTIONS.USTALAR),
      where('status', '==', 'approved')
    );

    if (categoryId) {
      q = query(q, where('categoryId', '==', categoryId));
    }

    if (districtId) {
      q = query(q, where('districtId', '==', districtId));
    }

    q = query(
      q,
      orderBy('isPremium', 'desc'),
      orderBy('rating', 'desc'),
      firestoreLimit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    let ustalar = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Usta[];

    // Client-side filtering for search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      ustalar = ustalar.filter(usta => 
        usta.name.toLowerCase().includes(term) ||
        usta.description?.toLowerCase().includes(term) ||
        usta.skills?.some(skill => skill.toLowerCase().includes(term))
      );
    }

    return ustalar;
  } catch (error) {
    console.error('Arama yapılamadı:', error);
    return [];
  }
};

// Fotoğraf yükleme
export const uploadImage = async (
  file: File,
  path: string
): Promise<string> => {
  try {
    const imageRef = ref(storage, path);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Fotoğraf yüklenemedi:', error);
    throw error;
  }
};

// Admin kimlik doğrulama
export const adminLogin = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      id: userCredential.user.uid,
      email: userCredential.user.email || '',
      role: 'admin',
      name: userCredential.user.displayName || '',
      createdAt: new Date(),
    };
  } catch (error) {
    console.error('Admin girişi başarısız:', error);
    throw error;
  }
};

// Admin çıkış
export const adminLogout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Admin çıkışı başarısız:', error);
    throw error;
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// İstatistikler
export const getStatistics = async () => {
  try {
    const [ustalarSnapshot, kategorilerSnapshot] = await Promise.all([
      getDocs(query(collection(db, COLLECTIONS.USTALAR), where('status', '==', 'approved'))),
      getDocs(collection(db, COLLECTIONS.KATEGORILER))
    ]);

    return {
      totalUstalar: ustalarSnapshot.size,
      totalKategoriler: kategorilerSnapshot.size,
      premiumUstalar: ustalarSnapshot.docs.filter(doc => doc.data().isPremium).length,
      pendingUstalar: ustalarSnapshot.docs.filter(doc => doc.data().status === 'pending').length
    };
  } catch (error) {
    console.error('İstatistikler getirilemedi:', error);
    return {
      totalUstalar: 0,
      totalKategoriler: 0,
      premiumUstalar: 0,
      pendingUstalar: 0
    };
  }
};

export { analytics }; 