import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Kategoriler from './pages/Kategoriler';
import KategoriDetay from './pages/KategoriDetay';
import Ustalar from './pages/Ustalar';
import UstaDetay from './pages/UstaDetay';
import UstaEkle from './pages/UstaEkle';
import Blog from './pages/Blog';
import BlogDetay from './pages/BlogDetay';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="kategoriler" element={<Kategoriler />} />
          <Route path="kategori/:kategori" element={<KategoriDetay />} />
          <Route path="ustalar" element={<Ustalar />} />
          <Route path="usta/:id" element={<UstaDetay />} />
          <Route path="usta-ekle" element={<UstaEkle />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogDetay />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;