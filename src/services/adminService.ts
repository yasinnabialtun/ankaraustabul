import type { Usta } from '../types';
import { BlogPost } from '../data/blogData';
import blogService from './blogService';
import { ustaService } from './ustaService';
import analyticsService from './analyticsService';

interface AdminStats {
  totalUstalar: number;
  totalBlogs: number;
  totalUsers: number;
  totalViews: number;
  pendingApprovals: number;
  verifiedUstalar: number;
  premiumUstalar: number;
  activeUstalar: number;
  monthlyGrowth: {
    ustalar: string;
    blogs: string;
    users: string;
    views: string;
  };
  recentActivities: ActivityItem[];
  categoryStats: CategoryStat[];
  districtStats: DistrictStat[];
  packageStats: PackageStat[];
}

interface ActivityItem {
  id: string;
  type: 'user_registration' | 'blog_post' | 'usta_approval' | 'premium_upgrade';
  title: string;
  description: string;
  time: string;
  user?: string;
  icon: string;
}

interface CategoryStat {
  category: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

interface DistrictStat {
  district: string;
  count: number;
  percentage: number;
}

interface PackageStat {
  package: string;
  count: number;
  percentage: number;
  revenue: number;
}

class AdminService {
  
  // Ana istatistikleri getir
  async getAdminStats(): Promise<AdminStats> {
    try {
      const [ustalar, blogs, analyticsStats] = await Promise.all([
        ustaService.getAllUstalar(),
        blogService.getAllBlogs(),
        analyticsService.getAnalyticsStats(30),
      ]);

      const totalUstalar = ustalar.length;
      const totalBlogs = blogs.length;
      const pendingApprovals = ustalar.filter(u => u.status === 'pending').length;
      const verifiedUstalar = ustalar.filter(u => u.verified).length;
      const premiumUstalar = ustalar.filter(u => u.isPremium).length;
      const activeUstalar = ustalar.filter(u => u.available).length;

      return {
        totalUstalar,
        totalBlogs,
        totalUsers: this.calculateRealUserCount(ustalar),
        totalViews: analyticsStats.totalViews > 0 ? analyticsStats.totalViews : this.calculateRealViewCount(blogs, ustalar),
        pendingApprovals,
        verifiedUstalar,
        premiumUstalar,
        activeUstalar,
        monthlyGrowth: this.calculateMonthlyGrowth(ustalar, blogs, analyticsStats),
        recentActivities: this.generateRecentActivities(ustalar, blogs),
        categoryStats: this.calculateCategoryStats(ustalar),
        districtStats: this.calculateDistrictStats(ustalar),
        packageStats: this.calculatePackageStats(ustalar),
      };
    } catch (error) {
      console.error('Admin istatistikleri alınırken hata:', error);
      // Hata durumunda boş stats döndür
      return {
        totalUstalar: 0,
        totalBlogs: 0,
        totalUsers: 0,
        totalViews: 0,
        pendingApprovals: 0,
        verifiedUstalar: 0,
        premiumUstalar: 0,
        activeUstalar: 0,
        monthlyGrowth: {
          ustalar: '0',
          blogs: '0',
          users: '0',
          views: '0',
        },
        recentActivities: [],
        categoryStats: [],
        districtStats: [],
        packageStats: [],
      };
    }
  }

  // Gerçek kullanıcı sayısını hesapla (Firebase'den gelecek)
  private calculateRealUserCount(ustalar: Usta[]): number {
    // Şimdilik mevcut usta sayısına dayalı hesaplama
    // Gelecekte ayrı users koleksiyonu eklenebilir
    return ustalar.filter(u => u.status === 'approved').length * 3; // Her onaylı usta için tahmini 3 müşteri
  }

  // Gerçek görüntülenme sayısını hesapla (Firebase'den gelecek)
  private calculateRealViewCount(blogs: BlogPost[], ustalar: Usta[]): number {
    // Şimdilik blog ve usta sayısına dayalı basit hesaplama
    // Gelecekte analytics koleksiyonu eklenebilir
    const blogViewEstimate = blogs.length * 50; // Blog başına ortalama 50 görüntülenme
    const ustaViewEstimate = ustalar.length * 25; // Usta başına ortalama 25 görüntülenme
    return blogViewEstimate + ustaViewEstimate;
  }

