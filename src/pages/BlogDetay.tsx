import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data';

function BlogDetay() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center">Blog yazısı bulunamadı</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Blog'a Dön
        </Link>
        
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            <div className="text-6xl text-gray-400">📝</div>
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <span className="mr-4">{post.author}</span>
              <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {post.content}
              </p>
              
              <p className="text-gray-700 leading-relaxed mt-4">
                Bu blog yazısında, {post.title.toLowerCase()} konusunda detaylı bilgiler sunulmaktadır. 
                Profesyonel ustalarımızın deneyimleri ve önerileri ile birlikte, 
                bu konuda ihtiyaç duyabileceğiniz tüm bilgileri bulabilirsiniz.
              </p>
              
              <p className="text-gray-700 leading-relaxed mt-4">
                Eğer bu konuda profesyonel bir usta ile çalışmak istiyorsanız, 
                sitemizdeki usta listemizi inceleyebilir ve size en uygun ustayı seçebilirsiniz.
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <Link
                to="/ustalar"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Usta Bul
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default BlogDetay; 