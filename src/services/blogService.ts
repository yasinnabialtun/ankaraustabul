import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, orderBy, where } from 'firebase/firestore';
import { db } from './firebase';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  imageUrl?: string;
}

class BlogService {
  private collectionName = 'blogs';

  // Tüm blog yazılarını getir
  async getAllBlogs(): Promise<BlogPost[]> {
    if (!db) {
      console.warn('Firebase not initialized');
      return [];
    }

    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy('createdAt', 'desc'),
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as BlogPost[];
    } catch (error) {
      console.error('Blog yazıları alınırken hata:', error);
      return [];
    }
  }

  // ID'ye göre blog yazısı getir
  async getBlogById(id: string): Promise<BlogPost | null> {
    if (!db) {
      console.warn('Firebase not initialized');
      return null;
    }

    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        } as BlogPost;
      }
      
      return null;
    } catch (error) {
      console.error('Blog yazısı alınırken hata:', error);
      return null;
    }
  }

  // Slug'a göre blog yazısı getir
  async getBlogBySlug(slug: string): Promise<BlogPost | null> {
    if (!db) {
      console.warn('Firebase not initialized');
      return null;
    }

    try {
      const q = query(
        collection(db, this.collectionName),
        where('slug', '==', slug),
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return {
          id: doc.id,
          ...doc.data(),
        } as BlogPost;
      }
      
      return null;
    } catch (error) {
      console.error('Blog yazısı alınırken hata:', error);
      return null;
    }
  }

  // Yeni blog yazısı ekle
  async addBlog(blogData: Omit<BlogPost, 'id'>): Promise<string> {
    if (!db) {
      console.warn('Firebase not initialized');
      throw new Error('Firebase not initialized');
    }

    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...blogData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Blog yazısı eklenirken hata:', error);
      throw new Error('Blog yazısı eklenemedi');
    }
  }

  // Blog yazısını güncelle
  async updateBlog(id: string, blogData: Partial<BlogPost>): Promise<void> {
    if (!db) {
      console.warn('Firebase not initialized');
      throw new Error('Firebase not initialized');
    }

    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        ...blogData,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Blog yazısı güncellenirken hata:', error);
      throw new Error('Blog yazısı güncellenemedi');
    }
  }

  // Blog yazısını sil
  async deleteBlog(id: string): Promise<void> {
    if (!db) {
      console.warn('Firebase not initialized');
      throw new Error('Firebase not initialized');
    }

    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Blog yazısı silinirken hata:', error);
      throw new Error('Blog yazısı silinemedi');
    }
  }

  // Kategoriye göre blog yazıları getir
  async getBlogsByCategory(category: string): Promise<BlogPost[]> {
    if (!db) {
      console.warn('Firebase not initialized');
      return [];
    }

    try {
      const q = query(
        collection(db, this.collectionName),
        where('category', '==', category),
        orderBy('createdAt', 'desc'),
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as BlogPost[];
    } catch (error) {
      console.error('Kategori blogları alınırken hata:', error);
      return [];
    }
  }

  // Blog istatistikleri
  async getBlogStats() {
    try {
      const blogs = await this.getAllBlogs();
      const categories = Array.from(new Set(blogs.map(blog => blog.category)));
      
      return {
        totalBlogs: blogs.length,
        totalCategories: categories.length,
        recentBlogs: blogs.slice(0, 5),
        categoryCounts: categories.map(category => ({
          category,
          count: blogs.filter(blog => blog.category === category).length,
        })),
      };
    } catch (error) {
      console.error('Blog istatistikleri alınırken hata:', error);
      return {
        totalBlogs: 0,
        totalCategories: 0,
        recentBlogs: [],
        categoryCounts: [],
      };
    }
  }

  // Blog arama
  async searchBlogs(searchTerm: string): Promise<BlogPost[]> {
    try {
      const blogs = await this.getAllBlogs();
      
      return blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    } catch (error) {
      console.error('Blog arama hatası:', error);
      return [];
    }
  }

  // Okuma süresi hesapla
  calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} dk`;
  }

  // Otomatik özet oluştur
  generateExcerpt(content: string, maxLength: number = 150): string {
    const cleanContent = content.replace(/<[^>]*>/g, ''); // HTML taglerini temizle
    if (cleanContent.length <= maxLength) {
      return cleanContent;
    }
    
    return cleanContent.substring(0, maxLength).trim() + '...';
  }
}

export const blogService = new BlogService();
export default blogService;
