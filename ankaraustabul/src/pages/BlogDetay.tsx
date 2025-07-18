import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, Clock, Eye, Share2, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import { blogYazilari, blogKategorileri } from '../data';

const BlogDetay: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);

  useEffect(() => {
    if (slug) {
      const foundBlog = blogYazilari.find(b => b.slug === slug);
      setBlog(foundBlog);
      
      if (foundBlog) {
        // İlgili blog yazılarını bul
        const related = blogYazilari
          .filter(b => b.id !== foundBlog.id && 
                      (b.kategori === foundBlog.kategori || 
                       b.etiketler.some(tag => foundBlog.etiketler.includes(tag))))
          .slice(0, 3);
        setRelatedBlogs(related);
      }
    }
  }, [slug]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Yazısı Bulunamadı</h1>
          <Link to="/blog" className="btn-primary">Blog'a Dön</Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-primary-600">Ana Sayfa</Link>
            </li>
            <li className="flex items-center">
              <ArrowRight size={16} />
              <Link to="/blog" className="ml-2 hover:text-primary-600">Blog</Link>
            </li>
            <li className="flex items-center">
              <ArrowRight size={16} />
              <span className="ml-2 text-gray-900">{blog.kategori}</span>
            </li>
            <li className="flex items-center">
              <ArrowRight size={16} />
              <span className="ml-2 text-gray-900">{blog.baslik}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Ana İçerik */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Blog Resmi */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={blog.resim}
                  alt={blog.baslik}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Blog İçeriği */}
              <div className="p-8">
                {/* Kategori */}
                <div className="mb-4">
                  <span className="badge badge-primary">{blog.kategori}</span>
                </div>

                {/* Başlık */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {blog.baslik}
                </h1>

                {/* Meta Bilgiler */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{formatDate(blog.tarih)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>{blog.yazar}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>{blog.okumaSuresi} dakika okuma</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye size={16} />
                    <span>{blog.goruntulenme.toLocaleString()} görüntülenme</span>
                  </div>
                </div>

                {/* Özet */}
                <div className="mb-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h2 className="text-lg font-semibold text-blue-900 mb-2">Özet</h2>
                  <p className="text-blue-800">{blog.ozet}</p>
                </div>

                {/* İçerik */}
                <div className="prose prose-lg max-w-none">
                  {blog.icerik.map((bolum: any, index: number) => (
                    <div key={index} className="mb-8">
                      {bolum.baslik && (
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                          {bolum.baslik}
                        </h2>
                      )}
                      {bolum.paragraf && (
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {bolum.paragraf}
                        </p>
                      )}
                      {bolum.maddeListesi && (
                        <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                          {bolum.maddeListesi.map((madde: string, maddeIndex: number) => (
                            <li key={maddeIndex}>{madde}</li>
                          ))}
                        </ul>
                      )}
                      {bolum.altBaslik && (
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {bolum.altBaslik}
                        </h3>
                      )}
                      {bolum.altParagraf && (
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {bolum.altParagraf}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Sonuç */}
                {blog.sonuc && (
                  <div className="mt-8 p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h2 className="text-lg font-semibold text-green-900 mb-2">Sonuç</h2>
                    <p className="text-green-800">{blog.sonuc}</p>
                  </div>
                )}

                {/* Etiketler */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Etiketler</h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.etiketler.map((etiket: string, index: number) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {etiket}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Paylaş */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Paylaş</h3>
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Share2 size={16} />
                      <span>Facebook</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                      <Share2 size={16} />
                      <span>Twitter</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      <Share2 size={16} />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* İlgili Blog Yazıları */}
            {relatedBlogs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  İlgili <span className="gradient-text">Blog Yazıları</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedBlogs.map((relatedBlog) => (
                    <Link
                      key={relatedBlog.id}
                      to={`/blog/${relatedBlog.slug}`}
                      className="business-card hover-lift overflow-hidden"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedBlog.resim}
                          alt={relatedBlog.baslik}
                          className="w-full h-full object-cover image-hover"
                        />
                      </div>
                      <div className="p-4">
                        <span className="badge badge-primary text-xs">{relatedBlog.kategori}</span>
                        <h3 className="font-semibold text-gray-900 mt-2 mb-2 line-clamp-2">
                          {relatedBlog.baslik}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {relatedBlog.ozet}
                        </p>
                        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                          <span>{formatDate(relatedBlog.tarih)}</span>
                          <span>{relatedBlog.okumaSuresi} dk</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Kategoriler */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategoriler</h3>
                <div className="space-y-2">
                  {blogKategorileri.map((kategori) => (
                    <Link
                      key={kategori.id}
                      to={`/blog?kategori=${kategori.ad}`}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-700">{kategori.ad}</span>
                      <span className="text-sm text-gray-500">{kategori.yaziSayisi}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popüler Yazılar */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Popüler Yazılar</h3>
                <div className="space-y-4">
                  {blogYazilari
                    .sort((a, b) => b.goruntulenme - a.goruntulenme)
                    .slice(0, 5)
                    .map((populerBlog) => (
                      <Link
                        key={populerBlog.id}
                        to={`/blog/${populerBlog.slug}`}
                        className="block hover:bg-gray-50 p-2 rounded-lg transition-colors"
                      >
                        <h4 className="font-medium text-gray-900 line-clamp-2 mb-1">
                          {populerBlog.baslik}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{formatDate(populerBlog.tarih)}</span>
                          <span>{populerBlog.goruntulenme.toLocaleString()}</span>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>

              {/* SEO İçeriği */}
              <div className="bg-primary-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-4">
                  Ankara'da Usta Bulma
                </h3>
                <p className="text-primary-800 text-sm mb-4">
                  Ev ve işyeri bakımı, onarım ve hizmetler için güvenilir ustalar bulun.
                </p>
                <Link to="/ustalar" className="btn-primary w-full text-center">
                  Usta Ara
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetay; 