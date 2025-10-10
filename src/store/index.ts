import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Usta, Category, District, User, SearchFilters, ToastProps } from '../types';

interface AppState {
  // User and Auth
  user: User | null;
  isAuthenticated: boolean;
  
  // UI State
  theme: 'light' | 'dark' | 'auto';
  language: 'tr' | 'en';
  isLoading: boolean;
  isMobile: boolean;
  
  // Data Cache
  ustalar: Usta[];
  categories: Category[];
  districts: District[];
  
  // Search and Filters
  searchQuery: string;
  searchFilters: SearchFilters;
  searchResults: Usta[];
  isSearching: boolean;
  
  // Notifications
  toasts: ToastProps[];
  
  // Pagination
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  
  // View Settings
  viewMode: 'grid' | 'list';
  sortBy: 'rating' | 'price' | 'experience' | 'recent';
  sortOrder: 'asc' | 'desc';
}

interface AppActions {
  // Auth Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuth: boolean) => void;
  logout: () => void;
  
  // UI Actions
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  setLanguage: (lang: 'tr' | 'en') => void;
  setLoading: (loading: boolean) => void;
  setMobile: (isMobile: boolean) => void;
  
  // Data Actions
  setUstalar: (ustalar: Usta[]) => void;
  addUsta: (usta: Usta) => void;
  updateUsta: (id: string, updates: Partial<Usta>) => void;
  removeUsta: (id: string) => void;
  setCategories: (categories: Category[]) => void;
  setDistricts: (districts: District[]) => void;
  
  // Search Actions
  setSearchQuery: (query: string) => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  clearSearchFilters: () => void;
  setSearchResults: (results: Usta[]) => void;
  setSearching: (isSearching: boolean) => void;
  
  // Toast Actions
  addToast: (toast: Omit<ToastProps, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  
  // Pagination Actions
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
  setTotalItems: (total: number) => void;
  
  // View Actions
  setViewMode: (mode: 'grid' | 'list') => void;
  setSortBy: (sortBy: 'rating' | 'price' | 'experience' | 'recent') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  
  // Utility Actions
  resetState: () => void;
}

type Store = AppState & AppActions;

const initialState: AppState = {
  // User and Auth
  user: null,
  isAuthenticated: false,
  
  // UI State
  theme: 'light',
  language: 'tr',
  isLoading: false,
  isMobile: false,
  
  // Data Cache
  ustalar: [],
  categories: [],
  districts: [],
  
  // Search and Filters
  searchQuery: '',
  searchFilters: {},
  searchResults: [],
  isSearching: false,
  
  // Notifications
  toasts: [],
  
  // Pagination
  currentPage: 1,
  itemsPerPage: 12,
  totalItems: 0,
  
  // View Settings
  viewMode: 'grid',
  sortBy: 'rating',
  sortOrder: 'desc',
};

export const useAppStore = create<Store>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      // Auth Actions
      setUser: (user: User | null) => set({ user }, false, 'setUser'),
      setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }, false, 'setAuthenticated'),
      logout: () => set({ user: null, isAuthenticated: false }, false, 'logout'),
      
      // UI Actions
      setTheme: (theme: 'light' | 'dark' | 'auto') => {
        set({ theme }, false, 'setTheme');
        if (typeof window !== 'undefined') {
          localStorage.setItem('theme', theme);
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else if (theme === 'light') {
            document.documentElement.classList.remove('dark');
          } else {
            // Auto theme
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (isDark) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }
        }
      },
      setLanguage: (language: 'tr' | 'en') => {
        set({ language }, false, 'setLanguage');
        if (typeof window !== 'undefined') {
          localStorage.setItem('language', language);
        }
      },
      setLoading: (isLoading: boolean) => set({ isLoading }, false, 'setLoading'),
      setMobile: (isMobile: boolean) => set({ isMobile }, false, 'setMobile'),
      
      // Data Actions
      setUstalar: (ustalar: Usta[]) => set({ ustalar }, false, 'setUstalar'),
      addUsta: (usta: Usta) => {
        const { ustalar } = get();
        set({ ustalar: [...ustalar, usta] }, false, 'addUsta');
      },
      updateUsta: (id: string, updates: Partial<Usta>) => {
        const { ustalar } = get();
        const updatedUstalar = ustalar.map((usta: Usta) => 
          usta.id === id ? { ...usta, ...updates } : usta
        );
        set({ ustalar: updatedUstalar }, false, 'updateUsta');
      },
      removeUsta: (id: string) => {
        const { ustalar } = get();
        const filteredUstalar = ustalar.filter((usta: Usta) => usta.id !== id);
        set({ ustalar: filteredUstalar }, false, 'removeUsta');
      },
      setCategories: (categories: Category[]) => set({ categories }, false, 'setCategories'),
      setDistricts: (districts: District[]) => set({ districts }, false, 'setDistricts'),
      
      // Search Actions
      setSearchQuery: (searchQuery: string) => set({ searchQuery }, false, 'setSearchQuery'),
      setSearchFilters: (filters: Partial<SearchFilters>) => {
        const { searchFilters } = get();
        set({ searchFilters: { ...searchFilters, ...filters } }, false, 'setSearchFilters');
      },
      clearSearchFilters: () => set({ searchFilters: {} }, false, 'clearSearchFilters'),
      setSearchResults: (searchResults: Usta[]) => set({ searchResults }, false, 'setSearchResults'),
      setSearching: (isSearching: boolean) => set({ isSearching }, false, 'setSearching'),
      
      // Toast Actions
      addToast: (toast: Omit<ToastProps, 'id'>) => {
        const id = Date.now().toString();
        const newToast = { ...toast, id };
        const { toasts } = get();
        set({ toasts: [...toasts, newToast] }, false, 'addToast');
        
        // Auto remove toast after duration
        const duration = toast.duration || 5000;
        setTimeout(() => {
          get().removeToast(id);
        }, duration);
      },
      removeToast: (id: string) => {
        const { toasts } = get();
        const filteredToasts = toasts.filter((toast: ToastProps) => toast.id !== id);
        set({ toasts: filteredToasts }, false, 'removeToast');
      },
      clearToasts: () => set({ toasts: [] }, false, 'clearToasts'),
      
      // Pagination Actions
      setCurrentPage: (currentPage: number) => set({ currentPage }, false, 'setCurrentPage'),
      setItemsPerPage: (itemsPerPage: number) => set({ itemsPerPage }, false, 'setItemsPerPage'),
      setTotalItems: (totalItems: number) => set({ totalItems }, false, 'setTotalItems'),
      
      // View Actions
      setViewMode: (viewMode: 'grid' | 'list') => {
        set({ viewMode }, false, 'setViewMode');
        if (typeof window !== 'undefined') {
          localStorage.setItem('viewMode', viewMode);
        }
      },
      setSortBy: (sortBy: 'rating' | 'price' | 'experience' | 'recent') => set({ sortBy }, false, 'setSortBy'),
      setSortOrder: (sortOrder: 'asc' | 'desc') => set({ sortOrder }, false, 'setSortOrder'),
      
      // Utility Actions
      resetState: () => set(initialState, false, 'resetState'),
    }),
    {
      name: 'ankara-usta-bul-store',
      version: 1,
    }
  ),
);