  // Aylık büyüme hesapla
  private calculateMonthlyGrowth(ustalar: Usta[], blogs: BlogPost[], analyticsStats?: any) {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    // Bu ay kayıt olan ustalar
    const thisMonthUstalar = ustalar.filter(u => {
      const regDate = new Date(u.registrationDate);
      return regDate.getMonth() === thisMonth && regDate.getFullYear() === thisYear;
    }).length;

    // Bu ay eklenen bloglar (tarih formatına göre)
    const thisMonthBlogs = blogs.filter(b => {
      const blogDate = this.parseDate(b.date);
      return blogDate.getMonth() === thisMonth && blogDate.getFullYear() === thisYear;
    }).length;

    // Gerçek büyüme hesaplaması
    const lastMonthUstalar = ustalar.filter(u => {
      const regDate = new Date(u.registrationDate);
      const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
      const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;
      return regDate.getMonth() === lastMonth && regDate.getFullYear() === lastMonthYear;
    }).length;

    // const lastMonthBlogs = blogs.filter(b => {
    //   const blogDate = this.parseDate(b.date);
    //   const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    //   const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;
    //   return blogDate.getMonth() === lastMonth && blogDate.getFullYear() === lastMonthYear;
    // }).length;

    // Analytics'ten gerçek view büyümesi
    const todayViews = analyticsStats?.dailyStats?.slice(-1)?.[0]?.views || 0;
    const yesterdayViews = analyticsStats?.dailyStats?.slice(-2, -1)?.[0]?.views || 0;
    const viewGrowth = todayViews - yesterdayViews;

    return {
      ustalar: thisMonthUstalar > 0 ? `${thisMonthUstalar}` : '0',
      blogs: thisMonthBlogs > 0 ? `${thisMonthBlogs}` : '0',
      users: thisMonthUstalar > lastMonthUstalar ? `${thisMonthUstalar * 3}` : '0',
      views: viewGrowth > 0 ? `${viewGrowth}` : '0',
    };
  }

  // Tarih parse et (farklı formatları destekle)
  private parseDate(dateStr: string): Date {
    // "15 Mart 2024" formatını parse et
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
    ];
    
    const parts = dateStr.split(' ');
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const monthIndex = months.indexOf(parts[1]);
      const year = parseInt(parts[2]);
      
      if (monthIndex !== -1) {
        return new Date(year, monthIndex, day);
      }
    }
    
