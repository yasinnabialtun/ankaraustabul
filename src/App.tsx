import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';

// Lazy loading for pages
const Home = lazy(() => import('./pages/Home'));
const Ustalar = lazy(() => import('./pages/Ustalar'));
const UstaDetay = lazy(() => import('./pages/UstaDetay'));
const UstaEkle = lazy(() => import('./pages/UstaEkle'));
const Kategoriler = lazy(() => import('./pages/Kategoriler'));
const KategoriDetay = lazy(() => import('./pages/KategoriDetay'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetay = lazy(() => import('./pages/BlogDetay'));
const BlogElektrik = lazy(() => import('./pages/BlogElektrik'));
const BlogSuTesisati = lazy(() => import('./pages/BlogSuTesisati'));
const BlogTemizlik = lazy(() => import('./pages/BlogTemizlik'));
const BlogMobilya = lazy(() => import('./pages/BlogMobilya'));
const BlogAnkaraGenel = lazy(() => import('./pages/BlogAnkaraGenel'));
const BlogAnkaraIlceler = lazy(() => import('./pages/BlogAnkaraIlceler'));
const BlogAnkaraMevsimsel = lazy(() => import('./pages/BlogAnkaraMevsimsel'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="ustalar" element={<Ustalar />} />
            <Route path="usta/:id" element={<UstaDetay />} />
            <Route path="usta-ekle" element={<UstaEkle />} />
            <Route path="kategoriler" element={<Kategoriler />} />
            <Route path="kategori/:id" element={<KategoriDetay />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogDetay />} />
            <Route path="blog/elektrik" element={<BlogElektrik />} />
            <Route path="blog/su-tesisati" element={<BlogSuTesisati />} />
            <Route path="blog/temizlik" element={<BlogTemizlik />} />
            <Route path="blog/mobilya" element={<BlogMobilya />} />
            <Route path="blog/ankara-genel" element={<BlogAnkaraGenel />} />
            <Route path="blog/ankara-ilceler" element={<BlogAnkaraIlceler />} />
            <Route path="blog/ankara-mevsimsel" element={<BlogAnkaraMevsimsel />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          
          {/* Admin Routes - Outside Layout */}
          <Route path="admin-login" element={<AdminLogin />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
