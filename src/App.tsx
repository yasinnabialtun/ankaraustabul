import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

// Safe lazy loading with better error handling
const createSafeLazyComponent = (importFn: () => Promise<any>) => {
  return lazy(() => 
    importFn().catch((error) => {
      console.error('Component loading error:', error);
      return Promise.resolve({ 
        default: () => (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="text-red-500 text-xl mb-4">⚠️</div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Sayfa Yüklenemedi</h2>
              <p className="text-gray-600 mb-4">Teknik bir sorun oluştu. Lütfen sayfayı yenileyin.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sayfayı Yenile
              </button>
            </div>
          </div>
        )
      });
    })
  );
};

// Lazy loading for pages with improved error handling
const Home = createSafeLazyComponent(() => import('./pages/Home'));
const Ustalar = createSafeLazyComponent(() => import('./pages/Ustalar'));
const UstaDetay = createSafeLazyComponent(() => import('./pages/UstaDetay'));
const UstaEkle = createSafeLazyComponent(() => import('./pages/UstaEkle'));
const Kategoriler = createSafeLazyComponent(() => import('./pages/Kategoriler'));
const Blog = createSafeLazyComponent(() => import('./pages/Blog'));
const AdminLogin = createSafeLazyComponent(() => import('./pages/AdminLogin'));
const AdminDashboard = createSafeLazyComponent(() => import('./pages/AdminDashboard'));
const NotFound = createSafeLazyComponent(() => import('./pages/NotFound'));

// Enhanced loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <span className="text-gray-600">Yükleniyor...</span>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="ustalar" element={<Ustalar />} />
              <Route path="usta/:id" element={<UstaDetay />} />
              <Route path="usta-ekle" element={<UstaEkle />} />
              <Route path="kategoriler" element={<Kategoriler />} />
              <Route path="blog" element={<Blog />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            
            {/* Admin Routes - Outside Layout */}
            <Route path="admin-login" element={<AdminLogin />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App; 