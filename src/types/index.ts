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
  packageType: 'BASIC' | 'PREMIUM';
  status: 'pending' | 'approved' | 'rejected';
  transactionId: string;
  registrationDate: string;
  amount: number;
  // Yeni öne çıkma özellikleri
  isFeatured?: boolean;
  featuredUntil?: string;
  whatsappEnabled?: boolean;
  whatsappNumber?: string;
  priorityRank?: number;
  specialBadges?: string[];
  profileViews?: number;
  contactClicks?: number;
  rating?: number;
  reviewCount?: number;
  lastActive?: string;
  responseTime?: number; // dakika cinsinden
  availability?: 'available' | 'busy' | 'unavailable';
  workingHours?: {
    start: string;
    end: string;
    days: string[];
  };
  emergencyService?: boolean;
  instantBooking?: boolean;
  verifiedBadge?: boolean;
  premiumProfile?: boolean;
}

export interface FeaturedUsta extends UstaData {
  featuredReason?: string;
  featuredPackage?: 'BASIC' | 'PREMIUM';
  featuredStartDate?: string;
  featuredEndDate?: string;
  featuredStats?: {
    views: number;
    contacts: number;
    bookings: number;
    revenue: number;
  };
}

export interface UstaStats {
  totalUstalar: number;
  featuredUstalar: number;
  activeUstalar: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  popularCategories: string[];
  topPerformingUstalar: UstaData[];
}

export interface SearchFilters {
  category?: string;
  location?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  availability?: 'available' | 'busy' | 'unavailable';
  emergencyService?: boolean;
  instantBooking?: boolean;
  verifiedOnly?: boolean;
  featuredOnly?: boolean;
  sortBy?: 'rating' | 'price' | 'experience' | 'distance' | 'featured';
  sortOrder?: 'asc' | 'desc';
}

export interface Kategori {
  id: string;
  name: string;
  description: string;
  icon: string;
  ustalar: Usta[];
  image?: string;
  popularServices?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  image?: string;
} 