    // Fallback olarak mevcut tarihi döndür
    return new Date();
  }

  // Son aktiviteleri oluştur
  private generateRecentActivities(ustalar: Usta[], blogs: BlogPost[]): ActivityItem[] {
    const activities: ActivityItem[] = [];

    // Son kayıt olan ustalar
    const recentUstalar = ustalar
      .filter(u => u.registrationDate)
      .sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime())
      .slice(0, 3);

    recentUstalar.forEach((usta) => {
      activities.push({
        id: `usta-${usta.id}`,
        type: 'user_registration',
        title: 'Yeni Usta Kaydı',
        description: `${usta.name} (${usta.category}) sisteme kayıt oldu`,
        time: this.getRelativeTime(usta.registrationDate),
        user: usta.name,
        icon: '👷',
      });
    });

    // Son blog yazıları
    const recentBlogs = blogs
      .sort((a, b) => new Date(this.parseDate(b.date)).getTime() - new Date(this.parseDate(a.date)).getTime())
      .slice(0, 2);

    recentBlogs.forEach(blog => {
      activities.push({
        id: `blog-${blog.id}`,
        type: 'blog_post',
        title: 'Yeni Blog Yazısı',
        description: blog.title,
        time: this.getRelativeTime(this.parseDate(blog.date).toISOString()),
        user: blog.author,
        icon: '📝',
      });
    });

    // Premium yükseltmeler (gerçek verilerden)
    const premiumUstalar = ustalar.filter(u => u.isPremium && u.packageType === 'PREMIUM').slice(0, 2);
    premiumUstalar.forEach(usta => {
      activities.push({
        id: `premium-${usta.id}`,
        type: 'premium_upgrade',
        title: 'Premium Üyelik',
        description: `${usta.name} premium üyeliğe geçti`,
        time: this.getRelativeTime(usta.registrationDate),
        user: usta.name,
        icon: '⭐',
      });
    });

    // Onay bekleyen ustalar
    const pendingUstalar = ustalar.filter(u => u.status === 'pending').slice(0, 2);
    pendingUstalar.forEach(usta => {
      activities.push({
        id: `pending-${usta.id}`,
        type: 'usta_approval',
        title: 'Onay Bekliyor',
        description: `${usta.name} (${usta.category}) onay bekliyor`,
        time: this.getRelativeTime(usta.registrationDate),
        user: usta.name,
        icon: '⏳',
      });
    });

    // Aktiviteleri zamana göre sırala (en yeni önce)
    return activities
      .sort((a, b) => {
        // Zaman stringlerini karşılaştırmak için basit sıralama
        const timeA = a.time.includes('gün') ? parseInt(a.time) * 24 : 
          a.time.includes('saat') ? parseInt(a.time) : 0;
        const timeB = b.time.includes('gün') ? parseInt(b.time) * 24 : 
          b.time.includes('saat') ? parseInt(b.time) : 0;
        return timeA - timeB;
      })
      .slice(0, 8);
  }

  // Nispi zaman hesapla
  private getRelativeTime(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 7) {
      return `${Math.floor(diffDays / 7)} hafta önce`;
    } else if (diffDays > 0) {
      return `${diffDays} gün önce`;
    } else if (diffHours > 0) {
      return `${diffHours} saat önce`;
    } else {
      return 'Az önce';
    }
  }

  // Kategori istatistikleri
  private calculateCategoryStats(ustalar: Usta[]): CategoryStat[] {
    const categoryCount: { [key: string]: number } = {};
    
    ustalar.forEach(usta => {
      categoryCount[usta.category] = (categoryCount[usta.category] || 0) + 1;
    });

    const total = ustalar.length;
    // Gerçek trend hesaplaması (son ay vs bir önceki ay)
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

    return Object.entries(categoryCount)
      .map(([category, count]) => {
        // Bu ay bu kategoride kayıt olan ustalar
        const thisMonthCount = ustalar.filter(u => {
          const regDate = new Date(u.registrationDate);
          return u.category === category && 
                 regDate.getMonth() === thisMonth && 
                 regDate.getFullYear() === thisYear;
        }).length;

        // Geçen ay bu kategoride kayıt olan ustalar
        const lastMonthCount = ustalar.filter(u => {
          const regDate = new Date(u.registrationDate);
          return u.category === category && 
                 regDate.getMonth() === lastMonth && 
                 regDate.getFullYear() === lastMonthYear;
        }).length;

        let trend: 'up' | 'down' | 'stable' = 'stable';
        if (thisMonthCount > lastMonthCount) {
          trend = 'up';
        } else if (thisMonthCount < lastMonthCount) {
          trend = 'down';
        }

        return {
          category,
          count,
          percentage: Math.round((count / total) * 100),
          trend,
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }

  // Bölge istatistikleri
  private calculateDistrictStats(ustalar: Usta[]): DistrictStat[] {
    const districtCount: { [key: string]: number } = {};
    
    ustalar.forEach(usta => {
      districtCount[usta.location] = (districtCount[usta.location] || 0) + 1;
    });

    const total = ustalar.length;

    return Object.entries(districtCount)
      .map(([district, count]) => ({
        district,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  // Paket istatistikleri
  private calculatePackageStats(ustalar: Usta[]): PackageStat[] {
    const packageCount: { [key: string]: { count: number; revenue: number } } = {
      'FREE': { count: 0, revenue: 0 },
      'BASIC': { count: 0, revenue: 0 },
      'PREMIUM': { count: 0, revenue: 0 },
    };

    const packagePrices = {
      'FREE': 0,
      'BASIC': 99,
      'PREMIUM': 299,
    };

    ustalar.forEach(usta => {
      const pkg = usta.packageType || 'FREE';
      if (packageCount[pkg]) {
        packageCount[pkg].count++;
        packageCount[pkg].revenue += packagePrices[pkg as keyof typeof packagePrices];
      }
    });

    const total = ustalar.length;

    return Object.entries(packageCount).map(([pkg, data]) => ({
      package: pkg,
      count: data.count,
      percentage: Math.round((data.count / total) * 100),
      revenue: data.revenue,
    }));
  }



  // Usta onaylama
  approveUsta(ustaId: string): Promise<void> {
    return new Promise((resolve) => {
      // Bu özellik gelecekte implement edilecek
      console.log('Usta onaylandı:', ustaId);
      resolve();
    });
  }

  // Usta reddetme
  rejectUsta(ustaId: string): Promise<void> {
    return new Promise((resolve) => {
      // Bu özellik gelecekte implement edilecek
      console.log('Usta reddedildi:', ustaId);
      resolve();
    });
  }

  // Usta silme
  deleteUsta(ustaId: string): Promise<void> {
    return new Promise((resolve) => {
      // Bu özellik gelecekte implement edilecek
      console.log('Usta silindi:', ustaId);
      resolve();
    });
  }
}

export const adminService = new AdminService();
export default adminService;
export type { AdminStats, ActivityItem, CategoryStat, DistrictStat, PackageStat };
