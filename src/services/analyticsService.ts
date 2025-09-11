import { collection, addDoc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

interface AnalyticsEvent {
  id?: string;
  type: 'page_view' | 'usta_view' | 'blog_view' | 'search' | 'contact';
  page?: string;
  ustaId?: string;
  blogId?: string;
  searchTerm?: string;
  userAgent?: string;
  timestamp: Date;
  sessionId?: string;
}

interface AnalyticsStats {
  totalViews: number;
  pageViews: number;
  ustaViews: number;
  blogViews: number;
  searches: number;
  contacts: number;
  topPages: { page: string; views: number }[];
  topUstalar: { ustaId: string; views: number }[];
  topBlogs: { blogId: string; views: number }[];
  dailyStats: { date: string; views: number }[];
}

class AnalyticsService {
  private collectionName = 'analytics';

  // Event kaydet
  async trackEvent(event: Omit<AnalyticsEvent, 'id' | 'timestamp'>): Promise<void> {
    try {
      await addDoc(collection(db, this.collectionName), {
        ...event,
        timestamp: Timestamp.now(),
        sessionId: this.getSessionId(),
      });
    } catch (error) {
      console.error('Analytics event kaydedilemedi:', error);
      // Analytics hatası uygulamayı durdurmamalı
    }
  }

  // Sayfa görüntüleme
  async trackPageView(page: string): Promise<void> {
    await this.trackEvent({
      type: 'page_view',
      page,
      userAgent: navigator.userAgent,
    });
  }

  // Usta görüntüleme
  async trackUstaView(ustaId: string): Promise<void> {
    await this.trackEvent({
      type: 'usta_view',
      ustaId,
      userAgent: navigator.userAgent,
    });
  }

  // Blog görüntüleme
  async trackBlogView(blogId: string): Promise<void> {
    await this.trackEvent({
      type: 'blog_view',
      blogId,
      userAgent: navigator.userAgent,
    });
  }

  // Arama
  async trackSearch(searchTerm: string): Promise<void> {
    await this.trackEvent({
      type: 'search',
      searchTerm,
      userAgent: navigator.userAgent,
    });
  }

  // İletişim
  async trackContact(ustaId?: string): Promise<void> {
    await this.trackEvent({
      type: 'contact',
      ustaId,
      userAgent: navigator.userAgent,
    });
  }

  // Basit event tracking
  async trackSimpleEvent(eventType: string): Promise<void> {
    await this.trackEvent({
      type: 'page_view', // Default type
      page: eventType,
      userAgent: navigator.userAgent,
    });
  }

  // Usta arama
  async trackUstaSearch(searchTerm: string): Promise<void> {
    await this.trackSearch(searchTerm);
  }

  // Usta arama
  async trackUstaCall(ustaId: string): Promise<void> {
    await this.trackContact(ustaId);
  }

  // Usta WhatsApp
  async trackUstaWhatsApp(ustaId: string): Promise<void> {
    await this.trackContact(ustaId);
  }

  // Usta email
  async trackUstaEmail(ustaId: string): Promise<void> {
    await this.trackContact(ustaId);
  }

  // Analytics istatistikleri getir
  async getAnalyticsStats(days: number = 30): Promise<AnalyticsStats> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const q = query(
        collection(db, this.collectionName),
        where('timestamp', '>=', Timestamp.fromDate(startDate)),
        orderBy('timestamp', 'desc'),
      );

      const querySnapshot = await getDocs(q);
      const events = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate(),
      })) as AnalyticsEvent[];

      return this.calculateStats(events);
    } catch (error) {
      console.error('Analytics verileri alınamadı:', error);
      return this.getEmptyStats();
    }
  }

  // İstatistikleri hesapla
  private calculateStats(events: AnalyticsEvent[]): AnalyticsStats {
    const totalViews = events.length;
    const pageViews = events.filter(e => e.type === 'page_view').length;
    const ustaViews = events.filter(e => e.type === 'usta_view').length;
    const blogViews = events.filter(e => e.type === 'blog_view').length;
    const searches = events.filter(e => e.type === 'search').length;
    const contacts = events.filter(e => e.type === 'contact').length;

    // En çok görüntülenen sayfalar
    const pageViewEvents = events.filter(e => e.type === 'page_view' && e.page);
    const pageCount: { [key: string]: number } = {};
    pageViewEvents.forEach(e => {
      if (e.page) {
        pageCount[e.page] = (pageCount[e.page] || 0) + 1;
      }
    });
    const topPages = Object.entries(pageCount)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // En çok görüntülenen ustalar
    const ustaViewEvents = events.filter(e => e.type === 'usta_view' && e.ustaId);
    const ustaCount: { [key: string]: number } = {};
    ustaViewEvents.forEach(e => {
      if (e.ustaId) {
        ustaCount[e.ustaId] = (ustaCount[e.ustaId] || 0) + 1;
      }
    });
    const topUstalar = Object.entries(ustaCount)
      .map(([ustaId, views]) => ({ ustaId, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // En çok görüntülenen bloglar
    const blogViewEvents = events.filter(e => e.type === 'blog_view' && e.blogId);
    const blogCount: { [key: string]: number } = {};
    blogViewEvents.forEach(e => {
      if (e.blogId) {
        blogCount[e.blogId] = (blogCount[e.blogId] || 0) + 1;
      }
    });
    const topBlogs = Object.entries(blogCount)
      .map(([blogId, views]) => ({ blogId, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Günlük istatistikler
    const dailyCount: { [key: string]: number } = {};
    events.forEach(e => {
      const date = e.timestamp.toISOString().split('T')[0];
      dailyCount[date] = (dailyCount[date] || 0) + 1;
    });
    const dailyStats = Object.entries(dailyCount)
      .map(([date, views]) => ({ date, views }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      totalViews,
      pageViews,
      ustaViews,
      blogViews,
      searches,
      contacts,
      topPages,
      topUstalar,
      topBlogs,
      dailyStats,
    };
  }

  // Boş istatistikler
  private getEmptyStats(): AnalyticsStats {
    return {
      totalViews: 0,
      pageViews: 0,
      ustaViews: 0,
      blogViews: 0,
      searches: 0,
      contacts: 0,
      topPages: [],
      topUstalar: [],
      topBlogs: [],
      dailyStats: [],
    };
  }

  // Session ID oluştur/al
  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  // Gerçek zamanlı görüntülenme sayısı getir
  async getRealTimeViewCount(type: 'total' | 'blog' | 'usta' = 'total'): Promise<number> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let q;
      if (type === 'total') {
        q = query(
          collection(db, this.collectionName),
          where('timestamp', '>=', Timestamp.fromDate(today)),
        );
      } else {
        q = query(
          collection(db, this.collectionName),
          where('type', '==', `${type}_view`),
          where('timestamp', '>=', Timestamp.fromDate(today)),
        );
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (error) {
      console.error('Gerçek zamanlı view count alınamadı:', error);
      return 0;
    }
  }

  // Popüler arama terimleri
  async getPopularSearchTerms(limit: number = 10): Promise<{ term: string; count: number }[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('type', '==', 'search'),
        orderBy('timestamp', 'desc'),
      );

      const querySnapshot = await getDocs(q);
      const searchEvents = querySnapshot.docs.map(doc => doc.data());
      
      const termCount: { [key: string]: number } = {};
      searchEvents.forEach(event => {
        if (event.searchTerm) {
          const term = event.searchTerm.toLowerCase();
          termCount[term] = (termCount[term] || 0) + 1;
        }
      });

      return Object.entries(termCount)
        .map(([term, count]) => ({ term, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
    } catch (error) {
      console.error('Popüler arama terimleri alınamadı:', error);
      return [];
    }
  }
}

export const analyticsService = new AnalyticsService();
export default analyticsService;
export type { AnalyticsEvent, AnalyticsStats };
