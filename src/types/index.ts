// Core Types
export interface Usta {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  location: string;
  district: string;
  districtId: string;
  experience: number;
  price: number;
  hourlyRate: string;
  availability: string;
  specialties: string[];
  skills?: string[]; // Added for better search
  completedJobs: number;
  responseTime: string;
  verified: boolean;
  available: boolean;
  phone: string;
  email: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  isPremium: boolean;
  premiumFeatures?: string[];
  premiumBadge?: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  registrationDate: string;
  description: string;
  rating: number;
  image?: string;
  gallery?: string[]; // Multiple images
  reviewCount: number;
  contactCount: number; // Track contact attempts
  viewCount: number; // Track profile views
  isVerified: boolean;
  verificationDocuments?: {
    idCard?: string;
    businessLicense?: string;
    certificates?: string[];
  };
  packageType: 'FREE' | 'BASIC' | 'PREMIUM' | 'PRO';
  packageExpiry?: Date;
  workingHours: {
    monday?: { start: string; end: string; isWorking: boolean };
    tuesday?: { start: string; end: string; isWorking: boolean };
    wednesday?: { start: string; end: string; isWorking: boolean };
    thursday?: { start: string; end: string; isWorking: boolean };
    friday?: { start: string; end: string; isWorking: boolean };
    saturday?: { start: string; end: string; isWorking: boolean };
    sunday?: { start: string; end: string; isWorking: boolean };
  };
  serviceArea: string[]; // Areas they serve
  emergencyService: boolean;
  languages: string[];
  certifications: string[];
  insurance: {
    hasInsurance: boolean;
    provider?: string;
    expiryDate?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  lastActive?: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  slug: string;
  isActive: boolean;
  order: number;
  parentId?: string; // For subcategories
  subcategories?: Category[];
  ustaCount?: number;
  averagePrice?: number;
  popularKeywords?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface District {
  id: string;
  name: string;
  cityId: string;
  isActive: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  postalCodes?: string[];
  neighborhoods?: string[];
  ustaCount?: number;
  averageResponseTime?: string;
}

export interface Review {
  id: string;
  ustaId: string;
  customerName: string;
  customerEmail?: string;
  rating: number;
  comment: string;
  serviceDate: Date;
  verified: boolean;
  helpful: number;
  serviceType: string;
  photos?: string[];
  response?: {
    text: string;
    date: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  authorImage?: string;
  image: string;
  tags: string[];
  category: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  viewCount: number;
  likeCount: number;
  shareCount: number;
  readingTime: number; // in minutes
  seoTitle?: string;
  seoDescription?: string;
  slug: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'moderator' | 'super_admin';
  name: string;
  avatar?: string;
  phone?: string;
  permissions: string[];
  lastLogin?: Date;
  isActive: boolean;
  preferences?: {
    language: string;
    theme: 'light' | 'dark' | 'auto';
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactRequest {
  id: string;
  ustaId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  message: string;
  serviceType: string;
  preferredContactTime?: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  source: 'website' | 'mobile' | 'phone' | 'referral';
  createdAt: Date;
  updatedAt: Date;
}

// Firebase Types
export interface PaginatedQuery {
  data: Usta[];
  lastDoc: any;
  hasMore: boolean;
}

// Enhanced Form Types
export interface UstaFormData {
  name: string;
  phone: string;
  email: string;
  website?: string;
  categoryId: string;
  districtId: string;
  description: string;
  experience: number;
  services: string[];
  skills: string[];
  workingHours: {
    monday: { start: string; end: string; isWorking: boolean };
    tuesday: { start: string; end: string; isWorking: boolean };
    wednesday: { start: string; end: string; isWorking: boolean };
    thursday: { start: string; end: string; isWorking: boolean };
    friday: { start: string; end: string; isWorking: boolean };
    saturday: { start: string; end: string; isWorking: boolean };
    sunday: { start: string; end: string; isWorking: boolean };
  };
  location: {
    address: string;
    serviceArea: string[];
  };
  pricing: {
    hourlyRate: number;
    minimumCharge: number;
    emergencyRate?: number;
  };
  emergencyService: boolean;
  languages: string[];
  certifications: string[];
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  insurance: {
    hasInsurance: boolean;
    provider?: string;
    expiryDate?: Date;
  };
}

export interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  image: string;
  tags: string[];
  category: string;
  status: 'draft' | 'published';
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  slug?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: Date;
  requestId?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Enhanced Search & Filter Types
export interface SearchFilters {
  query?: string;
  categoryId?: string;
  districtId?: string;
  rating?: number;
  isPremium?: boolean;
  isVerified?: boolean;
  emergencyService?: boolean;
  languages?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  availability?: {
    date?: Date;
    time?: string;
  };
  sortBy?: 'rating' | 'price' | 'distance' | 'experience' | 'recent';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams {
  q?: string;
  category?: string;
  district?: string;
  rating?: string;
  premium?: string;
  verified?: string;
  emergency?: string;
  languages?: string;
  priceMin?: string;
  priceMax?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  limit?: string;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  facets: {
    categories: { id: string; name: string; count: number }[];
    districts: { id: string; name: string; count: number }[];
    priceRanges: { min: number; max: number; count: number }[];
    ratings: { value: number; count: number }[];
  };
  suggestions: string[];
  searchTime: number;
}

// Component Props Types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  rounded?: boolean;
  shadow?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  elevation?: number;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  borderColor?: string;
  background?: string;
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  dot?: boolean;
  outline?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

// Hook Types
export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  triggerOnce?: boolean;
}

export interface UseDebounceOptions {
  delay?: number;
  leading?: boolean;
  trailing?: boolean;
}

export interface UseLocalStorageOptions {
  serializer?: {
    parse: (value: string) => any;
    stringify: (value: any) => string;
  };
}

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  structured?: object;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
  sessionId?: string;
  timestamp?: Date;
  source?: string;
}

export interface PerformanceMetrics {
  page: string;
  loadTime: number;
  firstPaint?: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
  firstInputDelay?: number;
  timestamp: Date;
}

// State Management Types
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: ToastProps[];
  loading: {
    global: boolean;
    components: { [key: string]: boolean };
  };
  cache: {
    ustalar: Usta[];
    categories: Category[];
    districts: District[];
    lastUpdated: { [key: string]: Date };
  };
  preferences: {
    searchFilters: SearchFilters;
    sortPreferences: SortOption;
    viewMode: 'grid' | 'list';
    itemsPerPage: number;
  };
}

// Utility Types
export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface LoadingState {
  status: Status;
  error?: string;
  retryCount?: number;
  lastRetry?: Date;
}

export type SortOrder = 'asc' | 'desc';

export interface SortOption {
  field: string;
  order: SortOrder;
  label?: string;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Form Validation Types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  custom?: (value: any) => string | null;
}

export interface ValidationError {
  field: string;
  message: string;
  type: string;
}

export interface FormState {
  values: { [key: string]: any };
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
  isValid: boolean;
  isSubmitting: boolean;
  submitCount: number;
}

// Feature Flags
export interface FeatureFlags {
  enableReviews: boolean;
  enableChat: boolean;
  enableBooking: boolean;
  enablePayments: boolean;
  enableNotifications: boolean;
  enableAnalytics: boolean;
  enablePWA: boolean;
  enableDarkMode: boolean;
  enableMultiLanguage: boolean;
  enableVideoCall: boolean;
  enableAI: boolean;
}

// Event Types
export interface CustomEvent {
  type: string;
  payload?: any;
  timestamp: Date;
  source: string;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  stack?: string;
  userId?: string;
  sessionId?: string;
  url?: string;
  userAgent?: string;
}

// Responsive Types
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ResponsiveValue<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

// Theme Types
export interface ThemeColors {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  success: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  warning: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  error: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  gray: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
}