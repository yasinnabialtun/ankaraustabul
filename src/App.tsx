import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { muiTheme } from './theme/muiTheme';
import Layout from './components/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorFallback from './components/ErrorBoundary';
import { ToastProvider } from './components/ui/Toast';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const Ustalar = React.lazy(() => import('./pages/Ustalar'));
const UstaDetay = React.lazy(() => import('./pages/UstaDetay'));
const UstaEkle = React.lazy(() => import('./pages/UstaEkle'));
const Kategoriler = React.lazy(() => import('./pages/Kategoriler'));
const KategoriDetay = React.lazy(() => import('./pages/KategoriDetay'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogDetail = React.lazy(() => import('./pages/BlogDetail'));
const Iletisim = React.lazy(() => import('./pages/Iletisim'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Admin pages
const AdminLayout = React.lazy(() => import('./components/layout/AdminLayout'));
const AdminDashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const AdminUstalar = React.lazy(() => import('./pages/admin/Ustalar'));
const AdminBlog = React.lazy(() => import('./pages/admin/Blog'));
const BlogEditor = React.lazy(() => import('./pages/BlogEditor'));

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ToastProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Layout>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/ustalar" element={<Ustalar />} />
                  <Route path="/usta/:id" element={<UstaDetay />} />
                  <Route path="/usta-ekle" element={<UstaEkle />} />
                  <Route path="/kategoriler" element={<Kategoriler />} />
                  <Route path="/kategori/:id" element={<KategoriDetay />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogDetail />} />
                  <Route path="/iletisim" element={<Iletisim />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="ustalar" element={<AdminUstalar />} />
                    <Route path="blog" element={<AdminBlog />} />
                    <Route path="blog/editor" element={<BlogEditor />} />
                    <Route path="blog/editor/:id" element={<BlogEditor />} />
                  </Route>
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Layout>
          </ErrorBoundary>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App; 