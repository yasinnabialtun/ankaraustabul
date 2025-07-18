import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data';
import { Calendar, User, ArrowLeft } from 'lucide-react';

function BlogDetay() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog yazısı bulunamadı</h1>
        <Link to="/blog" className="text-blue-600 hover:underline">
          Blog listesine dön
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/blog" className="text-blue-600 hover:underline mb-4 inline-flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Blog listesine dön
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {new Date(post.date).toLocaleDateString('tr-TR')}
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            {post.content}
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-semibold mb-4">İlgili Yazılar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogPosts.filter(p => p.id !== post.id).map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/blog/${relatedPost.slug}`}
                className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-semibold mb-2">{relatedPost.title}</h4>
                <p className="text-sm text-gray-600">{relatedPost.content.substring(0, 100)}...</p>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

export default BlogDetay; 