// Selectors for better performance
export const useAuth = () => useAppStore((state: Store) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  setUser: state.setUser,
  setAuthenticated: state.setAuthenticated,
  logout: state.logout,
}));

export const useUI = () => useAppStore((state: Store) => ({
  theme: state.theme,
  language: state.language,
  isLoading: state.isLoading,
  isMobile: state.isMobile,
  setTheme: state.setTheme,
  setLanguage: state.setLanguage,
  setLoading: state.setLoading,
  setMobile: state.setMobile,
}));

export const useData = () => useAppStore((state: Store) => ({
  ustalar: state.ustalar,
  categories: state.categories,
  districts: state.districts,
  setUstalar: state.setUstalar,
  addUsta: state.addUsta,
  updateUsta: state.updateUsta,
  removeUsta: state.removeUsta,
  setCategories: state.setCategories,
  setDistricts: state.setDistricts,
}));

export const useSearch = () => useAppStore((state: Store) => ({
  searchQuery: state.searchQuery,
  searchFilters: state.searchFilters,
  searchResults: state.searchResults,
  isSearching: state.isSearching,
  setSearchQuery: state.setSearchQuery,
  setSearchFilters: state.setSearchFilters,
  clearSearchFilters: state.clearSearchFilters,
  setSearchResults: state.setSearchResults,
  setSearching: state.setSearching,
}));

export const useToasts = () => {
  const store = useAppStore((state: Store) => ({
    toasts: state.toasts,
    addToast: state.addToast,
    removeToast: state.removeToast,
    clearToasts: state.clearToasts,
  }));
  
  return {
    ...store,
    getState: useAppStore.getState,
  };
};

export const usePagination = () => useAppStore((state: Store) => ({
  currentPage: state.currentPage,
  itemsPerPage: state.itemsPerPage,
  totalItems: state.totalItems,
  setCurrentPage: state.setCurrentPage,
  setItemsPerPage: state.setItemsPerPage,
  setTotalItems: state.setTotalItems,
}));

export const useViewSettings = () => useAppStore((state: Store) => ({
  viewMode: state.viewMode,
  sortBy: state.sortBy,
  sortOrder: state.sortOrder,
  setViewMode: state.setViewMode,
  setSortBy: state.setSortBy,
  setSortOrder: state.setSortOrder,
}));

// Initialize store with saved preferences
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'auto' || 'light';
  const savedLanguage = localStorage.getItem('language') as 'tr' | 'en' || 'tr';
  const savedViewMode = localStorage.getItem('viewMode') as 'grid' | 'list' || 'grid';
  
  useAppStore.getState().setTheme(savedTheme);
  useAppStore.getState().setLanguage(savedLanguage);
  useAppStore.getState().setViewMode(savedViewMode);
  
  // Set mobile state
  const checkMobile = () => {
    const isMobile = window.innerWidth < 768;
    useAppStore.getState().setMobile(isMobile);
  };
  
  checkMobile();
  window.addEventListener('resize', checkMobile);
}

export default useAppStore;